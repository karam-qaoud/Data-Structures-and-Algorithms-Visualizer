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
  return (
    <div className="login-signup">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
