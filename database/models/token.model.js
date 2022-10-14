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
  },
  {
    sequelize,
    modelName: "token",
  }
);

module.exports = Token;
