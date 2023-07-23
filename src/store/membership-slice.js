import { createSlice } from '@reduxjs/toolkit';

const membershipSlice = createSlice({
   name: 'membership',
   initialState: {
      memberships: [],
   },
   reducers: {
      replaceMemberships(state, action) {
         state.memberships = action.payload;
      },
      addMembership(state, action) {
         state.memberships.push(action.payload);
      },
      removeMembership(state, action) {
         const newMemberships = state.memberships.filter(
            (code) => code !== action.payload
         );
         state.roomTypeCodes = newMemberships;
      },
   },
});

export const membershipActions = membershipSlice.actions;

export default membershipSlice.reducer;
