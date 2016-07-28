const EatUpController = require('../api/eatup/eatup.controller.js');
// const UserController = require('../api/user/user.controller.js');
const router = require('express').Router();

// Routing for sessions
router.get('/sessions/allSessions', EatUpController.getAll);
router.get('/sessions/userSessions', EatUpController.getUserSessions);
router.post('/sessions/createMeetUp', EatUpController.createMeetUp);
router.delete('/sessions/deleteMeetUp', EatUpController.deleteMeetUp);

// Routing for User sign-in
// router.post('/users/signUp', UserController.users.signUp);
// router.post('/users/signIn', UserController.users.signIn);

module.exports = router;
