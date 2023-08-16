import * as membershipApi from '../api/membershipApi';
import { membershipActions } from './membership-slice';

export const getMembershipsDataForFilterSelection = () => {
   return async (dispatch) => {
      try {
         const response = await membershipApi.getMembershipsData();
         const responseData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }
         dispatch(membershipActions.replaceMemberships(responseData || []));
      } catch (err) {
         console.log(err);
      }
   };
};
