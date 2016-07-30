const router = require('express').Router();
const EatUpController = require('../api/eatup/eatup.controller');
const UserController = require('../api/user/user.controller');
const CommentController = require('../api/comment/comment.controller');
const ReservationController = require('../api/reservation/reservation.controller');

// Routing for User Sign-In and Sign-Up
router.post('/users/signup', UserController.signUp);
router.post('/users/signin', UserController.signIn);

// API for EatUps
router.get('/api/eatup', EatUpController.getAllEatUps);
router.get('/api/eatup/usereatups', EatUpController.getUserEatUps);  //diff is that this is all user created eatups - user rsvp'd events should be included in user eatups
router.get('/api/eatup/:id', EatUpController.getEatUp);
router.post('/api/eatup', EatUpController.postEatUp);
router.delete('/api/eatup', EatUpController.deleteEatUp);

// Route to retrieve EatUp comments
router.get('/api/eatup/:id/comment', CommentController.getComments);
router.post('/api/eatup/:id/comment', CommentController.postComment);

// Route to post and get EatUp reservations
router.get('/api/users/rsvp', ReservationController.getUserReservations);
router.get('/api/eatup/:id/rsvp', ReservationController.getReservations);
router.post('/api/eatup/:id/rsvp', ReservationController.postReservation);

// Wildcard route to serve assets to Client


module.exports = router;
