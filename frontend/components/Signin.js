import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Signin = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    return (
      <section>
        <h4>Sign In:</h4>
        <label>Name:</label>
        <input value={name} onChange={handleNameChange} />
        <label>Email:</label>
        <input value={email} onChange={handleEmailChange} />
      </section>
    );
}

export default Signin;