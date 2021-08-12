import axios from 'axios';
import firebase from 'firebase';
import { getBearerToken } from '../helpers/getBearerToken';

export class AuthService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    async getCurrentUser() {
        const token = await getBearerToken();
            
        return axios.get(`${this.apiUrl}/auth/currentUser`, {
            headers: {
                'Authorization': token,
            },
        })
    }

    async signUp(email, password) {
        const authRes = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        return authRes;
    }

    async signIn(email, password) {
        const authRes = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
    }

    async signInWithProvider(providerName) {
        let provider;
        switch(providerName) {
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
        }

        provider.addScope('email');
        const result = await firebase.auth().signInWithPopup(provider);
        
        const {
            uid,
        } = result.user;
        const {
            email,
            first_name: firstName,
            last_name: lastName,
        } = result.additionalUserInfo.profile;

        const user = {
            uid,
            email,
            firstName,
            lastName,
        };

        return user;
    }

    async signOut() {
        await firebase.auth().signOut();
    }
}