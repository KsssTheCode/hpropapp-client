import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
   name: 'reservation',
   initialState: {
      FITModal: {
         reservation: { isOpen: false, mode: null, data: null },
         checkIn: { isOpen: false, data: null },
         checkOut: { isOpen: false, data: null },
      },
      groupModal: {
         reservation: {
            isOpen: false,
            mode: null,
            data: null,
            detailReservations: [],
         },
         checkIn: { isOpen: false, data: null, detailReservations: [] },
         checkOut: { isOpen: false, data: null, detailReservations: [] },
      },
      itemsInOnePage: { reservation: 50, checkIn: 50 },
      reservations: {
         reservation: { fit: [], group: [] },
         checkIn: { fit: [], group: [] },
         checkOut: { fit: [], group: [] },
      },
      groupDetailReservations: [],
      searchOptions: {
         reservation: {},
         checkIn: {},
         checkOut: {},
      },
      fitOrGroupFilter: {
         reservation: ['fit', 'group', 'groupMember'],
         checkIn: ['fit', 'group', 'groupMember'],
         checkOut: ['fit', 'group', 'groupMember'],
      },
      roomRateModal: {
         reservation: { isOpen: false, data: null },
         checkIn: { isOpen: false, data: null },
         checkOut: { isOpen: false, data: null },
      },
      reservationStatus: [],
      FITModalHistoryData: { isOpen: false, data: [] },
      groupModalHistoryData: { isOpen: false, data: [] },
      checkOutDetail: {},
   },
   reducers: {
      openFITModal(state, action) {
         const { pageName, ...data } = action.payload;
         state.FITModal[pageName] = { ...data, isOpen: true };
      },
      openGroupModal(state, action) {
         const { pageName, ...data } = action.payload;
         state.groupModal[pageName] = { ...data, isOpen: true };
      },
      closeFITModal(state, action) {
         const { pageName } = action.payload;
         const initialData = { isOpen: false, data: null };
         if (pageName === 'reservation') initialData.mode = null;
         state.FITModal[pageName] = initialData;
         state.FITModalHistoryData = { ...state.FITModalHistoryData, data: [] };
      },
      closeGroupModal(state, action) {
         const { pageName } = action.payload;
         const initialData = {
            isOpen: false,
            data: null,
            detailReservations: [],
         };
         if (pageName === 'reservation') initialData.mode = null;
         state.groupModal[pageName] = initialData;
         state.groupDetailReservations = [];
         state.groupModalHistoryData = {
            ...state.groupModalHistoryData,
            data: [],
         };
      },
      replaceModalData(state, action) {
         const { pageName, data, fitOrGroup } = action.payload;
         let modal = null;
         if (fitOrGroup === 'fit') modal = 'FITModal';
         if (fitOrGroup === 'group') modal = 'groupModal';
         state[modal][pageName] = {
            ...state[modal][pageName],
            data,
         };
      },
      replaceHistoryModalData(state, action) {
         const { data, fitOrGroup } = action.payload;
         let historyModal = null;
         if (fitOrGroup === 'fit') historyModal = 'FITModalHistoryData';
         if (fitOrGroup === 'group') historyModal = 'groupModalHistoryData';
         state[historyModal] = { ...state[historyModal], data };
      },
      reflectCreationToReservationsState(state, action) {
         const { fitOrGroup, pageName, rsvn } = action.payload;
         const updatedData = Array.isArray(rsvn)
            ? [...state.reservations[pageName][fitOrGroup], ...rsvn]
            : [...state.reservations[pageName][fitOrGroup], rsvn];

         state.reservations[pageName][fitOrGroup] = updatedData;
      },
      reflectCreationToGroupDetailReservationsState(state, action) {
         let updatedData = [];
         if (Array.isArray(action.payload)) {
            updatedData = [...state.groupDetailReservations, ...action.payload];
         } else {
            updatedData = [...state.groupDetailReservations, action.payload];
         }
         state.groupDetailReservations = updatedData;
      },
      reflectRoomAssignsToModalState(state, action) {
         const { fitOrGroup, idAndRoomPairs, pageName } = action.payload;
         console.log(action.payload);
         if (fitOrGroup === 'fit') {
            state.FITModal[pageName].data = {
               ...state.FITModal[pageName].data,
               roomNumber: idAndRoomPairs[0].roomNumber,
            };
         } else if (fitOrGroup === 'group') {
            const newReservationsData = state.groupDetailReservations.map(
               (rsvn) => {
                  idAndRoomPairs.forEach((pair, i) => {
                     if (rsvn.rsvnId === pair.rsvnId) {
                        rsvn.roomNumber = +pair.roomNumber;
                     }
                     return rsvn;
                  });
               }
            );
            state.groupDetailReservations = newReservationsData;
         }
      },
      // reflectRoomAssignsToReservationsState(state, action) {
      //    const { pageName, idAndRoomPairs } = action.payload;

      //    const updatedData = state.reservations[pageName].fit.map((rsvn) => {
      //       const isMatch = idAndRoomPairs.find(
      //          (pair) => rsvn.rsvnId === pair.id
      //       );
      //       if (isMatch) return { ...rsvn, roomNumber: isMatch.roomNumber };
      //       return rsvn;
      //    });

      //    state.reservations[pageName].fit = updatedData;
      // },
      // areflectRoomAssignsToReservationsState(state,action) {
      //    const {pageName, data} = action.payload;

      //    const updatedData = state.reservations[pageName].fit.map(rsvn => {
      //       if(id === rsvn.rsvnId) return {...rsvn, ...data};
      //       return rsvn;
      //    })
      // },
      reflectDetailReservationChangeToGroup(state, action) {
         const { id, changeData } = action.payload;
         const index = state.groupDetailReservations.findIndex(
            (rsvn) => rsvn.rsvnId === id
         );

         const updatedData = {
            ...state.groupDetailReservations[index],
            ...changeData,
         };

         state.groupDetailReservations[index] = updatedData;
      },
      reflectEditedReservationToReservationsState(state, action) {
         const { fitOrGroup, id, data, pageName } = action.payload;

         let idAttribute = null;
         if (fitOrGroup === 'fit') idAttribute = 'rsvnId';
         if (fitOrGroup === 'group') idAttribute = 'groupRsvnId';

         const updatedData = state.reservations[pageName][fitOrGroup].map(
            (rsvn) => {
               if (id === rsvn[idAttribute]) return { ...rsvn, ...data };
               return rsvn;
            }
         );

         state.reservations[pageName][fitOrGroup] = updatedData;
      },
      releaseAssignedRoomsFromModalState(state, action) {
         const { pageName, fitOrGroup, ids } = action.payload;
         if (fitOrGroup === 'fit') {
            const data = { ...state.FITModal[pageName].data, roomNumber: null };
            state.FITModal[pageName] = { ...state.FITModal[pageName], data };
         } else if (fitOrGroup === 'group') {
            const newReservationsData = state.groupModal.detailReservations.map(
               (rsvn) => {
                  ids.forEach((id) => {
                     if (rsvn.rsvnId === id) {
                        rsvn.roomNumber = null;
                     }
                  });
                  return rsvn;
               }
            );
            state.groupModal.detailReservations = newReservationsData;
         }
      },
      // releaseAssignedRoomsFromReservationsState(state, action) {
      //    const { fitOrGroup, ids, pageName } = action.payload;
      //    if (fitOrGroup === 'fit') {
      //       state.reservations[pageName][fitOrGroup] = state.reservations[
      //          pageName
      //       ][fitOrGroup].map((rsvn) => {
      //          const isMatch = ids.find((id) => id === rsvn.rsvnId);
      //          if (isMatch) return { ...rsvn, roomNumber: null };
      //          return rsvn;
      //       });
      //    } else if (fitOrGroup === 'group') {
      //       const newReservationsData = state.groupDetailReservations.map(
      //          (rsvn) => {
      //             const isMatch = ids.find((id) => id === rsvn.rsvnId);
      //             if (isMatch) return { ...rsvn, roomNumber: null };
      //             return rsvn;
      //          }
      //       );
      //       state.groupModal.detailReservations = newReservationsData;
      //    }
      // },
      reflectRoomReleasesToGroupDetailReservationsState(state, action) {
         const { selectedReservationsData } = action.payload;

         const updatedData = state.groupDetailReservations.map((rsvn) => {
            const isMatch = selectedReservationsData.find(
               (selectedRsvnId) => selectedRsvnId === rsvn.rsvnId
            );
            if (isMatch) {
               return {
                  ...rsvn,
                  roomNumber: null,
               };
            }
            return rsvn;
         });

         state.groupDetailReservations = updatedData;
      },
      setNewCreateModal(state, action) {
         const { fitOrGroup } = action.payload;
         if (fitOrGroup === 'fit') {
            state.FITModal.reservation = {
               isOpen: true,
               mode: 'create',
               data: null,
            };
         } else if (fitOrGroup === 'group') {
            state.groupModal.reservation = {
               isOpen: true,
               mode: 'create',
               data: null,
               detailReservations: [],
            };
         }
      },
      // reflectOneReservationDataToReservationsState(state, action) {
      //    const { pageName, fitOrGroup, data } = action.payload;
      //    const index = state.reservations[pageName][fitOrGroup].findIndex(
      //       (rsvn) => rsvn.rsvnId === action.payload.id
      //    );
      //    state.reservations[pageName][fitOrGroup][index] = data;
      // },
      openRoomRateModal(state, action) {
         state.roomRateModal[action.payload].isOpen = true;
      },
      closeRoomRateModal(state, action) {
         state.roomRateModal[action.payload].isOpen = false;
      },
      replaceRoomRatesData(state, action) {
         state.roomRateModal[action.payload.pageName].data =
            action.payload.data;
      },
      // addRoomRateInfo(state, action) {
      //    state.isModalOpen.object = {
      //       ...state.isModalOpen.object,
      //       dailyRate: action.payload,
      //    };
      // },
      replaceReservationsState(state, action) {
         const { reservations, pageName } = action.payload;
         if (reservations.fit) {
            state.reservations[pageName].fit = reservations.fit;
         }
         if (reservations.group) {
            state.reservations[pageName].group = reservations.group;
         }
      },
      replaceGroupDetailReservationsState(state, action) {
         state.groupDetailReservations = action.payload;
      },
      reflectRoomAssignsToGroupDetailReservationsState(state, action) {
         const { idAndRoomPairs } = action.payload;

         const updatedData = state.groupDetailReservations.map((rsvn) => {
            const isMatch = idAndRoomPairs.find(
               (pair) => pair.id === rsvn.rsvnId
            );
            if (isMatch) {
               return {
                  ...rsvn,
                  roomNumber: +isMatch.roomNumber,
               };
            }
            return rsvn;
         });

         state.groupDetailReservations = updatedData;
      },
      deleteGroupDetailReservations(state, action) {
         const newDetailReservations =
            state.groupModal.detailReservations.filter(
               (rsvn) => !action.payload.includes(rsvn.rsvnId)
            );
         state.groupModal = {
            ...state.groupModal,
            detailReservations: newDetailReservations,
         };
      },
      replaceSearchOptions(state, action) {
         const { searchOptions, pageName } = action.payload;
         switch (pageName) {
            case 'reservation':
               state.searchOptions.reservation = searchOptions;
               break;
            case 'checkIn':
               state.searchOptions.checkIn = searchOptions;
               break;
            case 'checkOut':
               state.searchOptions.checkOut = searchOptions;
               break;
            default:
               return;
         }
      },
      replaceItemsInOnePage(state, action) {
         state.itemsInOnePage[action.payload.pageName] =
            action.payload.itemsInOnePage;
      },
      replaceFitOrGroupFilter(state, action) {
         const { pageName, value } = action.payload;
         if (!value) {
            state.fitOrGroupFilter[pageName] = [];
         } else if (value === 'all') {
            state.fitOrGroupFilter[pageName] = ['fit', 'group', 'groupMember'];
         } else {
            const index = state.fitOrGroupFilter[pageName].indexOf(value);
            if (index < 0) {
               state.fitOrGroupFilter[pageName] = [
                  ...state.fitOrGroupFilter[pageName],
                  value,
               ];
            } else {
               state.fitOrGroupFilter[pageName] = state.fitOrGroupFilter[
                  pageName
               ].filter((item) => item !== value);
            }
         }
      },
      replaceReservationStatus(state, action) {
         state.reservationStatus = action.payload;
      },
      openHistoryModal(state, action) {
         const fitOrGroup = action.payload;
         let historyState = null;
         if (fitOrGroup === 'fit') {
            historyState = 'FITModalHistoryData';
         } else if (fitOrGroup === 'group') {
            historyState = 'groupModalHistoryData';
         }
         state[historyState] = { ...state[historyState], isOpen: true };
      },
      closeHistoryModal(state, action) {
         const { fitOrGroup } = action.payload;
         let historyState = null;
         if (fitOrGroup === 'fit') {
            historyState = 'FITModalHistoryData';
         } else if (fitOrGroup === 'group') {
            historyState = 'groupModalHistoryData';
         }
         state[historyState] = { ...state[historyState], isOpen: false };
      },
      replaceCheckOutDetail(state, action) {
         state.checkOutDetail = action.payload;
      },
      saveSearchOptionsToSession(state) {
         sessionStorage.setItem(
            'pageSearchOptions',
            JSON.stringify(state.searchOptions)
         );
      },
      replaceSearchOptionsFromSession(state) {
         const pageSearchOptionsSession = JSON.parse(
            sessionStorage.getItem('pageSearchOptions')
         );
         if (pageSearchOptionsSession) {
            state.searchOptions = pageSearchOptionsSession;
         } else {
            return;
         }
      },
   },
});

export const reservationActions = reservationSlice.actions;

export default reservationSlice.reducer;
