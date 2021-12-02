const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: DataTypes.STRING(60),
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        // id가 기본적으로 들어있다.
        email: {
          type: DataTypes.STRING(60),
          allowNull: true, // 필수
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
          unique: true, // 고유한 값
        },
        mobile: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
        userPk: {
          type: DataTypes.STRING(300), // 플랫폼 별 유저 고유 식별값 (고유 id값)
          allowNull: false,
        },
        cardNum: {
          type: DataTypes.STRING(100), // 카드 번호
          allowNull: true,
        },
        cardPeriod: {
          type: DataTypes.STRING(10), // 카드 기간 YY/MM
          allowNull: true,
        },
        cardIden: {
          type: DataTypes.STRING(100), // 주민등록번호 앞 6자리 혹은 사업자번호
          allowNull: true,
        },
        cardPassword: {
          type: DataTypes.STRING(10), // 카드 비밀번호 앞 2자리
          allowNull: true,
        },
        level: {
          // 사용자 권한 [1 : 일반회원, 2 : 비어있음, 3: 운영자, 4: 최고관리자, 5: 개발사]
          type: DataTypes.INTEGER,
          allowNull: false, //
          defaultValue: 1,
        },
        secret: {
          type: DataTypes.STRING(10),
          allowNull: true,
          defaultValue: null,
        },
        terms: {
          // 이용약관동의
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "users",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Question);
  }
};
