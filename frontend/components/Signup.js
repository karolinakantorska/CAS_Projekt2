import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CURRENT_USER_QUERY from '../graphgl/queries/CURRENT_USER_QUERY';
import SIGNUP_MUTATION  from '../graphgl/mutations/SIGNUP_MUTATION';

// TODO better error handling

const Signup = (props) => {
  const [signup, { loading, error, data }] = useMutation(
    SIGNUP_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  return (
    <form
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        await signup({
          variables: {
            email,
            password,
            name,
          },
        });
        setEmail('');
        setPassword('');
        setName('');
        router.push('/guides');
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h4>Signup for a account</h4>
        <label>Name:</label>
        <input value={name} onChange={handleNameChange} />
        <label>Email:</label>
        <input value={email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input value={password} onChange={handlePasswordChange} />
        <button type="submit" >Submitt</button>
      </fieldset>
    </form>
  );
};

export default Signup;
