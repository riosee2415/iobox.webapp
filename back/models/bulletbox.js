const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BulletBox extends Model {
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
        price: {
          type: DataTypes.INTEGER, // 금액
          allowNull: false,
          defaultValue: 0,
        },
        address: {
          type: DataTypes.STRING(300), // 보관할 떄주소
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(300), // 보관할 때상세주소
          allowNull: false,
        },
        isEle: {
          type: DataTypes.BOOLEAN, // 엘베 유무
          allowNull: false,
          defaultValue: false,
        },
        floor: {
          type: DataTypes.STRING(10), // 층
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30), //결제 방식
          allowNull: false,
        },
        startDate: {
          type: DataTypes.STRING(50), // 보관시작일
          allowNull: true,
        },
        endDate: {
          type: DataTypes.STRING(50), // 보관종료일
          allowNull: true,
        },
        receiveAdd: {
          type: DataTypes.STRING(300), // 도착지 주소
          allowNull: false,
        },
        receiveDetail: {
          type: DataTypes.STRING(300), // 도착지 상세 주소
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
        deliveryCom2: {
          type: DataTypes.STRING(100), // 배송 택배사
          allowNull: true,
        },
        deliveryCode2: {
          type: DataTypes.STRING(100), // 송장 번호
          allowNull: true,
        },
        deliveryPay: {
          type: DataTypes.STRING(100), // 배송비
          allowNull: false,
        },
        merchantUid: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isPickUp: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isEnd: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isFilming: {
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
    db.BulletBox.hasMany(db.BulletImage);
    db.BulletBox.belongsTo(db.User);
  }
};
