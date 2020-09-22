import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';


const SignupPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <fieldset>
      <h4>Signup!</h4>
      <label>Name:</label>
      <input value={name} onChange={handleNameChange} />
      <label>Email:</label>
      <input value={email} onChange={handleEmailChange} />
    </fieldset>
  );
};

export default SignupPage;
