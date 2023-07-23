import React from 'react';

const CheckOutExpect = (props) => {
   const arr = [
      { roomNo: 1, guestName: 1, depTime: 1, checkOutCall: 1 },
      { roomNo: 2, guestName: 2, depTime: 2, checkOutCall: 2 },
      { roomNo: 3, guestName: 3, depTime: 3, checkOutCall: 3 },
      { roomNo: 4, guestName: 4, depTime: 4, checkOutCall: 4 },
   ];

   const lists = arr.map((list, i) => {
      if (i < props.listCount)
         return (
            <tr>
               <td>{list.roomNo}</td>
               <td>{list.guestName}</td>
               <td>{list.depTime}</td>
               <td>{list.checkOutCall}</td>
            </tr>
         );
   });
   return (
      <div>
         <table>
            <tr>
               <th>Room No.</th>
               <th>Guest Name</th>
               <th>Dep Time</th>
               <th>C/O Call</th>
            </tr>
            {lists}
         </table>
      </div>
   );
};

export default React.memo(CheckOutExpect);
