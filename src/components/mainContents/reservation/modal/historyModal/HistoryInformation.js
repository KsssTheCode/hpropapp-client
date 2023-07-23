import moment from 'moment';
import {
   forwardRef,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editReservation } from '../../../../../store/reservation-actions';
import { reservationActions } from '../../../../../store/reservation-slice';

import classes from '../fit/FITReservationForm.module.css';
// import classes from './HistoryInformation.module.css';

const HistoryInformation = forwardRef((props, ref) => {
   const dispatch = useDispatch();

   const { data: FITData, mode: FITMode } = useSelector(
      (state) => state.reservation.FITModal[props.pageName]
   );

   const { data: groupData, mode: groupMode } = useSelector(
      (state) => state.reservation.groupModal[props.pageName]
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
            caller.current.value !== data?.caller
         )
            FormData.caller = caller.current.value;
         if (
            callerTel.current &&
            callerTel.current.value &&
            callerTel.current.value !== data?.callerTel
         )
            FormData.callerTel = callerTel.current.value;

         return formData;
      },
   }));

   const [data, setData] = useState();
   const [mode, setMode] = useState();
   const [historyInformations, setHistoryInformations] = useState();

   useEffect(() => {
      const { pageName, fitOrGroup } = props;
      if (fitOrGroup === 'fit') {
         setData(FITData);
         setHistoryInformations(
            FITData?.changeHistory.map((history) => JSON.parse(history))
         );
         if (pageName === 'reservation') {
            setMode(FITMode);
         }
      } else if (fitOrGroup === 'group') {
         setData(groupData);
         setHistoryInformations(
            groupData?.changeHistory.map((history) => JSON.parse(history))
         );
         if (pageName === 'reservation') {
            setMode(groupMode);
         }
      }
   }, [FITData, groupData, FITMode, groupMode, props]);

   const onClickButtonsHandler = (e) => {
      e.preventDefault();
      const id = data.rsvnId || data.groupRsvnId;
      switch (e.target.textContent) {
         case 'History':
            if (data.changeHistory.length < 1) {
               alert('변경된 이력이 존재하지 않습니다.');
            } else {
               dispatch(reservationActions.openHistoryModal());
            }
            break;
         case 'Recover':
            dispatch(
               editReservation({
                  pageName: props.pageName,
                  id,
                  data: { statusCode: 'RR' },
               })
            );
            break;
         case 'C/I':
            dispatch(
               editReservation({
                  pageName: props.pageName,
                  id,
                  data: { statusCode: 'CI' },
               })
            );
            break;
         case 'CXL':
            dispatch(
               editReservation({
                  pageName: props.pageName,
                  id,
                  data: { statusCode: 'CX' },
               })
            );
            break;
         case 'CXL C/I':
            dispatch(
               editReservation({
                  pageName: props.pageName,
                  id,
                  data: { statusCode: 'RR' },
               })
            );
            break;
         case 'Re C/I':
            dispatch(
               editReservation({
                  pageName: props.pageName,
                  id,
                  data: { statusCode: 'CI' },
               })
            );
            break;
         default:
      }
   };

   let buttons = [];
   if (data) {
      switch (data.statusCode) {
         case 'CX':
            buttons = ['History', 'Recover'];
            break;
         case 'RR':
            buttons = ['History', 'C/I', 'CXL'];
            break;
         case 'CI':
            buttons = ['History', 'CXL C/I'];
            break;
         case 'HC':
         case 'CO':
            buttons = ['History', 'Re C/I'];
            break;
         default:
      }
   }
   const buttonsTag = buttons.map((btn) => (
      <button key={btn} onClick={onClickButtonsHandler}>
         {btn}
      </button>
   ));

   return (
      <div className={classes['form__create-info']}>
         <div>
            <label htmlFor="creator">Created By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               value={data && data.createStaffId}
            />
         </div>
         <div>
            <label htmlFor="createdTime">Created</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               defaultValue={
                  data && moment(data.createdAt).format('YYYY/MM/DD HH:mm:ss')
               }
            />
         </div>
         <div>
            <label htmlFor="caller">Caller</label>
            <input
               defaultValue={data && data.caller}
               ref={caller}
               type="text"
            />
         </div>
         <div>
            <label htmlFor="callerTel">Caller Tel</label>
            <input
               defaultValue={data && data.callerTel}
               ref={callerTel}
               type="text"
            />
         </div>
         <div>
            <label htmlFor="checkInStaff">Check-in By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
            />
         </div>
         <div>
            <label htmlFor="checkInTime">Check-in</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
            />
         </div>
         <div>
            <label htmlFor="checkOutStaff">Check-out By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
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
            />
         </div>
         <div>
            <label htmlFor="updateStaff">Updated By</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               defaultValue={
                  data && historyInformations.length > 0
                     ? historyInformations[historyInformations.length - 1]
                          .editor
                     : ''
               }
            />
         </div>
         <div>
            <label htmlFor="updateTime">Updated</label>
            <input
               type="text"
               readOnly
               className={classes['read-only-item']}
               onFocus={(e) => e.target.blur()}
               defaultValue={
                  data && historyInformations.length > 0
                     ? historyInformations[historyInformations.length - 1]
                          .updateTime
                     : ''
               }
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
