import { errors } from '../common/enum/errors';

export default class HotelService {
    _hotelRepository;
    _tourRepository;

    constructor({ hotelRepository, tourRepository }) {
        this._hotelRepository = hotelRepository;
        this._tourRepository = tourRepository;
    }

    async create(hotel): Promise<ServiceResponse> {
        const createdHotel = await this._hotelRepository.create(hotel);

        return {
            data: createdHotel,
            error: null,
        };
    }

    async getAll(): Promise<ServiceResponse> {
        const hotels = await this._hotelRepository.getAll();

        return {
            data: hotels,
            error: null,
        };
    }

    async getById(id: string): Promise<ServiceResponse> {
        const hotel = await this._hotelRepository.getById(id);
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

    async getToursByHotel(id: string): Promise<ServiceResponse> {
        const tours = await this._tourRepository.getByHotel(id);

        return {
            data: tours,
            error: null,
        }
    }

    // async update(id: string, dataToUpdate): Promise<ServiceResponse> {
    //     const hotel = await this._hotelRepository.getById(id);
    //     if(hotel) {
    //         const updatedHotel = await this._hotelRepository.update(id, dataToUpdate);
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

    async delete(id: string): Promise<ServiceResponse> {
        const hotel = await this._hotelRepository.getById(id);

        if(hotel) {
            await this._hotelRepository.delete(id);
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
