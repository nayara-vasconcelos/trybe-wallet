// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { FAILED_REQUEST, REQUEST_EXCHANGE_RATE, UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_EXCHANGE_RATE:
    return ({
      ...state,
      isFetching: true,
    });
  case UPDATE_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
      isFetching: false,
      error: '',
    });
  case FAILED_REQUEST:
    return ({
      ...state,
      isFetching: false,
      error: action.error,
    });
  default:
    return state;
  }
};

export default walletReducer;