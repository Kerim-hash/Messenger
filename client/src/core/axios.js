import axios from 'axios'
import cookie from 'cookie_js'

export const get_token = () => {
    return cookie.get('token')
}

export const instance = axios.create({
    baseURL: `http://localhost:5000`,
    // baseURL: `https://users-2020.herokuapp.com/`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get_token()}`,
    },
});

