import React from 'react';

const CheckInExpect = (props) => {
   const arr = [
      { rsvnNo: 1, guestName: 1, nights: 1, arrTime: 1 },
      { rsvnNo: 2, guestName: 2, nights: 2, arrTime: 2 },
      { rsvnNo: 3, guestName: 3, nights: 3, arrTime: 3 },
      { rsvnNo: 4, guestName: 4, nights: 4, arrTime: 4 },
   ];
   const lists = arr.map((list, i) => {
      if (i < props.listCount) return;
      <tr>
         <td>{list.rsvnNo}</td>
         <td>{list.guestName}</td>
         <td>{list.nights}</td>
         <td>{list.arrTime}</td>
      </tr>;
   });
   return (
      <div>
         <table>
            <tr>
               <th>Rsvn No.</th>
               <th>Guest Name</th>
               <th>Nights</th>
               <th>Arr Time</th>
            </tr>
            {}
         </table>
      </div>
   );
};

export default React.memo(CheckInExpect);
