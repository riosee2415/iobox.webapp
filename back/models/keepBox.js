const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class KeepBox extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.STRING(50), // [일반 배송 or 총알 배송]
          allowNull: false,
        },
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
        period: {
          type: DataTypes.STRING(200), // 보관 기간
          allowNull: true,
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
          allowNull: true,
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
        isEnd: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isEle: {
          type: DataTypes.BOOLEAN, // 엘베 유무 [총알]
          allowNull: true,
          defaultValue: false,
        },
        floor: {
          type: DataTypes.STRING(10), // 층 [총알]
          allowNull: true,
        },
        paymentType: {
          type: DataTypes.STRING(30), //결제 방식 [총알]
          allowNull: true,
        },
        startDate: {
          type: DataTypes.STRING(50), // 보관시작일 [총알]
          allowNull: true,
        },
        endDate: {
          type: DataTypes.STRING(50), // 보관종료일 [총알]
          allowNull: true,
        },
        reIsEle: {
          type: DataTypes.BOOLEAN, // 도착지 엘베 유무  [총알]
          allowNull: true,
          defaultValue: false,
        },
        reFloor: {
          type: DataTypes.STRING(10), // 도착지 층  [총알]
          allowNull: true,
        },
        receiveAdd: {
          type: DataTypes.STRING(300), // 도착지 주소 [총알]
          allowNull: true,
        },
        receiveDetail: {
          type: DataTypes.STRING(300), // 도착지 상세 주소  [총알]
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
