/**
 * [GET API call] Get all existing room type code datas.
 * @returns {Promise<object>} Existing room type code datas.
 */
export const getRoomTypesDataForFilterSelection = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/roomtype/get-roomtypes-data-for-filter-selection`,
      { credentials: 'include' }
   );
};
