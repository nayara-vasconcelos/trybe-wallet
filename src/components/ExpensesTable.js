// Ref: https://www.w3schools.com/html/html_tables.asp
// Ref: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/columnheader_role

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense, saveIdExpense } from '../actions';

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

class ExpensesTable extends Component {
  handleDeleteBtn = ({ target }) => {
    const id = parseInt(target.name, 10);
    const { deleteExpense, selectedExpense, selectExpense } = this.props;
    deleteExpense(id);
    if (target.name === selectedExpense) {
      selectExpense('');
    }
  }

  handleEditBtn = ({ target }) => {
    const { selectExpense } = this.props;
    selectExpense(target.name);
  }

  renderTableHeader = () => {
    const titles = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    const tableHeader = titles.map((title) => (
      <th scope="col" key={ title }>{ title }</th>
    ));

    return tableHeader;
  }

  renderTableRows = () => {
    const { expenses } = this.props;

    const tableRows = expenses.map((expense) => {
      const {
        id,
        description,
        tag,
        method,
        value,
        currency,
        exchangeRates,
      } = expense;

      const currencyName = exchangeRates[currency].name;
      const exchangeRate = parseFloat(exchangeRates[currency].ask);
      const convertedValue = (parseFloat(value) * exchangeRate).toFixed(2);

      const cells = [
        description,
        tag,
        method,
        parseFloat(value).toFixed(2),
        'Real',
        exchangeRate.toFixed(2),
        convertedValue,
        currencyName];

      const row = cells.map((cell) => (
        <td key={ cell }>{ cell }</td>
      ));

      return (
        <tr key={ id }>
          { row }
          {/* <td>
            <button type="button" name={ id }>Editar</button>
          </td> */}
          <td>
            <button
              type="button"
              name={ id }
              data-testid="edit-btn"
              onClick={ this.handleEditBtn }
            >
              Editar
            </button>
            <button
              type="button"
              name={ id }
              data-testid="delete-btn"
              onClick={ this.handleDeleteBtn }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return tableRows;
  }

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              { this.renderTableHeader() }
            </tr>
          </thead>
          <tbody>
            { (expenses.length > 0) && this.renderTableRows() }
          </tbody>
        </table>
      </section>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])),
  ),
  deleteExpense: PropTypes.func.isRequired,
  selectExpense: PropTypes.func.isRequired,
  selectedExpense: PropTypes.string,
};

ExpensesTable.defaultProps = {
  expenses: [],
  selectedExpense: '',
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  selectedExpense: state.wallet.selectedExpense,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  selectExpense: (id) => dispatch(saveIdExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
