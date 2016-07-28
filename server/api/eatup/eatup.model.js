const Eatup = function(db, DataTypes) {

  return db.define('Eatup', {
    title: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    date: DataTypes.DATE,
    description: DataTypes.STRING
  });

};

module.exports = Eatup;
