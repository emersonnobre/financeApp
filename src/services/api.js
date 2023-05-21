import axios from 'axios';

const baseUrl = 'http://10.0.2.2:5000';

export function getAllExpenses() {
    return axios.get(baseUrl + '/Expense');
}

export function signin(email, password) {}

export function signup(name, email, password) {}