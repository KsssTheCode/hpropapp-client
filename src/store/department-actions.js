import { departmentActions } from './department-slice';

export const getDepartmentsData = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/dept/get-all-depts`;
         if (searchOptions) {
            const params = new URLSearchParams(searchOptions);
            url += `?${params}`;
         }
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const departmentsData = await getRequest();
         dispatch(departmentActions.replaceDepartments(departmentsData || []));
      } catch (err) {
         console.log(err);
      }
   };
};
