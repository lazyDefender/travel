// Types
import { types } from './types';
// Fire
import fire from '../../firebase'
import axios from 'axios';

export const citiesActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.CITIES_START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.CITIES_STOP_FETCHING,
        }
    },

    fill: (payload) => {
        return {
            type: types.CITIES_FILL,
            payload,
        }
    },

    setFetchingError: (error) => {
        return {
            type: types.CITIES_SET_FETCHING_ERROR,
            error: true,
            payload: error,
        }
    },

    //Async

    fetchAsync: (id) => async (dispatch) => {
        dispatch(citiesActions.startFetching())
        
        const citiesUrl = `${process.env.REACT_APP_API_URL}/cities`
        const { data: cities } = await axios.get(citiesUrl)

        const citiesSorted = cities.sort((cityA, cityB) => cityA.name > cityB.name ? 1 : -1)
        dispatch(citiesActions.fill(citiesSorted))
        dispatch(citiesActions.stopFetching())
    }
})
