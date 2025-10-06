import { useState } from "react";

export const useForm = (initialValues, validateFn) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const { errors: newErrors } = validateFn({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const { errors: newErrors } = validateFn({ ...values, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] || "" }));
  };

  const validateAll = () => {
    const { isValid, errors: newErrors } = validateFn(values);
    setErrors(newErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    setErrors,
    setTouched,
  };
};
