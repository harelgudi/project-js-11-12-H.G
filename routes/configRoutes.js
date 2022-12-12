const indexR = require("./index");
const usersR = require("./users");
const toysR = require ("./toys");
const catsR = require ("./cats")

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use ("/toys",toysR);
  app.use ("/cats",catsR);
}