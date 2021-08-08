const firebase = require('firebase-admin');
const Collections = require('../common/enum/collections');
class HotelRepository {
    static async create(newHotel) {
        const { id } = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .add(newHotel);

        const hotelDoc = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(id)
            .get();

        const hotel = {
            id,
            ...hotelDoc.data(),
        }

        return hotel;
    }

    static async getAll() {
        const hotelsQuerySnapshot = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .get();
        const hotels = [];

        hotelsQuerySnapshot.forEach(hotelDoc => {
            const hotel = {
                id: hotelDoc.id,
                ...hotelDoc.data(),
            };

            hotels.push(hotel);
        });

        return hotels;
    }

    static async getById(id) {
        const hotelDoc = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(id)
            .get();

        if(hotelDoc.exists) {
            const hotel = {
                id: hotelDoc.id,
                ...hotelDoc.data(),
            };
    
            return hotel;
        }

        return null;
    }

    static async delete(id) {
        const hotelRef = firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(id);

        await hotelRef.delete();
    }
}

module.exports = HotelRepository;