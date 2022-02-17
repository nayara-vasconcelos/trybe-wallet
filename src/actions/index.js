// Coloque aqui suas actions

export const SAVE_USER_EMAIL = 'SAVE_EMAIL';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const REQUEST_EXCHANGE_RATE = 'REQUEST_EXCHANGE_RATE';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const saveEmail = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

const requestAPI = () => ({
  type: REQUEST_EXCHANGE_RATE,
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
