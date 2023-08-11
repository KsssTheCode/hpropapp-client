import { staffActions } from './staff-slice';
import schedule from 'node-schedule';

const autoLogOutScheduleJobs = [];

export const getStaffsData = (searchOptions) => {
   return async (dispatch) => {
      const getRequest = async () => {
         let url = `${process.env.REACT_APP_API_HOST}/auth/get-all-staffs`;
         if (searchOptions) {
            const params = new URLSearchParams(searchOptions);
            url += `?${params}`;
         }
         const response = await fetch(url, { credentials: 'include' });
         return response.json();
      };

      try {
         const staffsData = await getRequest();
         dispatch(staffActions.replaceStaffsList(staffsData || []));
      } catch (err) {
         console.log(err);
      }
   };
};

export const logOut = () => {
   return async (dispatch) => {
      const sendRequest = async () => {
         console.log('hi');
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/auth/logout`,
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               credentials: 'include',
            }
         );

         return response;
      };

      try {
         const response = await sendRequest();
         console.log(response);
         if (response.ok) {
            alert('로그아웃 완료');
            window.location.reload();

            sessionStorage.removeItem('page');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('pageSearchOptions');
            sessionStorage.removeItem('staffId');

            dispatch(staffActions.logOut());
         } else {
            alert('로그아웃 실패');
         }
      } catch (err) {
         console.log(err);
      }
   };
};

const extendLoginState = (dispatch) => {
   return async () => {
      const sendRequest = async (password) => {
         const staffId = sessionStorage.getItem('staffId');
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/auth/extend-login-state`,
            {
               method: 'POST',
               body: JSON.stringify({ staffId, password }),
               headers: { 'Content-Type': 'application/json' },
               credentials: 'include',
            }
         );
         return response;
      };

      try {
         const confirm = window.confirm(
            '로그인 유지 시간이 경과되어 자동 로그아웃됩니다.\n로그인을 유지하시겠습니까?'
         );
         if (confirm) {
            const password = window.prompt(
               '로그인 연장을 하시려면 비밀번호를 입력하세요'
            );
            if (password) {
               const response = await sendRequest(password);
               if (response.status === 200) {
                  alert('로그인이 연장되었습니다.');
               } else {
                  alert('비밀번호 입력오류. \n로그아웃됩니다.');
                  dispatch(logOut());
               }
            } else {
               dispatch(logOut());
            }
         } else {
            dispatch(logOut());
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const logIn = ({ staffId, password }) => {
   return async (dispatch) => {
      const sendRequest = async () => {
         const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/auth/login`,
            {
               method: 'POST',
               body: JSON.stringify({ staffId, password }),
               headers: { 'Content-Type': 'application/json' },
               credentials: 'include',
            }
         );

         return response;
      };

      try {
         const response = await sendRequest();
         if (response.status === 200) {
            const staffId = await response.json();
            dispatch(staffActions.login(staffId));

            schedule.scheduleJob(
               new Date(Date.now() + 1000),
               extendLoginState(dispatch)
            );
            // autoLogOutScheduleJobs.push(reservedJob);
         } else {
            alert('로그인 실패');
         }
      } catch (err) {
         console.log(err);
      }
   };
};
