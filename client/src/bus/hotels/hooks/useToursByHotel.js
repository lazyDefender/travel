import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hotelActions } from '../../../redux/hotel.slice'

const useToursByHotel = (hotelId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(hotelActions.getTours(hotelId))
    }, [dispatch, hotelId])

    const { tours } = useSelector(state => state.hotel)
    return tours
}

export default useToursByHotel