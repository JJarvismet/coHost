const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/loggedIn');
const isGuest = require('../middleware/isGuest');
const isHost = require('../middleware/isHost');
const isTrip = require('../middleware/isTrip');
const { currentTrip, deleteTrip, getInviteCode, joinTrip, editTrip, departTrip } = require('../controllers/tripControllers');
const { makeTrip, myTrips } = require('../controllers/globalControllers');
const { postToTrip, postToSchedule, editMark, deleteMark } = require('../controllers/targetedControllers');

//get all of users trip's data || post new trip
router.route('/myTrips').get(isLoggedIn, myTrips).post(isLoggedIn, makeTrip);

//get current trip || delete trip || post to trip (bulletin or guestList) || edit trip
router.route('/:id').get(isTrip, isGuest, currentTrip).delete(isTrip, isHost, deleteTrip).post(isTrip, isGuest, postToTrip).put(isTrip, isHost, editTrip);

//get trip invite code
router.route('/invite/:id').get(isTrip, isGuest, getInviteCode).post(isTrip, isLoggedIn, joinTrip);

//post to trip schedule
router.route('/schedule/:id/:day').post(isTrip, isGuest, postToSchedule).put(isTrip, isGuest, editMark);

//delete a mark
router.route('/schedule/:id/:day/:markId').delete(isTrip, isGuest, deleteMark);

//leave a trip
router.route('/leave/:id').post(isTrip, isGuest, departTrip);

module.exports = router;