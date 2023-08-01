import moment from 'moment';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   editReservation,
   releaseAssignedRooms,
} from '../../../../../store/reservation-actions';
import { reservationActions } from '../../../../../store/reservation-slice';

import classes from '../fit/FITReservationForm.module.css';
// import classes from './HistoryInformation.module.css';

const HistoryInformation = forwardRef((props, ref) => {
   const dispatch = useDispatch();

   let historyState = null;
   let modalState = null;
   if (props.fitOrGroup === 'fit') {
      historyState = 'FITModalHistoryData';
      modalState = 'FITModal';
   } else if (props.fitOrGroup === 'group') {
      historyState = 'groupModalHistoryData';
      modalState = 'groupModal';
   }

   const { data: rsvnData, mode } = useSelector(
      (state) => state.reservation[modalState][props.pageName]
   );

   const { data: historyData } = useSelector(
      (state) => state.reservation[historyState]
   );

   const caller = useRef();
   const callerTel = useRef();

   useImperativeHandle(ref, () => ({
      clearFields: () => {
         caller.current.value = '';
         callerTel.current.value = '';
      },
      getFormData: () => {
         const formData = {};

         if (
            caller.current &&
            caller.current.value &&
            caller.current.value !== rsvnData?.caller
         )
            FormData.caller = caller.current.value;
         if (
            callerTel.current &&
            callerTel.current.value &&
            callerTel.current.value !== rsvnData?.callerTel
         )
            FormData.callerTel = callerTel.current.value;

         return formData;
      },
   }));

   const onClickButtonsHandler = (e) => {
      e.preventDefault();
      const id = rsvnData.rsvnId || rsvnData.groupRsvnId;
      const pageName = props.pageName;
      const fitOrGroup = props.fitOrGroup;

      let requestData = {};

      if (e.target.textContent === 'History') {
         if (historyData.length < 1) {
            alert('변경 이력이 존재하지 않습니다.');
         } else {
            dispatch(reservationActions.openHistoryModal({ fitOrGroup }));
         }
      } else {
         switch (e.target.textContent) {
            case 'Recover':
               requestData = { pageName, id, data: { statusCode: 'RR' } };
               break;
            case 'C/I':
               requestData = { pageName, id, data: { statusCode: 'CI' } };
               break;
            case 'CXL':
               requestData = { pageName, id, data: { statusCode: 'CX' } };
               break;
            case 'CXL C/I':
               requestData = {
                  pageName,
                  id,
                  data: { statusCode: 'RR', roomNumber: null },
               };
               break;
            case 'Re C/I':
               requestData = { pageName, id, data: { statusCode: 'CI' } };
               break;
            default:
         }
         dispatch(editReservation(requestData));
      }
   };

   let buttons = null;
   if (mode !== 'create') {
      switch (rsvnData.statusCode) {
         case 'CX':
            buttons = ['History', 'Recover'];
            break;
         case 'RR':
            rsvnData.roomNumber
               ? (buttons = ['History', 'C/I', 'CXL'])
               : (buttons = ['History', 'CXL']);
            break;
         case 'CI':
            rsvnData.roomNumber
               ? (buttons = ['History', 'CXL C/I'])
               : alert('객실 배정 후 입실이 가능합니다.');
            break;
         case 'HC':
         case 'CO':
            buttons = ['History', 'Re C/I'];
            break;
         default:
      }
   }

   let buttonsTag = null;
   if (buttons?.length > 0) {
      buttonsTag = buttons.map((btn) => (
         <button key={btn} onClick={onClickButtonsHandler}>
            {btn}
         </button>
      ));
   }

   let convertedData = {};
   if (mode !== 'create') {
      convertedData = {
         creator: rsvnData.createStaffId,
         createTime: moment(rsvnData.createdAt).format('YYYY-MM-DD HH:mm:ss'),
         caller: rsvnData.caller ? rsvnData.caller : null,
         callerTel: rsvnData.callerTel ? rsvnData.callerTel : null,
      };
      if (historyData?.length > 0) {
         const reducedData = historyData.reduce((obj, data, i) => {
            const { updatedReservation } = data;
            if (updatedReservation.statusCode === 'CI') {
               obj.checkInStaff = data.staffId;
               obj.checkInTime = data.updatedTime;
            }

            if (data.updatedReservation.statusCode === 'CO') {
               obj.checkOutStaff = data.staffId;
               obj.checkOutTime = data.updatedTime;
            }

            if (i === historyData.length - 1) {
               obj.updateStaff = data.staffId;
               obj.updateTime = data.updatedTime;
            }

            return obj;
         }, {});

         Object.assign(convertedData, reducedData);
      }
   }

   return (
      <div className={classes['form__create-info']}>
         <div>
            <label htmlFor="creator">Created By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.creator}
            />
         </div>
         <div>
            <label htmlFor="createTime">Create Time</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.createTime}
            />
         </div>
         <div>
            <label htmlFor="caller">Caller</label>
            <input
               ref={caller}
               type="text"
               defaultValue={convertedData?.caller}
            />
         </div>
         <div>
            <label htmlFor="callerTel">Caller Tel</label>
            <input
               ref={callerTel}
               type="text"
               defaultValue={convertedData?.callerTel}
            />
         </div>
         <div>
            <label htmlFor="checkInStaff">Check-in By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.checkInStaff}
            />
         </div>
         <div>
            <label htmlFor="checkInTime">Check-in</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.checkInTime}
            />
         </div>
         <div>
            <label htmlFor="checkOutStaff">Check-out By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.checkOutStaff}
            />
         </div>
         <div>
            <label htmlFor="checkOutTime" style={{ fontSize: '12px' }}>
               Check-out
            </label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.checkOutTime}
            />
         </div>
         <div>
            <label htmlFor="updateStaff">Updated By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.updateStaff}
            />
         </div>
         <div>
            <label htmlFor="updateTime">Updated</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={convertedData?.updateTime}
            />
         </div>
         {mode !== 'create' && (
            <div className={classes['form__third-area__buttons']}>
               {buttonsTag}
            </div>
         )}
      </div>
   );
});
export default HistoryInformation;
