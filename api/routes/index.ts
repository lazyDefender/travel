import { ApiPath } from '../common/enum/api/api-path';

import {
    authService,
    cityService,
    hotelService,
    orderService,
    tourService,
    userService,
    reviewService,
} from '../services';

import { initAuth } from './auth.route';
import { initCity } from './city.route';
import { initHotel } from './hotel.route';
import { initOrder } from './order.route';
import { initTour } from './tour.route';
import { initUser } from './user.route';
import { initReview } from './review.route';


export const initApi = Router => {
    const router = Router();

    router.use(
        ApiPath.AUTH,
        initAuth(Router, {
            authService,
        })
    );
    
    router.use(
        ApiPath.CITIES,
        initCity(Router, {
            cityService,
        })
    );
    
    router.use(
        ApiPath.HOTELS,
        initHotel(Router, {
            hotelService,
        })
    );

    router.use(
        ApiPath.ORDERS,
        initOrder(Router, {
            orderService,
        })
    );

    router.use(
        ApiPath.TOURS,
        initTour(Router, {
            tourService,
        })
    );

    router.use(
        ApiPath.USERS,
        initUser(Router, {
            userService,
        })
    );

    router.use(
        ApiPath.REVIEWS,
        initReview(Router, {
            reviewService,
        })
    );

    return router;
};
