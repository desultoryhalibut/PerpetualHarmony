const Eatup = require('../../db/db').Eatup;
const User = require('../../db/db').User;
const Restaurant = require('../../db/db').Restaurant;
const Reservation = require('../../db/db').Reservation;

module.exports = {

  // Retrieve all EatUp events
  getAllEatUps: function(req, res) {
    Eatup.findAll({include: [ {model: User, required: true}, {model: Restaurant} ]})
      .then(data => {
        console.log('Eatup data ', data);
        res.send(data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // Retrieve all EatUp events a User has RSVPed to
  getUserEatUps: function(req, res) {
    const username = req.body.username || 'tee';

    User.findOne({ where: {username: username} })
      .then(user => {
        return Eatup.findAll({
          where: {creatorId: user.get('id')}
        });
      })
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // Retrieve specific EatUp Profile by its ID
  getEatUp: function(req, res) {
    const id = req.params.id;

    Eatup.findOne({where: {id: id}, include: [ {model: User, required: true}, {model: Restaurant} ]})
      .then(eatup => {
        res.json(eatup);
      })
      .catch(err => {
        console.error('Error finding eatup ', err);
      });
  },

  // Creates a new EatUp and posts it to the database
  postEatUp: function(req, res) {

    const username = req.body.username;

    // Data for creating a new EatUp
    const newEatUp = {
      title: req.body.title || 'Join my meetup!',
      description: req.body.description || 'description of restaurant here',
      startTime: req.body.startTime || '2012-12-31 11:30:45',
      endTime: req.body.endTime || '2012-12-31 13:30:45',
      creatorId: null,
      restaurantId: null
    };

    // Data for creating a new Restaurant
    const newRestaurant = {
      name: req.body.locationName,
      address: req.body.locationAddress,
      latitude: req.body.latitude || null,
      longitude: req.body.longitude || null,
      photo: req.body.photo || 'http://www.themarsh.com/images/thumbnails/thumbnail-food-app.jpg'
    };

    // Check to see if restaurant exists - if so, add a new restaurant to database
    // If not, create a new restaurant and re-query for the ID
    Restaurant.findOne({where: {name: req.body.locationName}})
      .then(restaurant => {
        console.log('restaurant 1 ', restaurant);
        if (!restaurant) {
          Restaurant.create(newRestaurant);
        } else {
          newEatUp.restaurantId = restaurant.get('id');
        };
      })
      .then(() => {
        User.findOne({where: {username: username}})
          .then(user => {
            newEatUp.creatorId = user.get('id');

            Restaurant.findOne({where: {name: req.body.locationName}})
              .then(function(restaurant) {
                newEatUp.restaurantId = restaurant.get('id');
                Eatup.create(newEatUp);
                res.sendStatus(200);
              });
          });
      })
      .catch(err => {
        console.error(err);
      });

  },

  // Deletes a EatUp
  deleteEatUp: function(req, res) {
    const data = req.body;
    Eatup.destroy({where: {id: data.sessionId, creatorId: data.userId}});
    res.sendStatus(200);
  }

}
