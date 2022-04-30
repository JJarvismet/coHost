import { createSlice, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit';
import tripService from './tripService';


const initialState = {
    trips: [],
    isTripError: false,
    isTripSuccess: false,
    isTripLoading: false,
    tripMessage: '',
    currentTrip: null,
    currentTripLength: null,
    currentName: null,
    currentGuests: null,
    currentBulletin: null,
    isHost: false,
    isAttending: null
}

export const myTrips = createAsyncThunk('trip/myTrips', async (thunkAPI) => {
    try{
        return await tripService.myTrips();
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const getCurrentTrip = createAsyncThunk('trip/getCurrentTrip', async (tripId, thunkAPI) => {
    try{
        return await tripService.currentTrip(tripId);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const planTrip = createAsyncThunk('trip/planTrip', async(tripData, thunkAPI)=>{
    try{
        return await tripService.planTrip(tripData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const setGuests = createAsyncThunk('trip/getGuests', async(guestData, thunkAPI)=>{
    try{
        return await tripService.setGuests(guestData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const setBulletin = createAsyncThunk('trip/getBulletin', async(bulletinData, thunkAPI)=>{
    try{
        return await tripService.setBulletin(bulletinData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const editTrip = createAsyncThunk('trip/editTrip', async(tripData, thunkAPI)=>{
    try{
        return await tripService.editTrip(tripData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const postMark = createAsyncThunk('trip/postToSchedule', async(markData, thunkAPI)=>{
    try{
        return await tripService.postMark(markData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const editMark = createAsyncThunk('trip/postEditToSchedule', async(markData, thunkAPI)=>{
    try{
        return await tripService.editMark(markData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const deleteMark = createAsyncThunk('trip/deleteMark', async(markData, thunkAPI)=>{
    try{
        return await tripService.deleteMark(markData);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const deleteTrip = createAsyncThunk('trip/deleteTrip', async(tripId, thunkAPI)=>{
    try{
        return await tripService.deleteTrip(tripId);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});

export const departTrip = createAsyncThunk('trip/departTrip', async(tripId, thunkAPI)=>{
    try{
        return await tripService.departTrip(tripId);
    }catch(error){
        const tripMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(tripMessage);
    }
});




export const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers:{
        resetTrips:  (state) => {
            state.isTripLoading = false
            state.isTripError = false
            state.isTripSuccess = false
            state.tripMessage = ''
        },
        killList: (state) =>{
            state.trips = []
        },
        killTrip: (state) => {
            state.currentTrip = null
            state.isHost = false
            state.isAttending = null
            state.currentTripLength = null
            state.currentGuests = null
            state.currentName = null
            state.currentBulletin = null
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(myTrips.pending, (state) =>{
                state.isTripLoading = true
            })
            .addCase(myTrips.fulfilled, (state, action)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
                state.trips = action.payload
            })
            .addCase(myTrips.rejected, (state, action) =>{
                state.isTripLoading = false
                state.isTripError = true
                state.tripMessage = action.payload
                state.trips = []
            })

            .addCase(getCurrentTrip.pending, (state) =>{
                state.isTripLoading = true
            })
            .addCase(getCurrentTrip.fulfilled, (state, action)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
                state.currentTrip = action.payload.trip
                state.isHost = action.payload.isHost
                state.isAttending = action.payload.isAttending
                state.currentName = action.payload.trip.name
                state.currentGuests = action.payload.trip.guests
                state.currentBulletin = action.payload.trip.bulletin
                state.currentTripLength = action.payload.length
            })
            .addCase(getCurrentTrip.rejected, (state, action) =>{
                state.isTripLoading = false
                state.isTripError = true
                state.tripMessage = action.payload
            })

            .addCase(planTrip.pending, (state) =>{
                state.isTripLoading = true
            })
            .addCase(planTrip.fulfilled, (state, action)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
            })
            .addCase(planTrip.rejected, (state, action) =>{
                state.isTripLoading = false
                state.isTripError = true
                state.tripMessage = action.payload
            })
            
            .addCase(setGuests.fulfilled, (state, action)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
                state.currentGuests = action.payload.guests
                state.isAttending = action.payload.isAttending
            })
            .addCase(setGuests.rejected, (state, action) =>{
                state.isTripLoading = false
                state.isTripError = true
                state.tripMessage = action.payload
            })

            .addCase(setBulletin.fulfilled, (state, action)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
                state.currentBulletin = action.payload
            })
            .addCase(setBulletin.rejected, (state, action) =>{
                state.isTripLoading = false
                state.isTripError = true
                state.tripMessage = action.payload
            })

            .addCase(editTrip.pending, (state)=>{
                state.isTripLoading = true
            })
            .addCase(editTrip.fulfilled, (state)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
            })
            .addCase(editTrip.rejected, (state) =>{
                state.isTripLoading = false
                state.isTripError = true
            })

            .addCase(postMark.pending, (state)=>{
                state.isTripLoading = true
            })
            .addCase(postMark.fulfilled, (state)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
            })
            .addCase(postMark.rejected, (state) =>{
                state.isTripLoading = false
                state.isTripError = true
            })

            .addCase(editMark.pending, (state)=>{
                state.isTripLoading = true
            })
            .addCase(editMark.fulfilled, (state)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
            })
            .addCase(editMark.rejected, (state) =>{
                state.isTripLoading = false
                state.isTripError = true
            })

            .addCase(deleteTrip.pending, (state)=>{
                state.isTripLoading = true
            })
            .addCase(deleteTrip.fulfilled, (state)=>{
                state.isTripLoading = false
                state.isTripSuccess = true
            })
            .addCase(deleteTrip.rejected, (state) =>{
                state.isTripLoading = false
                state.isTripError = true
            })
    }
})

export const {resetTrips,killList,killTrip} = tripSlice.actions
export default tripSlice.reducer