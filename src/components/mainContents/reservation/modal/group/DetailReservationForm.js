import moment from 'moment';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupDetailRsvns } from '../../../../../store/reservation-actions';
import classes from './GroupReservationForm.module.css';

const DetailReservationForm = (props) => {
   const dispatch = useDispatch();

   const { data: groupReservationData, mode } = useSelector(
      (state) => state.reservation.groupModal[props.pageName]
   );

   const detailFormRefs = {
      arrivalDate: useRef(),
      departureDate: useRef(),
      roomTypeCode: useRef(),
      numberOfGuests: useRef(),
      rooms: useRef(),
      roomRate: useRef(),
   };

   const onClearDetailReservationFormHandler = (e) => {
      if (mode === 'create') alertToCreateGroupReservationFirst(e);
      for (const key in detailFormRefs) {
         const r = detailFormRefs[key];
         if (r.current && r.current.value) r.current.value = '';
      }
   };

   const onAddDetailReservationHandler = (e) => {
      e.preventDefault();
      if (mode === 'create') alertToCreateGroupReservationFirst(e);

      const formData = {};
      for (const key in detailFormRefs) {
         const r = detailFormRefs[key];
         if (r.current && r.current.value) formData[key] = r.current.value;
      }

      const dateArray = [];
      let currentDate = moment(formData.arrivalDate);

      while (currentDate <= moment(formData.departureDate)) {
         dateArray.push(currentDate.format('YYYYMMDD'));
         currentDate = currentDate.add(1, 'day');
      }

      const dailyRatesData = dateArray.map((date) => {
         return {
            date,
            price: formData.roomRate,
         };
      });

      formData.dailyRatesData = dailyRatesData;
      dispatch(
         createGroupDetailRsvns(
            props.pageName,
            groupReservationData.groupRsvnId,
            formData
         )
      );
      onClearDetailReservationFormHandler();
   };

   const onDeleteSelectedDetailReservations = (e) => {
      // if(mode === 'create') alertToCreateGroupReservationFirst(e);
      // dispatch(deleteDetailReservations(selectedRsvns));
   };

   const alertToCreateGroupReservationFirst = (e) => {
      if (mode === 'create') {
         alert('그룹예약을 먼저 생성하세요.');
         e.target.blur();
      }
   };

   return (
      <div className={classes['form__lower-area__left']}>
         <div>
            <label>*Arr Date</label>
            <input
               type="text"
               style={{ width: '80px', marginLeft: '12px' }}
               ref={detailFormRefs.arrivalDate}
               defaultValue={props.information.arrivalDate}
               onFocus={alertToCreateGroupReservationFirst}
            />
         </div>
         <div>
            <label>*Dep Date</label>
            <input
               type="text"
               style={{ width: '80px' }}
               ref={detailFormRefs.departureDate}
               defaultValue={props.information.departureDate}
               onFocus={alertToCreateGroupReservationFirst}
            />
            <label style={{ marginLeft: '5px' }}>Nts</label>
            <input type="text" style={{ width: '15px' }} />
         </div>
         <div>
            <label>*Room Type</label>
            <input
               type="text"
               ref={detailFormRefs.roomTypeCode}
               defaultValue={props.information.roomTypeCode}
               onFocus={alertToCreateGroupReservationFirst}
            />
         </div>
         <div>
            <label>*Rooms</label>
            <input type="text" ref={detailFormRefs.rooms} />
            <label style={{ marginLeft: '14px' }}>*People</label>
            <input
               type="text"
               style={{ width: '15px' }}
               ref={detailFormRefs.numberOfGuests}
               defaultValue={props.information.numberOfGuests || 2}
               onFocus={alertToCreateGroupReservationFirst}
            />
         </div>
         <div>
            <label>*Room Rate</label>
            <input
               type="text"
               ref={detailFormRefs.roomRate}
               defaultValue={props.information.roomRate}
               onFocus={alertToCreateGroupReservationFirst}
            />
         </div>
         <div>
            <label>&nbsp;Service Rate</label>
            <input
               type="text"
               readOnly
               style={{ backgroundColor: 'lightgray' }}
               onFocus={alertToCreateGroupReservationFirst}
            />
         </div>
         <div>
            <button onClick={onClearDetailReservationFormHandler}>New</button>
            <button onClick={onAddDetailReservationHandler}>Add</button>
            <button onClick={onDeleteSelectedDetailReservations}>Delete</button>
         </div>
      </div>
   );
};
export default DetailReservationForm;
