import React, { useState, useEffect } from 'react';

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
export function usePhotoUpload(initialValue = '') {
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
      data.append('upload_preset', 'MTBregistration');
      const cloudinaryRes = await fetch(
        'https://api.cloudinary.com/v1_1/karolinauploads/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
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
// form validation
export const regexCheckEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
export const regexCheckPassword = /^[^ ]{8,32}$/;
export const regexCheckName = /^.{2,12}$/;
export const messageWrongPassword = `The password should be longer than 8 signs. Space is not alowed.`;
export const messageWrongName = `The name must be longer than 2 and shorter than 12 signs.`;

export function validateForm(email, name, password = 'correctPass') {
  console.log('email', email, 'password', password, 'name', name);
  const errors = [];
  if (!regexCheckEmail.test(email) || email === '') {
    errors.push(`The: ${email} is not a valid email adresse.`);
  }
  if (!regexCheckPassword.test(password) || password === '') {
    errors.push(messageWrongPassword);
  }
  if (!regexCheckName.test(name) || name === '') {
    errors.push(messageWrongName);
  }
  return errors;
}
export function validateSingin(email, password) {
  console.log('email', password, 'name', name);
  const errors = [];
  if (!regexCheckEmail.test(email) || email === '') {
    errors.push(`The: ${email} is not a valid email adresse.`);
  }
  if (!regexCheckPassword.test(password) || password === '') {
    errors.push(messageWrongPassword);
  }
  return errors;
}
export function addErrorMessage(errors) {
  if (errors.length > 0) {
    const errorContainer = document.querySelector(`.error_div`);
    errors.map((error) =>
      errorContainer.insertAdjacentHTML('beforeend', `<p>${error}</p>`),
    );
  }
}
export function removeErrorMessage() {
  document.querySelector(`.error_div`).innerHTML = '';
}

export function validateFormBookingConfirmation(time) {
  if (!time || time === '') {
    return ['Please enter the time.'];
  }
  return [];
}
