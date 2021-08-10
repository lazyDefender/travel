import firebase from 'firebase-admin';

import { Collections } from '../common/enum/collections';

interface IOrder {
    id: string;
    adultsCount?: number;
    datetime?: FirebaseFirestore.Timestamp;
    kidsCount?: number;
    tour: FirebaseFirestore.DocumentReference;
    user: FirebaseFirestore.DocumentReference;
}

export default class OrderRepository {
    static async create(order) {
        const {
            adultsCount,
            kidsCount,
            datetime,
            tourId,
            userId,
        } = order

        const userRef = firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(userId)
        const tourRef = firebase
            .firestore()
            .collection(Collections.TOURS)
            .doc(tourId)

        const fullOrder = {
            adultsCount,
            kidsCount,
            datetime: firebase.firestore.Timestamp.fromDate(new Date(datetime)),
            tour: tourRef,
            user: userRef,
        }

        const orderRef = await firebase
            .firestore()
            .collection(Collections.ORDERS)
            .add(fullOrder)

        const createdOrderDoc = await orderRef.get()
        const createdOrder = {
            id: createdOrderDoc.id,
            ...createdOrderDoc.data(),
        }

        return createdOrder
    }

    static async getByUser(userId: string) {
        const userRef = await firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(userId);

        const ordersQuerySnapshot = await firebase
            .firestore()
            .collection(Collections.ORDERS)
            .where('user', '==', userRef)
            .get();
        const orderDocs = ordersQuerySnapshot.docs;

        const orders = [];

        for(let orderDoc of orderDocs) {
            const order: IOrder = {
                id: orderDoc.id,
                ...orderDoc.data(),
                user: null,
            } as IOrder;

            const tourRef = await order.tour.get();

            const tour: ITour = {
                id: tourRef.id,
                ...tourRef.data(),
                toCity: null,
                fromCity: null,
            };

            const hotelRef = await tour.hotel.get();
            const hotel: IHotel = {
                id: hotelRef.id,
                ...hotelRef.data(),
            };

            const cityRef = await hotel.city.get();
            const city = {
                id: cityRef.id,
                ...cityRef.data(),
            };

            orders.push({
                ...order,
                tour: {
                    ...tour,
                    hotel: {
                        ...hotel,
                        city,
                    },
                },
            });
        }

        return orders;
    }
}
