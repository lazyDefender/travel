const errors = require('../errors');
const TourRepository = require('../repositories/TourRepository');

class TourService {
    static async getAll(filters) {
        const tours = await TourRepository.getAll(filters);

        return {
            data: tours,
            error: null,
        };
    }
    static async getById(id) {
        const hotel = await TourRepository.getById(id);
        if(!hotel) {
            return {
                data: null,
                error: errors.HOTELS.notFoundById(id),
            };
        }
        
        return {
            data: hotel,
            error: null,
        };
    }
}

module.exports = TourService;