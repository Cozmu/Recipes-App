import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import teste from '../img/picwish.png';
// import { useHistory } from 'react-router-dom';

function Login({ history }) {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const SIX = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.email.match(emailRegex) && password.length > SIX) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleSubmite = () => {
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/meals');
  };

  return (
    <div className="loginInitial">
      <img src={ teste } alt="logo" className="logo" />
      <label htmlFor="emailInput">
        <input
          data-testid="email-input"
          className="inputEmailCss"
          id="emailInput"
          type="text"
          placeholder="E-mail"
          onChange={ ({ target }) => {
            setEmail({
              email: target.value,
            });
          } }
        />
      </label>
      <label htmlFor="passwordInput">
        <input
          className="inputSenhaCss"
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
        onClick={ handleSubmite }
        className="btnCss"
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
