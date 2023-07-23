import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Rooms.module.css';
import pinIcon from '../../../assets/pic/pin.png';
import { roomActions } from '../../../store/room-slice';

const Rooms = (props) => {
   const dispatch = useDispatch();
   const rooms = useSelector((state) =>
      state.room.rooms.filter((room) => room.floorNumber === props.floor)
   );

   const onAddToPinnedRoomsHandler = (roomNumber) => {
      dispatch(roomActions.addToPinnedRooms(roomNumber));
   };

   return (
      <div className={classes['room__wrapper']}>
         {rooms.map((room) => (
            <div>
               <div className={classes['room-info']}>
                  <label className={classes['room-info__number']}>
                     {room.roomNumber}
                  </label>
                  <div>
                     <label className={classes['room-info__room-type']}>
                        {room.roomTypeCode}
                     </label>
                     <label className={classes['room-info__room-status']}>
                        OC
                     </label>
                  </div>
               </div>
               {room.rsvnData && (
                  <div className={classes['guest-info']}>
                     <div>
                        <label>{room.rsvnData.guestName}</label>
                     </div>
                     <div>
                        <label>{room.rsvnData.arrivalDate}</label>
                        <br />
                        <label>~ {room.rsvnData.departureDate}</label>
                     </div>
                  </div>
               )}
               <div className={classes['room__buttons']}>
                  <img
                     src={pinIcon}
                     alt="pin"
                     onClick={onAddToPinnedRoomsHandler.bind(
                        null,
                        room.roomNumber
                     )}
                  />
               </div>
            </div>
         ))}
      </div>
   );
};
export default React.memo(Rooms);
