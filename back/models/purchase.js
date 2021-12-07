const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Purchase extends Model {
  static init(sequelize) {
    return super.init(
      {
        boxCode: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
      },
      {
        modelName: "Purchase",
        tableName: "purchases",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Purchase.belongsTo(db.KeepBox);
  }
};
