import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRegister } from "../shared/useRegister";

const Register = () => {

    const [ form, setForm ] = useState({ 
        nameUser: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
        password: '',  
        state: '', 
    })

      console.log(form.password)
    const { register } = useRegister()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(form.password)
        register(form)
    }

 
  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleOnSubmit}>
        <p className="title">SunnyVault </p> 
        <div className="flex">
          <label>
            <input 
                required 
                placeholder="" 
                type="text" 
                className="input"
                name="nameUser"
                value={form.nameUser}
                onChange={(e) => setForm({ ...form, nameUser: e.target.value })} />
            <span>Firstname</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" name="lastname" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input required placeholder="" type="text" className="input" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <span>Username</span>
        </label>
        <label>
          <input required placeholder=" " type="email" className="input" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}  />
          <span>Email</span>
        </label>

        
        <label>
          <input required placeholder="" type="number" className="input" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <span>Phone</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <span>Password</span>
        </label>

        <label>
            <select name="state" id="" className="input" key={form.state} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}>
                <option value="">Selecciona el estado</option> 
                <option value="ENABLE">Activo</option> 
                <option value="DISABLE">Inactivo</option> 
            </select>
            <span>Estado</span>
        </label>

        <button className="submit">Submit</button>
        <p className="signin">
          Ya tienes cuenta? <a href="/">Iniciar sesión</a>{" "}
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.title {
  font-size: 28px;
  color: royalblue;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.title::before,.title::after {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  border-radius: 50%;
  left: 0px;
  background-color: royalblue;
}

.title::before {
  width: 18px;
  height: 18px;
  background-color: royalblue;
}

.title::after {
  width: 18px;
  height: 18px;
  animation: pulse 1s linear infinite;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 30px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
}

@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
`;

export default Register;
