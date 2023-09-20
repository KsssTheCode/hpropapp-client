import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './AssignReservationTable.module.css';

const AssignReservationTable = forwardRef((props, ref) => {
   //그룹이랑 개인이랑 나눠야됌
   const reservationData = useSelector(
      (state) => state.reservation.FITModal[props.pageName].data
   );

   const groupReservationsData = useSelector(
      (state) => state.reservation.groupModal[props.pageName].detailReservations
   );

   const selectedReservationsRef = useRef(null);
   const [selectedReservations, setSelectedReservations] = useState([]);

   let data = [];
   if (props.fitOrGroup === 'fit') {
      data = [reservationData];
   } else if (props.fitOrGroup === 'group') {
      data = groupReservationsData.map((rsvn) => rsvn);
   }

   const checkboxChangeHandler = (e) => {
      if (e.target.checked) {
         setSelectedReservations([...selectedReservations, e.target.value]);
      } else {
         setSelectedReservations(
            selectedReservations.filter((option) => option !== e.target.value)
         );
      }
   };
   useImperativeHandle(ref, () => {
      return selectedReservations;
   });

   const listsData = data.map((rsvn) => {
      const stay = `${rsvn.arrivalDate} ~ ${rsvn.departureDate}`;
      return (
         <tr key={rsvn.rsvnId}>
            <td className={classes['checkbox']}>
               {rsvn.statusCode === 'RR' && (
                  <input
                     type="checkbox"
                     value={rsvn.rsvnId}
                     checked={selectedReservations.includes(rsvn.rsvnId)}
                     onChange={checkboxChangeHandler}
                  />
               )}
            </td>
            <td className={classes['room-number']}>{rsvn.roomNumber}</td>
            <td className={classes['name']}>{rsvn.guestName}</td>
            <td className={classes['duration']}>{stay}</td>
            <td className={classes['room-status']}>{rsvn.statusCode}</td>
         </tr>
      );
   });

   return (
      <table
         className={classes['assign-reservation__table']}
         ref={selectedReservationsRef}
      >
         <thead>
            <tr>
               <th></th>
               <th>No.</th>
               <th>Name</th>
               <th>Stay</th>
               <th>Sts</th>
            </tr>
         </thead>
         <tbody>{listsData}</tbody>
      </table>
   );
});

export default AssignReservationTable;
