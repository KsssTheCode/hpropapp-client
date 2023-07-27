import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageActions } from '../../store/page-slice';

import Modal from '../UI/modal/Modal';

import classes from './SideBar.module.css';
import closeIcon from '../../assets/pic/close.png';

const SideBar = (props) => {
   const dispatch = useDispatch();

   const pages = useSelector((state) => state.page.entirePages);
   const onSubmitHandler = (e) => {
      e.preventDefault();
   };

   const onMovePageHandler = (e) => {
      e.preventDefault();
      dispatch(pageActions.openPage(e.target.getAttribute('value')));
      props.closeSideBar();
   };

   const pagesList = pages.map((page) => {
      let pageTitle = null;
      switch (page) {
         case 'main':
            pageTitle = 'Main';
            break;
         case 'reservation':
            pageTitle = 'Reservation';
            break;
         case 'checkIn':
            pageTitle = 'Check In';
            break;
         case 'checkOut':
            pageTitle = 'Check Out';
            break;
         default:
      }

      return (
         <li key={page}>
            {/* <input type="checkbox" value="main" /> */}
            <label htmlFor={page} onClick={onMovePageHandler} value={page}>
               {pageTitle}
            </label>
         </li>
      );
   });

   return (
      <Modal>
         <div className={classes['side-bar__wrapper']}>
            <img
               src={closeIcon}
               alt="Close Icon"
               onClick={props.closeSideBar}
            />
            <form
               className={classes['side-bar__form']}
               onSubmit={onSubmitHandler}
            >
               {/* <button type="submit">OPEN</button> */}
               <ul>{pagesList}</ul>
            </form>
         </div>
      </Modal>
   );
};

export default React.memo(SideBar);
