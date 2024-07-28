import React, { useContext, useState } from 'react'
import ExpensesAPI from '../apis/ExpensesAPI';
import { ExpenseContext } from '../context/ExpenseContext';

const AddExpense = () => {
    const { addExpense } = useContext(ExpenseContext);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await ExpensesAPI.post('/', {
                category,
                description,
                amount,
                date,
            })
            addExpense(response.data.results)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='container mb-4'>
        <form>
            <div className="form-row align-items-center">
                <select className="form-control col mb-2" value={category} onChange={e => setCategory(e.target.value)} >
                    <option value="" disabled>Category</option>
                    <option value="Housing">Housing</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Food">Food</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Health & Medical">Health & Medical</option>
                    <option value="Debt">Debt</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
                <div className="col mb-2">
                    <input type="text" value = {description} onChange={e => setDescription(e.target.value)} className='form-control' placeholder='Description'/>
                </div>
                <div className="col mb-2">
                    <input type="number" value = {amount} onChange={e => setAmount(e.target.value)} className='form-control' placeholder='Amount'/>
                </div>
                <div className="col mb-2">
                    <input type="date" value = {date} onChange={e => setDate(e.target.value)} className='form-control' placeholder='Date' />
                </div>
                <div className='col mb-2'>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block">Add</button>
                </div>
            </div>
            
        </form>
    </div>
  )
}

export default AddExpense