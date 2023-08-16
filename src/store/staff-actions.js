import * as authApi from '../api/authApi';
import * as staffApi from '../api/staffApi';
import { staffActions } from './staff-slice';
import schedule from 'node-schedule';

/**
 * Get every staff's to use as options of filter.
 * @param {object<array, object>} searchOptions - Conditions to find staff data.
 */
export const getStaffsDataForFilterSelection = () => {
   return async (dispatch) => {
      try {
         const response = await staffApi.getStaffsDataForFilterSelection();
         const staffsData = await response.json();
         if (!response.ok) {
            switch (response.status) {
            }
            return;
         }

         dispatch(staffActions.replaceStaffsList(staffsData || []));
      } catch (err) {
         console.log(err);
      }
   };
};

export const logOut = () => {
   return async (dispatch) => {
      try {
         const response = await authApi.logOut();
         if (!response.ok) {
            alert('로그아웃 실패 \n관리자에게 문의하세요.');
            return;
         } else {
            alert('로그아웃 완료');
            window.location.reload();

            sessionStorage.removeItem('page');
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('pageSearchOptions');
            sessionStorage.removeItem('staffId');

            dispatch(staffActions.logOut());
         }
      } catch (err) {
         console.log(err);
      }
   };
};

const extendLoginState = () => {
   return async (dispatch) => {
      const confirm = window.confirm(
         '로그인 유지 시간이 경과되어 자동 로그아웃됩니다.\n로그인을 유지하시겠습니까?'
      );
      if (!confirm) {
         dispatch(logOut());
         return;
      }

      const password = window.prompt(
         '로그인 연장을 하시려면 비밀번호를 입력하세요'
      );
      if (!password) {
         dispatch(logOut());
         return;
      }
      try {
         const staffId = sessionStorage.getItem('staffId');
         const response = await authApi.extendLoginState(staffId, password);
         if (!response.ok) {
            alert('올바른 비밀번호가 아닙니다.\n다시 로그인해주세요.');
            dispatch(logOut());
         } else {
            alert('로그인 유효시간이 연장되었습니다.');
         }
      } catch (err) {
         console.log(err);
      }
   };
};

export const logIn = (staffId, password) => {
   return async (dispatch) => {
      try {
         const response = await authApi.logIn(staffId, password);
         const loginStaffId = await response.json();
         if (!response.ok) {
            alert('로그인 실패');
            return;
         }

         dispatch(staffActions.login(loginStaffId));

         schedule.scheduleJob(
            new Date(Date.now() + 8 * 3600000),
            extendLoginState(dispatch)
         );
         // autoLogOutScheduleJobs.push(reservedJob);
      } catch (err) {
         console.log(err);
      }
   };
};
