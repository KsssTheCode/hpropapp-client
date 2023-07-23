import { useSelector, useDispatch } from 'react-redux';
import { pageActions } from '../../../store/page-slice';

import classes from './PageHeaderBar.module.css';
import closeIcon from '../../../assets/pic/close.png';

const Widget = () => {
   const dispatch = useDispatch();
   const openedPages = useSelector((state) => state.page.openedPages);

   const onClosePageHandler = (e) => {
      dispatch(pageActions.closePage(e.target.getAttribute('value')));
   };

   const onOpenPageHandler = (e) => {
      dispatch(pageActions.openPage(e.target.getAttribute('value')));
   };

   const onCloseAllTabHandler = () => {
      dispatch(pageActions.closeAllPages);
   };

   const widgetsList = openedPages.map((pageName) => (
      <div key={pageName}>
         <label value={pageName} onClick={onOpenPageHandler}>
            {pageName}
         </label>
         <img
            src={closeIcon}
            alt="close"
            value={pageName}
            onClick={onClosePageHandler}
         />
      </div>
   ));

   return (
      <div className={classes['page-header-bar__wrapper']}>
         <div>
            <label value="main" onClick={onOpenPageHandler}>
               Main
            </label>
         </div>
         {widgetsList}
         {widgetsList.length > 0 && (
            <button onClick={onCloseAllTabHandler}>Close All</button>
         )}
      </div>
   );
};

export default Widget;
