import React, { useState, useEffect } from 'react';

// form validation
const regex = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
  password: /^[^ ]{8,32}$/,
  name: /^.{2,12}$/,
};
const formInfo = {
  email: `It is not a valid email adresse.`,
  password: `The password should be longer than 8 signs. Space is not allowed.`,
  name: `The name must be longer than 2 and shorter than 12 signs.`,
};

function validate(inputs) {
  let errors = {};
  for (const [input, value] of Object.entries(inputs)) {
    if (value.required) {
      if (value.textValue === '') {
        errors = { ...errors, [input]: ` ${input} is required` };
      } else if (regex[input]) {
        if (!regex[input].test(value.textValue)) {
          errors = { ...errors, [input]: formInfo[input] };
        }
      }
    }
  }
  return errors;
}
// Form
export function useForm(callback, initialInputs) {
  const [inputs, setInputs] = useState(initialInputs);
  const [errorInput, setErrorInput] = useState({});
  const [valid, setValid] = useState(false);
  useEffect(() => {
    //setInputs(initialInputs);
  }, [initialInputs]);
  useEffect(() => {
    if (Object.keys(errorInput).length === 0 && valid) {
      callback();
    }
  }, [errorInput]);
  function handleChange(e) {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: { textValue: e.target.value, required: e.target.required },
    });
  }
  function handleSubmit(e) {
    if (e) e.preventDefault();
    setValid(true);
    setErrorInput(validate(inputs));
  }
  return {
    inputs,
    handleChange,
    handleSubmit,
    errorInput,
  };
}
// upload a photo
export function usePhotoUpload(initialValue = '', urlPhoto, uploadPreset) {
  const [result, setResult] = useState(initialValue);
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState(false);
  const [errorPhotoUpload, setErrorPhotoUpload] = useState(null);

  useEffect(() => {
    setResult(initialValue);
  }, [initialValue]);

  async function uploadPhoto(e) {
    try {
      setLoadingPhotoUpload(true);
      const data = new FormData();
      data.append('file', e.target.files[0]);
      data.append('upload_preset', uploadPreset);
      const cloudinaryRes = await fetch(urlPhoto, {
        method: 'POST',
        body: data,
      });
      const response = await cloudinaryRes.json();
      if (response.error) {
        setErrorPhotoUpload(response.error.message);
      } else {
        setErrorPhotoUpload(null);
      }
      setResult(response.secure_url);
      setLoadingPhotoUpload(false);
    } catch (response) {
      setLoadingPhotoUpload(false);
      setErrorPhotoUpload('error');
    }
  }
  return { result, uploadPhoto, loadingPhotoUpload, errorPhotoUpload };
}
export function validateFormBookingConfirmation(time) {
  if (!time || time === '') {
    return ['Please enter the time.'];
  }
  return [];
}
