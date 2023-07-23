import { Modal } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../../../../store/reservation-slice';

import classes from './RoomRateModal.module.css';

const RoomRateModal = (props) => {
   const dispatch = useDispatch();
   const { isOpen, data: roomRatesData } = useSelector(
      (state) => state.reservation.roomRateModal[props.pageName]
   );

   let updatedRoomRatesData = roomRatesData.map((data) => ({ ...data }));

   const columns = [
      {
         headerName: 'Date',
         field: 'date',
         width: 105,
      },
      {
         headerName: 'Origin Rate',
         field: 'originPrice',
         width: 100,
      },
      {
         headerName: 'Price',
         field: 'totalPrice',
         width: 100,
         editable: true,
      },
   ];

   const onSaveRoomRatesData = (e) => {
      e.preventDefault();
      dispatch(
         reservationActions.replaceRoomRatesData({
            data: updatedRoomRatesData,
            pageName: props.pageName,
         })
      );
      dispatch(reservationActions.closeRoomRateModal(props.pageName));
   };

   const roomRateModalCloseHandler = (e) => {
      e.preventDefault();
      dispatch(reservationActions.closeRoomRateModal(props.pageName));
   };

   return (
      <Modal open={isOpen}>
         <div className={classes['room-rate-modal__wrapper']}>
            <div className={classes['room-rate-modal__button']}>
               <button onClick={roomRateModalCloseHandler}>Close</button>
               <button onClick={onSaveRoomRatesData}>Save</button>
            </div>
            <div
               className="ag-theme-alpine"
               style={{ width: '98%', height: '85%' }}
            >
               <AgGridReact
                  rowData={updatedRoomRatesData}
                  columnDefs={columns}
                  rowSelection={'single'}
                  pagination={false}
                  rowHeight={20}
               />
            </div>
         </div>
      </Modal>
   );
};
export default RoomRateModal;
