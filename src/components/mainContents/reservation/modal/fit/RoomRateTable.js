import { useSelector } from 'react-redux';
import classes from './RoomRateTable.module.css';

const RoomRateTable = (props) => {
   const roomRatesData = useSelector(
      (state) => state.reservation.roomRateModal[props.pageName].data
   );

   let roomRatesList = null;
   roomRatesData
      ? (roomRatesList = roomRatesData.map((roomRate) => (
           <tr key={roomRate.date}>
              <td>{roomRate.date}</td>
              <td>{props.roomTypeCode}</td>
              <td>{props.rateTypeCode}</td>
              <td>{roomRate.originPrice}</td>
              <td>{roomRate.totalPrice}</td>
           </tr>
        )))
      : (roomRatesList = (
           <tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
           </tr>
        ));

   return (
      <table className={classes['room-rate-table']}>
         <thead>
            <tr>
               <th>Date</th>
               <th style={{ fontSize: '2px' }}>Room Type</th>
               <th>Rate Type</th>
               <th>Origin Price</th>
               <th>Total Price</th>
            </tr>
         </thead>
         <tbody className={classes['room-rate-table__tbody']}>
            {roomRatesList}
         </tbody>
      </table>
   );
};

export default RoomRateTable;
