import React from 'react';
import { useParams } from 'react-router-dom';

import {
    HotelToursList,
    HotelMain,
} from './components';
import useHotel from './hooks/useHotel';
import useToursByHotel from './hooks/useToursByHotel';
import {
    AuthBar, 
    Progress,
} from '../../global/components';

const Hotel = () => {
    let { id } = useParams();
    const { 
        data: hotel,
        isFetching: isFetchingHotel, 
        error: hotelError 
    } = useHotel(id);
    const { data: tours } = useToursByHotel(id);
    const hotelJSX = hotelError ? <h1>Готель не знайдено</h1> : <>
        <HotelMain hotel={hotel} />
        <HotelToursList tours={tours} />
    </>;
    return (
        <>
            <AuthBar />
            {isFetchingHotel ? <Progress /> : hotelJSX}
        </>
    );
};

export default Hotel;