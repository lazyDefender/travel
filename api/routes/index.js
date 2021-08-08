const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const cityRoute = require('./city.route');
const hotelRoute = require('./hotel.route');
const tourRoute = require('./tour.route');
const orderRoute = require('./order.route');

module.exports = (app) => {
    app.use('/api/auth', authRoute);
    app.use('/api/users', userRoute);
    app.use('/api/cities', cityRoute);
    app.use('/api/hotels', hotelRoute);
    app.use('/api/tours', tourRoute);
    app.use('/api/orders', orderRoute);
};