import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';

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

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleAddBtn = () => {
    console.log('chamou botão');
    const { saveExpense, expenses } = this.props;
    let id = 0;

    if (expenses.length !== 0) {
      id = expenses[(expenses.length - 1)].id + 1;
    }

    saveExpense({ id, ...this.state });
    this.setState(INITIAL_STATE);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;

    return (
      <section>
        <form>
          {/* Campo para valor da despesa */}
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
          {/* Campo para descrição da despesa */}
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          {/* Campo para escolher moeda */}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="ARS">ARS</option>
            <option value="BTC">BTC</option>
            <option value="LTC">LTC</option>
            <option value="JPY">JPY</option>
            <option value="CHF">CHF</option>
            <option value="AUD">AUD</option>
            <option value="CNY">CNY</option>
            <option value="ILS">ILS</option>
            <option value="ETH">ETH</option>
            <option value="XRP">XRP</option>
          </select>
          {/* Campo para escolher método de pagamento */}
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro'">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          {/* Campo para escolher a categoria da despesa */}
          <select
            name="tag"
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
};

ExpensesForm.defaultProps = {
  expenses: [],
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
