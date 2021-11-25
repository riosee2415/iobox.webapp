const Sequelize = require("sequelize");
const user = require("./user");
const mainbanner = require("./mainbanner");
const companyinfo = require("./companyinfo");
const popup = require("./popup");
const acceptrecord = require("./acceptrecord");
const notice = require("./notice");
const gallary = require("./gallary");
const question = require("./question");
const questiontype = require("./questiontype");
const faq = require("./faq");
const faqtype = require("./faqtype");
const guide = require("./guide");
const guidetype = require("./guidetype");
const event = require("./event");
const keepBox = require("./keepBox");
const boxImage = require("./boxImage");
const boxtype = require("./boxtype");
const purchase = require("./purchase");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = user;
db.MainBanner = mainbanner;
db.CompanyInfo = companyinfo;
db.Popup = popup;
db.AcceptRecord = acceptrecord;
db.Notice = notice;
db.Gallary = gallary;
db.Question = question;
db.QuestionType = questiontype;
db.Faq = faq;
db.FaqType = faqtype;
db.Guide = guide;
db.GuideType = guidetype;
db.Event = event;
db.KeepBox = keepBox;
db.BoxImage = boxImage;
db.BoxType = boxtype;
db.Purchase = purchase;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
