import React from 'react';

import classes from './CurrentExchangeRate.module.css';
import euroFlag from '../../../assets/pic/euro.png';
import usaFlag from '../../../assets/pic/america.png';
import japanFlag from '../../../assets/pic/japan.png';
import chinaFlag from '../../../assets/pic/china.png';

const CurrentExchangeRate = () => {
   return (
      <div className={classes['currency__wrapper']}>
         <label>Today's currency</label>
         <table>
            <tr>
               <th>CURRENCY</th>
               <td>CASH</td>
            </tr>
            <tr>
               <td>
                  <img src={usaFlag} alt="US Flag" className={classes.flag} />
                  USD
               </td>
               <td>1111</td>
            </tr>
            <tr>
               <td>
                  <img
                     src={chinaFlag}
                     alt="China Flag"
                     className={classes.flag}
                  />
                  CHN
               </td>
               <td>1111</td>
            </tr>
            <tr>
               <td>
                  <img
                     src={japanFlag}
                     alt="Japan Flag"
                     className={classes.flag}
                  />
                  JPN
               </td>
               <td>1111</td>
            </tr>
            <tr>
               <td>
                  <img
                     src={euroFlag}
                     alt="Euro Flag"
                     className={classes.flag}
                  />
                  EUR
               </td>
               <td>1111</td>
            </tr>
         </table>
      </div>
   );
};
export default CurrentExchangeRate;
