import axios from 'axios';

export class HotelService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getById(id) {
        return axios.get(`${this.apiUrl}/hotels/${id}`);
    }
}