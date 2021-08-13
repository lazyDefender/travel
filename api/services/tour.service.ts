import { errors } from '../common/enum/errors';

export default class TourService {
    _tourRepository;

    constructor({ tourRepository }) {
        this._tourRepository = tourRepository;
    }

    async getAll(filters): Promise<ServiceResponse> {
        const tours = await this._tourRepository.getAll(filters);

        return {
            data: tours,
            error: null,
        };
    }
    async getById(id: string): Promise<ServiceResponse> {
        const hotel = await this._tourRepository.getById(id);
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
