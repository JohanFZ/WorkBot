import React from 'react';
import { Input } from 'reactstrap';

const InputGlobal = ({ label, name, defaultValue, type, required, readOnly }) => {
  return (
    <label htmlFor={name} className='my-3 input-global'>
      <p className='label'>{label}</p>
      <Input
        required={required}
        type={type}
        name={name}
        className='input'
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </label>
  )
}

export default InputGlobal;
