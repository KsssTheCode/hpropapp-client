import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   editReservation,
   openDetailModal,
} from '../../../store/reservation-actions';
import classes from './RoomDetail.module.css';

const RoomDetail = (props) => {
   const dispatch = useDispatch();
   const data = useSelector((state) => state.reservation.checkOutDetail);

   const [nights, setNights] = useState('');

   useEffect(() => {
      if (Object.keys(data).length !== 0) {
         const arrDate = moment(data.arrivalDate, 'YYYYMMDD');
         const depDate = moment(data.departureDate, 'YYYYMMDD');
         setNights(String(depDate.diff(arrDate, 'days') + 1));
      }
   }, [data]);

   const onOpenDetailReservationHandler = () => {
      dispatch(openDetailModal({ id: data.id, pageName: 'checkOut' }));
   };

   const holdingCheckOutReservationHandler = () => {
      dispatch(
         editReservation({
            pageName: props.pageName,
            id: data.id,
            data: { statusCode: 'HC' },
         })
      );
   };

   const checkOutReservationHandler = () => {
      dispatch(
         editReservation({
            pageName: props.pageName,
            id: data.id,
            data: { statusCode: 'CO' },
         })
      );
   };
   return (
      <div className={classes['room-info__wrapper']}>
         <div className={classes['basic-info']}>
            <div>
               <label>{data.roomNumber || 'Room No'}</label>
            </div>
            <div>
               <label>{data.name}</label>
               <label>{data.rsvnId || data.groupRsvnId}</label>
            </div>
         </div>
         <div className={classes['detail-info']}>
            <div className={classes['double-items']}>
               <div>
                  <label>Rsvn No.</label>
                  <input
                     type="text"
                     style={{ width: '45%' }}
                     value={data.id}
                     readOnly
                  />
               </div>
               <div>
                  <label>Room Type</label>
                  <input
                     type="text"
                     style={{ width: '35%' }}
                     value={data.roomTypeCode}
                     readOnly
                  />
               </div>
            </div>
            <div>
               <label>Stay</label>
               <input
                  type="text"
                  style={{ width: '25%' }}
                  value={data.arrivalDate}
                  readOnly
               />
               &nbsp;~&nbsp;
               <input
                  type="text"
                  style={{ width: '25%' }}
                  value={data.departureDate}
                  readOnly
               />
               <label style={{ marginLeft: '5%' }}>Nts</label>
               <input
                  type="text"
                  style={{ width: '7%' }}
                  value={nights}
                  readOnly
               />
            </div>
            <div>
               <label>Account</label>
               <input
                  type="text"
                  value={data.accountName}
                  style={{ width: '30%' }}
                  readOnly
               />
               <input
                  type="text"
                  value={data.accountId}
                  style={{ width: '30%', marginLeft: '2%' }}
                  readOnly
               />
            </div>
            <div>
               <label>Group</label>
               <input
                  type="text"
                  style={{ width: '30%' }}
                  value={data.groupName}
                  readOnly
               />
               <input
                  type="text"
                  style={{ width: '30%', marginLeft: '2%' }}
                  value={data.groupId}
                  readOnly
               />
            </div>
            <div>
               <label>Deposit</label>
               <input
                  type="text"
                  value={data.deopsitId}
                  style={{ width: '30%' }}
                  readOnly
               />
            </div>
            <div className={classes['double-items']}>
               <div>
                  <label style={{ fontSize: '13px' }}>Balance</label>
                  <input
                     type="text"
                     style={{ width: '40%' }}
                     value={data.balance}
                     readOnly
                  />
               </div>
               <div>
                  <label style={{ fontSize: '13px' }}>Service Rate</label>
                  <input
                     type="text"
                     value={data.serviceRate}
                     style={{ width: '40%' }}
                     readOnly
                  />
               </div>
            </div>
            <div className={classes['double-items']}>
               <div>
                  <label>Tel1</label>
                  <input
                     type="text"
                     style={{ width: '65%' }}
                     value={data.tel1}
                     readOnly
                  />
               </div>
               <div>
                  <label>Tel2</label>
                  <input
                     type="text"
                     style={{ width: '65%' }}
                     value={data.tel2}
                     readOnly
                  />
               </div>
            </div>
            <div>
               <label>Reference</label>
               <input
                  type="reference"
                  style={{ width: '73%' }}
                  value={data.reference}
                  readOnly
               />
            </div>
         </div>
         {data && (
            <div className={classes['control-button']}>
               <button onClick={onOpenDetailReservationHandler}>
                  Open Detail
               </button>
               <button onClick={holdingCheckOutReservationHandler}>
                  Holding C/O
               </button>
               <button onClick={checkOutReservationHandler}>Check-Out</button>
            </div>
         )}
      </div>
   );
};

export default RoomDetail;
