
const { Sequelize,DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('../config/config');

let sequelize;

const db = {}

const initialize = async ()=> {

const connection = await mysql.createConnection({ host: config.development.host, port: config.development.port, user: config.development.username, password: config.development.password });

await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.development.database}\`;`);

try {
  sequelize = new Sequelize({
      dialect: config.development.dialect, 
      database: config.development.database,
      username: config.development.username,
      password: config.development.password,
      host: config.development.host,
      port: config.development.host, 
    });

  

sequelize.authenticate()
  .then(() => {
    console.log('Connected...')
  })
  .catch(err => {
    console.log(`Error ${err}`)
  })

  db.Sequelize = Sequelize
  db.sequelize = sequelize  

db.object = require("../models/objects")(sequelize, DataTypes)
db.buckets = require("../models/buckets")(sequelize, DataTypes)

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sync done')
  })

}catch(e){
console.log("error",e)
}

}

module.exports = {db,initialize}






