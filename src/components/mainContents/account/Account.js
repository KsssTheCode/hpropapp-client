import classes from './Account.module.css';
import AccountDetail from './AccountDetail';
import AccountHistory from './AccountHistory';
import AccountsList from './AccountsList';

const Account = () => {
   return (
      <div className={classes['account__wrapper']}>
         <div className={classes['upper-area']}>
            <AccountsList />
         </div>
         <div className={classes['lower-area__list']}>
            <AccountHistory />
         </div>
         <div className={classes['lower-area__detail']}>
            <AccountDetail />
         </div>
      </div>
   );
};

export default Account;
