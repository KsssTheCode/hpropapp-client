import { useSelector } from 'react-redux';

import PageHeaderBar from './pageHeaderBar/PageHeaderBar';
import MainContents from './MainContents';
import ReservationWidget from './searchWidget/ReservationWidget';
import CheckInWidget from './searchWidget/CheckInWidget';

import classes from './MainWrapper.module.css';
import RoomPreviewWidget from './searchWidget/RoomPreviewWidget';
import CheckOutWidget from './searchWidget/CheckOutWidget';
import DepositWidget from './searchWidget/DepositWidget';
import AccountWidget from './searchWidget/AccountWidget';
import HumanResourceWidget from './searchWidget/HumanResourceWidget';

const MainWrapper = () => {
   const currentPage = useSelector((state) => state.page.currentPage);

   let widget = null;
   switch (currentPage) {
      case 'reservation':
         widget = <ReservationWidget key={currentPage} />;
         break;
      case 'checkIn':
         widget = <CheckInWidget key={currentPage} />;
         break;
      case 'indicator':
         widget = <RoomPreviewWidget key={currentPage} />;
         break;
      case 'checkOut':
         widget = <CheckOutWidget key={currentPage} />;
         break;
      case 'deposit':
         widget = <DepositWidget key={currentPage} />;
         break;
      case 'account':
         widget = <AccountWidget key={currentPage} />;
         break;
      case 'humanResource':
         widget = <HumanResourceWidget key={currentPage} />;
         break;
      default:
         widget = null;
   }

   return (
      <div className={classes['main__wrapper']}>
         {widget}
         <div className={classes['main__content']}>
            <PageHeaderBar />
            <MainContents />
         </div>
      </div>
   );
};

export default MainWrapper;
