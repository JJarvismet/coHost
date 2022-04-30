import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try{
        return await authService.register(user);
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return await thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return await thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try{
        return await authService.logout();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return await thunkAPI.rejectWithValue(message);
    }
});

export const checkUser = createAsyncThunk('auth/checkUser', async (thunkAPI) => {
    try{
        return await authService.checkUser();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return await thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset:  (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.isCompError = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(register.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            .addCase(logout.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = null
            })
            .addCase(logout.rejected, (state, action) =>{
                state.isLoading = false
                state.isCompError = true
                state.message = action.payload
            })
            
            .addCase(checkUser.rejected, (state) =>{
                state.user = null
                state.isCompError = true
                state.message = 'Please login'
            })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer