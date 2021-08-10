import { AuthService } from "./auth.service";
import { CityService } from "./city.service";
import { HotelService } from "./hotel.service";
import { TourService } from "./tour.service";
import { UserService } from "./user.service";
import { OrderService } from "./order.service";

const apiUrl = process.env.REACT_APP_API_URL;

const authService = new AuthService({ apiUrl });
const userService = new UserService({ apiUrl });
const cityService = new CityService({ apiUrl });
const tourService = new TourService({ apiUrl });
const hotelService = new HotelService({ apiUrl });
const orderService = new OrderService( { apiUrl } );

export {
    authService,
    userService,
    cityService,
    tourService,
    hotelService,
    orderService,
};