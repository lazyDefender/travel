import { Errors as UserErrors} from './users/user-errors';
import { Errors as CityErrors } from './cities/city-errors';
import { Errors as AuthErrors } from './auth/auth-errors';
import { Errors as HotelErrors } from './hotels/hotel-errors';
import { Errors as TourErrors } from './tours/tour-errors';

export const errors = {
    USERS: UserErrors,
    CITIES: CityErrors,
    AUTH: AuthErrors,
    HOTELS: HotelErrors, 
    TOURS: TourErrors,
};
