const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBoxSchedule extends Model {
  static init(sequelize) {
    return super.init(
      {
        merchantUid: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isCancel: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isComplate: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "KeepBoxSchedule",
        tableName: "keepBoxSchedules",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.KeepBoxSchedule.belongsTo(db.User);
    db.KeepBoxSchedule.belongsTo(db.KeepBox);
  }
};
