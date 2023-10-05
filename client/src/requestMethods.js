import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGE3NjcxYTM5NWVkZmY0MDE3NTBjZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NTQ0NjI5NSwiZXhwIjoxNjk1NzA1NDk1fQ.d1Af-mnIFeD8__2kbytY6PpOUv_mZnJD8TEy_oURRKA"

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header : { token: `Bearer ${TOKEN}` },
});