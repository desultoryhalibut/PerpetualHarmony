const User = require('../../db/db.js').User;
const bcrypt = require('bcrypt');

module.exports = {

  signUp: function(req, res) {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const email = user.email || 'randomemail@gmail.com';

    const cb = function(user, created) {
      if (created) {
        const username = user.dataValues.username;
        res.send(username);
      } else {
        res.send(created);
      }
    };

    bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(password, salt, function(error, hash) {
        User.findOrCreate({where: {username: username}, defaults: {username: username, password: hash, email: email}})
          .spread((user, created) => {
            cb(user, created);
          });
      });
    });
  },

  signIn: function(req, res) {
    const user = req.body;
    const username = user.username;
    const password = user.password;

    const cb = function(user, correctPassword) {
      console.log('signin user ', user);
      if (correctPassword) {
        const username = user.dataValues.username;
        res.send(username);
      } else {
        res.send(false);
      }
    };

    User.findOne({where: {username: username}})
      .then(user => {
        console.log('user in signin', user);
        const hash = user.dataValues.password;
        bcrypt.compare(password, hash, function(error, res) {
          if (error) {
            console.log(error);
          } else {
            cb(user, res);
          }
        });
      });
  }
};

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
