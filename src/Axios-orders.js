import axios from 'axios'

const instance = axios.create({
    baseURL:"https://burgerbuilder-815f6.firebaseio.com/"
})

export default instance; 