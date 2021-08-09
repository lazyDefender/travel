import firebase from 'firebase'
// Types
import { types } from './types';
// Fire
import fire from '../../firebase'
import moment from 'moment';
import { getPlace } from '../../global/getPlace';
import axios from 'axios'

export const hotelActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.HOTEL_START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.HOTEL_STOP_FETCHING,
        }
    },

    fill: (payload) => {
        return {
            type: types.HOTEL_FILL,
            payload,
        }
    },


    setFetchingError: (error) => {
        return {
            type: types.HOTEL_SET_FETCHING_ERROR,
            error: true,
            payload: error,
        }
    },

    //Async
    fetchById: (id) => async (dispatch) => {
        dispatch(hotelActions.startFetching())

        const hotelUrl = `${process.env.REACT_APP_API_URL}/hotels/${id}`

        try {
            const { data: hotel } = await axios.get(hotelUrl)
            dispatch(hotelActions.fill(hotel))
        }
        catch(error) {
            dispatch(hotelActions.setFetchingError(error.response.data.errors[0]))
        }

        dispatch(hotelActions.stopFetching())
    },
})
