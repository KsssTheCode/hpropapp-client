import React from 'react';

import classes from './SearchBar.module.css';
import searchIcon from '../../assets/pic/search.png';

const SearchBar = () => {
   return (
      <div className={classes['searchBar__wrapper']}>
         <input type="text" placeholder="검색어를 입력해주세요." />
         <img
            className={classes['searchBar__icon']}
            src={searchIcon}
            alt="Search Icon"
         />
      </div>
   );
};

export default SearchBar;
