import { createSlice } from '@reduxjs/toolkit';

const rateTypeSlice = createSlice({
   name: 'rateType',
   initialState: {
      rateTypeCodes: [],
   },
   reducers: {
      replaceRateTypeCodes(state, action) {
         state.rateTypeCodes = action.payload;
      },
      addRoomTypeCode(state, action) {
         state.rateTypeCodes.push(action.payload);
      },
      removeRoomTypeCode(state, action) {
         const newRateTypeCodes = state.rateTypeCodes.filter(
            (code) => code !== action.payload
         );
         state.rateTypeCodes = newRateTypeCodes;
      },
   },
});

export const rateTypeActions = rateTypeSlice.actions;

export default rateTypeSlice.reducer;
