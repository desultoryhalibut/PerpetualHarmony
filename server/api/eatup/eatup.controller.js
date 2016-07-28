const Eatup = require('../../db/db').Eatup;
const User = require('../../db/db').User;
const Restaurant = require('../../db/db').Restaurant;

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

  // Retrieve all EatUp events for a specific user
  getUserEatUps: function(req, res) {
    const username = req.query.username;

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

  // Retrieve specific EatUp Profile by id
  getEatUp: function(req, res) {
    const id = req.params.id;

    Eatup.findOne({where: {id: id}, include: [ {model: User, required: true}, {model: Restaurant} ]})
      .then(eatup => {
        res.json(eatup);
      })
      .catch(err => {
        console.log('Error finding eatup ', err);
      });
  },

  // Creates a new Meet Up
  postEatUp: function(req, res) {
    const d = new Date();
    const title = req.body.title || 'Join my meetup!',
          description = req.body.description || 'description of restaurant here',
          startTime = req.body.startTime || '2012-12-31 11:30:45',
          endTime = req.body.endTime || '2012-12-31 13:30:45',
          photo = req.body.locationPhoto || 'http://www.themarsh.com/images/thumbnails/thumbnail-food-app.jpg',
          name = req.body.locationName,
          address = req.body.locationAddress,
          latitude = req.body.latitude || undefined,
          longitude = req.body.longitude || undefined;

    const newEatUp = {
      title: title,
      description: description,
      startTime: startTime,
      endTime: endTime,
      creatorId: null,
      restaurantId: null
    };

    const newRestaurant = {
      name: req.body.locationName,
      address: req.body.locationAddress,
      latitude: latitude,
      longitude: longitude,
      photo: photo
    };

    // Check to see if restaurant exists - if so, add a new restaurant to database
    // If not, create a new restaurant and re-query for the ID
    // Assign new ID to new eatup and post to database

    Restaurant.findOne({where: {name: req.body.locationName}})
      .then(restaurant => {
        console.log('restaurant 1 ', restaurant);
        if (!restaurant) {
          Restaurant.create(newRestaurant);
        } else {
          newEatUp.restaurantId = restaurant.get('id');
        };
      })
      .catch(err => {
        console.log('Error finding and creating new restaurant ', err);
      });

    User.findOne({where: {username: req.body.username}})
      .then(user => {
        newEatUp.creatorId = user.get('id');

        Restaurant.findOne({where: {name: req.body.locationName}})
          .then(function(restaurant) {
            console.log('restaurant 2 ', restaurant);
            newEatUp.restaurantId = restaurant.get('id');

            Eatup.create(newEatUp);
            console.log('Created new eat-up ', newEatUp);
          });
      })
      .catch(err => {
        console.log('Error querying new user ', err);
      });


    res.sendStatus(200);
  },

  // Deletes a EatUp
  deleteEatUp: function(req, res) {
    const data = req.body;
    Eatup.destroy({where: {id: data.sessionId, creatorId: data.userId}});
    res.sendStatus(200);
  }

}
