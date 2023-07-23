import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
   name: 'staff',
   initialState: {
      login: { isLoggedIn: false, userName: null },
      staffs: [],
   },
   reducers: {
      login(state, action) {
         state.login = { isLoggedIn: true, userName: action.payload.userName };
      },
      logOut(state, action) {
         state.login = { isLoggedIn: false, userName: null };
      },
      replaceStaffsList(state, action) {
         state.staffs = action.payload;
      },
      enrollStaffToList(state, action) {
         state.staffs.push(action.payload);
      },
      removeStaffFromList(state, action) {
         const newStaffsList = state.staffs.filter(
            (staff) => staff !== action.payload
         );
         state.staffs = newStaffsList;
      },
   },
});

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
