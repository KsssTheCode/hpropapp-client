import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { pageActions } from './store/page-slice';

import classes from './App.module.css';

import Header from './components/header/Header';
import MainWrapper from './components/mainContents/MainWrapper';
import SideBar from './components/sideBar/SideBar';
import Login from './components/login/Login';
import { reservationActions } from './store/reservation-slice';

const monitorWidth = window.innerWidth;
const monitorHeight = window.innerHeight;

document.documentElement.style.setProperty(
   '--monitor-width',
   `${monitorWidth}px`
);
document.documentElement.style.setProperty(
   '--monitor-height',
   `${monitorHeight}px`
);

const App = () => {
   const dispatch = useDispatch();
   const [activeSideBarModal, setActiveSideBarModal] = useState(false);

   useEffect(() => {
      const getPageStoreAfterReload = () => {
         dispatch(pageActions.replacePageStoreFromSession());
         dispatch(reservationActions.replaceSearchOptionsFromSession());
      };

      window.addEventListener('load', getPageStoreAfterReload);

      return () => {
         window.removeEventListener('load', getPageStoreAfterReload);
      };
   });

   useEffect(() => {
      const savePageStoreBeforeUnload = (e) => {
         e.preventDefault();
         dispatch(pageActions.savePageStoreToSession());
         dispatch(reservationActions.saveSearchOptionsToSession());
      };

      window.addEventListener('beforeunload', savePageStoreBeforeUnload);

      return () => {
         window.removeEventListener('beforeunload', savePageStoreBeforeUnload);
      };
   }, [dispatch]);

   const openSideBarHandler = () => {
      setActiveSideBarModal(true);
   };

   const closeSideBarHandler = () => {
      setActiveSideBarModal(false);
   };

   const isLoggedIn = sessionStorage.getItem('isLoggedIn');

   return (
      <div className={classes.App}>
         {isLoggedIn ? (
            <>
               <Header openSideBar={openSideBarHandler} />
               {activeSideBarModal && (
                  <SideBar closeSideBar={closeSideBarHandler} />
               )}
               <MainWrapper />
            </>
         ) : (
            <Login />
         )}
      </div>
   );
};

export default App;
