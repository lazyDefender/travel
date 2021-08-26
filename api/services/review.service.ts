import firebase from 'firebase-admin';
import { errors } from '../common/enum/errors';

export default class ReviewService {
    _reviewRepository;
    _hotelRepository

    constructor({ reviewRepository, hotelRepository }) {
        this._reviewRepository = reviewRepository;
        this._hotelRepository = hotelRepository;
    }

    async create(review): Promise<ServiceResponse> {
        const { hotelId } = review;

        const batch = firebase.firestore().batch();

        const increment = firebase.firestore.FieldValue.increment(1);

        const hotel = await this._hotelRepository.getById(hotelId);
        if(hotel) {
            try {
                await this._hotelRepository.updateWithBatch(hotelId, {
                    reviewsCount: increment,
                }, batch);
        
                const createdReviewId = await this._reviewRepository.createWithBatch(review, batch);

                await batch.commit();

                const createdReview = await this._reviewRepository.getById(createdReviewId);
    
                return {
                    data: createdReview,
                    error: null,
                };
            }
            catch(error) {
                return {
                    data: null,
                    error,
                };
            }
        }
        else {
            return {
                data: null,
                error: errors.HOTELS.notFoundById(hotelId),
            }
        }
        
    }

    async delete(id: string): Promise<ServiceResponse> {
        const city = await this._reviewRepository.getById(id);

        if(city) {
            await this._reviewRepository.delete(id);
            return {
                data: null,
                error: null,
            }
        }

        else {
            return {
                data: null,
                error: errors.REVIEWS.notFoundById(id),
            }    
        }
    }
}
