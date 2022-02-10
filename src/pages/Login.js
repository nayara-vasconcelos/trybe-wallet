import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveEmail } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
  isBtnDisabled: true,
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      this.validateLogin();
    });
  }

  validateLogin = () => {
    const { email, password } = this.state;
    const minLengthPassword = 6;
    // Ref: https://ui.dev/validate-email-address-javascript/
    // const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Ref: http://zparacha.com/validate-email-address-using-javascript-regular-expression
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const isLoginValid = (
      (email.match(EMAIL_REGEX))
      && (password.length >= minLengthPassword)
    );

    this.setState({ isBtnDisabled: !isLoginValid });
  }

  handleSubmit = (event) => {
    const { signIn } = this.props;
    const { email } = this.state;

    event.preventDefault();
    signIn(email);
    // history.push('/carteira');
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          {/* Campo para e-mail */}
          <label htmlFor="email-input">
            e-mail:
            <input
              type="e-mail"
              id="email-input"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
              placeholder="Digite seu email"
              autoComplete="off"
            />
          </label>
          {/* Campo para senha */}
          <label htmlFor="password-input">
            Senha:
            <input
              type="password"
              id="password-input"
              name="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
              placeholder="Digite sua senha"
            />
          </label>
          <button
            type="submit"
            disabled={ isBtnDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
  // history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
