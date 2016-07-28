const Comment = require('../../db/db.js').Comment;
const User = require('../../db/db.js').User;

module.exports = {

  // Retrieves all comments for a specific EatUp event
  getComments: function(req, res) {
    const eatupId = req.params.id;

    Comment.findAll({where: {eatupId: eatupId}})
      .then(comments => {
        res.json(comments);
      })
      .catch(err => {
        console.error('Error retrieiving comments ', err);
      });
  },

  // Posts a comment to a specific EatUp event
  postComment: function(req, res) {
    const eatupId = req.params.id,
          comment = req.body.comment,
          username = req.body.username,
          newComment = {
            comment: comment,
            eatupId: eatupId,
            userId: null
          };

    User.findOne({where: {username: username}})
      .then(user => {
        newComment.userId = user.get('id');

        Comment.create(newComment);
        res.send(newComment);
      })
      .catch(err => {
        console.error('Error sending comment ', err);
      });
  }

}
