import axios from 'axios'

const register = async(userData) => {
    const response = await axios.post('/api/user/register', userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = async() => {
    const response = await axios.get('/api/user/logout');
    if(response.data){
        localStorage.removeItem('user');
    }
    return response.data;
}

const login = async(userData) => {
    const response = await axios.post('/api/user/login', userData);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const checkUser = async() => {
    const response = await axios.get('/api/user/checkUser');
    if(!response.data && JSON.parse(localStorage.getItem('user'))){
        localStorage.removeItem('user');
    }
    return response.data;
}

const authService={
    register,
    login,
    logout,
    checkUser
}

export default authService;