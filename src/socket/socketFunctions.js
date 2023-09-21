import { reservationActions } from '../store/reservation-slice';
import { roomActions } from '../store/room-slice';
import socket from './socket';

export const subscribeToCreateRsvn = (dispatch, pageName) => {
   const createRsvnHandler = (data) => {
      dispatch(
         reservationActions.reflectCreationToReservationsState({
            fitOrGroup: data.rsvn.rsvnId ? 'fit' : 'group',
            pageName,
            rsvn: data.rsvn,
         })
      );
   };

   socket.on('createRsvn', (data) => createRsvnHandler(data));

   const unsubscribe = () => {
      socket.off('createRsvn', createRsvnHandler);
      socket.disconnect();
   };

   return unsubscribe;
};

export const subscribeToEditRsvn = (dispatch, pageName) => {
   const editRsvnHandler = (data) => {
      const { action, returnData } = data;
      if (action === 'editRsvnBasicInfo') {
         const id = returnData.rsvnId
            ? returnData.rsvnId
            : returnData.groupRsvnId;
         const fitOrGroup = returnData.rsvnId ? 'fit' : 'group';
         dispatch(
            reservationActions.reflectEditedReservationToReservationsState({
               fitOrGroup,
               id,
               data: returnData,
               pageName,
            })
         );
      } else if (
         action === 'releaseAssignedRoomFromRsvn' ||
         action === 'assignRoomToRsvn'
      ) {
         const { updatedRsvnData, roomData } = returnData;
         const id = updatedRsvnData.rsvnId
            ? updatedRsvnData.rsvnId
            : updatedRsvnData.groupRsvnId;
         const fitOrGroup = updatedRsvnData.rsvnId ? 'fit' : 'group';
         dispatch(
            reservationActions.reflectEditedReservationToReservationsState({
               fitOrGroup,
               id,
               data: updatedRsvnData,
               pageName,
            })
         );
         if (action === 'releaseAssignedRoomFromRsvn') {
            dispatch(roomActions.addReleasedRoomToList(roomData));
         } else if (action === 'assignRoomToRsvn') {
            dispatch(roomActions.removeAssignedRoomsFromList([roomData]));
         }
      }
   };

   socket.on('editRsvn', (data) => editRsvnHandler(data));

   const unsubscribe = () => {
      socket.off('editRsvn', editRsvnHandler);
      socket.disconnect();
   };

   return unsubscribe;
};
