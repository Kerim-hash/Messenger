import axios from 'axios'
import cookie from 'cookie_js'

export const get_token = () => {
    return cookie.get('token')
}

export const instance = axios.create({
    baseURL: `https://messenger-t8b3.vercel.app/`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${get_token()}`,
    },
});

