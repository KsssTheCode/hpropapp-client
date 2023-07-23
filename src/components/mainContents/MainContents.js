import { useSelector } from 'react-redux';

import MainPage from './mainPage/MainPage';
import Reservation from './reservation/Reservation';
import RoomPreview from './roomPreview/RoomPreview';
import CheckIn from './checkIn/CheckIn';
import CheckOut from './checkOut/CheckOut';

import classes from './MainContents.module.css';
import Deposit from './deposit/Deposit';
import Account from './account/Account';
import HumanResource from './humanResource/HumanResource';

const MainContents = () => {
   const currentPage = useSelector((state) => state.page.currentPage);

   let content = <RoomPreview />;
   switch (currentPage) {
      case 'reservation':
         content = <Reservation />;
         break;
      case 'roomPreview':
         content = <RoomPreview />;
         break;
      case 'checkIn':
         content = <CheckIn />;
         break;
      case 'checkOut':
         content = <CheckOut />;
         break;
      case 'deposit':
         content = <Deposit />;
         break;
      case 'account':
         content = <Account />;
         break;
      case 'humanResource':
         content = <HumanResource />;
         break;
      default:
         content = <MainPage />;
   }
   return <div className={classes['main-content__wrapper']}>{content}</div>;
};

export default MainContents;
