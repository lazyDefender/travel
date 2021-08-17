import { errors } from '../common/enum/errors';

export default class CityService {
    _cityRepository;

    constructor({ cityRepository }) {
        this._cityRepository = cityRepository;
    }

    async create(city): Promise<ServiceResponse> {
        const createdCity = await this._cityRepository.create(city);

        return {
            data: createdCity,
            error: null,
        };
    }

    async getAll(): Promise<ServiceResponse> {
        const cities = await this._cityRepository.getAll();

        return {
            data: cities,
            error: null,
        };
    }

    async getById(id: string): Promise<ServiceResponse> {
        const city = await this._cityRepository.getById(id);
        if(!city) {
            return {
                data: null,
                error: errors.CITIES.notFoundById(id),
            };
        }
        
        return {
            data: city,
            error: null,
        };
    }

    async delete(id: string): Promise<ServiceResponse> {
        const city = await this._cityRepository.getById(id);

        if(city) {
            await this._cityRepository.delete(id);
            return {
                data: null,
                error: null,
            }
        }

        else {
            return {
                data: null,
                error: errors.CITIES.notFoundById(id),
            }    
        }
    }
}
