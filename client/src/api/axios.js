import axios from 'axios';

const httpsRequest = axios.create({
    baseURL:"http://localhost:8800/api",
    withCredentials : true
})

export default httpsRequest;