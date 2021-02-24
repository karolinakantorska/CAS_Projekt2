import React, { useState } from 'react';
import { validateForm, addErrorMessage, removeErrorMessage } from '../lib/utilsForm.js';

export function handleAddGuide(
  e,
  password,
  email,
  name,
  surname,
  description,
  result,
  add_guide,
) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateForm(email, name, password);
  addErrorMessage(errors);
  if (errors.length === 0) {
    add_guide({
      variables: {
        password,
        email,
        name,
        surname,
        description,
        photo: result,
      },
    });
  }
}
export function handleEditGuide(
  e,
  id,
  email,
  name,
  surname,
  description,
  result,
  updateUser,
) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateForm(email, name);
  addErrorMessage(errors);
  if (errors.length === 0) {
    updateUser({
      variables: {
        id,
        email,
        name,
        surname,
        description,
        photo: result,
      },
    });
  }
}
