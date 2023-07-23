import { createSlice } from '@reduxjs/toolkit';

const roomTypeSlice = createSlice({
   name: 'roomType',
   initialState: {
      roomTypeCodes: [],
   },
   reducers: {
      replaceRoomTypeCodes(state, action) {
         state.roomTypeCodes = action.payload;
      },
      addRoomTypeCode(state, action) {
         state.roomTypeCodes.push(action.payload);
      },
      removeRoomTypeCode(state, action) {
         const newRoomTypeCodes = state.roomTypeCodes.filter(
            (code) => code !== action.payload
         );
         state.roomTypeCodes = newRoomTypeCodes;
      },
   },
});

export const roomTypeActions = roomTypeSlice.actions;

export default roomTypeSlice.reducer;
