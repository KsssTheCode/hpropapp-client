import classes from './AccountHistory.module.css';

const AccountHistory = () => {
   return (
      <div className={classes['history__wrapper']}>
         <table className={classes['history__table']}>
            <thead>
               <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Use</th>
                  <th>Balance</th>
                  <th>Updated By</th>
                  <th>Reference</th>
                  <th>Sts</th>
                  <th></th>
               </tr>
            </thead>
            <tbody></tbody>
         </table>
      </div>
   );
};
export default AccountHistory;
