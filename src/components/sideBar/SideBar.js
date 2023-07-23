import React from 'react';
import { useDispatch } from 'react-redux';
import { pageActions } from '../../store/page-slice';

import Modal from '../UI/modal/Modal';

import classes from './SideBar.module.css';
import closeIcon from '../../assets/pic/close.png';

const SideBar = (props) => {
   const dispatch = useDispatch();
   const onSubmitHandler = (e) => {
      e.preventDefault();
   };

   const onMovePageHandler = (e) => {
      e.preventDefault();
      dispatch(pageActions.openPage(e.target.getAttribute('value')));
      props.closeSideBar();
   };

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
               <button type="submit">OPEN</button>
               <ul>
                  <li key="main">
                     <input type="checkbox" value="main" />
                     <label htmlFor="main" onClick={onMovePageHandler}>
                        Main
                     </label>
                  </li>
                  <li key="reservation">
                     <input type="checkbox" value="reservation" />
                     <label
                        htmlFor="reservation"
                        value="reservation"
                        onClick={onMovePageHandler}
                     >
                        Reservation
                     </label>
                  </li>
                  <li key="roomPreview">
                     <input type="checkbox" value="roomPreview" />
                     <label
                        htmlFor="roomPreview"
                        value="roomPreview"
                        onClick={onMovePageHandler}
                     >
                        Room Preview
                     </label>
                  </li>
                  <li key="checkIn">
                     <input type="checkbox" value="checkIn" />
                     <label
                        htmlFor="checkIn"
                        value="checkIn"
                        onClick={onMovePageHandler}
                     >
                        Check-In
                     </label>
                  </li>
                  <li key="checkOut">
                     <input type="checkbox" value="checkOut" />
                     <label
                        htmlFor="checkOut"
                        value="checkOut"
                        onClick={onMovePageHandler}
                     >
                        Check-Out
                     </label>
                  </li>
                  <li key="deposit">
                     <input type="checkbox" value="deposit" />
                     <label
                        htmlFor="deposit"
                        value="deposit"
                        onClick={onMovePageHandler}
                     >
                        Deposit
                     </label>
                  </li>
                  <li key="account">
                     <input type="checkbox" value="account" />
                     <label
                        htmlFor="account"
                        value="account"
                        onClick={onMovePageHandler}
                     >
                        Account
                     </label>
                  </li>
                  <li key="humanResource">
                     <input type="checkbox" value="humanResource" />
                     <label
                        htmlFor="humanResource"
                        value="humanResource"
                        onClick={onMovePageHandler}
                     >
                        Human Resource
                     </label>
                  </li>
               </ul>
            </form>
         </div>
      </Modal>
   );
};

export default React.memo(SideBar);
