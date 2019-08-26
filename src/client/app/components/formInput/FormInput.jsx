import React from 'react';
import 'App/components/formInput/formInput.css';

const FormInput = ({ 
  label, 
  value, 
  placeholder, 
  type,
  name,
  onChange,
  onBlur,
  error
} = { 
  type: 'text',
  onBlur: () => {} 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value || ''} 
        onChange={onChange} 
        onBlur={onBlur}
        placeholder={placeholder} 
        />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default FormInput;