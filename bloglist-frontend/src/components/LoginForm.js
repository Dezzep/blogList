const LoginForm = ({
  loginFormSubmit,
  handleUsernameChange,
  handlePasswordChange,
  password,
  username,
  user,
}) => {
  const buttonSubmitHandler = (e) => {
    loginFormSubmit(e);
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
        <button onClick={(e) => buttonSubmitHandler(e)}>Login</button>
      </form>
    );
  }
};

export default LoginForm;
