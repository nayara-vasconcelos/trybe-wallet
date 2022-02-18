import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../actions';

/**
 * Formato no Redux:
 *
 * expenses: [{
  "id": 0,
  "value": "3",
  "description": "Hot Dog",
  "currency": "USD",
  "method": "Dinheiro",
  "tag": "Alimentação",
  "exchangeRates": {
    "USD": {
      "code": "USD",
      "name": "Dólar Americano",
      "ask": "5.6208",
      ...
    },
  }]
  *
 */

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleAddBtn = () => {
    const { saveExpense, expenses } = this.props;
    let id = 0;

    if (expenses.length !== 0) {
      id = expenses[(expenses.length - 1)].id + 1;
    }

    saveExpense({ id, ...this.state });
    this.setState(INITIAL_STATE);
  }

  renderCurrencySelect = () => {
    const { currency } = this.state;
    const { currencies } = this.props;

    const currencyOptions = currencies.map((option) => (
      <option
        key={ option }
        value={ option }
        data-testid={ option }
      >
        { option }
      </option>
    ));

    return (
      <label htmlFor="moeda">
        Moeda:
        <select
          name="currency"
          id="moeda"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.handleChange }
        >
          { currencyOptions }
        </select>
      </label>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    const { currencies } = this.props;

    return (
      <section>
        <form>
          {/* Campo para valor da despesa */}
          <label htmlFor="despesa">
            Despesa:
            <input
              type="number"
              id="despesa"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          {/* Campo para descrição da despesa */}
          <label htmlFor="descricao">
            Descrição:
            <input
              type="text"
              id="descricao"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          {/* Campo para escolher moeda */}
          { (currencies.length > 0) && this.renderCurrencySelect() }
          {/* Campo para escolher método de pagamento */}
          <label htmlFor="metodo">
            Método de pagamento:
            <select
              name="method"
              id="metodo"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro'">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          {/* Campo para escolher a categoria da despesa */}
          <label htmlFor="categoria">
            Categoria:
            <select
              name="tag"
              id="categoria"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {/* Botão para salvar despesas */}
          <button
            type="button"
            onClick={ this.handleAddBtn }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

ExpensesForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]))),
  currencies: PropTypes.arrayOf(PropTypes.string),
  requestCurrencies: PropTypes.func.isRequired,
};

ExpensesForm.defaultProps = {
  expenses: [],
  currencies: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
  requestCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
