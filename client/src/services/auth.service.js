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

    async signIn(email, password) {
        const authRes = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
    }

    async signOut() {
        await firebase.auth().signOut();
    }
}