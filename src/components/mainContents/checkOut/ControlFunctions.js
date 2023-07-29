import classes from './ControlFunctions.module.css';

const ControlFunctions = () => {
   return (
      <div className={classes['control-functions__wrapper']}>
         <div className={classes['control-functions__left']}>
            <div className={classes['control-functions__left__upper']}>
               <div className={classes['button__wrapper']}>
                  <button>Amount Transfer</button>
               </div>
               <div className={classes['button__wrapper']}>
                  <button style={{ fontSize: '20px', fontWeight: '500' }}>
                     Folio
                  </button>
               </div>
            </div>
            <div className={classes['control-functions__left__lower']}>
               <div className={classes['button__wrapper']}>
                  <button>Bill Transfer</button>
               </div>
               <div className={classes['button__wrapper']}>
                  <button>Bill Posting</button>
               </div>
            </div>
         </div>
         <div className={classes['control-functions__right']}>
            <div className={classes['control-functions__right__upper']}>
               <div className={classes['button__wrapper']}>
                  <button style={{ fontSize: '20px', fontWeight: '500' }}>
                     Card
                  </button>
               </div>
               <div className={classes['button__wrapper']}>
                  <button style={{ fontSize: '20px', fontWeight: '500' }}>
                     Cash
                  </button>
               </div>
            </div>
            <div className={classes['control-functions__right__lower']}>
               <div className={classes['button__wrapper']}>
                  <button style={{ fontSize: '17px', fontWeight: '700' }}>
                     DP
                  </button>
               </div>
               <div className={classes['button__wrapper']}>
                  <button>City Ledger</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ControlFunctions;
