const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BulletBox extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        deliveryCom: {
          type: DataTypes.STRING(100), // 배송 택배사
          allowNull: true,
        },
        deliveryCode: {
          type: DataTypes.STRING(100), // 송장 번호
          allowNull: true,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "BulletBox",
        tableName: "bulletBoxs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BulletBox.belongsTo(db.BulletBox);
  }
};
