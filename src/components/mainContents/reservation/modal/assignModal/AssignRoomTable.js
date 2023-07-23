import {
   forwardRef,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomsDataInOptionsForAssign } from '../../../../../store/room-actions';

import classes from './AssignRoomTable.module.css';

const AssignRoomTable = forwardRef((props, ref) => {
   const dispatch = useDispatch();
   const searchOptions = useSelector((state) => state.room.assignModal.options);
   const { assignRoomsData: roomsData } = useSelector(
      (state) => state.room.assignModal
   );

   const selectedRoomsRef = useRef(null);
   const [selectedRooms, setSelectedRooms] = useState([]);

   useEffect(() => {
      const { roomTypeCodes, startDate, endDate } = searchOptions;
      dispatch(
         getRoomsDataInOptionsForAssign({
            roomTypeCodes,
            startDate,
            endDate,
         })
      );
   }, [dispatch, searchOptions, roomsData]);

   const checkboxChangeHandler = (e) => {
      if (e.target.checked) {
         setSelectedRooms([...selectedRooms, e.target.value]);
      } else {
         setSelectedRooms(
            selectedRooms.filter((option) => option !== e.target.value)
         );
      }
   };

   useImperativeHandle(ref, () => {
      return selectedRooms;
   });

   const roomsOnList = roomsData.map((room) => (
      <tbody>
         <tr>
            <td className={classes['checkbox']}>
               <input
                  type="checkbox"
                  value={room.roomNumber}
                  checked={selectedRooms.includes(room.roomNumber.toString())}
                  onChange={checkboxChangeHandler}
               />
            </td>
            <td className={classes['room-number']}>{room.roomNumber}</td>
            <td className={classes['floor']}>{room.floorNumber}</td>
            <td className={classes['room-type']}>{room.roomTypeCode}</td>
            <td className={classes['clean-status']}>{room.cleanStatusCode}</td>
            <td className={classes['room-status']}>{room.roomStatusCode}</td>
         </tr>
      </tbody>
   ));

   return (
      <table className={classes['assign-room__table']} ref={selectedRoomsRef}>
         <thead>
            <tr>
               <th></th>
               <th>No.</th>
               <th>Floor</th>
               <th>Room T</th>
               <th>Clean</th>
               <th>Sts</th>
            </tr>
         </thead>
         {roomsOnList}
      </table>
   );
});

export default AssignRoomTable;
