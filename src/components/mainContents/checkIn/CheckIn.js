import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationsDataByOptions } from '../../../store/reservation-actions';
import FITReservationForm from '../reservation/modal/fit/FITReservationForm';
import GroupReservationForm from '../reservation/modal/group/GroupReservationForm';

import classes from './CheckIn.module.css';

import CheckInTable from './CheckInTable';

let firstRendering = true;

const initialSearchOptions = {
   arrivalStartDate: moment().format('YYYYMMDD'),
   arrivalEndDate: moment().format('YYYYMMDD'),
   statusCode: ['RR', 'CI'],
};

const CheckIn = () => {
   const dispatch = useDispatch();
   const { isOpen: isFITModalOpen } = useSelector(
      (state) => state.reservation.FITModal.checkIn
   );
   const { isOpen: isGroupModalOpen } = useSelector(
      (state) => state.reservation.groupModal.checkIn
   );

   useEffect(() => {
      if (firstRendering) {
         firstRendering = false;
         dispatch(
            getReservationsDataByOptions({
               searchOptions: initialSearchOptions,
               pageName: 'checkIn',
            })
         );
      } else {
         return;
      }
   }, [dispatch]);

   return (
      <div className={classes['checkin__wrapper']}>
         {isFITModalOpen && (
            <FITReservationForm isOpen={isFITModalOpen} pageName={'checkIn'} />
         )}
         {isGroupModalOpen && (
            <GroupReservationForm
               isOpen={isGroupModalOpen}
               pageName={'checkIn'}
            />
         )}
         <CheckInTable pageName="checkIn" />
      </div>
   );
};

export default React.memo(CheckIn);
