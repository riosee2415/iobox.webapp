const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class MenuImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
      },
      {
        modelName: "MenuImage",
        tableName: "menuImages",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {}
};
