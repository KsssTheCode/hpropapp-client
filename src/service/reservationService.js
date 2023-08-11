const BASE_URL = process.env.REACT_APP_API_HOST;

export const reservationService = {
   /** [API call] Retrieve detail informations for modal of reservation.
    * @param {string} id - Reservation ID.
    * @returns {Promise<object>} - Reservation data corresponding to the provided reservation ID.
    */
   openRsvnDetailModal: async (id) => {
      const params = new URLSearchParams(id);
      let url = `${BASE_URL}`;
      if (id.charAt(0) === 'R') url += `/rsvn/get-selected-rsvn?${params}`;
      if (id.charAt(0) === 'G')
         url += `/group-rsvn/get-selected-group-rsvn?${params}`;

      return await fetch(url, { credentials: 'include' });
   },

   /** [API call] Retrieve F.I.T reservations based on conditions included in the filter.
    * @param {object} searchOptions - User-configured filter options.
    * @returns {Promise<object>} - F.I.T reservation datas filtered by searchOptions.
    */
   getFITRsvnsDataInFilterOptions: async (searchOptions) => {
      const params = new URLSearchParams(searchOptions);
      return await fetch(
         `${process.env.REACT_APP_API_HOST}/rsvn/get-rsvns-in-options?${params}`,
         { credentials: 'include' }
      );
   },

   /** [API call] Retrieve group reservations based on conditions included in the filter.
    * @param {object} searchOptions - User-configured filter options.
    * @returns {Promise<object>} - Group reservation datas filtered by searchOptions.
    */
   getGroupRsvnsDataInFilterOptions: async (searchOptions) => {
      const params = new URLSearchParams(searchOptions);
      return await fetch(
         `${process.env.REACT_APP_API_HOST}/group-rsvn/get-group-rsvns-in-options?${params}`,
         { credentials: 'include' }
      );
   },

   /** [API call] Creating a reservation using the provided input datas.
    * @param {object} createFormData - Reservation informations requested to be created as inputs by the user.
    * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'FIT' or 'group' in string)
    * @returns {Promise<object>} - Created reservation data.
    */
   createRsvn: async (createFormData, fitOrGroup) => {
      let url = `${BASE_URL}`;
      if (fitOrGroup === 'FIT') url += '/rsvn/create-rsvn';
      if (fitOrGroup === 'group') url += '/group-rsvn/create-group-rsvn';
      return await fetch(url, {
         method: 'POST',
         body: JSON.stringify(createFormData),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      });
   },

   /** [API call] Creating reservations included in group reservation by using the provided input datas.
    * @param {object} createFormData - Reservation informations to be created as inputs by the user.
    * @returns {Promise<object>} - Created group detail reservations.
    */
   createGroupDetailRsvns: async (groupRsvnId, formData) => {
      return await fetch(`${BASE_URL}/group-rsvn/create-detail-rsvns`, {
         method: 'POST',
         body: JSON.stringify({
            groupRsvnId: groupRsvnId,
            detailRsvnsData: formData,
         }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      });
   },

   /** [API call] Delete selected detail reservations from group reservation.
    * @param {array} ids - An array of reservation ids selected to delete from group reservation.
    */
   deleteDetailRsvnsIncludedInGroupRsvn: async (ids) => {
      await fetch(
         `${process.env.REACT_APP_API_HOST}/group-rsvn/delete-detail-rsvns`,
         {
            method: 'DELETE',
            body: JSON.stringify({ rsvnIds: ids }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
         }
      );
   },

   /** [API call] Edit reservation.
    * @param {string} id - Reservation id of which requested to edit.
    * @param {object} changeData - Reservation data properties which is requested to edit. (Include only the properties to be change)
    * @returns {Promise<object>} - Edited data.
    */
   editFITRsvn: async (id, changeData) => {
      let url = `${BASE_URL}`;
      if (id.charAt(0) === 'R') url += '/rsvn/edit-rsvn';
      if (id.charAt(0) === 'G') url += '/group-rsvn/edit-group-rsvn';

      return await fetch(url, {
         method: 'PATCH',
         body: JSON.stringify({ rsvnId: id, ...changeData }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      });
   },

   /**
    * [API call] Retrieve detail informations for detail form of check-out page.
    * @param {string} id - Reservation ID.
    * @returns {Promise<object>} - Reservation data corresponding to the provided reservation ID.
    */
   setCheckOutDetailForm: async (id) => {
      const params = new URLSearchParams({ id });
      let url = `${BASE_URL}`;
      if (id.charAt(0) === 'R') url += `/rsvn/get-selected-rsvn?${params}`;
      if (id.charAt(0) === 'G')
         url += `/group-rsvn/get-selected-group-rsvn?${params}`;

      return await fetch(url, { credentials: 'include' });
   },

   /**
    * [API call] Assign rooms to reservations.
    * @param {array} idAndRoomPairs - An array of objects composed of id and room number. (It should be an array regardless of the number of IDs)
    * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'FIT' or 'group' in string)
    */
   assignRooms: async (idAndRoomPairs, fitOrGroup) => {
      let url = `${BASE_URL}`;
      if (fitOrGroup === 'FIT') url += '/rsvn/assign-room-to-rsvn';
      if (fitOrGroup === 'group') url += '/group-rsvn/assign-rooms';

      await fetch(url, {
         method: 'PATCH',
         body: JSON.stringify({ idAndRoomPairs: idAndRoomPairs }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      });
   },

   /**
    * [API call] Release room assignment from reservation.
    * @param {array} ids - An array of ids to be released room assignment. (It should be an array regardless of the number of IDs)
    * @param {string} fitOrGroup - Determination of F.I.T or Group Reservation. (Only allow 'FIT' or 'group' in string)
    */
   releaseAssignedRooms: async (ids, fitOrGroup) => {
      let url = `${BASE_URL}`;
      if (fitOrGroup === 'FIT') url += '/rsvn/release-assigned-room-from-rsvn';
      if (fitOrGroup === 'group')
         url += '/group-rsvn/relase-assigned-rooms-from-rsvns';

      await fetch(url, {
         method: 'PATCH',
         body: JSON.stringify({ ids }),
         headers: { 'Content-Type': 'application/json' },
         credentials: 'include',
      });
   },
};
