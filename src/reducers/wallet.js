// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_WALLET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });
  default:
    return state;
  }
};

export default walletReducer;
