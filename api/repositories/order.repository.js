const firebase = require('firebase-admin');
const collections = require('../collections');

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
            .collection(collections.USERS)
            .doc(userId)
        const tourRef = await firebase
            .firestore()
            .collection(collections.TOURS)
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
            .collection(collections.ORDERS)
            .add(fullOrder)

        const createdOrderDoc = await orderRef.get()
        const createdOrder = {
            id: createdOrderDoc.id,
            ...createdOrderDoc.data(),
        }

        return createdOrder
    }
}

module.exports = OrderRepository;