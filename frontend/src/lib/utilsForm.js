import React, { useState, useEffect, useRef } from 'react';

// form validation
const regex = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
  password: /^[^ ]{8,32}$/,
  name: /^.{2,12}$/,
  phone: /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/,
};
const formInfo = {
  email: `It is not a valid email adresse.`,
  password: `The password should be longer than 8 signs. Space is not allowed.`,
  name: `The name must be longer than 2 and shorter than 12 signs.`,
  phone: `This is not a valid swiss mobile number. Try this pattern: +41 12 345 67 89.`,
};
function validate(inputs) {
  let errors = {};
  for (const [input, value] of Object.entries(inputs)) {
    if (value.required) {
      if (!regex[input].test(value.textValue)) {
        errors = { ...errors, [input]: formInfo[input] };
      }
    }
  }
  //console.log(errors);
  return errors;
}
// Form
export function useForm(callback, initialInputs, loading = false) {
  const [inputs, setInputs] = useState(initialInputs);
  const [errorInput, setErrorInput] = useState({});
  const [valid, setValid] = useState(false);
  useEffect(() => {
    setInputs(initialInputs);
  }, [loading]);
  useEffect(() => {
    if (Object.keys(errorInput).length === 0 && valid) {
      callback();
    }
  }, [errorInput]);
  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: { textValue: e.target.value, required: e.target.required },
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
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
export function useSwich(initialValues, loading = false) {
  const [switchValues, setSwitchValues] = useState(initialValues);
  useEffect(() => {
    setSwitchValues(initialValues);
  }, [loading]);
  function handleSwitch(e) {
    //console.log(e);
    setSwitchValues({
      ...switchValues,
      [e.target.name]: !switchValues[e.target.name],
    });
  }
  return {
    switchValues,
    handleSwitch,
  };
}
export function useCheckBoxes(initialValues, loading = false) {
  const [checkedOptions, setCheckedOptions] = useState(initialValues);
  useEffect(() => {
    setCheckedOptions(initialValues);
  }, [loading]);

  function handleChecked(e) {
    if (e.target.checked) {
      setCheckedOptions([...checkedOptions, e.target.value]);
    } else {
      setCheckedOptions(checkedOptions.filter((item) => item !== e.target.value));
    }
  }
  return {
    checkedOptions,
    handleChecked,
  };
}

export function useGuidesInput(initialValue) {
  const [guide, setGuide] = useState(initialValue);
  function handleChangeGuide1(e) {
    const eventText = e.target.value.split(' ');
    const eventId = eventText[0];
    const eventName = eventText[1];
    setGuide({
      guide: { id: eventId, name: eventName },
    });
  }
  return {
    guides,
    handleChangeGuide,
  };
}

export function useFormInput(initialValue, loading = false) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [loading]);

  function handleChange(e) {
    //console.log('e.target.value', e.target.value);
    setValue(e.target.value);
  }
  return {
    value,
    handleChange,
  };
}

// upload a photo
export function usePhotoUpload(initialValue, urlPhoto, uploadPreset) {
  const [result, setResult] = useState(initialValue);
  const [loadingPhotoUpload, setLoadingPhotoUpload] = useState(false);
  const [errorPhotoUpload, setErrorPhotoUpload] = useState(null);
  //useEffect(() => {
  // setResult(initialValue);
  //}, [initialValue]);
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
//TODO do this with required
export function validateFormBookingConfirmation(time) {
  if (!time || time === '') {
    return ['Please enter the time.'];
  }
  return [];
}
export function arrayFromObject(object) {
  let array = [];
  for (const [key, value] of Object.entries(object)) {
    array.push({ [key]: value });
  }
  return array;
}
