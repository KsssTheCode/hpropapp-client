import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../../../../store/reservation-slice';

import classes from './HistoryModal.module.css';

const HistoryModal = (props) => {
   const dispatch = useDispatch();

   let modal = null;
   if (props.fitOrGroup === 'fit') modal = 'FITModal';
   if (props.fitOrGroup === 'group') modal = 'groupModal';
   const { changeHistory } = useSelector(
      (state) => state.reservation[modal][props.pageName].data
   );

   const historyData = changeHistory.map((jsonString) =>
      JSON.parse(jsonString)
   );
   const historysList = historyData.map((history, i) => (
      <tr>
         <td>{i + 1}</td>
         <td>{history.historyMessage}</td>
         <td>{history.editor}</td>
         <td>{history.updateTime}</td>
      </tr>
   ));

   const onCloseHistoryModalHandler = () => {
      dispatch(reservationActions.closeHistoryModal());
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
                        <th className={classes['contents-table__number']}>
                           No.
                        </th>
                        <th className={classes['contents-table__contents']}>
                           History
                        </th>
                        <th className={classes['contents-table__editor']}>
                           Editor
                        </th>
                        <th className={classes['contents-table__time']}>
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
