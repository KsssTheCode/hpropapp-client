import { createSlice } from '@reduxjs/toolkit';

const staffSlice = createSlice({
   name: 'staff',
   initialState: {
      login: { isLoggedIn: false, staffId: null },
      staffs: [],
   },
   reducers: {
      keepLogin(state) {
         state.login = { ...state.login, isLoggedIn: true };
      },
      login(state, action) {
         const staffId = action.payload;
         state.login = { isLoggedIn: true, staffId };
         sessionStorage.setItem('isLoggedIn', true);
         sessionStorage.setItem('staffId', staffId);
      },
      logOut(state) {
         state.login = { isLoggedIn: false, staffId: null };
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
