const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Event extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Event",
        tableName: "events",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {}
};
