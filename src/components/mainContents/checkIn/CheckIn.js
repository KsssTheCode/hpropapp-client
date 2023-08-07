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
   const { checkIn: checkInSearchOptions } = useSelector(
      (state) => state.reservation.searchOptions
   );

   useEffect(() => {
      let searchOptions = null;
      if (firstRendering) {
         firstRendering = false;
         checkInSearchOptions
            ? (searchOptions = checkInSearchOptions)
            : (searchOptions = initialSearchOptions);

         dispatch(
            getReservationsDataByOptions({
               searchOptions,
               pageName: 'checkIn',
            })
         );
      } else {
         return;
      }
   }, [dispatch, checkInSearchOptions]);

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
