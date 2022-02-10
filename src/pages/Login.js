import React from 'react';

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

    this.setState({ [name]: value });
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;
    return (
      <div>
        <h2>Login</h2>
        <form>
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
          <button type="submit" disabled={ isBtnDisabled }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
