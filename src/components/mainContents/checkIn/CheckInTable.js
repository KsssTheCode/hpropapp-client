import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';

import { reservationActions } from '../../../store/reservation-slice';
import {
   editReservation,
   openDetailModal,
} from '../../../store/reservation-actions';

import classes from './CheckInTable.module.css';
import '../../UI/Table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CheckInTable = (props) => {
   const dispatch = useDispatch();
   const itemsInOnePageRef = useRef();

   const [data, setData] = useState([]);

   const itemsInOnePage = useSelector(
      (state) => state.reservation.itemsInOnePage.checkIn
   );
   const { fit, group } = useSelector(
      (state) => state.reservation.reservations.checkIn
   );

   const fitOrGroupFilter = useSelector(
      (state) => state.reservation.fitOrGroupFilter.checkIn
   );

   useEffect(() => {
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
      const convertedData = datas.map((rsvn) => {
         const arrDate = moment(rsvn.arrivalDate, 'YYYYMMDD');
         const depDate = moment(rsvn.departureDate, 'YYYYMMDD');
         const nights = depDate.diff(arrDate, 'days') + 1;
         return { ...rsvn, nights: nights };
      });

      setData(convertedData);
   }, [fitOrGroupFilter, fit, group]);

   const onCheckInSelectedReservations = (rowData) => {
      if (rowData.roomNumber) {
         let id = null;
         rowData.rsvnId ? (id = rowData.rsvnId) : (id = rowData.groupRsvnId);
         dispatch(editReservation(props.pageName, id, { statusCode: 'CI' }));

         const updatedData = data.map((d) => {
            if (d.rsvnId === id) {
               return { ...d, statusCode: 'CI' };
            } else if (d.groupRsvnId === id) {
               return { ...d, statusCode: 'CI' };
            }
            return d;
         });
         setData(updatedData);
      } else {
         alert('객실 배정 후 입실이 가능합니다.');
      }
   };

   const columns = [
      {
         headerName: '',
         field: '',
         width: '20',
         cellRenderer: (params) => {
            const rowData = params.node.data;
            if (rowData.statusCode === 'RR' && rowData.roomNumber) {
               return (
                  <button
                     className={classes['check-in-button']}
                     onClick={() => onCheckInSelectedReservations(rowData)}
                  >
                     C/I
                  </button>
               );
            } else {
               return null;
            }
         },
      },
      {
         headerName: 'Rsvn No.',
         field: 'rsvnId',
         valueGetter: (params) => params.data.rsvnId || params.data.groupRsvnId,
         floatingFilter: true,
         width: 140,
      },
      {
         headerName: 'Room No.',
         field: 'roomNumber',
         filter: 'agTextColumnFilter',
         floatingFilter: true,
         width: 100,
      },
      {
         headerName: 'Sts',
         field: 'statusCode',
         width: 10,
      },
      {
         headerName: 'Name',
         field: 'guestName',
         valueGetter: (params) =>
            params.data.guestName || params.data.groupName,
         filter: 'agTextColumnFilter',
         floatingFilter: true,
         width: 120,
      },
      {
         headerName: 'Group',
         field: 'GroupReservation.groupName',
         filter: 'agTextColumnFilter',
         floatingFilter: true,
         width: 120,
      },
      {
         headerName: 'Arr Date',
         field: 'arrivalDate',
         valueFormatter: (params) => {
            return +params.value;
         },
         filter: 'agDateColumnFilter',
         width: 105,
      },
      {
         headerName: 'Dep Date',
         field: 'departureDate',
         valueFormatter: (params) => {
            return +params.value;
         },
         filter: 'agDateColumnFilter',
         width: 105,
      },
      { headerName: 'Nts', field: 'nights', width: 10 },
      {
         headerName: 'Room Type',
         field: 'roomTypeCode',
         width: 68,
      },
      {
         headerName: 'Rate Type',
         field: 'rateTypeCode',
         width: 68,
      },
      { headerName: 'People', field: 'numberOfGuests', width: 20 },
      { headerName: 'Arr Time', field: 'arrivalTime', width: 100 },
      { headerName: 'Dep Time', field: 'departureTime', width: 100 },
      { headerName: 'Total Rate', field: '', width: 100 },
      {
         headerName: 'Nat',
         field: 'nationality',
         width: 68,
      },
      { headerName: 'Tel', field: 'tel', floatingFilter: true, width: 140 },
      { headerName: 'Reference', field: 'reference', width: 300 },
   ];

   const defaultColumnDef = {
      sortable: true,
      resizable: true,
      filter: true,
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
   };

   const itemsInOnePageChanged = (e) => {
      dispatch(
         reservationActions.replaceItemsInOnePage(e.target.value, 'checkIn')
      );
   };

   const onRowDoubleClickedHandler = (e) => {
      dispatch(openDetailModal(e.data.rsvnId || e.data.groupRsvnId, 'checkIn'));
   };

   const itemsInOnePageOptions = [50, 100, 150];
   const itemsInOnePageSelection = (
      <div className="items-in-one-page-container">
         <span>Show:</span>
         <select
            onChange={itemsInOnePageChanged}
            ref={itemsInOnePageRef}
            defaultValue={itemsInOnePage}
         >
            {itemsInOnePageOptions.map((option) => (
               <option key={option} value={option}>
                  {option}
               </option>
            ))}
         </select>
      </div>
   );

   return (
      <div className="ag-theme-alpine" style={{ width: '100%', height: '94%' }}>
         <div className={classes['table__header']}>
            {itemsInOnePageSelection}
         </div>
         <AgGridReact
            rowData={data}
            columnDefs={columns}
            defaultColDef={defaultColumnDef}
            rowSelection={'multiple'}
            pagination={true}
            paginationPageSize={itemsInOnePage}
            rowHeight={25}
            onRowDoubleClicked={onRowDoubleClickedHandler}
         />
      </div>
   );
};

export default CheckInTable;
