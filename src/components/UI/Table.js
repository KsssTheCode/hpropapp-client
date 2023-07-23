import { AgGridReact } from 'ag-grid-react';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import * as tableFn from './gridFunction';
import { reservationActions } from '../../store/reservation-slice';

import './Table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Table = (props) => {
   const pageName = props.pageName;
   const itemsInOnePage = props.itemsInOnePage;

   const dispatch = useDispatch();
   const itemsInOnePageRef = useRef();

   const convertedData = tableFn.convertToGridData(props.datas, pageName);
   const columns = tableFn.getGridColumns(pageName);
   const defaultColumnDef = tableFn.getGridDefaultColumnDef(pageName);
   const rowSelectionType = tableFn.getRowSelectionType(pageName);
   const pagination = tableFn.getPagination(pageName);
   const rowHeight = tableFn.getRowHieght(pageName);
   const showItemsInOnePageSelection =
      tableFn.showItemsInOnePageSelection(pageName);

   const itemsInOnePageChanged = (e) => {
      dispatch(
         reservationActions.replaceItemsInOnePage(e.target.value, pageName)
      );
   };

   const onRowDoubleClickedHandler = (e) => {
      props.openReservationDetail(e.data.rsvnId);
   };

   useEffect(() => {}, [itemsInOnePage]);

   const itemsInOnePageOptions = [50, 100, 150];
   let itemsInOnePageSelection = (
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

   const wrapperStyle = {
      width: '100%',
      height: '94%',
   };
   if (!pagination) {
      itemsInOnePageSelection = false;
      wrapperStyle.height = '100%';
   }

   return (
      <div className="ag-theme-alpine" style={wrapperStyle}>
         {showItemsInOnePageSelection && itemsInOnePageSelection}
         <AgGridReact
            rowData={convertedData}
            columnDefs={columns}
            defaultColDef={defaultColumnDef}
            rowSelection={rowSelectionType}
            pagination={pagination}
            paginationPageSize={pagination && itemsInOnePage}
            rowHeight={rowHeight}
            onRowDoubleClicked={onRowDoubleClickedHandler}
         />
      </div>
   );
};

export default Table;
