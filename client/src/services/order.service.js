import axios from 'axios';

export class OrderService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getByUser(id) {
        return axios.get(`${this.apiUrl}/cities`);
    }
}