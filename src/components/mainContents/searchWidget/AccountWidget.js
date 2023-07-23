import React from 'react';

import classes from './ReservationWidget.module.css';
import searchIcon from '../../../assets/pic/search.png';

const AccountWidget = () => {
   return (
      <div className={classes['reservation-widget__wrapper']}>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
            <button>CREATE</button>
         </div>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
            <button>DELETE</button>
         </div>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
            <button>CLEAR</button>
            <button>SEARCH</button>
         </div>
         <div className={classes['reservation-widget__search']}>
            <img
               src={searchIcon}
               alt="search icon"
               className={classes['reservation-widget__search-icon']}
            />
            <input type="text" style={{ width: '80%' }} />
         </div>
         <div className={classes['reservation-widget__term-options']}>
            <label>Create Date</label>
            <br />
            <input type="date" /> ~ <input type="date" />
            <label>Expire Date</label>
            <br />
            <input type="date" /> ~ <input type="date" />
         </div>
         <div style={{ borderBottom: '1px dotted black' }}>
            <label>Status</label>
            <select>
               <option>Check-in</option>
               <option>Check-out</option>
               <option>Holding C/O</option>
            </select>
            <br />
            <label>Created By</label>
            <select>
               <option>a씨</option>
               <option>b씨</option>
               <option>c씨</option>
            </select>
            <br />
            <label>Check-out By</label>
            <select>
               <option>a씨</option>
               <option>b씨</option>
               <option>c씨</option>
            </select>
         </div>
      </div>
   );
};

export default React.memo(AccountWidget);
