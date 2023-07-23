import classes from './DepositDetail.module.css';

const DepositDetail = () => {
   return (
      <div className={classes['deposit-detail__wrapper']}>
         <div className={classes['detail']}>
            <div className={classes['detail__double-input']}>
               <div>
                  <label>DP No.</label>
                  <input type="text" style={{ width: '60%' }} />
               </div>
               <div>
                  <label>Create Date</label>
                  <input type="text" style={{ width: '50%' }} />
               </div>
            </div>
            <div>
               <label>Owner</label>
               <input type="text" style={{ width: '40%' }} />
            </div>
            <div>
               <label>Owner Tel.</label>
               <input type="text" style={{ width: '30%', marginRight: '2%' }} />
               <input type="text" style={{ width: '30%' }} />
            </div>
            <div>
               <label>Amount</label>
               <input type="text" style={{ width: '15%', marginRight: '3%' }} />
               <label>Used</label>
               <input type="text" style={{ width: '15%', marginRight: '3%' }} />
               <label>Balance</label>
               <input type="text" style={{ width: '15%' }} />
            </div>
            <div>
               <label>Reference</label>
               <input type="text" style={{ width: '80%' }} />
            </div>
         </div>
         <div className={classes['history']}></div>
         <div className={classes['add-function']}>
            <div>
               <label>Add Amount</label>
               <input type="text" style={{ width: '40%', marginRight: '3%' }} />
               <button>Add</button>
            </div>
         </div>
      </div>
   );
};

export default DepositDetail;
