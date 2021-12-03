const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBox extends Model {
  static init(sequelize) {
    return super.init(
      {
        boxname: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        boxcount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        period: {
          type: DataTypes.STRING(200), // 보관 기간
          allowNull: false,
        },
        isFilming: {
          type: DataTypes.BOOLEAN, // 상자보관 찰영유무
          allowNull: false,
          defaultValue: false,
        },
        isPickup: {
          type: DataTypes.BOOLEAN, // 픽업 유무
          defaultValue: false,
          allowNull: false,
        },
        pickWay: {
          type: DataTypes.STRING(300), // 픽업 방식
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(50), // 이름
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 전화번호
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300), // 주소
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(300), // 디테일 주소
          allowNull: false,
        },
        remark: {
          type: DataTypes.STRING(300), // 특이사항
          allowNull: true,
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
    db.KeepBox.belongsTo(db.User);
  }
};
