import { isFunction } from 'App/utils';
import { useEffect, useState } from 'react';

const formMeta = {
  isSubmitting: false,
  errorMessage: '',
  resp: null
};

const validateForm = (inputs) => {
  return Object.entries(inputs).reduce((accum, [inputName, inputState]) => {
    const { validate, value } = inputState;
    const hasError = isFunction(validate) ? !validate(value) : false;

    accum.inputs[inputName] = {
      ...inputState,
      hasError 
    };
    accum.isValid = accum.isValid && !hasError;

    return accum;
  }, {inputs: {}, isValid: true});
};

const resetFormValues = (inputs) => {
  return Object.entries(inputs).reduce((accum, [name, inputState]) => {
    accum[name] = {
      ...inputState,
      value: ''
    };
    return accum;
  }, {});
};

const getFormData = (inputs) => {
  return Object.entries(inputs).reduce((accum, [name, inputState]) => {
    accum[name] = inputState.value;
    return accum;
  }, {});
};

export const useForm = ({ stateSchema, asyncCallback } = {}) => {
  const [inputs, setInputs] = useState(stateSchema || {});
  const [meta, setMeta] = useState(formMeta);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: {
        ...(inputs[name] || {}),
        value
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    const {inputs: formInputs, isValid} = validateForm(inputs);
    setInputs(formInputs);

    if (!isValid) {
      return;
    }
    if (isFunction(asyncCallback)) {
      setMeta({ ...formMeta, isSubmitting: true });
      asyncCallback(getFormData(inputs))
        .then((resp) => {
          setMeta({ ...formMeta, resp, isSubmitting: false });
          resetForm();
        })
        .catch((error) => {
          setMeta({ ...formMeta, errorMessage: error.message, isSubmitting: false });
        });
    }
  };

  const resetForm = () => setInputs(resetFormValues(inputs));

  return {
    inputs,
    meta,
    onInputChange,
    onSubmit,
    resetForm
  }
};

export const useSetPageTitle = (title) => {
  useEffect(() => {
    document.title = `Pelmorex Weather App: ${title}`;
  }, [title]);
};