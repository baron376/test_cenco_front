import axios from 'axios'
import {logOut} from '../util/auth';
import env from "react-dotenv";
export default function api(history) {
    const api = axios.create({
        baseURL: env.REACT_APP_BASE_URL,
        withCredentials: true
    })

    /*api.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            logOut(history)
            return Promise.reject('no autorizado')
        }
        return Promise.reject(error)
    })*/

    return api
}