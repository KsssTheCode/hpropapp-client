import { Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reservationActions } from '../../store/reservation-slice';

import classes from './FitOrGroupSwitch.module.css';

const FitOrGroupSwtich = (props) => {
   const dispatch = useDispatch();
   const fitOrGroupFilter = useSelector(
      (state) => state.reservation.fitOrGroupFilter[props.pageName]
   );

   const onFitOrGroupChange = (e) => {
      const { value, checked } = e.target;

      if (value === 'all' && !checked) {
         dispatch(
            reservationActions.replaceFitOrGroupFilter({
               value: null,
               pageName: props.pageName,
            })
         );
      } else {
         dispatch(
            reservationActions.replaceFitOrGroupFilter({
               value,
               pageName: props.pageName,
            })
         );
      }
   };

   return (
      <div>
         <div className={classes['area']}>
            <div>
               <Switch
                  value="all"
                  checked={fitOrGroupFilter.length === 3}
                  size="small"
                  onChange={onFitOrGroupChange}
               />
               <label>All</label>
            </div>
            <div>
               <Switch
                  value="fit"
                  checked={fitOrGroupFilter.includes('fit')}
                  size="small"
                  onChange={onFitOrGroupChange}
               />
               <label>F.I.T</label>
            </div>
         </div>
         <div className={classes['area']}>
            <div>
               <Switch
                  value="group"
                  checked={fitOrGroupFilter.includes('group')}
                  size="small"
                  onChange={onFitOrGroupChange}
               />
               <label>Group</label>
            </div>
            <div>
               <Switch
                  value="groupMember"
                  checked={fitOrGroupFilter.includes('groupMember')}
                  size="small"
                  onChange={onFitOrGroupChange}
               />
               <label style={{ fontSize: '8px' }}>Inc. mem</label>
            </div>
         </div>
      </div>
   );
};

export default FitOrGroupSwtich;
