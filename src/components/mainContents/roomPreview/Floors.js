import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Rooms from './Rooms';
import { roomActions } from '../../../store/room-slice';

import classes from './Floors.module.css';
import PinnedRooms from './PinnedRooms';

const Floors = () => {
   const dispatch = useDispatch();
   const floorsData = useSelector((state) => state.room.floors);
   const onToggleFloorHandler = (floorNumber) => {
      dispatch(roomActions.toggleFloors(floorNumber));
   };

   const onTogglePinnedRoomsHandler = () => {
      dispatch(roomActions.togglePinnedRooms());
   };

   const floors = floorsData.map((floor, i) => (
      <>
         <div
            key={i}
            className={classes['floor-label']}
            onClick={onToggleFloorHandler.bind(null, floor.floorNumber)}
         >
            <label>{floor.floorNumber}F</label>
         </div>
         {floor.spread && <Rooms floor={floor.floorNumber} />}
      </>
   ));

   return (
      <div className={classes['floor__wrapper']}>
         <div key={'pin'} className={classes['floor-label']}>
            <label onClick={onTogglePinnedRoomsHandler}>PIN</label>
         </div>
         <PinnedRooms />
         {floors}
      </div>
   );
};
export default React.memo(Floors);
