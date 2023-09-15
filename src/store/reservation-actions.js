import * as rsvnApi from '../api/reservationApi';
import { reservationActions } from './reservation-slice';

/**
 * Retrieve selected reservation's detao; informations for reservation modal.
 * @param {string} id - Reservation ID.
 * @param {string} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation')
 */
export const openDetailModal = (id, pageName) => {
   return async (dispatch) => {
      try {
         const response = await rsvnApi.getRsvnDetailInformations(id);
         const responseData = await response.json();
         if (!response.ok) {
            switch (responseData.status) {
               case 400:
                  alert(responseData.message);
                  break;
               case 422:
                  alert(
                     '잘못된 형식의 예약번호입니다. \n관리자에게 문의하세요.'
                  );
                  break;
               case 500:
                  alert('예약 호출에 실패했습니다. \n관리자에게 문의하세요.');
                  break;
               default:
            }
            return;
         }

         if (responseData.arrivalTime) {
            const t = response.arrivalTime;
            responseData.arrivalTime = t.slice(0, 2) + ':' + t.slice(2);
         }
         if (responseData.departureTime) {
            const t = response.departureTime;
            responseData.departureTime = t.slice(0, 2) + ':' + t.slice(2);
         }
         if (id[0] === 'R') {
            const {
               DailyRates,
               RoomRates,
               ReservationChangeHistories,
               ...reservationData
            } = responseData;

            const dailyRatesData = DailyRates.map((rate) => {
               const room = RoomRates.find((room) => +room.date === +rate.date);
               const originPrice = room ? room.price : null;
               const totalPrice = rate.price;
               return { date: rate.date, originPrice, totalPrice };
            });

            const sendData = {
               data: reservationData,
               pageName,
            };
            if (pageName === 'reservation') sendData.mode = 'detail';

            dispatch(reservationActions.openFITModal(sendData));
            dispatch(
               reservationActions.replaceRoomRatesData({
                  pageName,
                  data: dailyRatesData,
               })
            );
            dispatch(
               reservationActions.replaceHistoryModalData({
                  fitOrGroup: 'fit',
                  data: ReservationChangeHistories,
               })
            );
         }
         if (id[0] === 'G') {
            const {
               Reservations,
               ReservationChangeHistories,
               ...groupReservationData
            } = responseData;
            if (Reservations) {
               dispatch(
                  reservationActions.replaceGroupDetailReservationsState(
                     Reservations
                  )
               );
            }
            const sendData = {
               data: groupReservationData,
               pageName,
            };
            if (pageName === 'reservation') sendData.mode = 'detail';
            dispatch(reservationActions.openGroupModal(sendData));
            dispatch(
               reservationActions.replaceHistoryModalData({
                  fitOrGroup: 'group',
                  ReservationChangeHistories,
               })
            );
         }
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Retrieve reservation datas based on user-defined filter options.
 * @param {object} searchOptions - User-defined filter options get from widget.
 * @param {*} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation')
 */
export const getReservationsDataInFilterOptions = (searchOptions, pageName) => {
   return async (dispatch) => {
      try {
         const FITResponse = await rsvnApi.getFITRsvnsDataInFilterOptions(
            searchOptions
         );
         if (!FITResponse.ok) {
            switch (FITResponse.status) {
            }
            return;
         }

         const groupResponse = await rsvnApi.getGroupRsvnsDataInFilterOptions(
            searchOptions
         );
         if (!groupResponse.ok) {
            switch (groupResponse.status) {
            }
            return;
         }

         const combinedData = {
            fit: await FITResponse.json(),
            group: await groupResponse.json(),
         };

         dispatch(
            reservationActions.replaceSearchOptions({ searchOptions, pageName })
         );
         dispatch(
            reservationActions.replaceReservationsState({
               reservations: combinedData || { fit: [], group: [] },
               pageName,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Create reservation based on user-provided information.
 * @param {Object} createFormData - User-provided informations
 * @param {string} fitOrGroup - Distinguishing between individual reservations or group reservations
 * @param {string} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation')
 */
export const createReservation = (createFormData, fitOrGroup, pageName) => {
   return async (dispatch) => {
      try {
         const response = await rsvnApi.createRsvn(createFormData, fitOrGroup);
         const responseData = await response.json();
         if (!response.ok) {
            switch (responseData.status) {
               case 422:
                  alert(responseData.message);
                  break;
               case 400:
                  alert(responseData.message);
                  break;
               case 500:
                  alert('예약생성에 실패했습니다. \n관리자에게 문의하세요.');
                  break;
               default:
            }
            return;
         }

         let id = null;
         if (fitOrGroup === 'fit') id = responseData.rsvnId;
         if (fitOrGroup === 'group') id = responseData.groupRsvnId;

         dispatch(openDetailModal({ id, pageName: 'reservation' }));

         dispatch(
            reservationActions.reflectCreationToReservationsState({
               fitOrGroup,
               pageName,
               data: responseData,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Edit reservation
 * @param {string} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation').
 * @param {string} id - Reservation ID.
 * @param {object} changeData - Data defined only with properties request to be edited.
 */
export const editReservation = (pageName, id, changeData) => {
   return async (dispatch) => {
      try {
         let fitOrGroup = null;
         console.log(id);
         if (id.charAt(0) === 'R') fitOrGroup = 'fit';
         if (id.charAt(0) === 'G') fitOrGroup = 'group';

         const response = await rsvnApi.editRsvn(id, changeData);
         const responseData = await response.json();

         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         await dispatch(
            reservationActions.replaceModalData({
               pageName,
               data: responseData[0],
               fitOrGroup,
            })
         );

         await dispatch(
            reservationActions.reflectEditedReservationToReservationsState({
               pageName,
               id,
               data: responseData[0],
               fitOrGroup,
            })
         );

         alert('저장완료');
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Assign rooms to reservations.
 * @param {string} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation').
 * @param {string} fitOrGroup - Distinguishing between individual reservations or group reservations
 * @param {array} ids - Selected reservation IDs request to be assigned.
 * @param {array} rooms - Selected room numbers request to be assigned.
 */
export const assignRoomsToRsvns = (pageName, fitOrGroup, ids, rooms) => {
   return async (dispatch) => {
      try {
         const idAndRoomPairs = rooms.map((roomNumber, i) => {
            const id = ids[i];
            return { id, roomNumber };
         });

         const response = await rsvnApi.assignRoomsToRsvns(
            idAndRoomPairs,
            fitOrGroup
         );
         if (!response.ok) {
            const responseData = await response.json();
            switch (response.status) {
               case 400:
                  alert(responseData.message);
                  break;
               case 500:
                  alert('관리자에게 문의하세요.');
                  break;
               default:
            }
            return;
         }

         dispatch(
            reservationActions.reflectRoomAssignsToModalState({
               pageName,
               fitOrGroup,
               idAndRoomPairs,
            })
         );

         dispatch(
            reservationActions.reflectRoomAssignsToReservationsState({
               pageName,
               idAndRoomPairs,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Release assigned rooms from the reservations.
 * @param {string} pageName - Page name where the reservation modal will be shown.(must be 'checkIn', 'checkOut' or 'reservation').
 * @param {string} fitOrGroup - Distinguishing between individual reservations or group reservations
 * @param {array} id - Selected reservation IDs request to be released.
 */
export const releaseAssignedRooms = (pageName, fitOrGroup, id) => {
   return async (dispatch) => {
      try {
         const response = await rsvnApi.releaseAssignedRooms(id, fitOrGroup);
         if (!response.ok) {
            const responseData = await response.json();
            switch (response.status) {
               case 400:
                  alert(responseData.message);
                  break;
               case 500:
                  alert('관리자에게 문의하세요.');
                  break;
               default:
            }
            return;
         }

         dispatch(
            reservationActions.releaseAssignedRoomsFromModalState({
               pageName,
               fitOrGroup,
               id,
            })
         );
         dispatch(
            reservationActions.releaseAssignedRoomsFromReservationsState({
               pageName,
               fitOrGroup,
               id,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

/**
 * Retrieve selected reservation's detail informations for check-out detail form.
 * @param {string} id - Reservation ID.
 */
export const getCheckOutDetailForm = (id) => {
   return async (dispatch) => {
      try {
         const response = await rsvnApi.getRsvnDetailInformations(id);
         const responseData = await response.json();
         if (!response.ok) {
            switch (responseData.status) {
               case 400:
                  alert(responseData.message);
                  break;
               case 422:
                  alert(
                     '잘못된 형식의 예약번호입니다. \n관리자에게 문의하세요.'
                  );
                  break;
               case 500:
                  alert('예약 호출에 실패했습니다. \n관리자에게 문의하세요.');
                  break;
               default:
            }
            return;
         }

         const {
            rsvnId,
            groupRsvnId,
            guestName,
            groupName,
            roomNumber,
            roomTypeCode,
            rateTypeCode,
            arrivalDate,
            departureDate,
            GroupReservation,
            tel1,
            tel2,
            reference,
            DailyRates,
         } = responseData;

         const detailData = {
            id: rsvnId || groupRsvnId,
            name: guestName || groupName,
            roomNumber: roomNumber ? roomNumber : null,
            roomTypeCode: roomTypeCode ? roomTypeCode : null,
            rateTypeCode: rateTypeCode ? rateTypeCode : null,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            groupName: GroupReservation ? GroupReservation.groupName : null,
            groupId: GroupReservation ? GroupReservation.groupRsvnId : null,
            tel1: tel1 ? tel1 : null,
            tel2: tel2 ? tel2 : null,
            reference: reference ? reference : null,
            balance: DailyRates.reduce((sum, data) => sum + data.price, 0),
            serviceRate: null,
         };

         dispatch(reservationActions.replaceCheckOutDetail(detailData));
      } catch (err) {
         console.log(err);
      }
   };
};

export const createGroupDetailRsvns = (pageName, groupId, formData) => {
   return async (dispatch) => {
      try {
         const response = await rsvnApi.createGroupDetailRsvns(
            groupId,
            formData
         );
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(
            reservationActions.reflectCreationToGroupDetailReservationsState(
               responseData
            )
         );
         dispatch(
            reservationActions.reflectCreationToReservationsState({
               pageName,
               fitOrGroup: 'fit',
               data: responseData,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const deleteDetailReservations = (ids) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/group-rsvn/delete-detail-rsvns`;
         const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ rsvnIds: ids }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
         });
         return response;
      };

      try {
         await getRequest();
         dispatch(reservationActions.deleteGroupDetailReservations(ids));
      } catch (err) {
         console.log(err);
      }
   };
};
