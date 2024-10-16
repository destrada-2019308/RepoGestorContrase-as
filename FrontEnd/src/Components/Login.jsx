import React, { useState } from "react";
import styled from "styled-components";
import { useLogin } from "../shared/useLogin";

const Login = () => {

    const [ form, setForm ] = useState({ username: '', password: '' })
    const { login } = useLogin()

    const handleOnSubmit = (e) => {
        e.preventDefault()

        login(form)
    }

  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                name="username" 
                id="username" 
                placeholder="" 
                value={form.username} 
                onChange={(e) => setForm({ ...form, username: e.target.value })} 
                required/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
             
          </div>
          <br />
          <button className="sign">Sign in</button>
        </form>
        <br />

        <p className="signup">
          Don&apos;t have an account?
          <a rel="noopener noreferrer" href="/register" className="">
            Sign up
          </a>
        </p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-container {
  width: 320px;
  border-radius: 0.75rem;
  background-color: #fff;
  padding: 2rem;
  color: #000;
}

.title {
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: #000
}

.form {
  margin-top: 1.5rem;
}

.input-group {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.input-group label {
  display: block;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 4px;
}

.input-group input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  background-color: #fff;
  padding: 0.75rem 1rem;
  color: #000;
}

.input-group input:focus {
  border-color: #000;
}

.forgot {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(0, 0, 0,1);
  margin: 8px 0 14px 0;
}

.forgot a,.signup a {
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  font-size: 14px;
}

.forgot a:hover, .signup a:hover {
  text-decoration: underline rgba(167, 139, 250, 1);
}

.sign {
  display: block;
  width: 100%;
  background-color: rgba(167, 139, 250, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(0, 0, 0, 1);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
}

.social-message {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}

.line {
  height: 1px;
  flex: 1 1 0%;
  background-color: rgba(0, 0, 0, 1);
}

.social-message .message {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(156, 163, 175, 1);
}

.social-icons {
  display: flex;
  justify-content: center;
}

.social-icons .icon {
  border-radius: 0.125rem;
  padding: 0.75rem;
  border: none;
  background-color: transparent;
  margin-left: 8px;
}

.social-icons .icon svg {
  height: 1.25rem;
  width: 1.25rem;
  fill: #fff;
}

.signup {
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(0, 0, 0, 1);
}

`;

export default Login;
