import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
//TODO make importing queries work!
//import CURRENT_USER_QUERY from './User';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      permissions
    }
  }
`;

// TODO add name to the user
// TODO better error handling

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION (
    $email: String!
    $password: String!
  ) {
    signup (
      email: $email,
      password: $password,
    ){
      id
      email
    }
  }
`;

const SignupComponent = (props) => {
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <form
      method="post"
      onSubmit={async(e) => {
        e.preventDefault();
        await signup({
          variables: {
            email,
            password,
          },
        });
        setPassword('');
        setEmail('');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h4>Signup for a account</h4>
        <label>Email:</label>
        <input value={email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input value={password} onChange={handlePasswordChange} />
        <button type="submit">Submitt</button>
        {/*console.log('error:', error)*/}
      </fieldset>
    </form>
  );
};

export default SignupComponent;
