import openSocket from 'socket.io-client';
import { reservationActions } from '../store/reservation-slice';

const socket = openSocket(process.env.REACT_APP_API_HOST);

export const subscribeToCreateRsvn = (dispatch, pageName) => {
   const createRsvnHandler = (data) => {
      const { rsvn } = data;
      console.log('통신!');
      console.log(rsvn);

      dispatch(
         reservationActions.reflectCreationToReservationsState({
            fitOrGroup: data.rsvn.rsvnId ? 'fit' : 'group',
            pageName,
            rsvn,
         })
      );
   };

   //  socket.on('createRsvn', (data) => {
   //   if(data.action === 'createGroupDetailRsvns'){
   //
   //   }
   //  });

   socket.on('createRsvn', (data) => createRsvnHandler(data));

   const unsubscribe = () => {
      socket.off('createRsvn', createRsvnHandler);
      socket.disconnect();
   };

   return unsubscribe;
};
// export const subscribeToCreateRsvn = (dispatch, pageName) => {
//    socket.on('createRsvn', (data) => {
//       console.log(data);
//       dispatch(
//          reservationActions.reflectCreationToReservationsState({
//             fitOrGroup: data.rsvn.rsvnId ? 'fit' : 'group',
//             pageName,
//             data,
//          })
//       );

//       return () => {
//          socket.disconnect();
//       };
//    });
// };

export const subscribeToEditRsvn = (dispatch) => {
   socket.on('editRsvn', (data) => {
      if (data.action === 'editRsvnBasicInfo') {
      } else if (data.action === 'assignRoomToRsvn') {
      } else if (data.action === 'releaseRoomFromRsvn') {
      } else if (data.action === 'editRsvnStatus') {
      }

      return () => {
         socket.disconnect();
      };
   });
};
