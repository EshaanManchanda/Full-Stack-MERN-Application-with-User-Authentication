import React, { forwardRef } from 'react';
import { FormInputProps } from '../types';

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = 'text', error, ...props }, ref) => {
    const id = props.id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id={id}
          {...props}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput; 