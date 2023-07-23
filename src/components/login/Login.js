import { useRef } from 'react';

import classes from './Login.module.css';
import hotelImage from '../../assets/pic/hotel.jpeg';
import { logIn } from '../../store/staff-actions';
import { useDispatch } from 'react-redux';

const Login = () => {
   const dispatch = useDispatch();

   const staffId = useRef('');
   const password = useRef('');

   const onLoginHandler = async (e) => {
      e.preventDefault();
      dispatch(
         logIn({
            staffId: staffId.current?.value,
            password: password.current?.value,
         })
      );
   };

   return (
      <form
         onSubmit={onLoginHandler}
         className={classes['first-page__wrapper']}
      >
         <div className={classes['img-area']}>
            <img src={hotelImage} alt="main" />
         </div>
         <div className={classes['login__wrapper']}>
            <div className={classes['login-form']}>
               <div>
                  <label>ID</label>
                  <input type="text" ref={staffId} />
               </div>
               <div>
                  <label>PWD</label>
                  <input type="password" ref={password} />
               </div>
            </div>
            <div className={classes['login-btn']}>
               <button type="submit">Login</button>
            </div>
         </div>
      </form>
   );
};

export default Login;
