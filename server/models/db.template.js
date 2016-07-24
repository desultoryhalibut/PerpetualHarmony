var Sequelize = require('sequelize');
var db = new Sequelize('database', 'username', 'password');
var bcrypt = require('bcrypt');

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: {type: Sequelize.STRING}
});

var Session = db.define('Session', {
  sessionname: Sequelize.STRING,
  address: Sequelize.STRING, 
  latitude: Sequelize.INTEGER,
  longitude: Sequelize.INTEGER
});

// The join table
var Attendees = db.define('Attendees');

// Adds the attribute creatorId to the Session model
// Session.prototype will gain the methods session.getUser() and session.setUser()
Session.belongsTo(User, {foreignKey: 'creatorId', targetKey: 'id'});

// Injects userId and sessionId into Attendees table
// This will add methods: 
  // to User: getSessions, setSessions, addSession, addSessions
  // to Session: getUsers, setUsers, addUser, addUsers
User.belongsToMany(Session, { through: 'Attendees', foreignKey: 'userId' });
Session.belongsToMany(User, { through: 'Attendees', foreignKey: 'sessionId' });

// Model syncs are chained with promises in this order because the Session model requires
// foreign id injection from User, and Attendees requires foreign id injections from User and Session
User.sync().then(function() {
  Session.sync().then(function() {
    Attendees.sync().then(function() {
     
    });
  });
});
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

module.exports = {
  sessions: {
    getAll: function() {
      return Session.findAll();
    },

    getUserSessions: function(username) {

      return User.findOne({
        where: {username: username}
      })
      .then(user => {
        return Session.findAll({
          where: {creatorId: user.get('id')}
        });
      });
    }, 

    createMeetUp: function(data) {
      // {username: '', location: '', locationAddress: ''}
      User.findOne({
        where: {username: data.username}
      }).then(function(user) {
        Session.create({
          sessionname: data.locationName,
          address: data.locationAddress,
          creatorId: user.get('id')
        });
      });
    },

    deleteMeetUp: function(data) {
      Session.destroy({ 
        where: {id: data.sessionId, creatorId: data.userId}
      });
    }
  },

  user: {
    signUp: function(user, cb) {
      var username = user.username;
      var password = user.password;

      bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(password, salt, function(error, hash) {
            User.findOrCreate({where: {username: username}, defaults: {username: username, password: hash}})
            .spread((user, created) => {
              cb(user, created);
            })
        });
      });

    },

    signIn: function(user, cb) {
      var username = user.username;
      var password = user.password;

      User.findOne({where: {username: username}})
        .then(user => {
          var hash = user.dataValues.password;
          bcrypt.compare(password, hash, function(error, res) {
            if (error) {
              console.log(error);
            } else {
              cb(user, res);
            }
          })
        })
    }
  }
}