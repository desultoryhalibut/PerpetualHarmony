const Eatup = require('../../db/db.js').Eatup;

module.exports = {

  getAll: function(req, res) {

    model.sessions.getAll()
    .then(data => {
      console.log('the data is here', data);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
  },

  getUserSessions: function(req, res) {
    var username = req.query.username;

    model.sessions.getUserSessions(username)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log(error);
    });
  },

  createMeetUp: function(req, res) {
    //Passes the request body containing {username, locationName, locationAddress}
    var meetUpObject = req.body;
    console.log('createMeetUp req.body:', req.body);
    model.sessions.createMeetUp(meetUpObject);

    res.sendStatus(200);

  },

  deleteMeetUp: function(req, res) {

    var meetUpObject = req.body;
    model.sessions.deleteMeetUp(meetUpObject);

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
// },
//
// user: {
//   signUp: function(user, cb) {
//     var username = user.username;
//     var password = user.password;
//
//     bcrypt.genSalt(10, function(error, salt) {
//       bcrypt.hash(password, salt, function(error, hash) {
//           User.findOrCreate({where: {username: username}, defaults: {username: username, password: hash}})
//           .spread((user, created) => {
//             cb(user, created);
//           })
//       });
//     });
//
//   },
//
//   signIn: function(user, cb) {
//     var username = user.username;
//     var password = user.password;
//
//     User.findOne({where: {username: username}})
//       .then(user => {
//         var hash = user.dataValues.password;
//         bcrypt.compare(password, hash, function(error, res) {
//           if (error) {
//             console.log(error);
//           } else {
//             cb(user, res);
//           }
//         });
//       });
//   }
// }
