import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
   name: 'department',
   initialState: {
      departments: [],
   },
   reducers: {
      replaceDepartments(state, action) {
         state.departments = action.payload;
      },
      addDepartments(state, action) {
         state.departments.push(action.payload);
      },
      removeDepartments(state, action) {
         const newDepartments = state.departments.filter(
            (code) => code !== action.payload
         );
         state.departments = newDepartments;
      },
   },
});

export const departmentActions = departmentSlice.actions;

export default departmentSlice.reducer;
