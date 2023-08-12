import { membershipActions } from './membership-slice';

export const getMembershipsData = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/membership/get-all-memberships`;
         if (searchOptions) {
            const params = new URLSearchParams(searchOptions);
            url += `?${params}`;
         }
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const membershipsData = await getRequest();
         dispatch(membershipActions.replaceMemberships(membershipsData || []));
      } catch (err) {
         console.log(err);
      }
   };
};
