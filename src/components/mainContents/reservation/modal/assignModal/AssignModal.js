import { Modal } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomTypeCodesData } from '../../../../../store/room-type-actions';
import { roomActions } from '../../../../../store/room-slice';

import MultiDropdown from '../../../../UI/MultiDropdown';
import AssignReservationTable from './AssignReservationTable';
import AssignRoomTable from './AssignRoomTable';

import classes from './AssignModal.module.css';
import leftArrowIcon from '../../../../../assets/pic/leftArrow.png';
import rightArrowIcon from '../../../../../assets/pic/rightArrow.png';
import {
   assignRoomsToRsvns,
   releaseAssignedRooms,
} from '../../../../../store/reservation-actions';
import {
   getCleanStatusesData,
   getFloorsData,
   getRoomsDataInOptionsForAssign,
} from '../../../../../store/room-actions';
import { reservationActions } from '../../../../../store/reservation-slice';

const roomTypeOptions = { attributes: ['roomTypeCode', 'roomTypeName'] };

const AssignModal = (props) => {
   const dispatch = useDispatch();

   const roomTypeCodes = useSelector((state) => state.roomType.roomTypeCodes);
   const floors = useSelector((state) => state.room.floors);
   const cleanStatuses = useSelector((state) => state.room.cleanStatuses);

   const { isOpen: isGroupModalOpen } = useSelector(
      (state) => state.reservation.groupModal[props.pageName]
   );

   const searchOptions = useSelector((state) => state.room.assignModal.options);

   const groupReservationsData = useSelector(
      (state) => state.reservation.groupModal.detailReservations
   );

   const selectedRooms = useRef(null);
   const selectedReservations = useRef(null);

   useEffect(() => {
      dispatch(getRoomTypeCodesData(roomTypeOptions));
      dispatch(getFloorsData());
      dispatch(getCleanStatusesData());
   }, [dispatch]);

   useEffect(() => {
      const { roomTypeCodes, startDate, endDate } = searchOptions;
      dispatch(
         getRoomsDataInOptionsForAssign({
            roomTypeCodes: roomTypeCodes,
            startDate: startDate,
            endDate: endDate,
         })
      );
   }, [dispatch, searchOptions]);

   const onCloseAssignModalHandler = () => {
      dispatch(roomActions.closeAssignModal());
   };
   const assignRoomsToReservationsHandler = () => {
      const selectedRoomsData = selectedRooms.current;
      const selectedReservationsData = selectedReservations.current;
      if (selectedRoomsData.length !== selectedReservationsData.length) {
         alert('객실과 예약건의 수를 일치시켜주세요.');
         return;
      }
      dispatch(
         assignRoomsToRsvns(
            props.pageName,
            props.fitOrGroup,
            selectedReservationsData,
            selectedRoomsData
         )
      );

      if (isGroupModalOpen) {
         const idAndRoomPairs = selectedRoomsData.map((roomNumber, i) => {
            const id = selectedReservationsData[i];
            return { id, roomNumber };
         });

         dispatch(
            reservationActions.reflectRoomAssignsToGroupDetailReservationsState(
               {
                  idAndRoomPairs,
               }
            )
         );
      }
   };

   const releaseAssignedRoomsFromReservationsHandler = () => {
      const selectedReservationsData = selectedReservations.current;
      if (selectedReservationsData.length < 1) {
         alert('선택된 예약이 없습니다.');
         return;
      }

      const { roomNumber } = props.data;

      if (!roomNumber) {
         alert('선택된 예약에 배정된 객실이 없습니다');
         return;
      }

      let rooms = [];
      if (props.fitOrGroup === 'fit') {
         rooms.push(roomNumber);
      } else if (props.fitOrGroup === 'group') {
         const reservationsData = groupReservationsData.filter((rsvn) =>
            selectedReservationsData.includes(rsvn.rsvnId)
         );
         rooms = reservationsData.map((rsvn) => rsvn.rsvnId);
      }

      dispatch(
         releaseAssignedRooms(
            props.pageName,
            props.fitOrGroup,
            selectedReservationsData
         )
      );

      if (isGroupModalOpen) {
         dispatch(
            reservationActions.reflectRoomReleasesToGroupDetailReservationsState(
               {
                  selectedReservationsData,
               }
            )
         );
      }
   };

   return (
      <Modal open={props.isOpen}>
         <div className={classes['assign-modal__wrapper']}>
            <div className={classes['buttons']}>
               <button>Clear</button>
               <button>Save</button>
               <button onClick={onCloseAssignModalHandler}>Close</button>
            </div>
            <div className={classes['contents']}>
               <div className={classes['options']}>
                  <div className={classes['options__first-area']}>
                     <MultiDropdown
                        data={roomTypeCodes}
                        optionName="roomType"
                     />
                  </div>
                  <div className={classes['options__second-area']}>
                     <MultiDropdown
                        data={floors.map((f) => f.floorNumber)}
                        optionName="floor"
                     />
                  </div>
                  <div className={classes['options__third-area']}>
                     <MultiDropdown
                        data={cleanStatuses}
                        optionName="cleanStatus"
                     />
                  </div>
               </div>
               <div className={classes['assign-info']}>
                  <div className={classes['room-info']}>
                     <AssignRoomTable ref={selectedRooms} />
                  </div>
                  <div className={classes['arrow-buttons']}>
                     <div>
                        <img
                           src={rightArrowIcon}
                           alt="assign"
                           onClick={assignRoomsToReservationsHandler}
                        />
                     </div>
                     <div>
                        <img
                           src={leftArrowIcon}
                           alt="release"
                           onClick={releaseAssignedRoomsFromReservationsHandler}
                        />
                     </div>
                  </div>
                  <div className={classes['reservation-info']}>
                     <AssignReservationTable
                        pageName={props.pageName}
                        fitOrGroup={props.fitOrGroup}
                        ref={selectedReservations}
                     />
                  </div>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default AssignModal;
