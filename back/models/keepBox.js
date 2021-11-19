const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBox extends Model {
  static init(sequelize) {
    return super.init(
      {
        period: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        isPickup: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        coupon: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        remark: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        isFilming: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
        isComplete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "KeepBox",
        tableName: "keepBoxs",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.KeepBox.hasMany(db.BoxImage);
    db.KeepBox.belongsTo(db.BoxType);
    db.KeepBox.belongsTo(db.User);
  }
};
