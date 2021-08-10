import { errors } from '../common/enum/errors';
import TourRepository from '../repositories/tour.repository';

export default class TourService {
    static async getAll(filters): Promise<ServiceResponse> {
        const tours = await TourRepository.getAll(filters);

        return {
            data: tours,
            error: null,
        };
    }
    static async getById(id: string): Promise<ServiceResponse> {
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
