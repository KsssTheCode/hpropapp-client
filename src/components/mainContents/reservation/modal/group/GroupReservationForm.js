import { Modal } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReservation } from '../../../../../store/reservation-actions';
import { reservationActions } from '../../../../../store/reservation-slice';
import HistoryInformation from '../historyModal/HistoryInformation';
import DetailReservationForm from './DetailReservationForm';
import DetailReservationsTable from './DetailReservationsTable';
import GroupInformationForm from './GroupInformationForm';
import classes from './GroupReservationForm.module.css';

const GroupReservationForm = (props) => {
   const dispatch = useDispatch();

   const groupInformationFormRef = useRef(null);
   const callerAndCallerTel = useRef(null);

   const { mode } = useSelector(
      (state) => state.reservation.groupModal.reservation
   );

   const detailReservations = useSelector(
      (state) => state.reservation.groupDetailReservations
   );

   const [selectedDetailReservation, setSelectedDetailReservation] = useState(
      {}
   );

   const onCloseModalHandler = (e) => {
      e.preventDefault();
      dispatch(
         reservationActions.closeGroupModal({ pageName: props.pageName })
      );
      dispatch(reservationActions.replaceGroupDetailReservationsState([]));
   };

   const onSetNewCreateFormHandler = () => {
      if (!mode || mode === 'detail') {
         dispatch(
            reservationActions.setNewCreateModal({
               pageName: props.pageName,
               data: {
                  isOpen: true,
                  mode: 'create',
                  fitOrGroup: 'group',
                  data: null,
               },
            })
         );
         dispatch(reservationActions.replaceGroupDetailReservationsState([]));
      }
      groupInformationFormRef.current.clearFields();
      callerAndCallerTel.current.clearFields();
   };

   const onCreateGroupReservationHandler = (e) => {
      e.preventDefault();

      const groupInformationFormData =
         groupInformationFormRef.current.getFormData();
      const callerAndCallerTelData = callerAndCallerTel.current.getFormData();
      const formData = {
         ...groupInformationFormData,
         ...(callerAndCallerTelData && { ...callerAndCallerTelData }),
      };
      dispatch(
         createReservation({
            createFormData: formData,
            fitOrGroup: 'group',
            pageName: props.pageName,
         })
      );
   };

   const onSaveGroupReservationHandler = () => {};

   const onRowClickedHandler = (e) => {
      const selectedDetailReservation = detailReservations.find(
         (rsvn) => rsvn.rsvnId === e.data.rsvnId
      );

      setSelectedDetailReservation({
         arrivalDate: selectedDetailReservation.arrivalDate,
         departureDate: selectedDetailReservation.departureDate,
         roomTypeCode: selectedDetailReservation.roomTypeCode,
         numberOfGuests: selectedDetailReservation.numberOfGuests,
      });
   };

   return (
      <Modal open={props.isOpen}>
         <div className={classes['group-create-modal__wrapper']}>
            <div className={classes['group-create-modal__buttons']}>
               <button onClick={onCloseModalHandler}>Close</button>
               {mode !== 'create' ? (
                  <button onClick={onSaveGroupReservationHandler}>Save</button>
               ) : (
                  <button onClick={onCreateGroupReservationHandler}>
                     Create
                  </button>
               )}
               {mode === 'create' && (
                  <button onClick={onSetNewCreateFormHandler}>Clear</button>
               )}
            </div>
            <div className={classes['group-create-modal__form']}>
               <div className={classes['form__main-area']}>
                  <GroupInformationForm
                     pageName={props.pageName}
                     ref={groupInformationFormRef}
                  />
                  <div className={classes['form__lower-area']}>
                     <DetailReservationForm
                        information={selectedDetailReservation}
                        pageName={props.pageName}
                     />
                     <div className={classes['form__lower-area__right']}>
                        <DetailReservationsTable
                           clickHandler={onRowClickedHandler}
                           pageName={props.pageName}
                        />
                     </div>
                  </div>
               </div>
               <HistoryInformation
                  ref={callerAndCallerTel}
                  pageName={props.pageName}
                  fitOrGroup="group"
               />
            </div>
         </div>
      </Modal>
   );
};

export default GroupReservationForm;
