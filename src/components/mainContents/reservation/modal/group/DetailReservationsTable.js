import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   deleteDetailReservations,
   openDetailModal,
} from '../../../../../store/reservation-actions';

const DetailReservationsTable = (props) => {
   const dispatch = useDispatch();
   const mode = useSelector(
      (state) => state.reservation.groupModal[props.pageName].mode
   );
   const detailReservations = useSelector(
      (state) => state.reservation.groupDetailReservations
   );

   const selectedRows = useRef(null);

   let listsData = [];
   if (detailReservations) {
      listsData = detailReservations.map((rsvn) => {
         const arrDate = moment(rsvn.arrivalDate, 'YYYYMMDD');
         const depDate = moment(rsvn.departureDate, 'YYYYMMDD');
         const nights = depDate.diff(arrDate, 'days') + 1;
         let roomRate;
         let totalAmount = 0;

         if (rsvn.DailyRates)
            rsvn.DailyRates.forEach((rate) => {
               roomRate = rate.price;
               totalAmount += rate.price;
            });

         return {
            status: rsvn.statusCode,
            guestName: rsvn.guestName,
            roomNumber: rsvn.roomNumber,
            arrivalDate: rsvn.arrivalDate,
            departureDate: rsvn.departureDate,
            roomTypeCode: rsvn.roomTypeCode,
            nights,
            totalAmount,
            roomRate,
            rsvnId: rsvn.rsvnId,
         };
      });
   }

   const columns = [
      {
         headerName: '',
         field: '',
         checkboxSelection: true,
         width: 10,
      },
      {
         headerName: 'Sts',
         field: 'status',
         width: 55,
      },
      {
         headerName: 'Name',
         field: 'guestName',
         width: 80,
      },
      {
         headerName: 'Room',
         field: 'roomNumber',
         width: 70,
      },
      {
         headerName: 'Arr',
         field: 'arrivalDate',
         width: 105,
      },
      {
         headerName: 'Dep',
         field: 'departureDate',
         width: 105,
      },
      {
         headerName: 'Nts',
         field: 'nights',
         width: 55,
      },
      {
         headerName: 'Room T',
         field: 'roomTypeCode',
         width: 70,
      },
      {
         headerName: 'Room Rate',
         field: 'roomRate',
         width: 100,
      },
      // {
      //    headerName: 'Service Rate',
      //    field: 'status',
      //    width: 90,
      // },
      {
         headerName: 'Total Amount',
         field: 'totalAmount',
         width: 100,
      },
   ];

   const defaultColumnDef = {
      sortable: true,
      resizable: true,
   };

   const onRowDoubleClickedHandler = (e) => {
      dispatch(openDetailModal({ id: e.data.rsvnId, pageName: 'reservation' }));
   };

   const onDeleteSelectedReservationsHandler = () => {
      dispatch(deleteDetailReservations(selectedRows.current));
   };

   const onRowSelectedHandler = (e) => {
      const selectedRowData = e.api.getSelectedRows();
      selectedRows.current = selectedRowData.map((row) => row.rsvnId);
   };

   return (
      <div
         className="ag-theme-alpine"
         style={{
            width: '110%',
            height: '90%',
            marginLeft: '-6%',
         }}
      >
         <div>
            <button onClick={onDeleteSelectedReservationsHandler}>
               Delete
            </button>
            {mode === 'detail' && <button>C/I</button>}
         </div>
         <AgGridReact
            rowData={listsData}
            columnDefs={columns}
            rowSelection={'multiple'}
            defaultColDef={defaultColumnDef}
            rowHeight={20}
            headerHeight={20}
            onRowDoubleClicked={onRowDoubleClickedHandler}
            onRowClicked={props.clickHandler}
            onRowSelected={onRowSelectedHandler}
         />
      </div>
   );
};
export default DetailReservationsTable;
