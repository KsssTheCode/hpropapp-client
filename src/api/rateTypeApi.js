/**
 * [GET API call] Get rate type code datas filtered by user-provided search options.
 * @param {object<array,object>} - Conditions to find rate type data.
 * @returns {Promise<object>} - Rate type code datas.
 */
export const getRateTypesDataForFilterSelection = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/ratetype/get-ratetypes-data-for-filter-selection`,
      { credentials: 'include' }
   );
};
