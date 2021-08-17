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
    async create(order) {
        const {
            adultsCount,
            kidsCount,
            datetime,
            tourId,
            userId,
        } = order

        const userRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(userId)
        const tourRef: FirebaseFirestore.DocumentReference = firebase
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

        const orderRef: FirebaseFirestore.DocumentReference = await firebase
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

    async getByUser(userId: string) {
        const userRef: FirebaseFirestore.DocumentReference = await firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(userId);

        const ordersQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
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

            const hotelDoc: FirebaseFirestore.DocumentSnapshot = await tour.hotel.get();
            const hotel: IHotel = {
                id: hotelDoc.id,
                ...hotelDoc.data(),
            };

            const cityDoc: FirebaseFirestore.DocumentSnapshot = await hotel.city.get();
            const city = {
                id: cityDoc.id,
                ...cityDoc.data(),
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
