import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getRoomTypeCodesData } from '../../../store/room-type-actions';
import MultiDropdown from '../../UI/MultiDropdown';

import classes from './RoomPreviewWidget.module.css';
import { getFloorsData } from '../../../store/room-actions';
import FitOrGroupSwtich from '../../UI/FitOrGroupSwitch';

const roomTypeOptions = { attributes: ['roomTypeCode', 'roomTypeName'] };
const floorOptions = { attributes: ['floorNumber'] };

const RoomPreviewWidget = () => {
   const dispatch = useDispatch();

   const roomTypeCodesData = useSelector(
      (state) => state.roomType.roomTypeCodes
   );
   const floorsData = useSelector((state) => state.room.floors);

   useEffect(() => {
      dispatch(getRoomTypeCodesData(roomTypeOptions));
      dispatch(getFloorsData(floorOptions));
   }, [dispatch]);

   // C/I available : room중에서 rsvn과 foreignKey가 없는 객실
   // Expected departure : room중에서 rsvn과 foreignKey로 연결되어있는 객실 중 departureDate가 오늘인 객실,
   // vacant : room중에서 Rsvn과 foreignKey로 연결되어있거나 맖거나 상관없이 C/I되어있지 않은 객실
   // occupied: 사람이 투숙중인 객실

   return (
      <div className={classes['widget__wrapper']}>
         <div className={classes['shortcut']}>
            <button>C/I Avil.</button>
            <button>Exp Dep</button>
            <button>Vacant</button>
            <button>Occupied</button>
         </div>
         <div>
            <MultiDropdown data={roomTypeCodesData} optionName="roomType" />
            {/* <label>Floor</label>
            <MultiDropdown data={floorsData} optionName="floor" />
            <label>Room Status</label>
            <select>
               <option>ALL</option>
               <option>VI</option>
               <option>VC</option>
               <option>VD</option>
               <option>NG</option>
               <option>OI</option>
               <option>OC</option>
               <option>OD</option>
               <hr />
               <option>OS</option>
               <option>O3</option>
            </select> */}
         </div>
         <div className={classes['filter__fit-or-group-selection']}>
            <FitOrGroupSwtich pageName="checkIn" />
         </div>
      </div>
   );
};

export default React.memo(RoomPreviewWidget);
