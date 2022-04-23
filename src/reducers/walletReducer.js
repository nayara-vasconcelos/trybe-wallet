// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  FAILED_REQUEST,
  REQUEST_EXCHANGE_RATES,
  SAVE_EXCHANGE_RATES,
  UPDATE_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_ID,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  selectedExpense: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_EXCHANGE_RATES:
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
  case SAVE_EXCHANGE_RATES:
    return ({
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
      isFetching: false,
      error: '',
    });
  case FAILED_REQUEST:
    return ({
      ...state,
      isFetching: false,
      error: action.error,
    });
  case REMOVE_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      expenses: [
        ...state.expenses.slice(0, action.payload.id),
        action.payload,
        ...state.expenses.slice(action.payload.id + 1),
      ],
      selectedExpense: '',
    });
  case SAVE_ID:
    return ({
      ...state,
      selectedExpense: action.payload,
    });
  default:
    return state;
  }
};

export default walletReducer;
