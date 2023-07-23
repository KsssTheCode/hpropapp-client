import React from 'react';

import classes from './BookMark.module.css';

const BookMark = () => {
   return (
      <div className={classes['book-mark__wrapper']}>
         <label>Book Mark</label>
         <button>OPEN</button>
         <ul>
            {/* <li></li>
            <li></li>
            <li></li>
            <li></li> */}
         </ul>
      </div>
   );
};
export default BookMark;
