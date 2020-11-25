import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { FormField } from '@rmwc/formfield';
import SIGNIN_MUTATION from '../../graphgl/mutations/SIGNIN_MUTATION';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';
import { Card } from '@rmwc/card';
import { StyledFieldset } from '../styles/StyledForm';

const Signin = (props) => {
  const [signin, { loading, error, data }] = useMutation(
    SIGNIN_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <Card>
      <form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          await signin({
            variables: {
              password,
              email,
            },
          });
          setPassword('');
          setEmail('');
          router.push('/guides');
        }}
      >
        <StyledFieldset disabled={loading} aria-busy={loading}>
          <h4>Signin into your account:</h4>
          <p>{error}</p>
          <label>Email:</label>
          <input value={email} onChange={handleEmailChange} />
          <label>Password:</label>
          <input value={password} onChange={handlePasswordChange} />
          <button type="submit">Submitt</button>
        </StyledFieldset>
      </form>
    </Card>
  );
};

export default Signin;
