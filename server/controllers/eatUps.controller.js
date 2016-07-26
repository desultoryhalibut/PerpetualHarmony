var model = require('../models/db.js');

module.exports = {

  sessions: {
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
  }
};

