import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';

const LoginPage = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = () => {
    try {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log('Registration successful!');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='LoginPage'>
      <div>login</div>
      <input
        placeholder='Username'
        type='text'
        className='LoginPage-username'
        onChange={(event) => setRegisterEmail(event.target.value)}
      />
      <input
        placeholder='Password'
        type='text'
        className='LoginPage-password'
        onChange={(event) => setRegisterPassword(event.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default LoginPage;
