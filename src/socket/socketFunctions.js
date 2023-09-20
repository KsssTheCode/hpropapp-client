import { reservationActions } from '../store/reservation-slice';
import socket from './socket';

export const subscribeToCreateRsvn = (dispatch, pageName) => {
   console.log('생성감지');
   const createRsvnHandler = (data) => {
      console.log(data);
      console.log(data.rsvn);
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
      console.log('연결종료');
   };

   return unsubscribe;
};

export const subscribeToEditRsvn = (dispatch, pageName) => {
   const editRsvnHandler = (data) => {
      const { action, rsvn } = data;
      const id = rsvn.rsvnId ? rsvn.rsvnId : rsvn.groupRsvnId;
      const fitOrGroup = rsvn.rsvnId ? 'fit' : 'group';

      if (!action) {
         dispatch(
            reservationActions.reflectEditedReservationToReservationsState({
               fitOrGroup,
               id,
               data: rsvn,
               pageName,
            })
         );
      }
   };

   socket.on('editRsvn', (data) => editRsvnHandler(data));

   const unsubscribe = () => {
      socket.off('editRsvn', editRsvnHandler);
      socket.disconnect();
      console.log('연결종료');
   };

   return unsubscribe;
};
