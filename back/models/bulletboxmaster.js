const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BulletBoxMaster extends Model {
  static init(sequelize) {
    return super.init(
      {
        temp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        modelName: "BulletBoxMaster",
        tableName: "bulletBoxMasters",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BulletBoxMaster.hasMany(db.BulletBox);
    db.BulletBoxMaster.belongsTo(db.User);
  }
};
