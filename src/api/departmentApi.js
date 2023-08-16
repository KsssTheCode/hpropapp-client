export const getDeptsDataForFilterSelection = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/dept/get-depts-data-for-filter-selection`,
      { credentials: 'include' }
   );
};
