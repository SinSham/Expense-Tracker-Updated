import React, {useState, createContext} from 'react';

export const ExpenseContext = createContext();

export const ExpenseContextProvider = props => {

    const [ expenses, setExpenses ] = useState([]);

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    }

    return (
        <ExpenseContext.Provider value = {{expenses, setExpenses, addExpense}}>
            {props.children}
        </ExpenseContext.Provider>
    )
}