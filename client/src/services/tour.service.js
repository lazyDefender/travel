import axios from 'axios';

export class TourService {
    constructor({ apiUrl }) {
        this.apiUrl = apiUrl;
    }

    getAll(filters) {
        const {
            adultsCount,
            kidsCount,
            duration,
            datetime,
            toCity,
        } = filters;

        const params = new URLSearchParams();
        params.set('adultsCount', adultsCount);
        params.set('kidsCount', kidsCount);
        params.set('duration', duration);
        params.set('datetime', datetime);
        params.set('toCity', toCity);

        const paramsStr = params.toString()

        return axios.get(`${this.apiUrl}/tours?${paramsStr}`);
    }

    getByHotel(hotelId) {
        return axios.get(`${this.apiUrl}/hotels/${hotelId}/tours`);
    }
}