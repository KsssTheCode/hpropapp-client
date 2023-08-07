import { staffActions } from './staff-slice';

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
            const userName = await response.json();
            dispatch(staffActions.login(userName));
         } else {
            alert('로그인 실패');
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const logOut = () => {
   return async () => {
      const sendRequest = async () => {
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

         if (response.ok) {
            alert('로그아웃 완료');
            window.location.reload();
            sessionStorage.removeItem('page');
         } else {
            alert('로그아웃 실패');
         }
      } catch (err) {
         console.log(err);
      }
   };
};
