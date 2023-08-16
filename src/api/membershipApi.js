/**
 * [GET API call;] Get all existing membership datas.
 * @returns {Promise<object>} All existing membership datas.
 */
export const getMembershipsDataForFilterSelection = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/membership/get-memberships-data-for-filter-selection`,
      { credentials: 'include' }
   );
};
