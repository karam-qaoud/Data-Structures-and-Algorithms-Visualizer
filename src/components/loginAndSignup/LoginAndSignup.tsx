import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function LoginAndSignup({
  logUser,
}: {
  logUser: (boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userHasAccount, setUserHasAccount] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/login', {
        email,
        password,
      })
      .then(function (response) {
        Swal.fire(response.data, '', 'success').then(function () {
          logUser(true);
        });
      })
      .catch(function (error) {
        Swal.fire('Incorrect email or password', '', 'error');
      });
  };
  return userHasAccount ? (
    <div className="login-signup">
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <label className="login-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="btn-white-background" type="submit">
          Log in
        </button>
        <p>
          Don't have an account?{' '}
          <a onClick={() => setUserHasAccount(false)}>Sign up!</a>
        </p>
      </form>
    </div>
  ) : (
    <div className="sing-up"></div>
  );
}
