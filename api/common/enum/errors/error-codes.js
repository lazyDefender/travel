const UserErrorCodes = require('./users/user-error-codes');
const CityErrorCodes = require('./cities/city-error-codes');
const AuthErrorCodes = require('./auth/auth-error-codes');
const HotelErrorCodes = require('./hotels/hotel-error-codes');

const errorCodes = {
    USERS: UserErrorCodes,
    CITIES: CityErrorCodes,
    AUTH: AuthErrorCodes,
    HOTELS: HotelErrorCodes,
};

module.exports = errorCodes;