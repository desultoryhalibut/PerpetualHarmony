const Eatup = require('../../db/db').Eatup;
const User = require('../../db/db').User;
const Reservation = require('../../db/db').Reservation;

module.exports = {

  // User RSVPs to a specific EatUp
  postReservation: function(req, res) {
    // Expect req.body to be {username: ''}
    const username = req.body.username;
    const eatupId = req.params.id;

    let newReservation = {
      userId: null,
      eatupId: eatupId
    };

    User.findOne({where: {username: username}})
      .then(user => {
        newReservation.userId = user.get('id');
        Reservation.create(newReservation);
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
        console.error('Error retrieving eatup reservatios ', err);
      });
  },

  getUserReservations: function(req, res) {
    const username = req.body.username;
    const userId = null;

    User.findOne({where: {username: username}})
      .then(user => {
        userID = user.id;

        Reservation.findAll({where: {userId: userId}, include: [ {model: User}]})
          .then(reservations => {
            res.json(reservations);  
          });
      });
  }

}
