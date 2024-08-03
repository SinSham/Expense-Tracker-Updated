import React, {useState, createContext} from 'react';

export const ExpenseContext = createContext();

export const ExpenseContextProvider = props => {

    const [ expenses, setExpenses ] = useState([]);

    const addExpense = (expense) => {
        const updatedExpenses = [...expenses, expense];
        updatedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(updatedExpenses);
    }

    return (
        <ExpenseContext.Provider value = {{expenses, setExpenses, addExpense}}>
            {props.children}
        </ExpenseContext.Provider>
    )
}