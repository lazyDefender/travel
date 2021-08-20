import React from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import { Book } from '../../../common/enums/book';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '32px',
    paddingBottom: '32px',
  },
}));

export const HotelToursList = ({ tours }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Тривалість</TableCell>
              <TableCell align="center">За 1 дорослого</TableCell>
              <TableCell align="center">За 1 дитину</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                  <TableCell align="center">{tour.duration} ночей</TableCell>
                  <TableCell align="center">{tour.adultPrice}$</TableCell>
                  <TableCell align="center">{tour.kidPrice}$</TableCell>
                  <TableCell align="center">
                    <Button color="primary" variant="contained">
                      <Link to={`${Book.RESERVATION}?tourId=${encodeURIComponent(tour.id)}`}>
                          Забронювати
                      </Link>
                    </Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
