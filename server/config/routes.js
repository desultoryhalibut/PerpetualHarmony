const EatUpController = require('../api/eatup/eatup.controller.js');
const UserController = require('../api/user/user.controller.js');
const router = require('express').Router();

// API Routing for EatUps
router.get('/api/eatup', EatUpController.getAll);
router.get('/api/eatup/usereatups', EatUpController.getUserEatups);
router.post('/api/eatup', EatUpController.createEatUp);
router.delete('/api/eatup', EatUpController.deleteEatUp);

// Routing for User Sign-In and Sign-Up
router.post('/users/signup', UserController.signUp);
router.post('/users/signin', UserController.signIn);

module.exports = router;
