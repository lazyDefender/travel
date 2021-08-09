import firebase from 'firebase'
// Types
import { types } from './types';
// Fire
import fire from '../../firebase'
import moment from 'moment';
import { getPlace } from '../../global/getPlace';
import { hotelActions } from '../hotels/actions';
import axios from 'axios'

export const toursActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.TOURS_START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.TOURS_STOP_FETCHING,
        }
    },

    fill: (payload) => {
        return {
            type: types.TOURS_FILL,
            payload,
        }
    },

    setFetchingError: (error) => {
        return {
            type: types.TOURS_SET_FETCHING_ERROR,
            error: true,
            payload: error,
        }
    },

    //Async
    fetchByHotel: (id) => async (dispatch) => {
        dispatch(toursActions.startFetching())
        
        const toursUrl = `${process.env.REACT_APP_API_URL}/hotels/${id}/tours`
        const { data: tours } = await axios.get(toursUrl)

        dispatch(toursActions.fill(tours))
        dispatch(toursActions.stopFetching())
    }

    
})
