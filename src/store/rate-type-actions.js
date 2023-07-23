import { rateTypeActions } from './rate-type-slice';

export const getRateTypeCodesData = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/ratetype/get-all-ratetypes`;
         if (searchOptions) {
            const params = new URLSearchParams(searchOptions);
            url += `?${params}`;
         }
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const rateTypeCodesData = await getRequest();
         dispatch(
            rateTypeActions.replaceRateTypeCodes(rateTypeCodesData || [])
         );
      } catch (err) {
         console.log(err);
      }
   };
};
