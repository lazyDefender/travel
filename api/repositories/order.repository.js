const firebase = require('firebase-admin');
const Collections = require('../common/enum/collections');

class OrderRepository {
    static async create(order) {
        const {
            adultsCount,
            kidsCount,
            datetime,
            tourId,
            userId,
        } = order

        const userRef = await firebase
            .firestore()
            .collection(Collections.USERS)
            .doc(userId)
        const tourRef = await firebase
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

    static async getByUser(userId) {
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
            const order = {
                id: orderDoc.id,
                ...orderDoc.data(),
                user: null,
            };

            const tourRef = await order.tour.get();

            const tour = {
                id: tourRef.id,
                ...tourRef.data(),
                toCity: null,
                fromCity: null,
            };

            const hotelRef = await tour.hotel.get();
            const hotel = {
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

module.exports = OrderRepository;