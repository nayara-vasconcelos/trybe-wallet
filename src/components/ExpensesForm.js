import React, { Component } from 'react';

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
  currency: '',
  method: '',
  tag: '',
};

export default class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
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
            name="expense"
            value={ value }
          />
          {/* Campo para descrição da despesa */}
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }

          />
          {/* Campo para escolher moeda */}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
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
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}
