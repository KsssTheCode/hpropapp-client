import classes from './AccountDetail.module.css';

const AccountDetail = () => {
   return (
      <div className={classes['detail__wrapper']}>
         <div className={classes['detail__info']}>
            <div>
               <label>Account</label>
               <input type="text" style={{ width: '34%' }} />
               <input
                  type="text"
                  style={{
                     width: '30%',
                     backgroundColor: 'lightgray',
                     marginLeft: '2%',
                  }}
               />
            </div>
            <div>
               <label>Status</label>
               <input type="text" style={{ width: '30%' }} />
            </div>
            <div>
               <label>Balance</label>
               <input type="text" style={{ width: '30%' }} />
            </div>
            <div>
               <label>Reference</label>
               <textarea style={{ width: '98%' }} />
            </div>
         </div>
         <div className={classes['detail__buttons']}>
            <button>Edit</button>
            <button>Add</button>
            <button>C/O</button>
            <button>HCO</button>
         </div>
      </div>
   );
};
export default AccountDetail;
