import firebase from 'firebase-admin';

import { Collections } from '../common/enum/collections';

export default class HotelRepository {
    static async create(newHotel) {
        const { id } = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .add(newHotel);

        const hotelDoc: FirebaseFirestore.DocumentSnapshot = await firebase
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
        const hotelsQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .get();
        const hotels = [];

        for(let hotelDoc of hotelsQuerySnapshot.docs) {
            const hotel: IHotel = {
                id: hotelDoc.id,
                ...hotelDoc.data(),
            };
    
            const cityDoc = await hotel.city.get();
    
            const city = {
                id: cityDoc.id,
                ...cityDoc.data(),
            };
    
            const result = {
                ...hotel,
                city,
            }

            hotels.push(result);
        };

        return hotels;
    }

    static async getById(id: string) {
        const hotelDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(id)
            .get();

        if(hotelDoc.exists) {
            const hotel: IHotel = {
                id,
                ...hotelDoc.data(),
            };
    
            const cityDoc = await hotel.city.get();
    
            const city = {
                id: cityDoc.id,
                ...cityDoc.data(),
            };
    
            const result = {
                ...hotel,
                city,
            }
    
            return result;
        }

        return null;
    }

    static async delete(id: string) {
        const hotelRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(id);

        await hotelRef.delete();
    }
}
