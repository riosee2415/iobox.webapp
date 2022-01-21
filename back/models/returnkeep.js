const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ReturnKeep extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "ReturnKeep",
        tableName: "returnKeeps",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.ReturnKeep.hasMany(db.BoxImage);
  }
};
