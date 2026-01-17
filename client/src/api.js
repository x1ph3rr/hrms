import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getEmployees = () => axios.get(`${API_URL}/employees/`);

export const deleteEmployee = (id) => axios.delete(`${API_URL}/employees/${id}/`);

export const addEmployee = (data) => axios.post(`${API_URL}/employees/`, data);

export const markAttendance = (data) => axios.post(`${API_URL}/attendance/`, data);