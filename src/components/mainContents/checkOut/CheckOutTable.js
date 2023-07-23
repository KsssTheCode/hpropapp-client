import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CheckOutTable.module.css';
import '../../UI/Table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
   getReservationsDataByOptions,
   setCheckOutDetailForm,
} from '../../../store/reservation-actions';
import { useRef } from 'react';

const CheckOutTable = () => {
   const dispatch = useDispatch();
   const selectedRows = useRef(null);

   const { fit, group } = useSelector(
      (state) => state.reservation.reservations.checkOut
   );
   const fitOrGroupFilter = useSelector(
      (state) => state.reservation.fitOrGroupFilter.checkOut
   );

   let datas = [];
   if (fitOrGroupFilter.length === 3) {
      datas = fit.concat(group);
   } else {
      if (fitOrGroupFilter.includes('fit')) {
         const FITOnly = fit.filter((data) => !data.GroupReservation);
         datas = datas.concat(FITOnly);
      }
      if (fitOrGroupFilter.includes('group')) {
         datas = datas.concat(group);
      }
      if (fitOrGroupFilter.includes('groupMember')) {
         const groupMemberOnly = fit.filter((data) => data.GroupReservation);
         datas = datas.concat(groupMemberOnly);
      }
   }

   const onDoubleClickReservationHandler = (e) => {
      dispatch(setCheckOutDetailForm({ id: e.data.rsvnId }));
   };

   const onRowSelectedHandler = (e) => {
      const selectedRowData = e.api.getSelectedRows();
      selectedRows.current = selectedRowData.map((row) => row.rsvnId);
   };

   const checkOutSelectedReservationHandler = () => {
      dispatch(getReservationsDataByOptions);
   };

   const columns = [
      {
         headerName: '',
         field: '',
         checkboxSelection: true,
         width: 20,
      },
      {
         headerName: 'Room',
         field: 'roomNumber',
         filter: 'agTextColumnFilter',
         floatingFilter: true,
         width: 85,
      },
      {
         headerName: 'Sts',
         field: 'statusCode',
         width: 60,
      },
      {
         headerName: 'Name',
         field: 'guestName',
         filter: 'agTextColumnFilter',
         valueGetter: (params) =>
            params.data.guestName || params.data.groupName,
         floatingFilter: true,
         width: 110,
      },
      {
         headerName: 'Group',
         field: 'GruopReservation.groupName',
         filter: 'agTextColumnFilter',
         floatingFilter: true,
         width: 120,
      },
      {
         headerName: 'Arr Date',
         field: 'arrivalDate',
         filter: 'agDateColumnFilter',
         width: 110,
      },
      {
         headerName: 'Dep Date',
         field: 'departureDate',
         filter: 'agDateColumnFilter',
         width: 110,
      },
      {
         headerName: 'Balance',
         field: 'balance',
         valueGetter: (params) =>
            params.data.DailyRates?.reduce((sum, data) => sum + data.price, 0),
         width: 110,
      },
   ];

   const defaultColumnDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
   };

   return (
      <div className="ag-theme-alpine">
         <button
            className={classes['selected-check-out-button']}
            onClick={checkOutSelectedReservationHandler}
         >
            C/O
         </button>
         <AgGridReact
            rowData={datas}
            columnDefs={columns}
            defaultColDef={defaultColumnDef}
            rowSelection={'multiple'}
            pagination={false}
            rowHeight={25}
            onRowDoubleClicked={onDoubleClickReservationHandler}
            onRowSelected={onRowSelectedHandler}
         />
      </div>
   );
};

export default CheckOutTable;
