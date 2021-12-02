const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoxType extends Model {
  static init(sequelize) {
    return super.init(
      {
        value: {
          type: DataTypes.STRING(200), //[1 : 아이오박스(소형), 2 : 행거 박스(중형), 3: 대용량 박스(대형), 4: 텐트보관 박스(대형) ]
          allowNull: false,
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        modelName: "BoxType",
        tableName: "boxTypes",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoxType.hasMany(db.KeepBox);
  }
};
