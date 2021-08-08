const errors = require('../common/enum/errors');
const HotelRepository = require('../repositories/hotel.repository');
const TourRepository = require('../repositories/tour.repository');

class HotelService {
    static async create(hotel) {
        const createdHotel = await HotelRepository.create(hotel);

        return {
            data: createdHotel,
            error: null,
        };
    }

    static async getAll() {
        const hotels = await HotelRepository.getAll();
        if(!hotels) {
            return [];
        }
        return {
            data: hotels,
            error: null,
        };
    }

    static async getById(id) {
        const hotel = await HotelRepository.getById(id);
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

    static async getToursByHotel(id) {
        const tours = await TourRepository.getByHotel(id);

        return {
            data: tours,
            error: null,
        }
    }

    static async update(id, dataToUpdate) {
        const hotel = await HotelRepository.getById(id);
        if(hotel) {
            const updatedHotel = await HotelRepository.update(id, dataToUpdate);
            if(!updatedHotel) {
                return null;
            }

            return {
                data: updatedHotel,
                error: null,
            };
        }
        else {
            return {
                data: null,
                error: errors.HOTELS.notFoundById(id),
            }    
        }
        
    }

    static async delete(id) {
        const hotel = await HotelRepository.getById(id);

        if(hotel) {
            await HotelRepository.delete(id);
            return {
                data: null,
                error: null,
            }
        }

        else {
            return {
                data: null,
                error: errors.HOTELS.notFoundById(id),
            }    
        }
    }
}

module.exports = HotelService;