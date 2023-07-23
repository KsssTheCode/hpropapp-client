import { useState } from 'react';
import Select from 'react-select';

import classes from './MultiDropdown.modules.css';

const Dropdown = (props) => {
   const [selectedValues, setSelectedValues] = useState();

   let placeholderValue = null;
   const datas = props.data.map((d) => {
      let dataSet = {};
      switch (props.optionName) {
         case 'rateTypeCodes':
            dataSet = { value: d.rateTypeCode, label: d.rateTypeCode };
            placeholderValue = 'Rate Type';
            break;
         case 'roomTypeCodes':
            dataSet = { value: d.roomTypeCode, label: d.roomTypeName };
            placeholderValue = 'Room Type';
            break;
         case 'status':
            dataSet = { value: d.statusCode, label: d.statusCode };
            placeholderValue = 'Status';
            break;
         case 'memberships':
            dataSet = { valued: d.membershipName, label: d.membershipName };
            placeholderValue = 'Membership';
            break;
         case 'createStaff':
            dataSet = { value: d.staffId, label: d.name };
            placeholderValue = 'Created By';
            break;
         case 'checkInStaff':
            dataSet = { value: d.staffId, label: d.name };
            placeholderValue = 'Check-in By';
            break;
         case 'checkOutStaff':
            dataSet = { value: d.staffId, label: d.name };
            placeholderValue = 'Check-out By';
            break;
         case 'roomType':
            dataSet = { value: d.roomTypeCode, label: d.roomTypeName };
            placeholderValue = 'Room Type';
            break;
         case 'floor':
            dataSet = { value: d, label: d };
            placeholderValue = 'Floor';
            break;
         case 'cleanStatus':
            dataSet = { value: d.cleanStatusCode, label: d.statusName };
            placeholderValue = 'Clean Status';
            break;
         default:
      }
      return dataSet;
   });

   const customStyles = {
      control: (provided) => ({
         ...provided,
         width: '100%',
         minHeight: '25px',
         margin: '2px 0',
      }),
      menu: (provided) => ({
         ...provided,
         width: '100%',
         minHeight: '120px',
         overflowY: 'auto',
      }),
   };

   const onChangeSelectionHandler = (selectedOptions) => {
      props.onSelectChange(selectedOptions, props.optionName);
   };

   return (
      <Select
         isMulti
         placeholder={placeholderValue}
         name={props.optionName}
         options={datas}
         className={classes['basic-multi-select']}
         classNamePrefix="select"
         styles={customStyles}
         value={selectedValues}
         onChange={onChangeSelectionHandler}
      />
   );
};

export default Dropdown;
