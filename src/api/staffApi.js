/**
 * [GET API call] Get all existing staff datas.
 * @returns {Promise<object>} Existing staff datas.
 */
export const getAllStaffsData = async () => {
   return await fetch(`${process.env.REACT_APP_API_HOST}/auth/get-all-staffs`, {
      credentials: 'include',
   });
};
