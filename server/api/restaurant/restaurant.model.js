const Restaurant = function(db, DataTypes) {

  return db.define('Restaurant', {
    name: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    latitude: {type: DataTypes.STRING},
    longitude: {type: DataTypes.STRING}
  });

};

module.exports = Restaurant;
