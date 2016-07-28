const Eatup = function(db, DataTypes) {

  return db.define('Eatup', {
    title: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    description: DataTypes.STRING
  });

};

module.exports = Eatup;
