import moment from 'moment';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getReservationsDataInFilterOptions } from '../../../store/reservation-actions';

import FitOrGroupSwtich from '../../UI/FitOrGroupSwitch';

import classes from './CheckOutWidget.module.css';

const CheckOutWidget = () => {
   const dispatch = useDispatch();

   const departureStartDateRef = useRef();
   const departureEndDateRef = useRef();

   const onClickShortCutHandler = (e) => {
      e.preventDefault();
      let searchOptions = {};
      switch (e.target.innerText) {
         case 'Today E/D':
            searchOptions = {
               departureStartDate: moment().format('YYYYMMDD'),
               departureEndDate: moment().format('YYYYMMDD'),
               statusCodes: ['CI'],
            };
            break;
         case 'In House':
            searchOptions = { statusCodes: ['CI'] };
            break;
         case 'Today C/O':
            searchOptions = {
               departureStartDate: moment().format('YYYYMMDD'),
               departureEndDate: moment().format('YYYYMMDD'),
               statusCodes: ['CO'],
            };
            break;
         case 'HCO':
            searchOptions = { statusCodes: ['HC'] };
            break;
         default:
      }

      dispatch(getReservationsDataInFilterOptions(searchOptions, 'checkOut'));
   };

   const onClearFilterHandler = (e) => {
      e.preventDefault();
      departureStartDateRef.current.value = '';
      departureEndDateRef.current.value = '';
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

      dispatch(getReservationsDataInFilterOptions(searchOptions, 'checkOut'));
   };
   return (
      <form onSubmit={onSubmitSearchFormHandler}>
         <div className={classes['widget__wrapper']}>
            <div className={classes['shortcut']}>
               <button onClick={onClickShortCutHandler}>Today E/D</button>
               <button onClick={onClickShortCutHandler}>In House</button>
               <button onClick={onClickShortCutHandler}>Today C/O</button>
               <button onClick={onClickShortCutHandler}>HCO</button>
            </div>
            <div className={classes['filter']}>
               <div className={classes['filter__button']}>
                  <button type="submit">SEARCH</button>
                  <button onClick={onClearFilterHandler}>CLEAR</button>
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
