const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBoxMaster extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.STRING(300),
          allowNull: false,
          defaultValue: "보관예약",
        },
      },
      {
        modelName: "KeepBoxMaster",
        tableName: "keepBoxMasters",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.KeepBoxMaster.hasMany(db.KeepBox);
    db.KeepBoxMaster.belongsTo(db.User);
  }
};
