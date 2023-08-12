import { reservationActions } from './reservation-slice';
import { roomActions } from './room-slice';

export const getRoomsData = () => {
   return async (dispatch) => {
      const getRequest = async () => {
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/room/get-rooms-for-room-preview`,
            { credentials: 'include' }
         );
         return response.json();
      };

      try {
         const roomsData = await getRequest();
         dispatch(
            roomActions.replaceRoom({
               rooms: roomsData || [],
            })
         );
         // return roomsData;
      } catch (err) {
         console.log(err);
      }
   };
};

export const getRoomsDataInOptionsForAssign = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         const params = new URLSearchParams(searchOptions);
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/room/get-rooms-in-options-for-assign?${params}`,
            { credentials: 'include' }
         );
         const responseData = await response.json();
         return responseData;
      };
      try {
         const responseData = await getRequest();
         dispatch(roomActions.replaceAssignModalRoomData(responseData));
      } catch (err) {
         console.log(err);
      }
   };
};

export const getFloorsData = () => {
   return async (dispatch) => {
      const getRequest = async () => {
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/floor/get-floors`,
            { credentials: 'include' }
         );
         return response.json();
      };

      try {
         const floorsData = await getRequest();

         dispatch(
            roomActions.replaceFloor({
               floors: floorsData || [],
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const getCleanStatusesData = () => {
   return async (dispatch) => {
      const getRequest = async () => {
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/clean-status/get-clean-statuses`,
            { credentials: 'include' }
         );
         return response.json();
      };

      try {
         const cleanStatusesData = await getRequest();
         dispatch(
            roomActions.replaceCleanStatusesData(cleanStatusesData || [])
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const getDefaultRoomRatesData = ({ pageName, indexes }) => {
   return async (dispatch) => {
      const getRequest = async () => {
         const params = new URLSearchParams(indexes);
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/roomrate/get-roomrates-by-indexes?${params}`,
            { credentials: 'include' }
         );

         return await response.json();
      };
      try {
         const responseData = await getRequest();

         const convertedData = responseData.map((data) => {
            return {
               date: data.date,
               originPrice: data.price,
               totalPrice: data.price,
            };
         });

         dispatch(
            reservationActions.replaceRoomRatesData({
               data: convertedData,
               pageName: pageName,
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};
