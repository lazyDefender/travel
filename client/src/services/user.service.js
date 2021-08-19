import axios from 'axios';
import firebase from 'firebase';
import { getBearerToken } from '../helpers/getBearerToken';

export class UserService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    create(payload) {
        return axios.post(`${this.apiUrl}/users`, payload, {
            'Content-Type': 'application/json',
        });
    } 

    async search(query) {
        const params = new URLSearchParams();
        params.set('email', query.email);
        const paramsStr = params.toString();

        return axios.get(`${this.apiUrl}/users/search?${paramsStr}`);
    }

    async update(id, payload) {
        const token = await getBearerToken();
        
        return axios.patch(`${this.apiUrl}/users/${id}`, payload, {
            headers: {
                'Authorization': token,
            },
        });
    }

    async signIn(email, password) {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    }
}