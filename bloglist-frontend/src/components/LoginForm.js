import { useState } from 'react';
import PropTypes from 'prop-types';
const LoginForm = ({ loginFormSubmit, user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (user === null) {
    return (
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '7em',
          gap: '.3em',
        }}
      >
        <label>
          UserName:
          <input
            type={'text'}
            name={'username'}
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type={'password'}
            name={'password'}
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button onClick={(e) => loginFormSubmit(e, username, password)}>
          Login
        </button>
      </form>
    );
  } else {
    setPassword('');
    setUsername('');
  }
};
LoginForm.propTypes = {
  loginFormSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
