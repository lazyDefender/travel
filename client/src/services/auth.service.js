import axios from 'axios';

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
}