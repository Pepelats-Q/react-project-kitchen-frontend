import { useState, useCallback } from 'react';
import { TValidity } from '../utils/typesTs';

function useFormValidation(initialState: any) {
  const [values, setValues] = useState<TValidity>(initialState);
  const [errors, setErrors] = useState<TValidity>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

export default useFormValidation;
