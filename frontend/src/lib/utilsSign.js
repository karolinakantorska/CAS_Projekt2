import React, { useState } from 'react';
import {
  validateSingin,
  validateForm,
  addErrorMessage,
  removeErrorMessage,
} from '../lib/utilsForm.js';

export function handleSignin(e, email, password, signin) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateSingin(email, password);
  addErrorMessage(errors);
  if (errors.length === 0) {
    signin({
      variables: {
        email,
        password,
      },
    });
  }
}
export function handleSignup(e, email, name, password, signup) {
  e.preventDefault();
  removeErrorMessage();
  const errors = validateForm(email, name, password);
  addErrorMessage(errors);
  if (errors.length === 0) {
    signup({
      variables: {
        email,
        password,
        name,
      },
    });
  }
}
