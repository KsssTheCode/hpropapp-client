import { roomTypeActions } from './room-type-slice';

export const getRoomTypeCodesData = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/roomtype/get-all-roomtypes`;
         if (searchOptions) {
            const params = new URLSearchParams(searchOptions);
            url += `?${params}`;
         }
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const roomTypeCodesData = await getRequest();
         dispatch(
            roomTypeActions.replaceRoomTypeCodes(roomTypeCodesData || [])
         );
      } catch (err) {
         console.log(err);
      }
   };
};
