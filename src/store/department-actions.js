import { getDepartmentsInOptions } from '../api/departmentApi';
import { departmentActions } from './department-slice';

export const getDepartmentsData = (searchOptions) => {
   return async (dispatch) => {
      try {
         const response = getDepartmentsInOptions(searchOptions);
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(departmentActions.replaceDepartments(responseData || []));
      } catch (err) {
         console.log(err);
      }
   };
};
