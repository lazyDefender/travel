// Types
import { types } from './types';
// Fire
import fire from '../../firebase'

export const defaultActions = Object.freeze({
    //Sync
    setFirstLoadedPage: (payload) => {
        return {
            type: types.SET_FIRST_LOADED_PAGE,
            payload,
        }
    },

})