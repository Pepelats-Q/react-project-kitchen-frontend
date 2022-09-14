import React, { useState, useCallback } from 'react';
import { TValidity } from '../utils/types';
import useTranslate from './useTranslate';

const useFormValidation = (initialState: { [key: string]: string }) => {
  const [values, setValues] = useState<TValidity>(initialState);
  const [errors, setErrors] = useState<any>({});
  const [validities, setValidities] = useState<any>({});
  const [isValid, setIsValid] = useState(false);
  const localization = useTranslate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setValidities({ ...validities, [name]: e.target.validity.valid });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (!errors[name] && !validities[name]) {
      setErrors({ ...errors, [name]: localization({ page: 'authForm', key: 'requiredField' }) });
      setValidities({ ...validities, [name]: e.target.validity.valid });
    }
  };

  const handleSubmitBlur = (e: any) => {
    const requiredFieldText = localization({ page: 'authForm', key: 'requiredField' });
    const allInputs: Array<any> = Array.from(
      e.target.closest('form').getElementsByTagName('input'),
    );
    const allRequiredInputs = allInputs.filter((item) => item.required);
    let addToErrors = {};
    let addToValidities: any = {};

    allRequiredInputs.forEach((requiredInput) => {
      const errorName: any = errors[requiredInput.name];
      const validitiesName: any = validities[requiredInput.name];

      if (!errorName && !validitiesName) {
        addToErrors = {
          ...addToErrors,
          [requiredInput.name]: requiredFieldText,
        };
        addToValidities = {
          ...addToValidities,
          [requiredInput.name]: requiredInput.validity.valid,
        };
      }
    });
    setErrors({ ...errors, ...addToErrors });
    setValidities({ ...validities, ...addToValidities });
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
    handleBlur,
    errors,
    validities,
    isValid,
    resetForm,
    setValues,
    setValidities,
    setIsValid,
    handleSubmitBlur,
  };
};

export default useFormValidation;
