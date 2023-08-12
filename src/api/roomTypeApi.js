/**
 * [GET API call] Get all existing room type code datas.
 * @returns {Promise<object>} Existing room type code datas.
 */
export const getRoomTypeCodesData = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/roomtype/get-all-roomtypes`,
      { credentials: 'include' }
   );
};
