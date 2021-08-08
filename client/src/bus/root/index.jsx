import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CircularProgress,
    Backdrop,
    Grid,
} from '@material-ui/core'

import AuthBar from '../../global/components/AuthBar'
import Progress from '../../global/components/Progress'
import ToursFilterForm from './components/ToursFilterForm'
import ToursList from './components/ToursList'
import ToursFilterNotFound from './components/ToursFilterNotFound'
import { toursFilterActions } from '../../redux/toursFilter.slice'

const Root = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(toursFilterActions.getCities())
    }, [dispatch])
    const { 
        isFetching: citiesFetching, 
        data: cities 
    } = useSelector(state => state.toursFilter.cities)

    const {
        isFetching: toursFetching,
        data: tours,
    } = useSelector(state => state.toursFilter.tours)

    const progressJSX = (<Backdrop open={true} >
        <CircularProgress color="inherit" />
    </Backdrop>)

    const toursListJSX = tours?.length === 0 ? 
        <ToursFilterNotFound /> :
        <ToursList tours={tours} />
    
    return citiesFetching ? <Progress /> : (
        <div>
            <AuthBar/>
            <ToursFilterForm cities={cities} />
            <Grid 
                container 
                alignItems="center" 
                justify="center"
            >
                {toursFetching ? progressJSX : toursListJSX}
            </Grid>
        </div>
    )
}

export default Root