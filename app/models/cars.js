"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.user, {
        foreignKey: "whoadded",
        as: "UserAdded",
      });
      cars.belongsTo(models.user, {
        foreignKey: "whoupdated",
        as: "UserUpdated",
      });
      cars.belongsTo(models.user, {
        foreignKey: "whodeleted",
        as: "UserDeleted",
      });
    }
  }
  cars.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      image: DataTypes.STRING,
      rentperday: DataTypes.STRING,
      capacity: DataTypes.STRING,
      description: DataTypes.STRING,
      transmission: DataTypes.STRING,
      type: DataTypes.STRING,
      year: DataTypes.STRING,
      options: DataTypes.STRING,
      specs: DataTypes.STRING,
      availableAt: DataTypes.STRING,
      whoadded: DataTypes.INTEGER,
      whoupdated: DataTypes.INTEGER,
      whodeleted: DataTypes.INTEGER,
      deletestatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cars",
    }
  );
  return cars;
};
