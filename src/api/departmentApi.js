export const getDepartmentsInOptions = async (searchOptions) => {
   return async () => {
      let url = `${process.env.REACT_APP_API_HOST}/dept/get-depts-in-options`;
      if (searchOptions) {
         const params = new URLSearchParams(searchOptions);
         url += `?${params}`;
      }
      const response = await fetch(url, { credentials: 'include' });
      return response.json();
   };
};
