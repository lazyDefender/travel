import firebase from 'firebase'
// Types
import { types } from './types';
// Fire
import fire from '../../firebase'
import moment from 'moment';
import axios from 'axios';

export const toursFilterActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.TOURS_FILTER_START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.TOURS_FILTER_STOP_FETCHING,
        }
    },

    fill: (payload) => {
        return {
            type: types.TOURS_FILTER_FILL,
            payload,
        }
    },

    setFetchingError: (error) => {
        return {
            type: types.TOURS_FILTER_SET_FETCHING_ERROR,
            error: true,
            payload: error,
        }
    },

    setFormState: (state) => {
        return {
            type: types.TOURS_FILTER_SET_FORM_STATE,
            payload: state,
        }
    },

    //Async
    fetchAll: (limit = 20) => async (dispatch) => {
        dispatch(toursFilterActions.startFetching())
        const toursResponse = await fire
            .firestore()
            .collection('tours')
            .limit(limit)
            .get()
        const toursDocs = toursResponse.docs
        const tours = toursDocs.map(doc => {
            return {
                id: doc.id,
                ...doc.data(),
            }
        })
        
        const hotelIds = tours.map(t => t.hotel.id)
        const hotels = []
        for(let hotelId of hotelIds) {
            const hotelDoc = await fire
            .firestore()
            .collection('hotels')
            .doc(hotelId)
            .get()
            const hotel = {
                id: hotelDoc.id,
                ...hotelDoc.data(),
            }
            hotels.push(hotel)
        }

        const finalTours = tours.map(t => ({
            ...t,
            hotel: hotels.find(h => h.id === t.hotel.id)
        }))

        dispatch(toursFilterActions.fill(finalTours))
        dispatch(toursFilterActions.stopFetching())
    },

    fetchAsync: ({
        toCity,
        datetime,
        duration,
        adultsCount,
        kidsCount,
    }) => async (dispatch) => {
        dispatch(toursFilterActions.startFetching())
        const params = new URLSearchParams()
        params.set('toCity', toCity)
        params.set('datetime', datetime)
        params.set('duration', duration)
        params.set('adultsCount', adultsCount)
        params.set('kidsCount', kidsCount)

        const toursUrl = `${process.env.REACT_APP_API_URL}/tours?${params.toString()}`
        const { data: tours } = await axios.get(toursUrl)

        dispatch(toursFilterActions.fill(tours))
        dispatch(toursFilterActions.stopFetching())
    },   
})
