import React from 'react';

import CurrentExchangeRate from './CurrentExchangeRate';
import TodayExpect from './TodayExpect';
import Weather from './Weather';
import CheckInAndOutExpect from './checkInAndOutExpect/CheckInAndOutExpect';
import BookMark from './BookMark';
import CleanStatus from './CleanStatus';

import classes from './MainPage.module.css';

const MainPage = () => {
   return (
      <div className={classes['home__wrapper']}>
         {/* <TodayExpect />
         <CheckInAndOutExpect />
         <Weather />
         <BookMark />
         <CurrentExchangeRate />
         <CleanStatus />; */}
      </div>
   );
};

export default MainPage;
