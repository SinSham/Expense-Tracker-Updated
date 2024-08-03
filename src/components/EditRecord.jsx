import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ExpensesAPI from '../apis/ExpensesAPI';

export const EditRecord = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await ExpensesAPI.get(`/expenses/${id}`);
                setCategory(response.data.data.Expense[0].category);
                setDescription(response.data.data.Expense[0].description);
                setAmount(response.data.data.Expense[0].amount);
                const formattedDate = response.data.data.Expense[0].date.split('T')[0];
                setDate(formattedDate);
            } catch (err){
                console.log(err);
            }
            
        }

        fetchData();

    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ExpensesAPI.put(`/expenses/${id}`, {
            category,
            description,
            amount,
            date,
        })
        navigate('/');
    }

  return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select className="form-control form-select" value={category} onChange={e => setCategory(e.target.value)} >
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
            </div>
            <div className='form-group'>
                <label htmlFor="description">Description</label>
                <input type="text" value = {description} onChange={e => setDescription(e.target.value)} id = "description" className='form-control'/>
            </div>
            <div className='form-group'>
                <label htmlFor="amount">Amount</label>
                <input type="number" value = {amount} onChange={e => setAmount(e.target.value)} id = "amount" className='form-control'/>
            </div>
            <div className='form-group'>
                <label htmlFor="date">Date</label>
                <input type="date" value = {date} onChange={e => setDate(e.target.value)} id = "date" className='form-control'/>
            </div>
            <div>
                <button onClick={handleSubmit} className='btn btn-primary' type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}
