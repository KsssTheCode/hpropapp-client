import React from 'react';

import classes from './TodayExpect.module.css';

const TodayExpect = () => {
   return (
      <div className={classes['today-expect__wrapper']}>
         <label>Today's Expect</label>
         <table className={classes['today-expect__table']}>
            <tr>
               <th>Exp Arr</th>
               <td>1</td>
            </tr>
            <tr>
               <th>Exp Dep</th>
               <td>1</td>
            </tr>
            <tr>
               <th>Occ(%)</th>
               <td>1</td>
            </tr>
            <tr>
               <th>Occupied</th>
               <td>1</td>
            </tr>
            <tr>
               <th>Vacant</th>
               <td></td>
            </tr>
            <tr>
               <th>Stay</th>
               <td>1</td>
            </tr>
         </table>
      </div>
   );
};

export default TodayExpect;
