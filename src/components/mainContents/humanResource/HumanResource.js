import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStaffsData } from '../../../store/staff-actions';
import Table from '../../UI/Table.js';

import classes from './HumanResource.module.css';

const Staff = () => {
   const dispatch = useDispatch();
   const staffsData = useSelector((state) => state.staff.staffs);

   useEffect(() => {
      dispatch(getStaffsData());
   }, [dispatch]);

   return (
      <div className={classes['staff__wrapper']}>
         {/* <StaffsList /> */}
         <Table datas={staffsData} pageName="humanResource" />
      </div>
   );
};

export default Staff;
