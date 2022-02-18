import React from 'react';

import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <ExpensesForm />
          <ExpensesTable />
        </main>
      </>);
  }
}

export default Wallet;
