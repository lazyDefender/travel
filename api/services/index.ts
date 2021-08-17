import {
    cityRepository,
    hotelRepository,
    orderRepository,
    tourRepository,
    userRepository,
} from '../repositories';

import AuthService from './auth.service';
import CityService from './city.service';
import HotelService from './hotel.service';
import OrderService from './order.service';
import TourService from './tour.service';
import UserService from './user.service';

const authService = new AuthService({
    userRepository,
});

const cityService = new CityService({
    cityRepository,
});

const hotelService = new HotelService({
    hotelRepository,
    tourRepository,
});

const orderService = new OrderService({
    orderRepository,
});

const tourService = new TourService({
    tourRepository,
});

const userService = new UserService({
    userRepository,
    orderRepository,
});

export {
    authService,
    cityService,
    hotelService,
    orderService,
    tourService,
    userService,
};