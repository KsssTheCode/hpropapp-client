/**
 * [GET API call] Get all existing rate type code datas.
 * @returns {Promise<object>} Existing rate type code datas.
 */
export const getRateTypeCodesData = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/ratetype/get-all-ratetypes`,
      { credentials: 'include' }
   );
};
