/**
 * [GET API call] Get all existing staff datas based on conditions included in user-defined filter.
 * @param {object} searchOptions - Conditions to find staffs' data.
 * @returns {Promise<object>} - Staff datas found by filter conditions.
 */
export const getStaffsDataForFilterSelection = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/staff/get-staffs-data-for-filter-selection`,
      { credentials: 'include' }
   );
};
