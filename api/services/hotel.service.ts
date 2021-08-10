import { errors } from '../common/enum/errors';
import HotelRepository from '../repositories/hotel.repository';
import TourRepository from '../repositories/tour.repository';

export default class HotelService {
    static async create(hotel): Promise<ServiceResponse> {
        const createdHotel = await HotelRepository.create(hotel);

        return {
            data: createdHotel,
            error: null,
        };
    }

    static async getAll(): Promise<ServiceResponse> {
        const hotels = await HotelRepository.getAll();

        return {
            data: hotels,
            error: null,
        };
    }

    static async getById(id: string): Promise<ServiceResponse> {
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

    static async getToursByHotel(id: string): Promise<ServiceResponse> {
        const tours = await TourRepository.getByHotel(id);

        return {
            data: tours,
            error: null,
        }
    }

    // static async update(id: string, dataToUpdate): Promise<ServiceResponse> {
    //     const hotel = await HotelRepository.getById(id);
    //     if(hotel) {
    //         const updatedHotel = await HotelRepository.update(id, dataToUpdate);
    //         if(!updatedHotel) {
    //             return null;
    //         }

    //         return {
    //             data: updatedHotel,
    //             error: null,
    //         };
    //     }
    //     else {
    //         return {
    //             data: null,
    //             error: errors.HOTELS.notFoundById(id),
    //         }    
    //     }
        
    // }

    static async delete(id: string): Promise<ServiceResponse> {
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
