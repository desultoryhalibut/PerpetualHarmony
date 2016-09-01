const Eatup = require('../../db/db').Eatup;
const User = require('../../db/db').User;
const Restaurant = require('../../db/db').Restaurant;
const Reservation = require('../../db/db').Reservation;
const Restaurant = require('../../db/db').Restaurant;
const db = require('../../db/db');

module.exports = {

  // User RSVPs to a specific EatUp
  postReservation: function(req, res) {
    // Expect req.body to be {username: ''}
    const username = req.body.username;
    const eatupId = req.params.id;
    console.log('Username in req.body.username:',username,'. Req.body:',req.body)

    var newReservation = {
      userId: null,
      eatupId: eatupId
    };

    User.findOne({where: {username: username}})
      .then(user => {
        newReservation.userId = user.get('id');
        Reservation.create(newReservation);
        console.log('Successful add')
      })
      .catch(err => {
        console.error('Error RSVPing to event ', err);
      });

      res.send(newReservation);
  },

  // Retrieves all RSVPs for a specific EatUp
  getReservations: function(req, res) {
    const eatupId = req.params.id;

    Reservation.findAll({where: {eatupId: eatupId}, include: [ {model: User}]})
      .then(reservations => {
        res.json(reservations);
      })
      .catch(err => {
        console.error('Error retrieving eatup reservations ', err);
      });
  },

  // Retrieves all RSVPs for a specific EatUp
  getUserReservations: function(req, res) {

    let username = req.query.username;

    var userId;

    User.findOne({where: {username: username}})
      .then(user => {
        userId = user.id;

        Reservation.findAll({where: {userId: userId}, include: [ {model: Eatup}]})
           .then(reservations => {
             var restIds = [];
             for(var i = 0; i < reservations; i++) {
               // STORE IN restIds each id of restaurants
             }
             
             Restaurant.findAll({where: {id: restIds} })
             .then(rests => {
               console.log('Boom! this works now just add this results to the original reservations object',rests);
               res.json(reservations);
             }).catch(e => {
               console.log('error!',e);
             })
           });
      });
  }

}
