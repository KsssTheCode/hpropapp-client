import { configureStore } from '@reduxjs/toolkit';
import pageSlice from './page-slice';
import reservationSlice from './reservation-slice';
import roomSlice from './room-slice';
import roomTypeSlice from './room-type-slice';
import rateTypeSlice from './rate-type-slice';
import staffSlice from './staff-slice';
import membershipSlice from './membership-slice';
import departmentSlice from './department-slice';

const store = configureStore({
   reducer: {
      reservation: reservationSlice,
      page: pageSlice,
      room: roomSlice,
      roomType: roomTypeSlice,
      rateType: rateTypeSlice,
      staff: staffSlice,
      membership: membershipSlice,
      department: departmentSlice,
   },
});

export default store;
