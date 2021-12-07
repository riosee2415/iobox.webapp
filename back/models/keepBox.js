const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBox extends Model {
  static init(sequelize) {
    return super.init(
      {
        boxcount1: {
          type: DataTypes.INTEGER, // 1번 박스 카운트
          allowNull: false,
          defaultValue: 0,
        },
        boxcount2: {
          type: DataTypes.INTEGER, // 2번 박스 카운트
          allowNull: false,
          defaultValue: 0,
        },
        boxcount3: {
          type: DataTypes.INTEGER, // 3번 박스 카운트
          allowNull: false,
          defaultValue: 0,
        },
        boxcount4: {
          type: DataTypes.INTEGER, // 4번 박스 카운트
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
        price1: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
        },
        price2: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
        },
        price3: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
        },
        price4: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
        },
        totalPrice: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
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
        deliveryCom: {
          type: DataTypes.STRING(100), // 배송 택배사
          allowNull: true,
        },
        deliveryCode: {
          type: DataTypes.STRING(100), // 송장 번호
          allowNull: true,
        },
        deliveryPay: {
          type: DataTypes.STRING(100), // 송장 번호
          allowNull: false,
        },
        isEnd: {
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
    db.KeepBox.belongsTo(db.User);
  }
};
