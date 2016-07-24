var model = require('../models/db.js');

// var tempData = [{username: 'Dan', name: 'HackReactor', address: 'Somewhere'},
//                 {username: 'Brian', name: 'Subway', address: 'Here'},
//                 {username: 'Dog', name: 'House', address: 'Here'},
//                 {username: 'Neil', name: 'Yerba Buena', address: 'Here'},
//                 {username: 'Henry', name: 'Oasis', address: 'Here'},
//                 {username: 'Sunny', name: 'FatBurger', address: 'Here'}]


module.exports = {

  sessions: {
    getAll: function(req, res) {

      model.sessions.getAll()
      .then(data => {
        res.send(data);
      })

    },
    getUserSessions: function(req, res) {

      model.sessions.getUserSessions()
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
      console.log(meetUpObject);
      model.sessions.createMeetUp(meetUpObject);

      res.send(200);
      // res.send(req.body);
      console.log(req);
    },

    deleteMeetUp: function(req, res) {

      var meetUpObject = req.body;
      model.sessions.deleteMeetUp(meetUpObject);

      res.sendStatus(200);
    }
  }
}

