const UserErrors = require('./users/user-errors');
const CityErrors = require('./cities/city-errors');
const AuthErrors = require('./auth/auth-errors');
const HotelErrors = require('./hotels/hotel-errors');
const TourErrors = require('./tours/tour-errors');

export const errors = {
    USERS: UserErrors,
    CITIES: CityErrors,
    AUTH: AuthErrors,
    HOTELS: HotelErrors, 
    TOURS: TourErrors,
};
