import axios from 'axios';

//connecting frontend to backend
export default axios.create({
    baseURL: 'http://localhost:4000/api/v1/expenses'
})