import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    console.log(expenses);
    if (expenses.length === 0) return '0.00';

    const sum = expenses.reduce((acc, curr) => acc + curr, 0).toFixed(2);
    console.log(sum);
    return sum;
  }

  render() {
    const { userEmail } = this.props;
    const totalExpenses = this.sumExpenses();

    return (
      <header>
        <div data-testid="email-field">
          { userEmail }
        </div>
        <div data-testid="total-field">
          { totalExpenses }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number),
};

Header.defaultProps = {
  expenses: 0.00,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);