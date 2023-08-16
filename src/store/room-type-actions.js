import { roomTypeActions } from './room-type-slice';
import * as roomTypeApi from '../api/roomTypeApi';

export const getRoomTypesDataForFilterSelection = () => {
   return async (dispatch) => {
      try {
         const response =
            await roomTypeApi.getRoomTypesDataForFilterSelection();
         const roomTypeCodesData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }
         dispatch(
            roomTypeActions.replaceRoomTypeCodes(roomTypeCodesData || [])
         );
      } catch (err) {
         console.log(err);
      }
   };
};
