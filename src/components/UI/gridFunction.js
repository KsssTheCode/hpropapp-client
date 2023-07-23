import moment from 'moment';

export const convertToGridData = (datas, pageName) => {
   if (datas.length === 0) return [];

   if (pageName === 'reservation' || pageName === 'checkIn') {
      return datas.map((rsvn) => {
         const arrDate = moment(rsvn.arrivalDate, 'YYYYMMDD');
         const depDate = moment(rsvn.departureDate, 'YYYYMMDD');
         const nights = depDate.diff(arrDate, 'days') + 1;
         return { ...rsvn, nights: nights };
      });
   } else if (pageName === 'checkOut') {
      return datas.map((rsvn) => {
         return { ...rsvn, balance: '10,000,000' };
      });
   } else if (pageName === 'member') {
   } else {
      return datas;
   }
};

export const getGridColumns = (pageName) => {
   let columns = null;
   if (pageName === 'reservation') {
      columns = [
         {
            headerName: '',
            field: '',
            checkboxSelection: true,
            flex: 1,
            width: 10,
         },
         {
            headerName: 'Rsvn No.',
            field: 'rsvnId',
            floatingFilter: true,
            width: 140,
         },
         {
            headerName: 'Sts',
            field: 'status',
            width: 10,
         },
         {
            headerName: 'Name',
            field: 'guestName',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         {
            headerName: 'Arr Date',
            field: 'arrivalDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Dep Date',
            field: 'departureDate',
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
   } else if (pageName === 'checkIn') {
      columns = [
         {
            headerName: '',
            field: '',
            checkboxSelection: true,
            flex: 1,
            width: 10,
         },
         {
            headerName: 'Rsvn No.',
            field: 'rsvnId',
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
            field: 'status',
            width: 10,
         },
         {
            headerName: 'Name',
            field: 'guestName',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         {
            headerName: 'Arr Date',
            field: 'arrivalDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Dep Date',
            field: 'departureDate',
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
   } else if (pageName === 'checkOut') {
      columns = [
         {
            headerName: '',
            field: '',
            checkboxSelection: true,
            flex: 1,
            width: 1,
         },
         {
            headerName: 'Room',
            field: 'roomNumber',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 85,
         },
         {
            headerName: 'Name',
            field: 'guestName',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 110,
         },
         {
            headerName: 'Group',
            field: 'groupName',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         {
            headerName: 'Arr Date',
            field: 'arrivalDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Dep Date',
            field: 'departureDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Dep Time',
            field: 'departureTime',
            width: 90,
         },
         { headerName: 'Balance', field: 'balance', width: 110 },
      ];
   } else if (pageName === 'humanResource') {
      columns = [
         {
            headerName: '',
            field: '',
            checkboxSelection: true,
            flex: 1,
            width: 10,
         },
         {
            headerName: 'Staff No.',
            field: 'staffId',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         {
            headerName: 'Name',
            field: 'name',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         {
            headerName: 'Dept',
            field: 'deptName',
            width: 68,
         },
         {
            headerName: 'Position',
            field: 'position',
         },
         {
            headerName: 'Enroll',
            field: 'enrollDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Leave',
            field: 'leaveDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
         {
            headerName: 'Days',
            field: 'days',
            width: 10,
         },
         { headerName: 'Tel', field: 'tel', floatingFilter: true, width: 140 },
         {
            headerName: 'E-mail',
            field: 'email',
            floatingFilter: true,
         },
         {
            headerName: 'Address',
            field: 'address',
            floatingFilter: true,
         },
      ];
   } else if (pageName === 'deposit') {
      columns = [
         {
            headerName: 'Deposit No.',
            field: 'depositId',
            floatingFilter: true,
            width: 140,
         },
         {
            headerName: 'Owner',
            field: 'ownerName',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            width: 120,
         },
         { headerName: 'Balance', field: '', width: 80 },
         {
            headerName: 'Create Date',
            field: 'createDate',
            filter: 'agDateColumnFilter',
            width: 105,
         },
      ];
   } else if (pageName === 'depositHistory') {
      columns = [
         {
            headerName: 'Deposit No.',
            field: 'depositId',
            floatingFilter: true,
            width: 140,
         },
         {
            headerName: 'Date',
            field: 'date',
            width: 105,
         },
         { headerName: 'Amount', field: '' },
         { headerName: 'Variance', field: '' },
         { headerName: 'Balance', field: '' },
         { headerName: 'Reference', field: 'reference', width: 300 },
      ];
   }
   return columns;
};

export const getGridDefaultColumnDef = (pageName) => {
   let defaultColumnDef = {
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
   };

   if (pageName === 'depositHistory') {
      delete defaultColumnDef.filter;
      delete defaultColumnDef.floatingFilterComponentParams;
      defaultColumnDef.suppressRowClickSelection = true;
   } else if (pageName === 'roomRateInReservation') {
      defaultColumnDef = {};
   }
   return defaultColumnDef;
};

export const getRowSelectionType = (pageName) => {
   switch (pageName) {
      case 'depositHistory':
      case 'roomRateInReservation':
      case 'serviceRateInReservation':
         return 'single';
      default:
         return 'multiple';
   }
};

export const getPagination = (pageName) => {
   switch (pageName) {
      case 'roomRateInReservation':
      case 'serviceRateIntReservation':
         return false;
      default:
         return true;
   }
};

export const getRowHieght = (pageName) => {
   switch (pageName) {
      case 'roomRateInReservation':
      case 'serviceRateInReservation':
      case 'depositHistory':
         return 15;
      default:
         return 25;
   }
};

export const showItemsInOnePageSelection = (pageName) => {
   switch (pageName) {
      case 'roomRateInReservation':
      case 'serviceRateIntReservation':
         return false;
      default:
         return true;
   }
};
