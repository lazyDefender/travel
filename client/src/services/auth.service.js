import axios from 'axios';
import firebase from 'firebase';

export class AuthService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getCurrentUser(token) {
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
}