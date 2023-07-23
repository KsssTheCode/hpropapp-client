import moment from 'moment';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getReservationsDataByOptions } from '../../../store/reservation-actions';

import FitOrGroupSwtich from '../../UI/FitOrGroupSwitch';

import classes from './CheckOutWidget.module.css';

const CheckOutWidget = () => {
   const dispatch = useDispatch();

   const departureStartDateRef = useRef();
   const departureEndDateRef = useRef();

   const inHouseHandler = () => {
      const options = {
         statusCode: ['CI'],
      };
      dispatch(getReservationsDataByOptions(options, 'checkOut'));
   };
   const todyExpectedDepartureHandler = () => {
      const options = {
         departureStartDate: moment().format('YYYYMMDD'),
         departureEndDate: moment().format('YYYYMMDD'),
         statusCode: ['CI'],
      };
      dispatch(getReservationsDataByOptions(options, 'checkOut'));
   };
   const checkedOutHandler = () => {
      const options = {
         departureStartDate: moment().format('YYYYMMDD'),
         departureEndDate: moment().format('YYYYMMDD'),
         statusCode: ['CO'],
      };
      dispatch(getReservationsDataByOptions(options, 'checkOut'));
   };
   const holdingCheckOutHandler = () => {
      const options = {
         statusCode: ['HC'],
      };
      dispatch(getReservationsDataByOptions(options, 'checkOut'));
   };

   const onSubmitSearchFormHandler = (e) => {
      e.preventDefault();

      const searchOptions = {};
      if (departureStartDateRef.current.value)
         searchOptions.departureStartDate =
            departureStartDateRef.current.value.replace(/-/g, '');
      if (departureEndDateRef.current.value)
         searchOptions.departureEndDate =
            departureEndDateRef.current.value.replace(/-/g, '');

      dispatch(getReservationsDataByOptions(searchOptions, 'checkOut'));
   };
   return (
      <form onSubmit={onSubmitSearchFormHandler}>
         <div className={classes['widget__wrapper']}>
            <div className={classes['shortcut']}>
               <button onClick={todyExpectedDepartureHandler}>Today E/D</button>
               <button onClick={inHouseHandler}>In House</button>
               <button onClick={checkedOutHandler}>Today C/O</button>
               <button onClick={holdingCheckOutHandler}>HCO</button>
            </div>
            <div className={classes['filter']}>
               <div className={classes['filter__button']}>
                  <button type="submit">SEARCH</button>
               </div>
               <div>
                  <div>
                     <label>Check-out Date</label>
                     <div className={classes['term-options__input']}>
                        <input type="date" ref={departureStartDateRef} /> ~{' '}
                        <input type="date" ref={departureEndDateRef} />
                     </div>
                  </div>
               </div>
            </div>
            <div className={classes['filter__fit-or-group-selection']}>
               <FitOrGroupSwtich pageName="checkOut" />
            </div>
         </div>
      </form>
   );
};

export default React.memo(CheckOutWidget);
