import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getReservationsDataByOptions } from '../../../store/reservation-actions';

import classes from './Reservation.module.css';
import ReservationTable from './ReservationTable';
import GroupReservationForm from './modal/group/GroupReservationForm';
import FITReservationForm from './modal/fit/FITReservationForm';

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

   useEffect(() => {
      dispatch(
         getReservationsDataByOptions(initialSearchOptions, 'reservation')
      );
   }, [dispatch]);

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

export default React.memo(Reservation);
