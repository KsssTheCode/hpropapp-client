import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/staff-actions';

import SearchBar from './SearchBar';

import classes from './Header.module.css';
import menuBarIcon from '../../assets/pic/menuBar.png';
import logOutIcon from '../../assets/pic/logout.png';

const Header = (props) => {
   const dispatch = useDispatch();

   const onLogOutHandler = () => {
      dispatch(logOut());
   };
   return (
      <div className={classes['header__wrapper']}>
         <img
            className={classes.menuBarIcon}
            src={menuBarIcon}
            alt="Menu bar icon"
            onClick={props.openSideBar}
         />
         {/* <SearchBar /> */}
         <img
            className={classes.logOutIcon}
            src={logOutIcon}
            alt="Menu bar icon"
            onClick={onLogOutHandler}
         />
      </div>
   );
};

export default Header;
