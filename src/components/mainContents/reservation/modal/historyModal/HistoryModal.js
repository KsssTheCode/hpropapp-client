import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../../../../store/reservation-slice';

import classes from './HistoryModal.module.css';

const HistoryModal = (props) => {
   const dispatch = useDispatch();

   let historyState = null;
   if (props.fitOrGroup === 'fit') {
      historyState = 'FITModalHistoryData';
   } else if (props.fitOrGroup === 'group') {
      historyState = 'groupModalHistoryData';
   }
   const { data: historyData } = useSelector(
      (state) => state.reservation[historyState]
   );

   const exceptProperties = [
      'rsvnId',
      'groupRsvnId',
      'createdAt',
      'updatedAt',
      'deletedAt',
   ];
   const historysList = historyData.map((data, i) => {
      const { updatedProperties, updatedReservation, staffId, updatedTime } =
         data;
      let historyMessage = '';
      Object.keys(updatedProperties).forEach((prop) => {
         if (!exceptProperties.includes(prop)) {
            if (!historyMessage) {
               historyMessage = `${prop} : "${updatedProperties[prop]}" >> "${
                  updatedReservation[prop] ? updatedReservation[prop] : '    '
               }"`;
            } else {
               historyMessage += `/ ${prop} : "${
                  updatedProperties[prop]
               }" >> "${
                  updatedReservation[prop] ? updatedReservation[prop] : '    '
               }"`;
            }
         }
      });
      return (
         <tr>
            <td key="number">{i + 1}</td>
            <td key="message">{historyMessage}</td>
            <td key="staffId">{staffId}</td>
            <td key="updatedTime">{updatedTime}</td>
         </tr>
      );
   });

   const onCloseHistoryModalHandler = () => {
      dispatch(
         reservationActions.closeHistoryModal({ fitOrGroup: props.fitOrGroup })
      );
   };
   return (
      <Modal open={props.isOpen}>
         <div className={classes['history-modal__wrapper']}>
            <div className={classes['close-button']}>
               <button onClick={onCloseHistoryModalHandler}>Close</button>
            </div>
            <div className={classes['contents-table']}>
               <table>
                  <thead>
                     <tr>
                        <th
                           className={classes['contents-table__number']}
                           key="number"
                        >
                           No.
                        </th>
                        <th
                           className={classes['contents-table__contents']}
                           key="message"
                        >
                           History
                        </th>
                        <th
                           className={classes['contents-table__editor']}
                           key="staffId"
                        >
                           Editor
                        </th>
                        <th
                           className={classes['contents-table__time']}
                           key="updatedTime"
                        >
                           Time
                        </th>
                     </tr>
                  </thead>
                  <tbody>{historysList}</tbody>
               </table>
            </div>
         </div>
      </Modal>
   );
};

export default HistoryModal;
