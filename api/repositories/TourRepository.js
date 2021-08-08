const firebase = require('firebase-admin');
const collections = require('../collections');
const moment = require('moment');

class TourRepository {
    static async getAll(filters) {
        const {
            toCity,
            datetime,
            duration,
            adultsCount,
            kidsCount,
        } = filters
            
        const toCityRef = await firebase
            .firestore()
            .collection('cities')
            .doc(toCity)

        const toursQuerySnapshot = await firebase
            .firestore()
            .collection('tours')
            .where('toCity', '==', toCityRef)
            .where('duration', '==', parseInt(duration))
            .get()
        const toursDocs = toursQuerySnapshot.docs
        let tours = toursDocs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        })

        const toursWithHotels = [];

        for(let tour of tours) {
            const hotelDocumentSnapshot = await tour.hotel.get();
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
        )

        return finalTours;
    }

    static async getById(id) {
        const tourRes = await firebase
            .firestore()
            .collection(collections.TOURS)
            .doc(id)
            .get()
        const tour = {
            id,
            ...tourRes.data(),
            city: null,
        }

        const hotelRes = await firebase
            .firestore()
            .collection(collections.HOTELS)
            .doc(tour.hotel.id)
            .get()
        const hotel = {
            id: hotelRes.id,
            ...hotelRes.data(),
            city: null,
        }
        const cityRes = await firebase
            .firestore()
            .collection(collections.CITIES)
            .doc(tour.toCity.id)
            .get()
        
        const toCity = {
            id: cityRes.id,
            ...cityRes.data(),
        }

        const bookedDaysRes = await firebase
            .firestore()
            .collection(collections.ORDERS)
            .where('tour', '==', tourRes.ref)
            .get()
        const bookedDaysDocs = bookedDaysRes.docs
        const bookedDays = bookedDaysDocs.map(item => {
            const { datetime } = item.data()
            const jsDate = datetime.toDate()
            return jsDate
            
        })

        const result = {
            ...tour,
            hotel,
            toCity,
            bookedDays,
        }
        return result;
    }

    static async getByHotel(hotelId) {
        const hotelRef = await firebase
            .firestore()
            .collection(collections.HOTELS)
            .doc(hotelId)

        const toursRes = await firebase
            .firestore()
            .collection(collections.TOURS)
            .where('hotel', '==', hotelRef)
            .get()
        
        const toursDocs = toursRes.docs
        const tours = []
        for(const t of toursDocs) {
            const tour = t.data()
            const toCityDoc = await tour.toCity.get()
            const toCity = toCityDoc.data()
            const { 
                adultPrice, 
                kidPrice, 
                duration,
            } = tour

            tours.push({
                id: t.id,
                adultPrice,
                kidPrice,
                duration,
                toCity,
            })
        }

        return tours
    }
}

module.exports = TourRepository;