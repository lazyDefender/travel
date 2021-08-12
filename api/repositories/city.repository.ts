import firebase from 'firebase-admin';

import { Collections } from '../common/enum/collections';

export default class CityRepository {
    static async create(newCity) {
        const { id } = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .add(newCity);

        const cityDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(id)
            .get();

        const city = {
            id,
            ...cityDoc.data(),
        }

        return city;
    }

    static async getAll() {
        const citiesQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .get();
        const cities = [];

        citiesQuerySnapshot.forEach(cityDoc => {
            const city = {
                id: cityDoc.id,
                ...cityDoc.data(),
            };

            cities.push(city);
        });

        return cities;
    }

    static async getById(id: string) {
        const cityDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(id)
            .get();

        if(cityDoc.exists) {
            const city = {
                id: cityDoc.id,
                ...cityDoc.data(),
            };
    
            return city;
        }

        return null;
    }

    static async delete(id: string) {
        const cityRef: FirebaseFirestore.DocumentReference = firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(id);

        await cityRef.delete();
    }
}
