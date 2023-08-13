import ControlFunctions from './ControlFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import classes from './CheckOut.module.css';
import UsageDetail from './UsageDetail';
import RoomDetail from './RoomDetail';

import { getReservationsDataInOptions } from '../../../store/reservation-actions';
import CheckOutTable from './CheckOutTable';
import FITReservationForm from '../reservation/modal/fit/FITReservationForm';

const initialSearchOptions = {
   // departureStartDate: moment().format('YYYYMMDD'),
   // departureEndDate: moment().format('YYYYMMDD'),
   statusCodes: ['CI', 'HC'],
};

let firstRendering = true;

const CheckOut = () => {
   const dispatch = useDispatch();

   const { isOpen } = useSelector(
      (state) => state.reservation.FITModal.checkOut
   );
   const { checkOut: checkOutSearchOptions } = useSelector(
      (state) => state.reservation.searchOptions
   );

   useEffect(() => {
      let searchOptions = null;
      if (firstRendering) {
         firstRendering = false;
         Object.entries(checkOutSearchOptions).length > 0
            ? (searchOptions = checkOutSearchOptions)
            : (searchOptions = initialSearchOptions);

         dispatch(getReservationsDataInOptions(searchOptions, 'checkOut'));
      } else {
         return;
      }
   }, [dispatch, checkOutSearchOptions]);

   return (
      <div className={classes['check-out__wrapper']}>
         {isOpen && <FITReservationForm isOpen={isOpen} pageName="checkOut" />}
         <div className={classes['check-out__upper-area']}>
            <div className={classes['upper-area__left']}>
               <CheckOutTable />
            </div>
            <div className={classes['upper-area__right']}>
               <RoomDetail pageName="checkOut" />
            </div>
         </div>
         <div className={classes['check-out__lower-area']}>
            <div className={classes['lower-area__left']}>
               <UsageDetail />
            </div>
            <div className={classes['lower-area__right']}>
               <ControlFunctions />
            </div>
         </div>
      </div>
   );
};

export default CheckOut;
