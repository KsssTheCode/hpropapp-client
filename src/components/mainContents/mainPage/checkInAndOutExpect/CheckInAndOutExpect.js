import React, { useState } from 'react';

import classes from './CheckInAndOutExpect.module.css';
import CheckInExpect from './CheckInExpect';
import CheckOutExpect from './CheckOutExpect';

const CheckInAndOutExpect = () => {
   //true: Check-in, false: Check-out
   const [listKind, setListKind] = useState(true);
   const [listCount, setListCount] = useState(50);

   const convertToCheckInList = () => {
      if (listKind) return;
      setListKind(true);
   };

   const convertToCheckOutList = () => {
      if (!listKind) return;
      setListKind(false);
   };

   const onSetListCountHandler = (e) => {
      setListCount(e.target.value);
   };

   return (
      <div className={classes['check-in-and-out__wrapper']}>
         <select value={listCount} onChange={onSetListCountHandler}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
         </select>
         <div className={classes['check-in-and-out__select']}>
            <div onClick={convertToCheckInList}>Exp C/I</div>
            <div onClick={convertToCheckOutList}>Exp C/O (undone)</div>
         </div>
         {listKind ? (
            <CheckInExpect listCount={listCount} />
         ) : (
            <CheckOutExpect listCount={listCount} />
         )}
      </div>
   );
};

export default CheckInAndOutExpect;
