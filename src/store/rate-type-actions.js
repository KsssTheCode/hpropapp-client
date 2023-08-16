import { rateTypeActions } from './rate-type-slice';
import * as rateTypeApi from '../api/rateTypeApi';

export const getRateTypesDataForFilterSelection = () => {
   return async (dispatch) => {
      try {
         const response =
            await rateTypeApi.getRateTypesDataForFilterSelection();
         const rateTypeCodesData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(
            rateTypeActions.replaceRateTypeCodes(rateTypeCodesData || [])
         );
      } catch (err) {
         console.log(err);
      }
   };
};
