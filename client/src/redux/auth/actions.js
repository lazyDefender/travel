// Types
import { types } from './types';
// Fire
import fire from '../../firebase'
import firebase from 'firebase'

export const authActions = Object.freeze({
    //Sync
    startFetching: () => {
        return {
            type: types.AUTH_START_FETCHING,
        }
    },

    stopFetching: () => {
        return {
            type: types.AUTH_STOP_FETCHING,
        }
    },

    fill: (payload) => {
        return {
            type: types.AUTH_FILL,
            payload,
        }
    },

    clear: () => {
        return {
            type: types.AUTH_CLEAR,
        }
    },

    setFetchingError: (error) => {
        return {
            type: types.AUTH_SET_FETCHING_ERROR,
            error: true,
            payload: error,
        }
    },

    setCreatedWithEmailAndPassword: (payload) => {
        return {
            type: types.SET_CREATED_WITH_EMAIL_AND_PASSWORD,
            payload,
        }
    },

    //Async

    createUserWithEmailAndPassword: (user) => async (dispatch) => {
        dispatch(authActions.startFetching())
        dispatch(authActions.setCreatedWithEmailAndPassword(true))
        const {
            firstName,
            lastName,
            email,
            password,
        } = user
        const authRes = await fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
        // console.log('signup res:',authRes)
        const { uid } = authRes.user
        const newUser = {
            firstName,
            lastName,
            email,
            authIDs: [uid],
        }
        const userRes = await fire
                .firestore()
                .collection('users')
                .add(newUser)

        const { currentUser } = fire.auth()
        currentUser.sendEmailVerification()
        dispatch(authActions.fill(newUser))
        dispatch(authActions.stopFetching())
        dispatch(authActions.setCreatedWithEmailAndPassword(false))
    },

    signIn: (user) => async (dispatch) => {
        dispatch(authActions.startFetching())
        const {
            email, 
            password,
        } = user
        try {
            const authRes = await fire
            .auth()
            .signInWithEmailAndPassword(email, password)

            console.log('authRes: ', authRes)

            const { uid } = authRes.user
            const userRes = await fire
                .firestore()
                .collection('users')
                .where('authIDs', 'array-contains', uid)
                .get()
            
            const userDoc = userRes.docs[0]
            const { id } = userDoc
            const userData = {
                id,
                ...userDoc.data(),
            }

            dispatch(authActions.fill(userData))
        }
        catch(e) {
            console.log(e)
            dispatch(authActions.setFetchingError(e.code))
        }

        dispatch(authActions.stopFetching())
    },

    getUserDataByUID: (uid) => async (dispatch) => {
        dispatch(authActions.startFetching())
        const userRes = await fire
            .firestore()
            .collection('users')
            .where('authIDs', 'array-contains', uid)
            .get()
            
        const userDoc = userRes.docs[0]
        if(userDoc) {
            const { id } = userDoc
            const userData = {
                id,
                ...userDoc.data(),
                authID: uid,
            }
            dispatch(authActions.fill(userData))
        }
        
        dispatch(authActions.stopFetching())        
    },

    signOut: () => async (dispatch) => {
        await fire.auth().signOut()
        dispatch(authActions.fill(null))
    },

    updateUser: (user) => async (dispatch) => {
        dispatch(authActions.startFetching())
        const {
            id,
            firstName,
            lastName,
        } = user
        const userRef = await fire
            .firestore()
            .collection('users')
            .doc(user.id)
        const userDoc = await userRef.get()
        const updatedUser = {
            ...userDoc.data(),
            firstName,
            lastName,
        }
        const result = await userRef.update(updatedUser)
        dispatch(authActions.fill(updatedUser))
        dispatch(authActions.stopFetching())
    },

    signInWithGoogle: () => async (dispatch) => {
        dispatch(authActions.startFetching())
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('email')
        const result = await firebase.auth().signInWithPopup(provider)

        const { currentUser } = await firebase.auth()

        let token = null
        if(currentUser) {
            token = await currentUser.getIdToken()
            console.log(token)
        }

        const {
            uid,
        } = result.user
        const {
            email,
            family_name,
            given_name,
        } = result.additionalUserInfo.profile

        const userRef = await fire
            .firestore()
            .collection('users')
            .where('email', '==', email)

        const usersRes = await userRef.get()
        const userExists = !usersRes.empty

        if(userExists) {
            const doc = usersRes.docs[0]
            const { ref, id } = doc
            const { authIDs } = doc.data()
            if(!authIDs.includes(uid)) {
                await ref.update({
                    authIDs: [...authIDs, uid]
                })
            }
            dispatch(authActions.fill({
                id,
                ...doc.data(),
            }))
            
        }
        else {
            const user = {
                firstName: given_name,
                lastName: family_name,
                authIDs: [uid],
                email,
            }
                    
            const userRes = await fire
                .firestore()
                .collection('users')
                .add(user)
            
            dispatch(authActions.getUserDataByUID(uid))
        }
        
        dispatch(authActions.stopFetching())
    },

    signInWithFacebook: () => async (dispatch) => {
        dispatch(authActions.startFetching())
        const provider = new firebase.auth.FacebookAuthProvider()
        provider.addScope('email')
        const result = await firebase.auth().signInWithPopup(provider)
        
        const {
            uid,
        } = result.user
        const {
            email,
            family_name,
            given_name,
        } = result.additionalUserInfo.profile

        const usersRef = await fire
            .firestore()
            .collection('users')
            .where('email', '==', email)

        const usersRes = await usersRef.get()
        const userExists = !usersRes.empty

        let user = {}
        let id = null

        if(userExists) {
            const doc = usersRes.docs[0]
            const { ref } = doc
            id = doc.id
            const user = doc.data()
            if(!user.authIDs.includes(uid)) {
                await ref.update({
                    authIDs: [...user.authIDs, uid]
                })
            }
            
        }
        else {
            user = {
                firstName: given_name,
                lastName: family_name,
                authIDs: [uid],
                email,
            }
                    
            const userRes = await fire
                .firestore()
                .collection('users')
                .add(user)
            
        }

        console.log(result)
        dispatch(authActions.fill({
            id,
            ...user,
        }))
        dispatch(authActions.stopFetching())
    },

    deleteUser: () => async (dispatch) => {
        dispatch(authActions.startFetching())

        await fire.auth().currentUser.delete()
        dispatch(authActions.clear())

        dispatch(authActions.stopFetching())
    },

    fetchAsync: (id) => async (dispatch) => {
        // dispatch(citiesActions.startFetching())
        // const citiesResponse = await fire
        //     .firestore()
        //     .collection('cities')
        //     .get()
        // const citiesDocs = citiesResponse.docs
        // const cities = citiesDocs.map(doc => {
        //     return {
        //         id: doc.id,
        //         ...doc.data(),
        //     }
        // })
        // dispatch(citiesActions.fill(cities))
        // dispatch(citiesActions.stopFetching())
    }
})
