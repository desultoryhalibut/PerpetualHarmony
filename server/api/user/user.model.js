const User = function(db, DataTypes) {

  return db.define('User', {
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING}
  });

};

module.exports = User;
