import React from 'react';
import { useParams } from 'react-router-dom';

import HotelsToursList from './components/HotelToursList';
import HotelMain from './components/HotelMain';
import useHotel from './hooks/useHotel';
import useToursByHotel from './hooks/useToursByHotel';
import AuthBar from '../../global/components/AuthBar';
import Progress from '../../global/components/Progress';


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
        <HotelsToursList tours={tours} />
    </>;
    return (
        <>
            <AuthBar />
            {isFetchingHotel ? <Progress /> : hotelJSX}
        </>
    );
};

export default Hotel;