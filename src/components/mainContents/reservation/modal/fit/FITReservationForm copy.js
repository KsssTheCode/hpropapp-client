import { useRef, memo, useState, useEffect } from 'react';

import moment from 'moment';
import {
   createReservation,
   editReservation,
   getRoomRatesData,
} from '../../../../../store/reservation-actions';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../../../../store/reservation-slice';

import RoomRateModal from './RoomRateModal';
import RoomRateTable from './RoomRateTable';
import ServiceRateTable from './ServiceRateTable';
import HistoryInformation from '../historyModal/HistoryInformation';

import classes from './FITReservationForm.module.css';
import plusIcon from '../../../../../assets/pic/plus.png';
import HistoryModal from '../../HistoryModal';
import searchIcon from '../../../../../assets/pic/search.png';
import { roomActions } from '../../../../../store/room-slice';
import AssignModal from '../assignModal/AssignModal';

const FITReservationForm = (props) => {
   const dispatch = useDispatch();

   const roomTypeCodes = useSelector((state) => state.roomType.roomTypeCodes);
   const rateTypeCodes = useSelector((state) => state.rateType.rateTypeCodes);
   const { mode, data } = useSelector(
      (state) => state.reservation.modal[props.pageName]
   );
   const { isOpen: isRoomRateModalOpen, data: roomRatesData } = useSelector(
      (state) => state.reservation.roomRateModal[props.pageName]
   );
   const isHistoryModalOpen = useSelector(
      (state) => state.reservation.isHistoryModalOpen
   );
   const isAssignModalOpen = useSelector(
      (state) => state.room.assignModal.isOpen
   );

   const [isConditionForRoomRateReady, setIsConditionForRoomRateReady] =
      useState(true);

   const guestName = useRef();
   const account = useRef();
   const group = useRef();
   const arrivalDate = useRef();
   const arrivalTime = useRef();
   const departureDate = useRef();
   const departureTime = useRef();
   const nights = useRef();
   const roomTypeCode = useRef();
   const rateTypeCode = useRef();
   const roomNumber = useRef();
   const nationality = useRef();
   const people = useRef();
   const tel1 = useRef();
   const tel2 = useRef();
   const email = useRef();
   const reference = useRef();
   const caller = useRef();
   const callerTel = useRef();

   let roomRateTotalAmount = 0;
   if (roomRatesData)
      roomRateTotalAmount = roomRatesData.reduce(
         (total, data) => +total + +data.totalPrice,
         0
      );

   useEffect(() => {
      const arrDate = moment(arrivalDate.current.value, 'YYYYMMDD');
      const depDate = moment(departureDate.current.value, 'YYYYMMDD');
      console.log(depDate.diff(arrDate, 'days'));
      nights.current.value = depDate.diff(arrDate, 'days');
   }, [arrivalDate, departureDate]);

   const roomRateModalOpenHandler = (e) => {
      e.preventDefault();
      dispatch(reservationActions.openRoomRateModal(props.pageName));
   };

   const getRoomRateHandler = () => {
      const dateRegex =
         /^(?:(?:19|20)\d\d)(?:(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01]))$/;
      console.log(
         data.arrivalDate !== +arrivalDate.current.value ||
            data.departureDate !== +departureDate.current.value ||
            data.roomTypeCode !== roomTypeCode.current.value ||
            data.rateTypeCode !== rateTypeCode.current.value
      );

      const arr = arrivalDate.current.value;
      const dep = departureDate.current.value;
      const roomT = roomTypeCode.current.value;
      const rateT = rateTypeCode.current.value;
      if (
         dateRegex.test(arr) &&
         dateRegex.test(dep) &&
         +arr <= +dep &&
         roomTypeCodes.some((roomType) => roomType.roomTypeCode === roomT) &&
         rateTypeCodes.some((rateType) => rateType.rateTypeCode === rateT)
      ) {
         if (
            data.arrivalDate !== +arrivalDate.current.value ||
            data.departureDate !== +departureDate.current.value ||
            data.roomTypeCode !== roomTypeCode.current.value ||
            data.rateTypeCode !== rateTypeCode.current.value
         ) {
            const endDate = moment(dep, 'YYYYMMDD')
               .subtract(1, 'days')
               .format('YYYYMMDD');

            dispatch(
               getRoomRatesData({
                  pageName: props.pageName,
                  indexes: {
                     roomTypeCode: roomTypeCode.current.value,
                     rateTypeCode: rateTypeCode.current.value,
                     startDate: arr,
                     endDate,
                  },
               })
            );
            setIsConditionForRoomRateReady(true);

            const arrDate = moment(arr, 'YYYYMMDD');
            const depDate = moment(dep, 'YYYYMMDD');
            nights.current.value = depDate.diff(arrDate, 'days');
            roomNumber.current.value = '';
         }
      } else {
         dispatch(
            reservationActions.replaceRoomRatesData({
               pageName: props.pageName,
               data: null,
            })
         );
         setIsConditionForRoomRateReady(false);
      }
   };

   const onCloseModalHandler = (e) => {
      e.preventDefault();
      dispatch(reservationActions.closeModal({ pageName: props.pageName }));
   };

   const onSetNewCreateFormHandler = () => {
      dispatch(
         reservationActions.setNewCreateModal({
            fitOrGroup: 'fit',
         })
      );
      dispatch(
         reservationActions.replaceRoomRatesData({
            pageName: props.pageName,
            data: null,
         })
      );
   };

   const getFormData = () => {
      return {
         ...(guestName.current &&
         guestName.current.value &&
         guestName.current.value !== data.guestName
            ? {
                 guestName: guestName.current.value,
              }
            : {}),
         ...(account.current &&
         account.current.value &&
         account.current.value !== data.account
            ? {
                 account: account.current.value,
              }
            : {}),
         // ...(!!data.GroupReservation.groupRsvnId && group.current.value !== data.GroupReservation.groupRsvnId
         //    ? {
         //         groupRsvnId: group.current.value,
         //      }
         //    : {}),
         ...(arrivalDate.current &&
         arrivalDate.current.value &&
         +arrivalDate.current.value !== data.arrivalDate
            ? {
                 arrivalDate: arrivalDate.current.value,
              }
            : {}),
         ...(arrivalTime.current &&
         arrivalTime.current.value &&
         arrivalTime.current.value !== data.arrivalTime
            ? {
                 arrivalTime: arrivalTime.current.value,
              }
            : {}),
         ...(departureDate.current &&
         departureDate.current.value &&
         +departureDate.current.value !== data.departureDate
            ? {
                 departureDate: departureDate.current.value,
              }
            : {}),
         ...(departureTime.current &&
         departureTime.current.value &&
         departureTime.current.value !== data.departureTime
            ? {
                 departureTime: departureTime.current.value,
              }
            : {}),
         ...(roomTypeCode.current &&
         roomTypeCode.current.value &&
         roomTypeCode.current.value !== data.roomTypeCode
            ? {
                 roomTypeCode: roomTypeCode.current.value,
              }
            : {}),
         ...(rateTypeCode.current &&
         rateTypeCode.current.value &&
         rateTypeCode.current.value !== data.rateTypeCode
            ? {
                 rateTypeCode: rateTypeCode.current.value,
              }
            : {}),
         ...(roomNumber.current &&
         roomNumber.current.value &&
         roomNumber.current.value !== data.roomNumber
            ? {
                 roomNumber: roomNumber.current.value,
              }
            : {}),
         ...(nationality.current &&
         nationality.current.value &&
         nationality.current.value !== data.nationality
            ? {
                 nationality: nationality.current.value,
              }
            : {}),
         ...(people.current &&
         people.current.value &&
         +people.current.value !== data.numberOfGuests
            ? {
                 numberOfGuests: people.current.value,
              }
            : {}),
         ...(tel1.current &&
         tel1.current.value &&
         tel1.current.value !== data.tel1
            ? {
                 tel1: tel1.current.value,
              }
            : {}),
         ...(tel2.current &&
         tel2.current.value &&
         tel2.current.value !== data.tel2
            ? {
                 tel2: tel2.current.value,
              }
            : {}),
         ...(email.current &&
         email.current.value &&
         email.current.value !== data.email
            ? {
                 email: email.current.value,
              }
            : {}),
         ...(reference.current &&
         reference.current.value &&
         reference.current.value !== data.reference
            ? {
                 reference: reference.current.value,
              }
            : {}),
         ...(caller.current &&
         caller.current.value &&
         caller.current.value !== data.caller
            ? {
                 caller: caller.current.value,
              }
            : {}),
         ...(callerTel.current &&
         callerTel.current.value &&
         callerTel.current.value !== data.callerTel
            ? {
                 callerTel: callerTel.current.value,
              }
            : {}),
      };
   };

   const onSaveReservationHandler = async () => {
      const formData = getFormData();
      const { arrivalDate, departureDate, roomTypeCode, rateTypeCode } =
         formData;
      if (arrivalDate || departureDate || roomTypeCode || rateTypeCode) {
         formData.roomRatesData = roomRatesData;
      }
      await editReservation(props.pageName, data.rsvnId, formData, dispatch);
   };

   const onCreateReservationHandler = async () => {
      if (!roomRatesData) return;
      const dailyRatesData = roomRatesData.map((data) => {
         return {
            date: data.date,
            price: data.totalPrice,
         };
      });

      const formData = getFormData();
      formData.dailyRatesData = dailyRatesData;

      createReservation({
         createFormData: formData,
         fitOrGroup: 'fit',
         pageName: props.pageName,
      });
      // dispatch(reservationActions.closeModal({ pageName: props.pageName }));
      // window.location.reload();
   };

   const onRoomRateChangedHandler = () => {
      return;
   };

   const onAssignRoomHandler = () => {
      dispatch(roomActions.openAssignModal());
   };

   return (
      <div className={classes['fit-create-modal__wrapper']}>
         {isHistoryModalOpen && (
            <HistoryModal
               isOpen={isHistoryModalOpen}
               data={data.changeHistory}
            />
         )}
         {isAssignModalOpen && (
            <AssignModal
               isOpen={isAssignModalOpen}
               pageName={props.pageName}
               fitOrGroup="fit"
               rsvnId={data.rsvnId}
               roomTypeCode={roomTypeCode.current && roomTypeCode.current.value}
               rateTypeCode={rateTypeCode.current && rateTypeCode.current.value}
               startDate={arrivalDate.current && arrivalDate.current.value}
               endDate={departureDate.current && departureDate.current.value}
            />
         )}
         <div className={classes['fit-create-modal__buttons']}>
            <button onClick={onCloseModalHandler}>Close</button>
            {mode !== 'create' ? (
               <button onClick={onSaveReservationHandler}>Save</button>
            ) : (
               <button onClick={onCreateReservationHandler}>Create</button>
            )}
            {props.pageName === 'reservation' && (
               <button onClick={onSetNewCreateFormHandler}>New</button>
            )}
         </div>
         <form className={classes['fit-create-modal__form']}>
            <div className={classes['form__first-area']}>
               <div className={classes['guest-name']}>
                  <label htmlFor="name">*Guest Name</label>
                  <input
                     type="text"
                     ref={guestName}
                     defaultValue={mode !== 'create' ? data.guestName : ''}
                  />
                  <input
                     type="text"
                     placeholder="Geust No."
                     readOnly
                     onFocus={(e) => e.target.blur()}
                     defaultValue={
                        mode !== 'create'
                           ? data.Member
                              ? data.Member.memberId
                              : ''
                           : ''
                     }
                  />
               </div>
               <div className={classes['account']}>
                  <label htmlFor="account">*Account</label>
                  <input
                     type="text"
                     ref={account}
                     defaultValue={mode !== 'create' ? data.account : ''}
                  />
                  <input
                     type="text"
                     placeholder="Account No."
                     readOnly
                     onFocus={(e) => e.target.blur()}
                  />
               </div>
               <div className={classes['group-name']}>
                  <label htmlFor="group">&nbsp;Group</label>
                  <input
                     type="text"
                     ref={group}
                     defaultValue={
                        mode !== 'create'
                           ? data.GroupReservation
                              ? data.GroupReservation.groupName
                              : ''
                           : ''
                     }
                  />
                  <input
                     type="text"
                     placeholder="Group No."
                     readOnly
                     onFocus={(e) => e.target.blur()}
                     defaultValue={
                        mode !== 'create'
                           ? data.GroupReservation
                              ? data.GroupReservation.groupRsvnId
                              : ''
                           : ''
                     }
                  />
               </div>
               <div className={classes['arrival']}>
                  <label htmlFor="arrDate">*Arr Date</label>
                  <input
                     type="text"
                     ref={arrivalDate}
                     defaultValue={mode !== 'create' ? data.arrivalDate : ''}
                     onBlur={getRoomRateHandler}
                  />
                  <label htmlFor="arrTime" style={{ marginLeft: '10px' }}>
                     Arr Time
                  </label>
                  <input
                     type="text"
                     ref={arrivalTime}
                     defaultValue={mode !== 'create' ? data.arrivalTime : ''}
                  />
               </div>
               <div className={classes['departure']}>
                  <label htmlFor="depDate">*Dep Date</label>
                  <input
                     type="text"
                     ref={departureDate}
                     defaultValue={mode !== 'create' ? data.departureDate : ''}
                     onBlur={getRoomRateHandler}
                  />
                  <label htmlFor="depTime" style={{ marginLeft: '8px' }}>
                     Dep Time
                  </label>
                  <input
                     type="text"
                     ref={departureTime}
                     defaultValue={mode !== 'create' ? data.departureTime : ''}
                     style={{ width: '35px' }}
                  />
                  <label htmlFor="nights">Nts</label>
                  <input type="text" ref={nights} readOnly />
               </div>
               <div className={classes['first-area__double-input']}>
                  <div className={classes['room-type']}>
                     <label htmlFor="roomType">*Room Type</label>
                     <input
                        type="text"
                        ref={roomTypeCode}
                        defaultValue={
                           mode !== 'create' ? data.roomTypeCode : ''
                        }
                        onBlur={getRoomRateHandler}
                     />
                  </div>
                  <div className={classes['rate-type']}>
                     <label htmlFor="rateType">*Rate Type</label>
                     <input
                        type="text"
                        ref={rateTypeCode}
                        readOnly={data && !!data.GroupReservation}
                        defaultValue={
                           mode !== 'create' ? data.rateTypeCode : ''
                        }
                        onBlur={getRoomRateHandler}
                     />
                  </div>
               </div>
               <div className={classes['first-area__triple-input']}>
                  <div className={classes['roomNumber']}>
                     <label>Room</label>
                     <input
                        type="text"
                        ref={roomNumber}
                        defaultValue={mode !== 'create' ? data.roomNumber : ''}
                     ></input>
                     <img
                        src={searchIcon}
                        alt="assign"
                        onClick={onAssignRoomHandler}
                     />
                  </div>
                  <div className={classes['nationality']}>
                     <label htmlFor="nationality">&nbsp;Nationality</label>
                     <input
                        type="text"
                        ref={nationality}
                        defaultValue={mode !== 'create' ? data.nationality : ''}
                     />
                  </div>
                  <div className={classes['people']}>
                     <label htmlFor="people">&nbsp;People</label>
                     <input
                        type="text"
                        ref={people}
                        defaultValue={
                           mode !== 'create' ? data.numberOfGuests : ''
                        }
                     />
                  </div>
               </div>
               <div className={classes['first-area__double-input']}>
                  <div className={classes['tel1']}>
                     <label htmlFor="tel1">&nbsp;Tel 1</label>
                     <input
                        type="text"
                        ref={tel1}
                        defaultValue={mode !== 'create' ? data.tel1 : ''}
                     />
                  </div>
                  <div className={classes['tel2']}>
                     <label htmlFor="tel2">&nbsp;Tel 2</label>
                     <input
                        type="text"
                        ref={tel2}
                        defaultValue={mode !== 'create' ? data.tel2 : ''}
                     />
                  </div>
               </div>
               <div className={classes['e-mail']}>
                  <label htmlFor="email">&nbsp;E-mail</label>
                  <input
                     type="text"
                     ref={email}
                     defaultValue={mode !== 'create' ? data.email : ''}
                  />
               </div>
               <div className={classes['reference']}>
                  <label htmlFor="reference">&nbsp;Reference</label>
                  <input
                     type="text"
                     ref={reference}
                     defaultValue={mode !== 'create' ? data.reference : ''}
                  />
               </div>
            </div>
            <div className={classes['form__second-area']}>
               <div className={classes['deposit']}>
                  <label htmlFor="deposit">DP No.</label>
                  <input type="text" />
               </div>
               <div className={classes['room-rate']}>
                  <div style={{ marginBottom: '5px' }}>
                     <label htmlFor="roomRate">Room Rate</label>
                     <input
                        type="text"
                        value={roomRateTotalAmount}
                        readOnly
                        onFocus={(e) => e.target.blur()}
                     />
                     {isConditionForRoomRateReady && (
                        <button onClick={roomRateModalOpenHandler}>
                           <img src={plusIcon} alt="detail" />
                        </button>
                     )}
                  </div>
                  <div>
                     <RoomRateTable
                        pageName={props.pageName}
                        roomTypeCode={
                           roomTypeCode.current && roomTypeCode.current.value
                        }
                        rateTypeCode={
                           rateTypeCode.current && rateTypeCode.current.value
                        }
                     />
                  </div>
                  {isRoomRateModalOpen && (
                     <RoomRateModal
                        open={isRoomRateModalOpen}
                        pageName={props.pageName}
                        roomTypeCode={roomTypeCode.current.value}
                        rateTypeCode={rateTypeCode.current.value}
                        onRoomRateChanged={onRoomRateChangedHandler}
                     />
                  )}
               </div>
               <div className={classes['service-rate']}>
                  <div style={{ marginBottom: '5px' }}>
                     <label htmlFor="serviceRate">Service Rate</label>
                     <input
                        type="text"
                        readOnly
                        onFocus={(e) => e.target.blur()}
                     />
                     <button>
                        <img src={plusIcon} alt="detail" />
                     </button>
                  </div>
                  <ServiceRateTable />
               </div>
               <div className={classes['total-amount']}>
                  <label htmlFor="totalAmount">Total Amount</label>
                  <input
                     type="text"
                     readOnly
                     onFocus={(e) => e.target.blur()}
                  />
               </div>
            </div>
            <HistoryInformation
               ref={{ caller, callerTel }}
               pageName={props.pageName}
            />
         </form>
      </div>
   );
};

export default memo(FITReservationForm);
