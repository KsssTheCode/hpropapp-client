import classes from './Deposit.module.css';
import DepositDetail from './DepositDetail';
import DepositsList from './DepositsList';

const Deposit = () => {
   return (
      <div className={classes['deposit__wrapper']}>
         <div className={classes['deposit__left']}>
            <DepositsList />
         </div>
         <div className={classes['deposit__right']}>
            <DepositDetail />
         </div>
      </div>
   );
};

export default Deposit;
