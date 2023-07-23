import React from 'react';

import classes from './ReservationWidget.module.css';
import searchIcon from '../../../assets/pic/search.png';

const DepositWidget = () => {
   return (
      <div className={classes['reservation-widget__wrapper']}>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
            <button>CREATE</button>
         </div>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
            <button>DELETE</button>
         </div>
         <div style={{ textAlign: 'center', borderBottom: '1px dotted black' }}>
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
         </div>
         <div style={{ textAlign: 'center' }}>
            <input type="checkbox" />
            <label>ALL</label>
            <input type="checkbox" />
            <label>F.I.T</label>
            <input type="checkbox" />
            <label>Group</label>
         </div>
         <div style={{ textAlign: 'center' }}>
            <input type="checkbox" />
            <label>Inc. Zero</label>
         </div>
      </div>
   );
};

export default React.memo(DepositWidget);
