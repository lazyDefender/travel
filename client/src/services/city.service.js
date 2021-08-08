import axios from 'axios';

export class CityService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getAll() {
        return axios.get(`${this.apiUrl}/cities`);
    }
}