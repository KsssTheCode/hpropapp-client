import moment from 'moment';
import {
   forwardRef,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { useSelector } from 'react-redux';
import classes from './GroupReservationForm.module.css';

const GroupInformationForm = forwardRef((props, ref) => {
   const [nights, setNights] = useState('');
   const { mode, data } = useSelector(
      (state) => state.reservation.groupModal[props.pageName]
   );

   const groupName = useRef();
   const account = useRef();
   const arrivalDate = useRef();
   const arrivalTime = useRef();
   const departureDate = useRef();
   const departureTime = useRef();
   const nationality = useRef();
   const leaderName = useRef();
   const leaderTel = useRef();
   const companyName = useRef();
   const companyTel = useRef();
   const companyAddress = useRef();
   const reference = useRef();

   useEffect(() => {
      if (data) {
         const arrDate = moment(data.arrivalDate, 'YYYYMMDD');
         const depDate = moment(data.departureDate, 'YYYYMMDD');
         setNights(depDate.diff(arrDate, 'days'));
      }
   }, [data]);

   const onDateChange = () => {
      setNights(() => {
         const arrDate = moment(arrivalDate.current.value, 'YYYYMMDD');
         const depDate = moment(departureDate.current.value, 'YYYYMMDD');
         return depDate.diff(arrDate, 'days');
      });
   };

   useImperativeHandle(ref, () => ({
      clearFields: () => {
         groupName.current.value = '';
         account.current.value = '';
         arrivalDate.current.value = '';
         arrivalTime.current.value = '';
         departureDate.current.value = '';
         departureTime.current.value = '';
         nationality.current.value = '';
         leaderName.current.value = '';
         leaderTel.current.value = '';
         companyName.current.value = '';
         companyTel.current.value = '';
         companyAddress.current.value = '';
         reference.current.value = '';
      },
      getFormData: () => {
         const formData = {};

         if (
            groupName.current &&
            groupName.current.value &&
            groupName.current.value !== data?.groupName
         )
            formData.groupName = groupName.current.value;
         if (
            account.current &&
            account.current.value &&
            account.current.value !== data?.account
         )
            formData.account = account.current.value;
         if (
            arrivalDate.current &&
            arrivalDate.current.value &&
            +arrivalDate.current.value !== data?.arrivalDate
         )
            formData.arrivalDate = arrivalDate.current.value;
         if (
            arrivalTime.current &&
            arrivalTime.current.value &&
            arrivalTime.current.value !== data?.arrivalTime
         )
            formData.arrivalTime = arrivalTime.current.value;
         if (
            departureDate.current &&
            departureDate.current.value &&
            +departureDate.current.value !== data?.departureDate
         )
            formData.departureDate = departureDate.current.value;
         if (
            departureTime.current &&
            departureTime.current.value &&
            departureTime.current.value !== data?.departureTime
         )
            formData.departureTime = departureTime.current.value;
         if (
            nationality.current &&
            nationality.current.value &&
            nationality.current.value !== data?.nationality
         )
            formData.nationality = nationality.current.value;
         if (
            leaderName.current &&
            leaderName.current.value &&
            leaderName.current.value !== data?.leaderName
         )
            formData.leaderName = leaderName.current.value;
         if (
            leaderTel.current &&
            leaderTel.current.value &&
            leaderTel.current.value !== data?.leaderTel
         )
            formData.leaderTel = leaderTel.current.value;
         if (
            companyName.current &&
            companyName.current.value &&
            companyName.current.value !== data?.companyName
         )
            formData.companyName = companyName.current.value;
         if (
            companyTel.current &&
            companyTel.current.value &&
            companyTel.current.value !== data?.companyTel
         )
            formData.companyTel = companyTel.current.value;
         if (
            companyAddress.current &&
            companyAddress.current.value &&
            companyAddress.current.value !== data?.companyAddress
         )
            formData.companyAddress = companyAddress.current.value;
         if (
            reference.current &&
            reference.current.value &&
            reference.current.value !== data?.reference
         )
            formData.reference = reference.current.value;
         return formData;
      },
   }));

   return (
      <div className={classes['form__upper-area']}>
         <div className={classes['form__upper-area__left']}>
            <div>
               <label htmlFor="name">*Group Name</label>
               <input
                  type="text"
                  style={{ width: '80px' }}
                  ref={groupName}
                  defaultValue={mode !== 'create' ? data.groupName : ''}
               />
               <input
                  type="text"
                  placeholder="Group No."
                  readOnly
                  style={{
                     backgroundColor: 'lightgray',
                     width: '70px',
                  }}
                  defaultValue={mode !== 'create' ? data.groupRsvnId : ''}
               />
            </div>
            <div>
               <label htmlFor="account">*Account</label>
               <input
                  type="text"
                  style={{ width: '80px', marginLeft: '30px' }}
                  ref={account}
               />
               <input
                  type="text"
                  placeholder="Account No."
                  readOnly
                  style={{
                     backgroundColor: 'lightgray',
                     width: '70px',
                  }}
               />
            </div>
            <div>
               <label htmlFor="deposit">&nbsp;Deposit No.</label>
               <input
                  type="text"
                  placeholder="Deposit No."
                  readOnly
                  style={{
                     backgroundColor: 'lightgray',
                     width: '70px',
                     marginLeft: '11px',
                  }}
               />
            </div>
            <div>
               <label htmlFor="arrDate">*Arr Date</label>
               <input
                  type="text"
                  style={{ width: '80px', marginLeft: '9.5px' }}
                  ref={arrivalDate}
                  defaultValue={mode !== 'create' ? data.arrivalDate : ''}
               />
               <label
                  htmlFor="arrTime"
                  style={{ marginLeft: '10px' }}
                  ref={arrivalTime}
                  defaultValue={mode !== 'create' ? data.arrivalTime : ''}
                  onChange={onDateChange}
               >
                  Arr Time
               </label>
               <input
                  type="text"
                  style={{ width: '35px' }}
                  defaultValue={mode !== 'create' ? data.arrivalTime : ''}
               />
            </div>
            <div>
               <label htmlFor="depDate">*Dep Date</label>
               <input
                  type="text"
                  style={{ width: '80px', marginLeft: '3px' }}
                  ref={departureDate}
                  defaultValue={mode !== 'create' ? data.departureDate : ''}
                  onChange={onDateChange}
               />
               <label htmlFor="depTime">Dep Time</label>
               <input
                  type="text"
                  style={{ width: '35px' }}
                  ref={departureTime}
                  defaultValue={mode !== 'create' ? data.departureTime : ''}
               />
               <label htmlFor="nights">Nts</label>
               <input
                  type="text"
                  style={{ width: '15px' }}
                  readOnly
                  defaultValue={
                     nights
                        ? nights.toString()
                        : mode !== 'create'
                        ? data.nights
                        : ''
                  }
               />
            </div>
         </div>
         <div className={classes['form__upper-area__right']}>
            <div>
               <label>Nationality</label>
               <input
                  type="text"
                  style={{ width: '30px' }}
                  ref={nationality}
                  defaultValue={mode !== 'create' ? data.nationality : ''}
               />
            </div>
            <div>
               <label>Leader</label>
               <input
                  type="text"
                  style={{ width: '84px' }}
                  ref={leaderName}
                  defaultValue={mode !== 'create' ? data.leaderName : ''}
               />
               <label style={{ marginLeft: '10px' }}>Leader Tel</label>
               <input
                  type="text"
                  style={{ width: '100px', marginLeft: '18px' }}
                  ref={leaderTel}
                  defaultValue={mode !== 'create' ? data.leaderTel : ''}
               />
            </div>
            <div>
               <label>Company</label>
               <input
                  type="text"
                  style={{ width: '70px' }}
                  ref={companyName}
                  defaultValue={mode !== 'create' ? data.companyName : ''}
               />
               <label style={{ marginLeft: '9px' }}>Company Tel</label>
               <input
                  type="text"
                  style={{ width: '100px' }}
                  ref={companyTel}
                  defaultValue={mode !== 'create' ? data.companyTel : ''}
               />
            </div>
            <div>
               <label>Company Address</label>
               <input
                  type="text"
                  style={{ width: '216px' }}
                  ref={companyAddress}
                  defaultValue={mode !== 'create' ? data.companyAddress : ''}
               />
            </div>
            <div>
               <label>Reference</label>
               <input
                  type="text"
                  style={{ width: '260px' }}
                  ref={reference}
                  defaultValue={mode !== 'create' ? data.reference : ''}
               />
            </div>
         </div>
      </div>
   );
});

export default GroupInformationForm;
