import * as deptApi from '../api/departmentApi';
import { departmentActions } from './department-slice';

/**
 *
 */
export const getDeptsDataForFilterSelection = () => {
   return async (dispatch) => {
      try {
         const response = await deptApi.getDeptsDataForFilterSelection();
         const departmentsData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(departmentActions.replaceDepartments(departmentsData || []));
      } catch (err) {
         console.log(err);
      }
   };
};
