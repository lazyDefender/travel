import CityRepository from './city.repository';
import HotelRepository from './hotel.repository';
import OrderRepository from './order.repository';
import ReviewRepository from './review.repository';
import TourRepository from './tour.repository';
import UserRepository from './user.repository';

const cityRepository = new CityRepository();
const hotelRepository = new HotelRepository();
const orderRepository = new OrderRepository();
const reviewRepository = new ReviewRepository();
const tourRepository = new TourRepository();
const userRepository = new UserRepository();

export {
    cityRepository,
    hotelRepository,
    orderRepository,
    reviewRepository,
    tourRepository,
    userRepository,
};
