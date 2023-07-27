import { reservationActions } from './reservation-slice';

export const openDetailModal = ({ id, pageName }) => {
   return async (dispatch) => {
      const getReservationData = async () => {
         const params = new URLSearchParams({ id });
         if (id.charAt(0) === 'R') {
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/get-selected-rsvn?${params}`,
               { credentials: 'include' }
            );
            return response.json();
         }
         if (id.charAt(0) === 'G') {
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/get-selected-group-rsvn?${params}`,
               { credentials: 'include' }
            );
            return response.json();
         }
      };

      try {
         const responseData = await getReservationData();
         if (responseData.arrivalTime) {
            const t = responseData.arrivalTime;
            responseData.arrivalTime = t.slice(0, 2) + ':' + t.slice(2);
         }
         if (responseData.departureTime) {
            const t = responseData.departureTime;
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

export const getReservationsDataByOptions = (searchOptions, pageName) => {
   return async (dispatch) => {
      const getRequest = async () => {
         if (searchOptions) {
            const { fitOrGroup, ...newSearchOptions } = searchOptions;
            const params = new URLSearchParams(newSearchOptions);
            const FITresponse = await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/get-rsvns-in-options?${params}`,
               { credentials: 'include' }
            );
            const groupResponse = await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/get-group-rsvns-in-options?${params}`,
               { credentials: 'include' }
            );
            return {
               fit: await FITresponse.json(),
               group: await groupResponse.json(),
            };
         }
      };

      try {
         const responseData = await getRequest();
         responseData.fit.map((rsvn) => {
            if (rsvn.arrivalTime) {
               const t = rsvn.arrivalTime;
               rsvn.arrivalTime = t.slice(0, 2) + ':' + t.slice(2);
            }
            if (rsvn.departureTime) {
               const t = rsvn.departureTime;
               rsvn.departureTime = t.slice(0, 2) + ':' + t.slice(2);
            }
         });

         dispatch(
            reservationActions.replaceSearchOptions({ searchOptions, pageName })
         );
         dispatch(
            reservationActions.replaceReservationsState({
               reservations: responseData || { fit: [], group: [] },
               pageName,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const createReservation = ({ createFormData, fitOrGroup, pageName }) => {
   return async (dispatch) => {
      const sendRequest = async () => {
         let url = process.env.REACT_APP_API_HOST;
         if (fitOrGroup === 'fit') url += `/rsvn/create-rsvn`;
         if (fitOrGroup === 'group') url += `/group-rsvn/create-group-rsvn`;
         const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(createFormData),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
         });

         const responseData = await response.json();
         return responseData;
      };
      try {
         const responseData = await sendRequest();
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

export const createDetailReservations = ({ pageName, groupId, formData }) => {
   return async (dispatch) => {
      const sendRequest = async () => {
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/group-rsvn/create-detail-rsvns`,
            {
               method: 'POST',
               body: JSON.stringify({
                  groupRsvnId: groupId,
                  detailReservationsData: formData,
                  credentials: 'include',
               }),
               headers: { 'Content-Type': 'application/json' },
            }
         );

         const responseData = await response.json();
         return responseData;
      };

      try {
         const responseData = await sendRequest();

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

export const getReservationStatus = () => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/rsvn-status/get-rsvn-status`;
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const responseData = await getRequest();
         dispatch(
            reservationActions.replaceReservationStatus(responseData || null)
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

export const editReservation = ({ pageName, id, data }) => {
   return async (dispatch) => {
      let fitOrGroup = null;
      const sendRequest = async () => {
         if (id.charAt(0) === 'R') {
            fitOrGroup = 'fit';
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/edit-rsvn`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ rsvnId: id, ...data }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
            const responseData = await response.json();
            return responseData;
         }
         if (id.charAt(0) === 'G') {
            fitOrGroup = 'group';
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/edit-group-rsvn`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ groupRsvnId: id, ...data }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
            const responseData = await response.json();
            return responseData;
         }
      };
      try {
         const responseData = await sendRequest();

         await dispatch(
            reservationActions.replaceModalData({
               pageName: pageName,
               data: responseData[0],
               fitOrGroup,
            })
         );

         await dispatch(
            reservationActions.reflectEditedReservationToReservationsState({
               pageName: pageName,
               id,
               data: responseData[0],
               fitOrGroup,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const setCheckOutDetailForm = ({ id }) => {
   return async (dispatch) => {
      const getRequest = async () => {
         const params = new URLSearchParams({ id });
         if (id.charAt(0) === 'R') {
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/get-selected-rsvn?${params}`,
               { credentials: 'include' }
            );
            return response.json();
         }
         if (id.charAt(0) === 'G') {
            const response = await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/get-selected-group-rsvn?${params}`,
               { credentials: 'include' }
            );
            return response.json();
         }
      };

      try {
         const response = await getRequest();

         const detailData = {
            id: response.rsvnId || response.groupRsvnId,
            name: response.guestName || response.groupName,
            roomNumber: response.roomNumber ? response.roomNumber : null,
            roomTypeCode: response.roomTypeCode ? response.roomTypeCode : null,
            rateTypeCode: response.rateTypeCode ? response.rateTypeCode : null,
            arrivalDate: response.arrivalDate,
            departureDate: response.departureDate,
            accountName: response.accountName ? response.accountName : null,
            accountId: response.accountId ? response.accountId : null,
            depositId: response.depositId ? response.depositId : null,
            groupName: response.GroupReservation
               ? response.GroupReservation.groupName
               : null,
            groupId: response.GroupReservation
               ? response.GroupReservation.groupRsvnId
               : null,
            tel1: response.tel1 ? response.tel1 : null,
            tel2: response.tel2 ? response.tel2 : null,
            reference: response.reference ? response.reference : null,
            balance: response.DailyRates.reduce(
               (sum, data) => sum + data.price,
               0
            ),
            serviceRate: null,
         };

         dispatch(reservationActions.replaceCheckOutDetail(detailData));
      } catch (err) {
         console.log(err);
      }
   };
};

export const assignRoomsToReservations = ({
   pageName,
   fitOrGroup,
   ids,
   rooms,
}) => {
   const idAndRoomPairs = rooms.map((roomNumber, i) => {
      const id = ids[i];
      return { id, roomNumber };
   });

   return async (dispatch) => {
      const sendRequest = async () => {
         if (fitOrGroup === 'fit') {
            await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/assign-room-to-rsvn`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ id: ids[0], roomNumber: rooms[0] }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
         }
         if (fitOrGroup === 'group') {
            await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/assign-rooms`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ idAndRoomPairs: idAndRoomPairs }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
         }
      };

      try {
         await sendRequest();
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

export const releaseAssignedRooms = ({ pageName, fitOrGroup, ids }) => {
   return async (dispatch) => {
      const sendRequest = async () => {
         if (fitOrGroup === 'fit') {
            await fetch(
               `${process.env.REACT_APP_API_HOST}/rsvn/release-assigned-room-from-rsvn`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ id: ids[0] }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
         }
         if (fitOrGroup === 'group') {
            await fetch(
               `${process.env.REACT_APP_API_HOST}/group-rsvn/relase-assigned-rooms-from-rsvns`,
               {
                  method: 'PATCH',
                  body: JSON.stringify({ ids }),
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
               }
            );
         }
      };

      try {
         await sendRequest();

         dispatch(
            reservationActions.releaseAssignedRoomsFromModalState({
               pageName,
               fitOrGroup,
               ids,
            })
         );
         dispatch(
            reservationActions.releaseAssignedRoomsFromReservationsState({
               pageName,
               fitOrGroup,
               ids,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};
