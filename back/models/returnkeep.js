const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class ReturnKeep extends Model {
  static init(sequelize) {
    return super.init(
      {
        deliveryCom: {
          type: DataTypes.STRING(100), // 배송 택배사
          allowNull: true,
        },
        deliveryCode: {
          type: DataTypes.STRING(100), // 송장 번호
          allowNull: true,
        },
        isComplete: {
          type: DataTypes.BOOLEAN, // 처리 유무
          defaultValue: false,
          allowNull: false,
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
