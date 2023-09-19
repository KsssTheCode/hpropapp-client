import { useRef, useState, useEffect } from 'react';

import moment from 'moment';
import {
   createReservation,
   editReservation,
   openDetailModal,
   releaseAssignedRooms,
} from '../../../../../store/reservation-actions';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../../../../store/reservation-slice';

import RoomRateModal from './RoomRateModal';
import RoomRateTable from './RoomRateTable';
import ServiceRateTable from './ServiceRateTable';
import HistoryInformation from '../historyModal/HistoryInformation';

import classes from './FITReservationForm.module.css';
import plusIcon from '../../../../../assets/pic/plus.png';
import HistoryModal from '../historyModal/HistoryModal';
import searchIcon from '../../../../../assets/pic/search.png';
import { roomActions } from '../../../../../store/room-slice';
import AssignModal from '../assignModal/AssignModal';
import { Modal } from '@mui/material';
import { getDefaultRoomRatesData } from '../../../../../store/room-actions';

const FITReservationForm = (props) => {
   const dispatch = useDispatch();
   const roomTypeCodes = useSelector((state) => state.roomType.roomTypeCodes);
   const rateTypeCodes = useSelector((state) => state.rateType.rateTypeCodes);
   const { mode, data } = useSelector(
      (state) => state.reservation.FITModal[props.pageName]
   );

   const { isOpen: isRoomRateModalOpen, data: roomRatesData } = useSelector(
      (state) => state.reservation.roomRateModal[props.pageName]
   );

   const { isOpen: isGroupModalOpen } = useSelector(
      (state) => state.reservation.groupModal[props.pageName]
   );

   const { isOpen: isHistoryModalOpen } = useSelector(
      (state) => state.reservation.FITModalHistoryData
   );

   const isAssignModalOpen = useSelector(
      (state) => state.room.assignModal.isOpen
   );

   const [isConditionForRoomRateReady, setIsConditionForRoomRateReady] =
      useState(true);
   const [isRoomAssignConditionFit, setIsRoomAssignConditionFit] =
      useState(true);
   const [isRoomTypeCodeFit, setIsRoomTypeCodeFit] = useState(true);
   const [isRateTypeCodeFit, setIsRateTypeCodeFit] = useState(true);
   const [isArrivalDateFit, setIsArrivalDateFit] = useState(true);
   const [isDepartureDateFit, setIsDepartrueDateFit] = useState(true);
   const [isDateConditionFit, setIsDateConditionFit] = useState(true);

   const [previousRoomTypeCode, setPreviousRoomTypeCode] = useState(
      mode !== 'create' ? data.roomTypeCode : null
   );
   const [previousRateTypeCode, setPreviousRateTypeCode] = useState(
      mode !== 'create' ? data.rateTypeCode : null
   );
   const [previousArrivalDate, setPreviousArrivalDate] = useState(
      mode !== 'create' ? data.arrivalDate : null
   );
   const [previousDepartureDate, setPreviousDepartureDate] = useState(
      mode !== 'create' ? data.departureDate : null
   );
   const [nights, setNights] = useState('');
   const isFirstRender = useRef(true);

   const guestName = useRef(null);
   const account = useRef(null);
   const group = useRef(null);
   const arrivalDate = useRef(null);
   const arrivalTime = useRef(null);
   const departureDate = useRef(null);
   const departureTime = useRef(null);
   const roomTypeCode = useRef(null);
   const rateTypeCode = useRef(null);
   const nationality = useRef(null);
   const people = useRef(null);
   const tel1 = useRef(null);
   const tel2 = useRef(null);
   const email = useRef(null);
   const reference = useRef(null);
   const callerAndCallerTel = useRef(null);

   let roomRateTotalAmount = 0;
   if (roomRatesData)
      roomRateTotalAmount = roomRatesData.reduce(
         (total, data) => +total + +data.totalPrice,
         0
      );

   useEffect(() => {
      if (data) {
         const arrDate = moment(data.arrivalDate, 'YYYYMMDD');
         const depDate = moment(data.departureDate, 'YYYYMMDD');
         setNights(depDate.diff(arrDate, 'days'));
      }
   }, [data]);

   useEffect(() => {
      if (mode === 'create') {
         setIsRoomAssignConditionFit(false);
         setIsRoomTypeCodeFit(false);
         setIsRateTypeCodeFit(false);
         setIsArrivalDateFit(false);
         setIsDepartrueDateFit(false);
         setIsDateConditionFit(false);
         setIsConditionForRoomRateReady(false);
      }
   }, [mode]);

   const onRoomTypeCodeBlurHandler = () => {
      if (previousRoomTypeCode === roomTypeCode.current.value)
         setIsRoomTypeCodeFit(true);

      if (
         !roomTypeCodes.some(
            (roomType) => roomType.roomTypeCode === roomTypeCode.current.value
         )
      ) {
         if (roomTypeCode.current.value) {
            alert('존재하지 않는 객실 유형입니다.');
            roomTypeCode.current.value = '';
         }
         setPreviousRoomTypeCode(roomTypeCode.current.value);
         setIsRoomTypeCodeFit(false);
      } else {
         setPreviousRoomTypeCode(roomTypeCode.current.value);
         setIsRoomTypeCodeFit(true);
      }
   };
   const onRoomTypeCodeChangeHandler = () => {
      dispatch(
         reservationActions.replaceRoomRatesData({
            pageName: props.pageName,
            data: null,
         })
      );
      setIsRoomTypeCodeFit(false);
   };

   const onRateTypeCodeBlurHandler = () => {
      if (data && !!data.GroupReservation) {
         setIsRateTypeCodeFit(true);
         return;
      }

      if (previousRateTypeCode === rateTypeCode.current.value)
         setIsRateTypeCodeFit(true);
      if (
         !rateTypeCodes.some(
            (rateType) => rateType.rateTypeCode === rateTypeCode.current.value
         )
      ) {
         alert('존재하지 않는 요금 유형입니다.');
         rateTypeCode.current.value = '';
      } else {
         setPreviousRateTypeCode(rateTypeCode.current.value);
         setIsRateTypeCodeFit(true);
      }
   };

   const onRateTypeCodeChangeHandler = () => {
      dispatch(
         reservationActions.replaceRoomRatesData({
            pageName: props.pageName,
            data: null,
         })
      );
      setIsRateTypeCodeFit(false);
   };

   const dateRegex =
      /^(?:(?:19|20)\d\d)(?:(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01]))$/;
   const onArrivalDateBlurHandler = () => {
      if (previousArrivalDate === arrivalDate.current.value)
         setIsArrivalDateFit(true);
      if (!dateRegex.test(arrivalDate.current.value)) {
         setIsArrivalDateFit(false);
         if (arrivalDate.current.value === '') return;
         alert('날짜형식에 어긋납니다.\n(20230101 형식으로 입력해주세요.)');
         arrivalDate.current.value = '';
      } else {
         setPreviousArrivalDate(arrivalDate.current.value);
         setIsArrivalDateFit(true);
      }
   };
   const onArrivalDateChangeHandler = () => {
      dispatch(
         reservationActions.replaceRoomRatesData({
            pageName: props.pageName,
            data: null,
         })
      );
      setIsArrivalDateFit(false);
      setIsDateConditionFit(false);
   };
   const onDepartureDateBlurHandler = () => {
      if (previousDepartureDate === departureDate.current.value)
         setIsDepartrueDateFit(true);
      if (!dateRegex.test(departureDate.current.value)) {
         setIsDepartrueDateFit(false);
         if (departureDate.current.value === '') return;
         alert('날짜형식에 어긋납니다.\n(20230101 형식으로 입력해주세요.)');
         departureDate.current.value = '';
      } else {
         setPreviousDepartureDate(departureDate.current.value);
         setIsDepartrueDateFit(true);
      }
   };
   const onDepartureDateChangeHandler = () => {
      dispatch(
         reservationActions.replaceRoomRatesData({
            pageName: props.pageName,
            data: null,
         })
      );
      setIsDepartrueDateFit(false);
      setIsDateConditionFit(false);
   };

   useEffect(() => {
      if (isArrivalDateFit && isDepartureDateFit) {
         if (+arrivalDate.current?.value > +departureDate.current?.value) {
            setIsDateConditionFit(false);
            alert('투숙 시작일이 투숙 종료일보다 늦을 수 없습니다.');
            arrivalDate.current.value = '';
            departureDate.current.value = '';
         } else {
            setIsDateConditionFit(true);
            setNights(() => {
               const arrDate = moment(arrivalDate.current?.value, 'YYYYMMDD');
               const depDate = moment(departureDate.current?.value, 'YYYYMMDD');
               return depDate.diff(arrDate, 'days');
            });
         }
      }
   }, [
      mode,
      isArrivalDateFit,
      isDepartureDateFit,
      previousArrivalDate,
      previousDepartureDate,
   ]);

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (isDateConditionFit && isRoomTypeCodeFit) {
         setIsRoomAssignConditionFit(true);
         if (isRateTypeCodeFit) {
            dispatch(
               getDefaultRoomRatesData(props.pageName, {
                  roomTypeCode: roomTypeCode.current.value,
                  rateTypeCode: rateTypeCode.current.value,
                  startDate: arrivalDate.current.value,
                  endDate: moment(departureDate.current.value, 'YYYYMMDD')
                     .subtract(1, 'days')
                     .format('YYYYMMDD'),
               })
            );
            setIsConditionForRoomRateReady(true);
         } else {
            dispatch(
               reservationActions.replaceRoomRatesData({
                  pageName: props.pageName,
                  data: null,
               })
            );
            setIsConditionForRoomRateReady(false);
         }
      } else {
         setIsRoomAssignConditionFit(false);
         if (mode !== 'create' && data?.roomNumber) {
            dispatch(
               releaseAssignedRooms(props.pageName, 'fit', [data?.rsvnId])
            );
         }
      }
   }, [
      dispatch,
      mode,
      isDateConditionFit,
      isRoomTypeCodeFit,
      isRateTypeCodeFit,
      props.pageName,
      data?.rsvnId,
   ]);

   const roomRateModalOpenHandler = (e) => {
      e.preventDefault();
      dispatch(reservationActions.openRoomRateModal(props.pageName));
   };

   const onCloseModalHandler = (e) => {
      e.preventDefault();
      dispatch(reservationActions.closeFITModal({ pageName: props.pageName }));
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
      const formData = {};
      if (
         guestName.current &&
         guestName.current.value &&
         guestName.current.value !== data?.guestName
      )
         formData.guestName = guestName.current.value;
      if (
         account.current &&
         account.current.value &&
         account.current.value !== data?.account
      )
         formData.account = account.current.value;
      if (
         arrivalDate.current &&
         arrivalDate.current.value &&
         +arrivalDate.current.value !== data?.arrivalDate
      )
         formData.arrivalDate = arrivalDate.current.value;
      if (
         arrivalTime.current &&
         arrivalTime.current.value &&
         arrivalTime.current.value !== data?.arrivalTime
      )
         formData.arrivalTime = arrivalTime.current.value;
      if (
         departureDate.current &&
         departureDate.current.value &&
         +departureDate.current.value !== data?.departureDate
      )
         formData.departureDate = departureDate.current.value;
      if (
         departureTime.current &&
         departureTime.current.value &&
         departureTime.current.value !== data?.departureTime
      )
         formData.departureTime = departureTime.current.value;
      if (
         roomTypeCode.current &&
         roomTypeCode.current.value &&
         roomTypeCode.current.value !== data?.roomTypeCode
      )
         formData.roomTypeCode = roomTypeCode.current.value;
      if (
         rateTypeCode.current &&
         rateTypeCode.current.value &&
         rateTypeCode.current.value !== data?.rateTypeCode
      )
         formData.rateTypeCode = rateTypeCode.current.value;
      if (
         nationality.current &&
         nationality.current.value &&
         nationality.current.value !== data?.nationality
      )
         formData.nationality = nationality.current.value;
      if (
         people.current &&
         people.current.value &&
         people.current.value !== data?.people
      )
         formData.people = people.current.value;
      if (
         tel1.current &&
         tel1.current.value &&
         tel1.current.value !== data?.tel1
      )
         formData.tel1 = tel1.current.value;
      if (
         tel2.current &&
         tel2.current.value &&
         tel2.current.value !== data?.tel2
      )
         formData.tel2 = tel2.current.value;
      if (
         email.current &&
         email.current.value &&
         email.current.value !== data?.email
      )
         formData.email = email.current.value;
      if (
         reference.current &&
         reference.current.value &&
         reference.current.value !== data?.reference
      )
         formData.reference = reference.current.value;

      // const callerAndCallerTelData = callerAndCallerTel.current.getFormData();

      // if (callerAndCallerTelData.caller)
      //    formData.caller = callerAndCallerTel.caller;
      // if (callerAndCallerTelData.callerTel)
      //    formData.Tel = callerAndCallerTel.callerTel;

      return formData;
   };

   const onSaveReservationHandler = async () => {
      const formData = getFormData();
      const { arrivalDate, departureDate, roomTypeCode, rateTypeCode } =
         formData;
      if (arrivalDate || departureDate || roomTypeCode || rateTypeCode) {
         formData.roomRatesData = roomRatesData;
      }

      formData.dailyRatesData = roomRatesData.map((data) => {
         return { price: data.totalPrice, date: data.date };
      });
      formData.id = data.rsvnId;
      dispatch(editReservation(props.pageName, data.rsvnId, formData));

      if (isGroupModalOpen) {
         dispatch(
            reservationActions.reflectDetailReservationChangeToGroup({
               id: data.rsvnId,
               changeData: formData,
            })
         );
      }
      dispatch(openDetailModal(data.rsvnId, props.pageName));
   };

   const onCreateReservationHandler = async () => {
      const dailyRatesData = roomRatesData.map((data) => {
         return {
            date: data.date,
            price: data.totalPrice,
         };
      });

      const formData = getFormData();
      formData.dailyRatesData = dailyRatesData;

      dispatch(createReservation(formData, 'fit', props.pageName));
   };

   const onOpenAssignRoomHandler = () => {
      dispatch(
         roomActions.replaceAssignModalSearchOption({
            id: data.rsvnId,
            roomTypeCodes: roomTypeCode.current && roomTypeCode.current.value,
            startDate: arrivalDate.current && arrivalDate.current.value,
            endDate: departureDate.current && departureDate.current.value,
         })
      );
      dispatch(roomActions.openAssignModal());
   };

   return (
      <Modal open={props.isOpen}>
         <div className={classes['fit-create-modal__wrapper']}>
            {isHistoryModalOpen && (
               <HistoryModal
                  isOpen={isHistoryModalOpen}
                  fitOrGroup="fit"
                  pageName={props.pageName}
               />
            )}
            {isAssignModalOpen && (
               <AssignModal
                  isOpen={isAssignModalOpen}
                  pageName={props.pageName}
                  data={data}
                  fitOrGroup="fit"
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
                        onBlur={onArrivalDateBlurHandler}
                        onChange={onArrivalDateChangeHandler}
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
                        defaultValue={
                           mode !== 'create' ? data.departureDate : ''
                        }
                        onBlur={onDepartureDateBlurHandler}
                        onChange={onDepartureDateChangeHandler}
                     />
                     <label htmlFor="depTime" style={{ marginLeft: '8px' }}>
                        Dep Time
                     </label>
                     <input
                        type="text"
                        ref={departureTime}
                        defaultValue={
                           mode !== 'create' ? data.departureTime : ''
                        }
                        style={{ width: '35px' }}
                     />
                     <label htmlFor="nights">Nts</label>
                     <input
                        type="text"
                        defaultValue={
                           nights
                              ? nights.toString()
                              : mode !== 'create'
                              ? data.nights
                              : ''
                        }
                        readOnly
                     />
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
                           onBlur={onRoomTypeCodeBlurHandler}
                           onChange={onRoomTypeCodeChangeHandler}
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
                           onBlur={onRateTypeCodeBlurHandler}
                           onChange={onRateTypeCodeChangeHandler}
                        />
                     </div>
                  </div>
                  <div className={classes['first-area__triple-input']}>
                     <div className={classes['roomNumber']}>
                        <label>Room</label>
                        <input
                           type="text"
                           value={
                              mode !== 'create'
                                 ? data.roomNumber
                                    ? data.roomNumber
                                    : ''
                                 : ''
                           }
                           readOnly
                        ></input>
                        {isRoomAssignConditionFit &&
                           data?.statusCode === 'RR' && (
                              <img
                                 src={searchIcon}
                                 alt="assign"
                                 onClick={onOpenAssignRoomHandler}
                              />
                           )}
                     </div>
                     <div className={classes['nationality']}>
                        <label htmlFor="nationality">&nbsp;Nationality</label>
                        <input
                           type="text"
                           ref={nationality}
                           defaultValue={
                              mode !== 'create' ? data.nationality : ''
                           }
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
                        {isConditionForRoomRateReady && (
                           <RoomRateTable
                              pageName={props.pageName}
                              roomTypeCode={
                                 roomTypeCode.current &&
                                 roomTypeCode.current.value
                              }
                              rateTypeCode={
                                 rateTypeCode.current &&
                                 rateTypeCode.current.value
                              }
                           />
                        )}
                     </div>
                     {isRoomRateModalOpen && (
                        <RoomRateModal
                           open={isRoomRateModalOpen}
                           pageName={props.pageName}
                           roomTypeCode={roomTypeCode.current.value}
                           rateTypeCode={rateTypeCode.current.value}
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
                  ref={callerAndCallerTel}
                  pageName={props.pageName}
                  fitOrGroup="fit"
               />
            </form>
         </div>
      </Modal>
   );
};

export default FITReservationForm;
