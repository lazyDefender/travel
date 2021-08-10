import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reservationActions } from '../../../redux/reservation.slice'

const useTour = (id) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reservationActions.getTour(id))
    }, [dispatch, id])
    const { tour } = useSelector(state => state.reservation)
    return tour
}

export default useTour