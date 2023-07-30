import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   getReservationsDataByOptions,
   getReservationStatus,
} from '../../../store/reservation-actions';
import { reservationActions } from '../../../store/reservation-slice';
import { getRateTypeCodesData } from '../../../store/rate-type-actions';
import { getRoomTypeCodesData } from '../../../store/room-type-actions';
import { getStaffsData } from '../../../store/staff-actions';
// import { getMembershipsData } from '../../../store/membership-actions';

import FitOrGroupSwtich from '../../UI/FitOrGroupSwitch';
import MultiDropdown from '../../UI/MultiDropdown';

import classes from './CheckInWidget.module.css';

const roomTypeOptions = { attributes: ['roomTypeCode', 'roomTypeName'] };
const rateTypeOptions = { attributes: ['rateTypeCode'] };
const staffOptions = { attributes: ['name', 'staffId'] };
// const membershipOptions = { attributes: ['membershipName'] };

const CheckInWidget = () => {
   const dispatch = useDispatch();

   const keywordRef = useRef();
   const createStartDateRef = useRef();
   const createEndDateRef = useRef();
   const arrivalStartDateRef = useRef();
   const arrivalEndDateRef = useRef();
   const departureStartDateRef = useRef();
   const departureEndDateRef = useRef();

   const [selectedRateTypeCodes, setSelectedRateTypeCodes] = useState([]);
   const [selectedRoomTypeCodes, setSelectedRoomTypeCodes] = useState([]);
   const [selectedStatuses, setSelectedStatuses] = useState([]);
   // const [selectedMemberships, setSelectedMemberships] = useState([]);
   const [selectedCreateStaffs, setSelectedCreateStaffs] = useState([]);
   const [selectedCheckInStaffs, setSelectedCheckInStaffs] = useState([]);
   const [selectedCheckOutStaffs, setSelectedCheckOutStaffs] = useState([]);

   const rateTypeCodes = useSelector((state) => state.rateType.rateTypeCodes);
   const roomTypeCodes = useSelector((state) => state.roomType.roomTypeCodes);
   const statuses = useSelector((state) => state.reservation.reservationStatus);
   const staffs = useSelector((state) => state.staff.staffs);
   // const memberships = useSelector((state) => state.membership.memberships);

   useEffect(() => {
      dispatch(getRateTypeCodesData(rateTypeOptions));
      dispatch(getRoomTypeCodesData(roomTypeOptions));
      dispatch(getStaffsData(staffOptions));
      // dispatch(getMembershipsData(membershipOptions));
      dispatch(getReservationStatus());
   }, [dispatch]);

   const today = moment().format('YYYYMMDD');

   const onSelectChangeHandler = (selectedOptions, optionName) => {
      switch (optionName) {
         case 'rateTypeCodes':
            setSelectedRateTypeCodes(selectedOptions);
            break;
         case 'roomTypeCodes':
            setSelectedRoomTypeCodes(selectedOptions);
            break;
         case 'status':
            setSelectedStatuses(selectedOptions);
            break;
         // case 'memberships':
         //    setSelectedMemberships(selectedOptions);
         //    break;
         case 'createStaff':
            setSelectedCreateStaffs(selectedOptions);
            break;
         case 'checkInStaff':
            setSelectedCheckInStaffs(selectedOptions);
            break;
         case 'checkOutStaff':
            setSelectedCheckOutStaffs(selectedOptions);
            break;
         default:
            break;
      }
   };

   const onSubmitSearchFormHandler = (e) => {
      e.preventDefault();

      const searchOptions = {};
      if (keywordRef.current.value)
         searchOptions.keyword = keywordRef.current.value;
      if (createStartDateRef.current.value)
         searchOptions.createStartDate =
            createStartDateRef.current.value.replace(/-/g, '');
      if (createEndDateRef.current.value)
         searchOptions.createEndDate = createEndDateRef.current.value.replace(
            /-/g,
            ''
         );
      if (arrivalStartDateRef.current.value)
         searchOptions.arrivalStartDate =
            arrivalStartDateRef.current.value.replace(/-/g, '');
      if (arrivalEndDateRef.current.value)
         searchOptions.arrivalEndDate = arrivalEndDateRef.current.value.replace(
            /-/g,
            ''
         );
      if (departureStartDateRef.current.value)
         searchOptions.departureStartDate =
            departureStartDateRef.current.value.replace(/-/g, '');
      if (departureEndDateRef.current.value)
         searchOptions.departureEndDate =
            departureEndDateRef.current.value.replace(/-/g, '');
      if (selectedRateTypeCodes.length > 0)
         searchOptions.rateTypeCodes = selectedRateTypeCodes.map(
            (d) => d.value
         );
      if (selectedRoomTypeCodes.length > 0)
         searchOptions.roomTypeCodes = selectedRoomTypeCodes.map(
            (d) => d.value
         );
      if (selectedStatuses.length > 0)
         searchOptions.statusCodes = selectedStatuses.map((d) => d.value);
      if (selectedCreateStaffs.length > 0)
         searchOptions.createStaffs = selectedRateTypeCodes.map((d) => d.value);
      if (selectedCheckInStaffs.length > 0)
         searchOptions.checkInStaffs = selectedCheckInStaffs.map(
            (d) => d.value
         );
      if (selectedCheckOutStaffs.length > 0)
         searchOptions.checkOutStaffs = selectedCheckOutStaffs.map(
            (d) => d.value
         );

      dispatch(
         getReservationsDataByOptions({ searchOptions, pageName: 'checkIn' })
      );
   };

   const todayExpectedArrivalHandler = (e) => {
      e.preventDefault();
      const searchOptions = {
         arrivalStartDate: today,
         arrivalEndDate: today,
      };
      dispatch(
         getReservationsDataByOptions({ searchOptions, pageName: 'checkIn' })
      );
   };

   const todayExpectedCheckOutHandler = (e) => {
      e.preventDefault();
      const searchOptions = {
         departureStartDate: today,
         departureEndDate: today,
         status: ['CI'],
      };
      dispatch(
         getReservationsDataByOptions({ searchOptions, pageName: 'checkIn' })
      );
   };

   const todayExpectedCheckInHandler = (e) => {
      e.preventDefault();
      const searchOptions = {
         arrivalStartDate: today,
         arrivalEndDate: today,
         status: ['RR'],
      };
      dispatch(
         getReservationsDataByOptions({ searchOptions, pageName: 'checkIn' })
      );
   };

   const stayingHandler = (e) => {
      e.preventDefault();
      const searchOptions = {
         status: ['CI'],
      };
      dispatch(
         getReservationsDataByOptions({ searchOptions, pageName: 'checkIn' })
      );
   };

   const onClearFormHandler = (e) => {
      e.preventDefault();

      keywordRef.current.value = '';
      createStartDateRef.current.value = '';
      createEndDateRef.current.value = '';
      arrivalStartDateRef.current.value = '';
      arrivalEndDateRef.current.value = '';
      departureStartDateRef.current.value = '';
      departureEndDateRef.current.value = '';

      dispatch(
         reservationActions.replaceFitOrGroupFilter({
            value: 'fit',
            pageName: 'checkIn',
         })
      );
   };

   return (
      <form onSubmit={onSubmitSearchFormHandler}>
         <div className={classes['widget__wrapper']}>
            <div className={classes['shortcut']}>
               <button onClick={todayExpectedArrivalHandler}>Today Arr</button>
               <button onClick={stayingHandler}>Stay</button>
               <button onClick={todayExpectedCheckInHandler}>Today C/I</button>
               <button onClick={todayExpectedCheckOutHandler}>Today C/O</button>
            </div>
            <div className={classes['filter']}>
               <div className={classes['filter__button']}>
                  <button onClick={onClearFormHandler}>CLEAR</button>
                  <button type="submit">SEARCH</button>
               </div>
               <div className={classes['filter__search']}>
                  <input
                     type="text"
                     ref={keywordRef}
                     placeholder="Insert Keyword"
                  />
               </div>
               <div className={classes['filter__term-options']}>
                  <div>
                     <label>Create Date</label>
                     <div className={classes['term-options__input']}>
                        <input type="date" ref={createStartDateRef} /> ~{' '}
                        <input type="date" ref={createEndDateRef} />
                     </div>
                  </div>
                  <div>
                     <label>Arrival Date</label>
                     <div className={classes['term-options__input']}>
                        <input type="date" ref={arrivalStartDateRef} /> ~{' '}
                        <input type="date" ref={arrivalEndDateRef} />
                     </div>
                  </div>
                  <div>
                     <label>Departure Date</label>
                     <div className={classes['term-options__input']}>
                        <input type="date" ref={departureStartDateRef} /> ~{' '}
                        <input type="date" ref={departureEndDateRef} />
                     </div>
                  </div>
               </div>
               <div className={classes['filter__multi-dropdown']}>
                  <MultiDropdown
                     data={rateTypeCodes}
                     optionName="rateTypeCodes"
                     onSelectChange={onSelectChangeHandler}
                  />
                  <MultiDropdown
                     data={roomTypeCodes}
                     optionName="roomTypeCodes"
                     onSelectChange={onSelectChangeHandler}
                  />
                  <MultiDropdown
                     data={statuses}
                     optionName="status"
                     onSelectChange={onSelectChangeHandler}
                  />
                  {/* <MultiDropdown
                     data={memberships}
                     optionName="memberships"
                     onSelectChange={onSelectChangeHandler}
                  /> */}
                  <MultiDropdown
                     data={staffs}
                     optionName="createStaff"
                     onSelectChange={onSelectChangeHandler}
                  />
                  <MultiDropdown
                     data={staffs}
                     optionName="checkInStaff"
                     onSelectChange={onSelectChangeHandler}
                  />
                  <MultiDropdown
                     data={staffs}
                     optionName="checkOutStaff"
                     onSelectChange={onSelectChangeHandler}
                  />
               </div>
            </div>
            <div className={classes['filter__fit-or-group-selection']}>
               <FitOrGroupSwtich pageName="checkIn" />
            </div>
         </div>
      </form>
   );
};

export default CheckInWidget;
