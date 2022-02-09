// Coloque aqui suas actions

export const SAVE_USER_EMAIL = 'SAVE_EMAIL';
export const SAVE_WALLET_EXPENSES = 'SAVE_WALLET_EXPENSES';

export const saveEmail = (payload) => ({
  type: SAVE_USER_EMAIL,
  payload,
});

export const saveExpenses = (payload) => ({
  type: SAVE_WALLET_EXPENSES,
  payload,
});
