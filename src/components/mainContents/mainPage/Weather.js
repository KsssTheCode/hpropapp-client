import React from 'react';

import classes from './Weather.module.css';

const Weather = () => {
   return (
      <div className={classes['weather__wrapper']}>
         <label>Weather</label>
      </div>
   );
};

export default Weather;
