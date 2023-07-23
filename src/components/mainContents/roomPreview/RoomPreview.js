import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFloorsData, getRoomsData } from '../../../store/room-actions';
import Floors from './Floors';

import classes from './RoomPreview.module.css';

const RoomPreview = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getFloorsData());
      dispatch(getRoomsData());
   }, [dispatch]);

   return (
      <div className={classes['room-preview__wrapper']}>
         <Floors />
      </div>
   );
};

export default React.memo(RoomPreview);
