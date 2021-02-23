import React, { useState } from 'react';
import { validateSingin, addErrorMessage, removeErrorMessage } from '../lib/utilsForm.js';

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
