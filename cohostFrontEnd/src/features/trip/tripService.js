import axios from 'axios'

const myTrips = async() => {
    const response = await axios.get('/api/trip/myTrips');
    return response.data;
}

const currentTrip = async(tripId) => {
    const response = await axios.get(`/api/trip/${tripId}`);
    return response.data;
}

const planTrip = async(tripData) => {
    const response = await axios.post('/api/trip/myTrips', tripData);
    return response.data;
}

const setGuests = async(guestData) => {
    const { tripId, attendance } = guestData;
    const response = await axios.post(`/api/trip/${tripId}`, {isAttending: attendance});
    return response.data;
}

const setBulletin = async(bulletinData) => {
    const { tripId, post } = bulletinData;
    const response = await axios.post(`/api/trip/${tripId}`, {post: post});
    return response.data;
}

const editTrip = async(tripData) => {
    const { tripId, tripEdits } = tripData
    const response = await axios.put(`/api/trip/${tripId}`, tripEdits);
    return response.data;
}

const postMark = async(markData) => {
    const { tripId, day, mark } = markData
    const response = await axios.post(`/api/trip/schedule/${tripId}/${day}`, mark);
    return response.data;
}

const editMark = async(markData) => {
    const { tripId, day, mark } = markData
    const response = await axios.put(`/api/trip/schedule/${tripId}/${day}`, mark);
    return response.data;
}

const deleteMark = async(markData) => {
    const { tripId, day, markId } = markData
    const response = await axios.delete(`/api/trip/schedule/${tripId}/${day}/${markId}`);
    return response.data;
}

const deleteTrip = async(tripId) => {
    const response = await axios.delete(`/api/trip/${tripId}`);
    return response.data;
}

const departTrip = async(tripId) => {
    const response = await axios.post(`/api/trip/leave/${tripId}`);
    return response.data;
}

const tripService={
    myTrips,
    currentTrip,
    planTrip,
    setGuests,
    setBulletin,
    editTrip,
    postMark,
    editMark,
    deleteMark,
    deleteTrip,
    departTrip
}

export default tripService;