/**
 * [GET API call] Get all existing staff datas based on conditions included in user-defined filter.
 * @param {object} searchOptions - Conditions to find staffs' data.
 * @returns {Promise<object>} - Staff datas found by filter conditions.
 */
export const getStaffsData = async (searchOptions) => {
   let url = `${process.env.REACT_APP_API_HOST}/staff/get-staffs-in-options`;
   if (searchOptions) {
      const params = new URLSearchParams(searchOptions);
      url += `?${params}`;
   }
   return await fetch(url, { credentials: 'include' });
};
