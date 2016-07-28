const Comment = function(db, DataTypes) {

  return db.define('Comment', {
    comment: DataTypes.STRING
  });

};

module.exports = Comment;
