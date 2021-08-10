import axios from 'axios';
import { getBearerToken } from '../helpers/getBearerToken';

export class OrderService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getByUser(userId) {
        return axios.get(`${this.apiUrl}/users/${userId}/orders`);
    }

    async create(order) {
        const token = await getBearerToken();
        return axios.post(`${this.apiUrl}/orders`, order, {
            headers: {
                'Authorization': token,
            }
        });
    }
}