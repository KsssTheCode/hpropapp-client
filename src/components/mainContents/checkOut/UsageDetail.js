import classes from './UsageDetail.module.css';

const UsageDetail = () => {
   return (
      <div className={classes['room-usage__wrapper']}>
         <div className={classes['room-usage__history']}>
            <div>
               <label>Total Amount</label>
               <input type="text" />
            </div>
            <div>
               <label>Paid</label>
               <input type="text" />
            </div>
            <div>
               <label>Balance</label>
               <input type="text" />
            </div>
         </div>
         <div className={classes['room-usage__list']}>
            <table>
               <thead>
                  <tr>
                     <th>Sts</th>
                     <th>Item</th>
                     <th>Price(ea)</th>
                     <th>Quantity</th>
                     <th>Amount</th>
                     <th>Time</th>
                     <th>Reference</th>
                     <th>Remark</th>
                  </tr>
               </thead>
               <tbody>{}</tbody>
            </table>
         </div>
      </div>
   );
};

export default UsageDetail;
