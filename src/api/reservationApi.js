/** [GET API call] Retrieve detail informations for modal(or detail form) of reservation.
 * @param {string} id - Reservation ID.
 * @returns {Promise<object>} - Reservation data corresponding to the provided reservation ID.
 */
export const getRsvnDetailInformations = async (id) => {
   const params = new URLSearchParams({ id });
   let url = `${process.env.REACT_APP_API_HOST}`;
   if (id.charAt(0) === 'R') url += `/rsvn/get-selected-rsvn?${params}`;
   if (id.charAt(0) === 'G')
      url += `/group-rsvn/get-selected-group-rsvn?${params}`;

   return await fetch(url, { credentials: 'include' });
};

/** [GET API call] Retrieve F.I.T reservations based on conditions included in user-defined filter.
 * @param {object} searchOptions - User-configured filter options get from widget.
 * @returns {Promise<object>} - F.I.T reservation datas filtered by searchOptions.
 */
export const getFITRsvnsDataInFilterOptions = async (searchOptions) => {
   const params = new URLSearchParams(searchOptions);
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/rsvn/get-rsvns-in-options?${params}`,
      { credentials: 'include' }
   );
};

/** [GET API call] Retrieve group reservations based on conditions included in user-defined filter.
 * @param {object} searchOptions - User-configured filter options get from widget.
 * @returns {Promise<object>} - Group reservation datas filtered by searchOptions.
 */
export const getGroupRsvnsDataInFilterOptions = async (searchOptions) => {
   const params = new URLSearchParams(searchOptions);
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/group-rsvn/get-group-rsvns-in-options?${params}`,
      { credentials: 'include' }
   );
};

/** [POST API call] Creating a reservation based on user-provided informations.
 * @param {object} createFormData - Reservation informations requested to be created as inputs by the user.
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 * @returns {Promise<object>} - Created reservation data.
 */
export const createRsvn = async (createFormData, fitOrGroup) => {
   let url = `${process.env.REACT_APP_API_HOST}`;
   if (fitOrGroup === 'fit') url += '/rsvn/create-rsvn';
   if (fitOrGroup === 'group') url += '/group-rsvn/create-group-rsvn';
   return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(createFormData),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
   });
};

/** [POST API call] Creating reservations included in group reservation based on user-provided informations.
 * @param {object} createFormData - Reservation informations to be created as inputs by the user.
 * @returns {Promise<object>} - Created group detail reservations.
 */
export const createGroupDetailRsvns = async (groupRsvnId, formData) => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/group-rsvn/create-detail-rsvns`,
      {
         method: 'POST',
         body: JSON.stringify({
            groupRsvnId: groupRsvnId,
            detailRsvnsData: formData,
         }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      }
   );
};

/** [DELETE API call] Delete selected detail reservations from group reservation.
 * @param {array} ids - An array of reservation ids selected to delete from group reservation.
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const deleteDetailRsvnsIncludedInGroupRsvn = async (ids) => {
   return await fetch(
      `${process.env.REACT_APP_API_HOST}/group-rsvn/delete-detail-rsvns`,
      {
         method: 'DELETE',
         body: JSON.stringify({ rsvnIds: ids }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      }
   );
};

/** [PATCH API call] Edit reservation.
 * @param {string} id - Reservation id of which requested to edit.
 * @param {object} changeData - Reservation data properties which is requested to edit. (Include only the properties to be change)
 * @returns {Promise<object>} - Edited data.
 */
export const editRsvn = async (id, changeData) => {
   let url = `${process.env.REACT_APP_API_HOST}`;
   if (id.charAt(0) === 'R') url += '/rsvn/edit-rsvn';
   if (id.charAt(0) === 'G') url += '/group-rsvn/edit-group-rsvn';

   return await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ rsvnId: id, ...changeData }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
   });
};

/**
 * [PATCH API call] Assign rooms to reservations.
 * @param {array} idAndRoomPairs - An array of objects composed of id and room number. (It should be an array regardless of the number of IDs)
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const assignRoomsToRsvns = async (idAndRoomPairs, fitOrGroup) => {
   let url = `${process.env.REACT_APP_API_HOST}`;
   if (fitOrGroup === 'fit') url += '/rsvn/assign-room-to-rsvn';
   if (fitOrGroup === 'group') url += '/group-rsvn/assign-rooms';

   return await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ idAndRoomPairs: idAndRoomPairs }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
   });
};

/**
 * [PATCH API call] Release room assignment from reservation.
 * @param {array} ids - An array of ids to be released room assignment. (It should be an array regardless of the number of IDs)
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 *  @returns {Promise<object>} - Only use for to get response status.
 */
export const releaseAssignedRooms = async (ids, fitOrGroup) => {
   let url = `${process.env.REACT_APP_API_HOST}`;
   if (fitOrGroup === 'fit') url += '/rsvn/release-assigned-room-from-rsvn';
   if (fitOrGroup === 'group')
      url += '/group-rsvn/relase-assigned-rooms-from-rsvns';

   return await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ ids }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
   });
};
