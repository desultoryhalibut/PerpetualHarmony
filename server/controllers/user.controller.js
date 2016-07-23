var model = require('../models/db.js');

module.exports = { 
	users: { 
		signUp: function(req, res) { 
			var user = req.body; 
			model.user.signUp(user)
				.spread((user, created) => {
					// new user just made
					// if (created  === true) {
					// 	res.redirect('/');
					// } else {
					// 	res.redirect('SignIn');
					// }
				})
				.catch(error => {
					console.log(error);
				});
		}, 

		signIn: function(req, res) {
			var user = req.body; 
			model.user.signIn(user)
				.then(results => {
					// if results is null 
						// either wrong password or user doesn't exist
					if(results === null) {
						console.log('uh oh');
					}
					var username = results.dataValues.username;
					res.send(username);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
}