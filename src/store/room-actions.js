import { reservationActions } from './reservation-slice';
import { roomActions } from './room-slice';
import * as roomApi from '../api/roomApi';

export const getRoomsDataInOptions = () => {
   return async (dispatch) => {
      try {
         const response = await roomApi.getRoomsDataForIndicator();
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }
         dispatch(
            roomActions.replaceRoom({
               rooms: responseData || [],
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
      try {
         const response = await roomApi.getRoomsDataInOptionsForAssign(
            searchOptions
         );
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(roomActions.replaceAssignModalRoomData(responseData));
      } catch (err) {
         console.log(err);
      }
   };
};

export const getFloorsData = () => {
   return async (dispatch) => {
      try {
         const response = await roomApi.getFloorsData();
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(
            roomActions.replaceFloor({
               floors: responseData || [],
            })
         );
      } catch (err) {
         console.log(err);
      }
   };
};

export const getCleanStatusesDataInOptions = () => {
   return async (dispatch) => {
      try {
         const response = await roomApi.getCleanStatusesData();
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(roomActions.replaceCleanStatusesData(responseData || []));
      } catch (err) {
         console.log(err);
      }
   };
};

export const getDefaultRoomRatesData = (pageName, indexes) => {
   return async (dispatch) => {
      try {
         const response = await roomApi.getDefaultRoomRatesData(indexes);
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }
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
