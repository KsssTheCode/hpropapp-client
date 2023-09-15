import apiFacade from './apiFacade';

/**
 * [POST API call] Log-in.
 * @param {string} staffId - User staff id.
 * @param {string} password - User password.
 * @returns {Promise<object>} - Staff id.
 */
export const logIn = async (staffId, password) => {
   // return await fetch(`${process.env.REACT_APP_API_HOST}/auth/login`, {
   //    method: 'POST',
   //    body: JSON.stringify({ staffId, password }),
   //    headers: { 'Content-Type': 'application/json' },
   //    credentials: 'include',
   // });

   return await apiFacade.post('/auth/login', { staffId, password });
};

/**
 * [POST API call] Extend login state after origin cookie had expired.
 * @param {string} staffId - User staff id. (The value get from session storage)
 * @param {string} password - User password as a input of prompt.
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const extendLoginState = async (staffId, password) => {
   // return await fetch(
   //    `${process.env.REACT_APP_API_HOST}/auth/extend-login-state`,
   //    {
   //       method: 'POST',
   //       body: JSON.stringify({ staffId, password }),
   //       headers: { 'Content-Type': 'application/json' },
   //       credentials: 'include',
   //    }
   // );

   return await apiFacade.post('/auth/extend-login-state', {
      staffId,
      password,
   });
};

/**
 * [POST API call] Log-out
 * @returns {Promise<object>} - Only use for to get response status.
 */
export const logOut = async () => {
   // return await fetch(`${process.env.REACT_APP_API_HOST}/auth/logout`, {
   //    method: 'POST',
   //    headers: { 'Content-Type': 'application/json' },
   //    credentials: 'include',
   // });

   return await apiFacade.post('/auth/logout', {});
};
