import apiFacade from './apiFacade';

/** [GET API call] Retrieve detail informations for modal(or detail form) of reservation.
 * @param {string} id - Reservation ID.
 * @returns {Promise<object>} - Reservation data corresponding to the provided reservation ID.
 */
export const getRsvnDetailInformations = async (id) => {
   let uri = null;
   console.log('1');
   if (id.charAt(0) === 'R') uri = '/rsvn/get-selected-rsvn';
   if (id.charAt(0) === 'G') uri = '/group-rsvn/get-selected-group-rsvn';
   console.log('1끝');

   return await apiFacade.get(uri, { id });
};

/** [GET API call] Retrieve F.I.T reservations based on conditions included in user-defined filter.
 * @param {object} searchOptions - User-configured filter options get from widget.
 * @returns {Promise<object>} - F.I.T reservation datas filtered by searchOptions.
 */
export const getFITRsvnsDataInFilterOptions = async (searchOptions) => {
   const uri = '/rsvn/get-rsvns-in-filter-options';
   return await apiFacade.get(uri, searchOptions);
};

/** [GET API call] Retrieve group reservations based on conditions included in user-defined filter.
 * @param {object} searchOptions - User-configured filter options get from widget.
 * @returns {Promise<object>} - Group reservation datas filtered by searchOptions.
 */
export const getGroupRsvnsDataInFilterOptions = async (searchOptions) => {
   const uri = '/group-rsvn/get-group-rsvns-in-filter-options';
   return await apiFacade.get(uri, searchOptions);
};

/** [POST API call] Creating a reservation based on user-provided informations.
 * @param {object} createFormData - Reservation informations requested to be created as inputs by the user.
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 * @returns {Promise<object>} - Created reservation data.
 */
export const createRsvn = async (createFormData, fitOrGroup) => {
   let uri = null;
   if (fitOrGroup === 'fit') uri = '/rsvn/create-rsvn';
   if (fitOrGroup === 'group') uri = '/group-rsvn/create-group-rsvn';
   return await apiFacade.post(uri, createFormData);
};

/** [POST API call] Creating reservations included in group reservation based on user-provided informations.
 * @param {object} createFormData - Reservation informations to be created as inputs by the user.
 * @returns {Promise<object>} - Created group detail reservations.
 */
export const createGroupDetailRsvns = async (groupRsvnId, detailRsvnsData) => {
   let uri = '/group-rsvn/create-detail-rsvns';
   return await apiFacade.post(uri, { groupRsvnId, detailRsvnsData });
};

/** [DELETE API call] Delete selected detail reservations from group reservation.
 * @param {array} ids - An array of reservation ids selected to delete from group reservation.
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const deleteDetailRsvnsIncludedInGroupRsvn = async (ids) => {
   const uri = '/group-rsvn/delete-detail-rsvns';
   return await apiFacade.delete(uri, ids);
};

/** [PATCH API call] Edit reservation.
 * @param {string} id - Reservation id of which requested to edit.
 * @param {object} changeData - Reservation data properties which is requested to edit. (Include only the properties to be change)
 * @returns {Promise<object>} - Edited data.
 */
export const editRsvn = async (id, changeData) => {
   let uri = null;
   if (id.charAt(0) === 'R') uri = '/rsvn/edit-rsvn';
   if (id.charAt(0) === 'G') uri = '/group-rsvn/edit-group-rsvn';
   return await apiFacade.patch(uri, { rsvnId: id, ...changeData });
};

/**
 * [PATCH API call] Assign rooms to reservations.
 * @param {array} idAndRoomPairs - An array of objects composed of id and room number. (It should be an array regardless of the number of IDs)
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const assignRoomsToRsvns = async (idAndRoomPairs, fitOrGroup) => {
   let uri = null;
   if (fitOrGroup === 'fit') uri = '/rsvn/assign-room-to-rsvn';
   if (fitOrGroup === 'group') uri = '/group-rsvn/assign-rooms';

   return await apiFacade.patch(uri, { idAndRoomPairs });
};

/**
 * [PATCH API call] Release room assignment from reservation.
 * @param {array} ids - An array of ids to be released room assignment. (It should be an array regardless of the number of IDs)
 * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'fit' or 'group' in string)
 *  @returns {Promise<object>} - Only use for to get response status.
 */
export const releaseAssignedRooms = async (id, fitOrGroup) => {
   let uri = null;
   if (fitOrGroup === 'fit') uri = '/rsvn/release-assigned-room-from-rsvn';
   if (fitOrGroup === 'group')
      uri = '/group-rsvn/relase-assigned-rooms-from-rsvns';
   return await apiFacade.patch(uri, { id });
};
