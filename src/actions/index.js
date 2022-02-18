// Coloque aqui suas actions

export const SAVE_USER_EMAIL = 'SAVE_EMAIL';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE_EXCHANGE_RATES = 'SAVE_EXCHANGE_RATES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const saveEmail = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

const requestAPI = () => ({
  type: REQUEST_EXCHANGE_RATES,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

export const addExpense = (payload) => (dispatch) => { // thunk declarado
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((exchangeRates) => dispatch(updateExpenses({ ...payload, exchangeRates })))
    .catch((error) => dispatch(failedRequest(error)));
};

const saveCurrencies = (payload) => ({
  type: SAVE_EXCHANGE_RATES,
  payload,
});

export const fetchCurrencies = () => (dispatch) => { // thunk declarado
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((exchangeRates) => dispatch(saveCurrencies(exchangeRates)))
    .catch((error) => dispatch(failedRequest(error)));
};

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
