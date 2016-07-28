const Eatup = require('../../db/db.js').Eatup;
const User = require('../../db/db.js').User;

module.exports = {

  // Retrieve all EatUp events
  getAll: function(req, res) {
    Eatup.findAll({include: [ {model: User, required: true} ]})
      .then(data => {
        console.log('the data is here', data);
        res.send(data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  // Retrieve all EatUp events for a specific user
  getUserSessions: function(req, res) {
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

  // Creates a new Meet Up
  createMeetUp: function(req, res) {
    //Passes the request body containing {username, locationName, locationAddress}
    const data = req.body;

    console.log('createMeetUp req.body:', req.body);

    User.findOne({where: {username: data.username}})
      .then(function(user) {
        Eatup.create({
          sessionname: data.locationName,
          address: data.locationAddress,
          creatorId: user.get('id')
        });
      });

    res.sendStatus(200);

  },

  // Deletes a EatUp
  deleteMeetUp: function(req, res) {
    const data = req.body;
    Eatup.destroy({where: {id: data.sessionId, creatorId: data.userId}});
    res.sendStatus(200);
  }
};

// sessions: {
//
//   getAll: function() {
//     return Session.findAll({include: [ {model: User, required: true} ]});
//   },
//
//   getUserSessions: function(username) {
//
//     // find a specific user where username matches
//     return User.findOne({
//       where: {username: username}
//     })
//     .then(user => {
//       return Session.findAll({
//         where: {creatorId: user.get('id')}
//       });
//     });
//   },
//
//   createMeetUp: function(data) {
//     // {username: '', location: '', locationAddress: ''}
//     User.findOne({
//       where: {username: data.username}
//     }).then(function(user) {
//       Session.create({
//         sessionname: data.locationName,
//         address: data.locationAddress,
//         creatorId: user.get('id')
//       })
//     })
//   },
//
//   deleteMeetUp: function(data) {
//     Session.destroy({
//       where: {id: data.sessionId, creatorId: data.userId}
//     });
//   }
// }
