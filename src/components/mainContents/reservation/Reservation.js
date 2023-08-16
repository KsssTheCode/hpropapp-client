import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getReservationsDataInFilterOptions } from '../../../store/reservation-actions';

import classes from './Reservation.module.css';
import ReservationTable from './ReservationTable';
import GroupReservationForm from './modal/group/GroupReservationForm';
import FITReservationForm from './modal/fit/FITReservationForm';

let firstRendering = true;

const initialSearchOptions = {
   arrivalStartDate: moment().format('YYYYMMDD'),
   arrivalEndDate: moment().add(30, 'days').format('YYYYMMDD'),
   statusCode: ['RR', 'CI', 'CO', 'HC'],
};

const Reservation = () => {
   const dispatch = useDispatch();
   const { isOpen: isFITModalOpen } = useSelector(
      (state) => state.reservation.FITModal.reservation
   );
   const { isOpen: isGroupModalOpen } = useSelector(
      (state) => state.reservation.groupModal.reservation
   );

   const { reservation: reservationSearchOptions } = useSelector(
      (state) => state.reservation.searchOptions
   );

   useEffect(() => {
      let searchOptions = null;
      if (firstRendering) {
         firstRendering = false;
         Object.entries(reservationSearchOptions).length > 0
            ? (searchOptions = reservationSearchOptions)
            : (searchOptions = initialSearchOptions);
         dispatch(
            getReservationsDataInFilterOptions(searchOptions, 'reservation')
         );
      } else {
         return;
      }
   }, [dispatch, reservationSearchOptions]);

   return (
      <div className={classes['reservation__wrapper']}>
         {isFITModalOpen && (
            <FITReservationForm
               isOpen={isFITModalOpen}
               pageName={'reservation'}
            />
         )}
         {isGroupModalOpen && (
            <GroupReservationForm
               isOpen={isGroupModalOpen}
               pageName={'reservation'}
            />
         )}
         <ReservationTable />
      </div>
   );
};

export default Reservation;
