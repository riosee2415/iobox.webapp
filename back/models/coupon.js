const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Coupon extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(50),
          allowNull: false, // 필수
        },
        valueInt: {
          type: DataTypes.INTEGER,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        valueFloat: {
          type: DataTypes.FLOAT,
          allowNull: false, // 필수
          defaultValue: 0,
        },
        isUsed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "Coupon",
        tableName: "coupons",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Coupon.belongsTo(db.User);
  }
};
