import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, editExpense, fetchCurrencies } from '../actions';

const INITIAL_STATE = {
  id: null,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: null,
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

  componentDidUpdate(prevProps) {
    const { selectedExpense } = this.props;
    if ((selectedExpense !== prevProps.selectedExpense)) {
      this.handleForm();
    }
  }

  getSelectedExpense = () => {
    const { expenses, selectedExpense } = this.props;
    const expenseObj = expenses
      .find((expense) => expense.id === parseInt(selectedExpense, 10));
    this.setState((prevState) => ({
      ...prevState,
      ...expenseObj,
    }));
  }

  handleForm = () => {
    const { selectedExpense } = this.props;
    if (selectedExpense.length > 0) {
      this.getSelectedExpense();
    } else {
      this.setState(INITIAL_STATE);
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleAddBtn = () => {
    const { saveExpense, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    let id = 0;

    if (expenses.length !== 0) {
      id = expenses[(expenses.length - 1)].id + 1;
    }

    saveExpense({ id, value, description, currency, method, tag });
    this.setState(INITIAL_STATE);
  }

  handleUpdateBtn = () => {
    const { updateExpense } = this.props;
    updateExpense({ ...this.state });
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

  renderBtns = () => {
    const { selectedExpense } = this.props;
    if (selectedExpense.length > 0) {
      return (
        <button
          type="button"
          onClick={ this.handleUpdateBtn }
        >
          Editar despesa
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={ this.handleAddBtn }
      >
        Adicionar despesa
      </button>
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
              <option value="Dinheiro">Dinheiro</option>
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
          {/* Botão para salvar ou editar despesa */}
          { this.renderBtns() }
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
  selectedExpense: PropTypes.string,
  updateExpense: PropTypes.func.isRequired,
};

ExpensesForm.defaultProps = {
  expenses: [],
  currencies: [],
  selectedExpense: '',
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  selectedExpense: state.wallet.selectedExpense,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
  requestCurrencies: () => dispatch(fetchCurrencies()),
  updateExpense: (obj) => dispatch(editExpense(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
