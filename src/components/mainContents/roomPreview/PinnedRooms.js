import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Rooms.module.css';
import closeIcon from '../../../assets/pic/close.png';
import { roomActions } from '../../../store/room-slice';

const PinnedRooms = (props) => {
   const dispatch = useDispatch();
   const pinnedRoomsData = useSelector((state) => state.room.pinnedRooms);

   const onRemoveFromPinnedRoomsHandler = (roomNumber) => {
      dispatch(roomActions.removeFromPinnedRooms(roomNumber));
   };

   const pinnedRooms = pinnedRoomsData.rooms.map((room) => (
      <div>
         <div className={classes['pin__button']}>
            <img
               src={closeIcon}
               alt="unpin"
               onClick={onRemoveFromPinnedRoomsHandler.bind(
                  null,
                  room.roomNumber
               )}
            />
         </div>
         <div className={classes['room__basic-info']}>
            <label className={classes['basic-info__number']}>
               {room.roomNumber}
            </label>
            <div>
               <label className={classes['basic-info__room-type']}>
                  {room.roomTypeCode}
               </label>
               <label className={classes['basic-info__room-status']}>OC</label>
            </div>
         </div>
         {room.rsvnData && (
            <>
               <div>
                  <label>{room.rsvnData.guestName}</label>
               </div>
               <div>
                  <label>{room.rsvnData.arrivalDate}</label>
                  <br />
                  <label>~ {room.rsvnData.departureDate}</label>
               </div>
            </>
         )}
      </div>
   ));
   return (
      <div className={classes['room__wrapper']}>
         {pinnedRoomsData.rooms.length > 0 &&
            pinnedRoomsData.spread &&
            pinnedRooms}
      </div>
   );
};

export default React.memo(PinnedRooms);
