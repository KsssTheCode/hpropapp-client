const makeRequest = async (uri, method, sendData) => {
   const options = {
      method: method,
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
   };

   let url = `${process.env.REACT_APP_API_HOST}${uri}`;

   if (sendData) {
      if (method === 'GET' || method === 'DELETE') {
         const params = new URLSearchParams(sendData);
         url += `?${params}`;
      } else if (method === 'POST' || method === 'PATCH') {
         options.body = JSON.stringify(sendData);
      }
   }

   return await fetch(url, options);
};

const apiFacade = {
   get: (uri, sendData) => makeRequest(uri, 'GET', sendData),
   post: (uri, sendData) => makeRequest(uri, 'POST', sendData),
   patch: (uri, sendData) => makeRequest(uri, 'PATCH', sendData),
   delete: (uri, sendData) => makeRequest(uri, 'DELETE', sendData),
};

export default apiFacade;
