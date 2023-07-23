import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
   name: 'page',
   initialState: {
      openedPages: [],
      currentPage: 'main',
   },
   reducers: {
      openPage(state, action) {
         state.currentPage = action.payload;
         if (
            !state.openedPages.includes(action.payload) &&
            action.payload !== 'main'
         )
            state.openedPages.push(action.payload);
      },
      closePage(state, action) {
         state.openedPages = state.openedPages.filter(
            (page) => page !== action.payload
         );

         state.openedPages.length === 0
            ? (state.currentPage = 'main')
            : (state.currentPage =
                 state.openedPages[state.openedPages.length - 1]);
      },
      closeAllPages(state) {
         state.openedPages = [];
         state.currentPage = 'main';
      },
      savePageStoreToSession(state) {
         const pageSession = {
            openedPages: state.openedPages,
            currentPage: state.currentPage,
         };
         sessionStorage.setItem('page', JSON.stringify(pageSession));
      },
      replacePageStoreFromSession(state) {
         const pageSession = JSON.parse(sessionStorage.getItem('page'));
         if (pageSession) {
            state.openedPages = pageSession.openedPages;
            state.currentPage = pageSession.currentPage;
         } else {
            return;
         }
      },
   },
});

export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
