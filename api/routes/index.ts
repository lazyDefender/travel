import { router as authRoute } from './auth.route';
import { router as userRoute } from './user.route';
import { router as cityRoute } from './city.route';
import { router as hotelRoute } from './hotel.route';
import { router as tourRoute } from './tour.route';
import { router as orderRoute } from './order.route';

export default (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/cities', cityRoute);
    app.use('/api/hotels', hotelRoute);
    app.use('/api/tours', tourRoute);
    app.use('/api/orders', orderRoute);
};