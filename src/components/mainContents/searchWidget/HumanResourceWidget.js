import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getStaffsData } from '../../../store/staff-actions';
import { useEffect } from 'react';

import classes from './ReservationWidget.module.css';
import searchIcon from '../../../assets/pic/search.png';
import MultiDropdown from '../../UI/MultiDropdown';
import { getDeptsDataForFilterSelection } from '../../../store/department-actions';

const HumanResourceWidget = () => {
   const dispatch = useDispatch();

   const onSubmitSearchFormHandler = (e) => {
      e.preventDefault();

      // const searchOptions = {};
      // dispatch(getStaffsData(searchOptions));
   };

   const departmentsData = useSelector((state) => state.department.departments);

   useEffect(() => {
      dispatch(getDeptsDataForFilterSelection());
   }, [dispatch]);

   return (
      <form onSubmit={onSubmitSearchFormHandler}>
         <div className={classes['reservation-widget__wrapper']}>
            <div
               style={{ textAlign: 'center', borderBottom: '1px dotted black' }}
            >
               <button value="fit">CREATE</button>
               <button value="fit">RESIGN</button>
            </div>
            <div
               style={{ textAlign: 'center', borderBottom: '1px dotted black' }}
            >
               <button>CLEAR</button>
               <button>SEARCH</button>
            </div>
            <div className={classes['reservation-widget__search']}>
               <img
                  src={searchIcon}
                  alt="search icon"
                  className={classes['reservation-widget__search-icon']}
               />
               <input type="text" />
            </div>
            <div className={classes['reservation-widget__term-options']}>
               <label>Enroll Date</label>
               <br />
               <input type="date" /> ~ <input type="date" />
               <br />
               <label>Leave Date</label>
               <br />
               <input type="date" /> ~ <input type="date" />
            </div>
            <div className={classes['dropdown-options']}>
               <div>
                  <label>Department</label>
                  <MultiDropdown
                     listItemsData={departmentsData}
                     optionName="department"
                  />
               </div>
               <div>
                  <label>Status</label>
                  <select>
                     <option>a</option>
                     <option>b</option>
                     <option>c</option>
                  </select>
               </div>
            </div>
         </div>
      </form>
   );
};
export default React.memo(HumanResourceWidget);
