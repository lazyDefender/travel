import { errors } from '../common/enum/errors';
import CityRepository from '../repositories/city.repository';

export default class CityService {
    static async create(city): Promise<ServiceResponse> {
        const createdCity = await CityRepository.create(city);

        return {
            data: createdCity,
            error: null,
        };
    }

    static async getAll(): Promise<ServiceResponse> {
        const cities = await CityRepository.getAll();

        return {
            data: cities,
            error: null,
        };
    }

    static async getById(id: string): Promise<ServiceResponse> {
        const city = await CityRepository.getById(id);
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

    static async update(id: string, dataToUpdate): Promise<ServiceResponse> {
        const city = await CityRepository.getById(id);
        if(city) {
            const updatedCity = await CityRepository.update(id, dataToUpdate);
            if(!updatedCity) {
                return null;
            }

            return {
                data: updatedCity,
                error: null,
            };
        }
        else {
            return {
                data: null,
                error: errors.CITIES.notFoundById(id),
            }    
        }
        
    }

    static async delete(id: string): Promise<ServiceResponse> {
        const city = await CityRepository.getById(id);

        if(city) {
            await CityRepository.delete(id);
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
