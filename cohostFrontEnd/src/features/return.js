import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    returnPoint: null
}

export const returnSlice = createSlice({
    name: 'return',
    initialState,
    reducers:{
        setReturn: (state, returnPoint) =>{
            state.returnPoint = returnPoint.payload
        },
        killReturn:  (state) => {
            state.returnPoint = null
        }
    },
});

export const {setReturn,killReturn} = returnSlice.actions
export default returnSlice.reducer