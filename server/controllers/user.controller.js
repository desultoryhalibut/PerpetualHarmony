var model = require('../models/db.js');

module.exports = { 
	users: { 
		signUp: function(req, res) { 
			var user = req.body; 

			var cb = function(user, created) {
				if(created === true) {
					var username = user.dataValues.username;
					res.send(username);
				} else {
					res.send(created);
				}
			}

			model.user.signUp(user, cb);
		}, 

		signIn: function(req, res) {
			var user = req.body; 

			var cb = function(user, correctPassword) {
				if (correctPassword) {
					var username = user.dataValues.username;
					res.send(username);
				} else {
					res.send(null);
				}
			}

			model.user.signIn(user, cb);
			
		}
	}
}