const router = require('express').Router();
const EatUpController = require('../api/eatup/eatup.controller');
const UserController = require('../api/user/user.controller');
const CommentController = require('../api/comment/comment.controller');

// Routing for User Sign-In and Sign-Up
router.post('/users/signup', UserController.signUp);
router.post('/users/signin', UserController.signIn);

// API for EatUps
router.get('/api/eatup', EatUpController.getAllEatUps);
router.get('/api/eatup/usereatups', EatUpController.getUserEatUps);
router.get('/api/eatup/:id', EatUpController.getEatUp);
router.post('/api/eatup', EatUpController.postEatUp);
router.delete('/api/eatup', EatUpController.deleteEatUp);

// API to Retrieve EatUp Comments
router.get('/api/eatup/:id/comment', CommentController.getComments);
router.post('/api/eatup/:id/comment', CommentController.postComment);

module.exports = router;
