import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault(); 

    let body = {
      email: Email,
      password: Password,
    };

    Axios.post("/api/login", body)
      .then(response => {
        console.log(response);
        if (response.data.loginSuccess) {
          navigate('/')
        } else {
          alert('Error')
        }
      })  
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      with: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button type='submit'>
          Login
        </button>
      </form>
    </div>
  )
};

export default Login;
