const errors = require('../common/enum/errors');
const CityRepository = require('../repositories/CityRepository');

class CityService {
    static async create(city) {
        const createdCity = await CityRepository.create(city);

        return {
            data: createdCity,
            error: null,
        };
    }

    static async getAll() {
        const cities = await CityRepository.getAll();
        if(!cities) {
            return [];
        }
        return {
            data: cities,
            error: null,
        };
    }

    static async getById(id) {
        const city = await CityRepository.getById(id);
        if(!city) {
            return {
                data: null,
                error: errors.CITIES.notFoundById(id),
            };
        }
        
        return {
            data: user,
            error: null,
        };
    }

    static async update(id, dataToUpdate) {
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

    static async delete(id) {
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

module.exports = CityService;