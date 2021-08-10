import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ordersActions } from '../../../redux/orders.slice'


const useOrdersByUser = (userId) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ordersActions.getByUser(userId))
    }, [dispatch, userId])
    const orders = useSelector(state => state.orders)
    return orders
}

export default useOrdersByUser