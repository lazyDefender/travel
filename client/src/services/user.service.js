import axios from 'axios';
import firebase from 'firebase';
import { getBearerToken } from '../helpers/getBearerToken';

export class UserService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    async update(id, payload) {
        const token = await getBearerToken();
        
        return axios.patch(`${this.apiUrl}/users/${id}`, payload, {
            headers: {
                'Authorization': token,
            },
        })
    }

    async signIn(email, password) {
        const authRes = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    }
}