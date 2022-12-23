const { Model, DataTypes } = require("sequelize");
const sequelize = require("../postgres.database");

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    dna: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    tokenURI: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    minter: {
      type: DataTypes.STRING(255),
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: new Date().getTime(),
    },
  },
  {
    sequelize,
  }
);

module.exports = Token;
