import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
   name: 'room',
   initialState: {
      rooms: [],
      floors: [],
      pinnedRooms: { rooms: [], spread: true },
      assignModal: {
         isOpen: false,
         options: { roomTypeCodes: [], startDate: null, endDate: null },
         assignRoomsData: [],
      },
   },
   reducers: {
      replaceRoom(state, action) {
         state.rooms = action.payload.rooms;
      },
      replaceFloor(state, action) {
         const floors = action.payload.floors.map((floor) => {
            return { floorNumber: floor.floorNumber, spread: true };
         });
         state.floors = [...state.floors, ...new Set(floors)];
      },
      addToPinnedRooms(state, action) {
         const selectedRoom = state.rooms.find(
            (room) => room.roomNumber === action.payload
         );
         const isExistingRoom = state.pinnedRooms.rooms.find(
            (room) => room.roomNumber === action.payload
         );
         if (isExistingRoom) return;
         state.pinnedRooms.rooms.push(selectedRoom);
         state.pinnedRooms.spread = true;
      },
      removeFromPinnedRooms(state, action) {
         state.pinnedRooms.rooms = state.pinnedRooms.rooms.filter(
            (room) => room.roomNumber !== action.payload
         );
      },
      togglePinnedRooms(state) {
         state.pinnedRooms.spread = !state.pinnedRooms.spread;
      },
      toggleFloors(state, action) {
         const floorIndex = state.floors.findIndex(
            (floor) => floor.floorNumber === action.payload
         );
         state.floors[floorIndex] = {
            ...state.floors[floorIndex],
            spread: !state.floors[floorIndex].spread,
         };
      },
      openAssignModal(state) {
         state.assignModal = { ...state.assignModal, isOpen: true };
      },
      closeAssignModal(state) {
         state.assignModal = {
            isOpen: false,
            options: { roomTypeCodes: [], startDate: null, endDate: null },
            assignRoomsData: [],
         };
      },
      replaceAssignModalRoomData(state, action) {
         state.assignModal = {
            ...state.assignModal,
            assignRoomsData: action.payload,
         };
      },

      replaceAssignModalSearchOption(state, action) {
         state.assignModal.options = {
            ...state.assignModal.options,
            ...action.payload,
         };
      },
   },
});

export const roomActions = roomSlice.actions;
export default roomSlice.reducer;
