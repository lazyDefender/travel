import firebase from 'firebase-admin';
import { Collections } from '../common/enum/collections';

export default class TourRepository {
    async getAll(filters) {
        const {
            toCity,
            datetime,
            duration,
            adultsCount,
            kidsCount,
        } = filters;
            
        const toCityRef: FirebaseFirestore.DocumentReference = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(toCity);

        const toursQuerySnapshot: FirebaseFirestore.QuerySnapshot = await firebase
            .firestore()
            .collection('tours')
            .where('toCity', '==', toCityRef)
            .where('duration', '==', parseInt(duration))
            .get();
        const toursDocs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] = toursQuerySnapshot.docs;
        let tours: ITour[] = toursDocs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        const toursWithHotels = [];

        for(let tour of tours) {
            const hotelDocumentSnapshot: FirebaseFirestore.DocumentSnapshot = await tour.hotel.get();
            const hotel = {
                id: hotelDocumentSnapshot.id,
                ...hotelDocumentSnapshot.data(),
            };

            toursWithHotels.push({
                ...tour,
                hotel,
            });
        }

        const finalTours = toursWithHotels.filter(tour => (
            adultsCount <= tour.hotel.maxAdultsCount && 
            kidsCount <= tour.hotel.maxAdultsCount)
        );

        return finalTours;
    }

    async getById(id: string) {
        const tourDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.TOURS)
            .doc(id)
            .get();
        const tour: ITour = {
            id,
            ...tourDoc.data(),
        };

        const hotelDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(tour.hotel.id)
            .get();
        const hotel: IHotel = {
            id: hotelDoc.id,
            ...hotelDoc.data(),
            city: null,
        };

        const cityDoc: FirebaseFirestore.DocumentSnapshot = await firebase
            .firestore()
            .collection(Collections.CITIES)
            .doc(tour.toCity.id)
            .get();
        
        const toCity: ICity = {
            id: cityDoc.id,
            ...cityDoc.data(),
        };

        const result = {
            ...tour,
            hotel,
            toCity,
        };
        return result;
    }

    async getByHotel(hotelId: string) {
        const hotelRef = firebase
            .firestore()
            .collection(Collections.HOTELS)
            .doc(hotelId);

        const toursRes = await firebase
            .firestore()
            .collection(Collections.TOURS)
            .where('hotel', '==', hotelRef)
            .get();
        
        const toursDocs = toursRes.docs;
        const tours = [];
        for(const t of toursDocs) {
            const tour = t.data();
            const toCityDoc = await tour.toCity.get();
            const toCity = toCityDoc.data();
            const { 
                adultPrice, 
                kidPrice, 
                duration,
            } = tour;

            tours.push({
                id: t.id,
                adultPrice,
                kidPrice,
                duration,
                toCity,
            });
        }

        return tours;
    }
}
