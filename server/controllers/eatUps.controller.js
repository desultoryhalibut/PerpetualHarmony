var model = require('../models/db.js');

var tempData = [{username: 'Dan', name: 'HackReactor', address: 'Somewhere'},
                {username: 'Brian', name: 'Subway', address: 'Here'},
                {username: 'Dog', name: 'House', address: 'Here'},
                {username: 'Neil', name: 'Yerba Buena', address: 'Here'},
                {username: 'Henry', name: 'Oasis', address: 'Here'},
                {username: 'Sunny', name: 'FatBurger', address: 'Here'}]


module.exports = {

  sessions: {
    getAll: function(req, res) {
      //Temp data just to make sure it works
      // model.sessions.getAllSessions();
      res.send(tempData);
    },
    getUserSessions: function(req, res) {
      //Temp data just to make sure it works
      res.send(tempData);

      // model.sessions.getUserSessions().then(function(data){
      //   res.end();
      // });
    },
    createMeetUp: function(req, res) {
      tempData.push(req.body);
      res.send(200);
      // res.send(req.body);
      console.log(req);
    }
  }
}

