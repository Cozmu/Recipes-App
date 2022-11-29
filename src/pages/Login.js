import { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const SIX = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailRegex) && password.length > SIX) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <div>
      <label htmlFor="emailInput">
        <input
          data-testid="email-input"
          id="emailInput"
          type="text"
          placeholder="E-mail"
          onChange={ ({ target }) => {
            setEmail(target.value);
          } }
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          data-testid="password-input"
          id="passwordInput"
          placeholder="Senha"
          type="password"
          onChange={ ({ target }) => {
            setPassword(target.value);
          } }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
