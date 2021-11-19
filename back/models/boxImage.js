const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoxImage extends Model {
  static init(sequelize) {
    return super.init(
      {
        imagePath: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "BoxImage",
        tableName: "boxImages",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoxImage.belongsTo(db.KeepBox);
  }
};
