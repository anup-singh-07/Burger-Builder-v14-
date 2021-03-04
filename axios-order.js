import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-builder-82a5d.firebaseio.com/'

})

export default instance;