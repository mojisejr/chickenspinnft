const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sqlite.database");

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    dna: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tokenURI: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "token",
  }
);

module.exports = Token;
