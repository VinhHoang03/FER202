import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  currentUser: null,
  expenses: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id
            ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (user) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });
  const setExpenses = (list) => dispatch({ type: 'SET_EXPENSES', payload: list });
  const addExpense = (item) => dispatch({ type: 'ADD_EXPENSE', payload: item });
  const updateExpense = (item) => dispatch({ type: 'UPDATE_EXPENSE', payload: item });
  const deleteExpense = (id) => dispatch({ type: 'DELETE_EXPENSE', payload: id });

  return (
    <AppContext.Provider value={{ state, login, logout, setExpenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
