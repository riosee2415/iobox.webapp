const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Purchase extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
    db.Purchase.belongsTo(db.User);
    // db.Purchase.belongsTo(db.KeepBox);
  }
};
