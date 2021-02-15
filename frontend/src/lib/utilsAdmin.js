import React, { useState, useEffect } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
export function usePhotoUpload() {
  const [result, setResult] = useState('');
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState(false);
  const [errorPhotoUpload, setErrorPhotoUpload] = useState(null);

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
