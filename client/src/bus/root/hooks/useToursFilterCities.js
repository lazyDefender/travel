import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toursFilterActions } from '../../../redux/toursFilter.slice';

const useToursFilterCities = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toursFilterActions.getCities());
    }, [dispatch]);

    const { cities } = useSelector(state => state.toursFilter);
    return cities;
}

export default useToursFilterCities;
