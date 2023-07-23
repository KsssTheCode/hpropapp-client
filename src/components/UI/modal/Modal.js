import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
   return (
      <div>
         {ReactDOM.createPortal(<Backdrop />, portalElement)}
         {props.children}
      </div>
   );
};

export default Modal;
