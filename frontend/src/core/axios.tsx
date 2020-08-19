import axios from "axios"
import dotenv from "dotenv";

axios.defaults.baseURL = 'http://127.0.0.1:5555/'
axios.defaults.headers = {
    'token': localStorage.token 
}


export default axios