'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hero.hasOne(models.Sidekick, {
        foreignKey: 'heroId'
      });
    }
  };
  Hero.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hero',
    tableName: 'Heroes'
  });
  return Hero;
};