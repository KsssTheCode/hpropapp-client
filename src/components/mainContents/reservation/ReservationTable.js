import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import { reservationActions } from '../../../store/reservation-slice';

import '../../UI/Table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { openDetailModal } from '../../../store/reservation-actions';
import {
   subscribeToCreateRsvn,
   subscribeToEditRsvn,
} from '../../../socket/socket';

const ReservationTable = () => {
   const dispatch = useDispatch();
   const itemsInOnePageRef = useRef();

   const [data, setData] = useState([]);

   const itemsInOnePage = useSelector(
      (state) => state.reservation.itemsInOnePage.reservation
   );
   const { fit, group } = useSelector(
      (state) => state.reservation.reservations.reservation
   );
   const fitOrGroupFilter = useSelector(
      (state) => state.reservation.fitOrGroupFilter.reservation
   );

   useEffect(() => {
      const unsubscribeCreateRsvn = subscribeToCreateRsvn(
         dispatch,
         'reservation'
      );

      return () => {
         unsubscribeCreateRsvn();
      };
   }, [dispatch]);

   // useEffect(() => {
   //    const unsubscribeEditRsvn = subscribeToEditRsvn(dispatch, 'reservation');

   //    return () => {
   //       unsubscribeEditRsvn();
   //    };
   // }, [dispatch]);

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

   const columns = [
      {
         headerName: 'Rsvn No.',
         field: 'rsvnId',
         valueGetter: (params) => params.data.rsvnId || params.data.groupRsvnId,
         floatingFilter: true,
         width: 140,
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
      { headerName: 'People', field: 'numberOfGuests', width: 10 },
      { headerName: 'Arr Time', field: 'arrivalTime', width: 70 },
      { headerName: 'Dep Time', field: 'departureTime', width: 70 },
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
      floatingFilterComponentParams: { suppressFilterButton: true },
   };

   const itemsInOnePageChanged = (e) => {
      dispatch(
         reservationActions.replaceItemsInOnePage(e.target.value, 'reservation')
      );
   };

   const onRowDoubleClickedHandler = (e) => {
      dispatch(
         openDetailModal(e.data.rsvnId || e.data.groupRsvnId, 'reservation')
      );
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
         {itemsInOnePageSelection}
         <AgGridReact
            rowData={data}
            columnDefs={columns}
            defaultColDef={defaultColumnDef}
            pagination={true}
            paginationPageSize={itemsInOnePage}
            rowHeight={25}
            onRowDoubleClicked={onRowDoubleClickedHandler}
         />
      </div>
   );
};

export default ReservationTable;
