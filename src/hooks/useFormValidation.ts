import { useState, useCallback } from 'react';
import { TValidity, TValidityBoolean } from '../utils/types';

const useFormValidation = (initialState: any) => {
  const [values, setValues] = useState<TValidity>(initialState);
  const [errors, setErrors] = useState<TValidity>({});
  const [validities, setValidities] = useState<TValidityBoolean>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setValidities({ ...validities, [name]: e.target.validity.valid });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newValidities = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValidities(newValidities);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setValidities, setIsValid],
  );

  return {
    values,
    handleChange,
    errors,
    validities,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormValidation;
