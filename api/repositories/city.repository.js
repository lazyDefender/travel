const firebase = require('firebase-admin');
const Collections = require('../common/enum/collections');
class CityRepository {
    static async create(newCity) {
        const { id } = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .add(newCity);

        const cityDoc = await firebase
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
        const citiesQuerySnapshot = await firebase
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

    static async getById(id) {
        const cityDoc = await firebase
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

    static async delete(id) {
        const cityRef = firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(id);

        await cityRef.delete();
    }
}

module.exports = CityRepository;