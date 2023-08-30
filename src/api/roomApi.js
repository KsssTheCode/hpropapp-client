import apiFacade from './apiFacade';

/**
 * [GET API call] Get all existing room number datas.
 * @returns {Promise<object>} - All of existing room number datas.
 */
export const getRoomsDataForIndicator = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/room/get-rooms-for-room-preview`,
      { credentials: 'include' }
   );
};

/**
 * [GET API call] Retrieve assignable room numbers to assign rooms to reservations.
 * @param {object} searchOptions -  User-configured filter options get from widget.
 * @returns {Promise<object>} - Rooms iltered by searchOptions
 */
export const getRoomsDataInOptionsForAssign = async (searchOptions) => {
   const params = new URLSearchParams(searchOptions);
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/room/get-rooms-data-in-options-for-assign?${params}`,
      { credentials: 'include' }
   );
};

/**
 * [GET API call] Get all existing floor datas.
 * @returns {Promise<object>} - All existing floor datas.
 */
export const getFloorsData = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/floor/get-floors-data`,
      {
         credentials: 'include',
      }
   );
};

/**
 * [GET API call] Get all existing clean statuses to use in widget filter.
 * @returns {Promise<object>} - All exsiting clean statuses.
 */
export const getCleanStatusesData = async () => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/clean-status/get-clean-statuses`,
      { credentials: 'include' }
   );
};

/**
 * [GET API call] Get configured room rates searched by combinations of date, room type, rate type.
 * @param {array} indexes - Consisted objects of date, rateType, and roomType.
 * @returns - Room rates for sent indexes.
 */
export const getDefaultRoomRatesData = async (indexes) => {
   let uri = '/roomrate/get-roomrates-by-indexes';
   return await apiFacade.get(uri, indexes);
   // const params = new URLSearchParams(indexes);
   // return await fetch(
   //    `${process.env.REACT_APP_API_HOST}/roomrate/get-roomrates-by-indexes?${params}`,
   //    { credentials: 'include' }
   // );
};
