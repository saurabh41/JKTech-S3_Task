const bucket = require('./buckets')

module.exports = (sequelize,DataTypes) =>{
const objects = sequelize.define("objects",{
    objectId: {
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    objectUrl : {
        type : DataTypes.STRING
    },
    bucketID : {
        type : DataTypes.INTEGER,
        allowNull: false,
 
    }
    
},{
  timestamps: false
})

  objects.belongsTo(bucket(sequelize, DataTypes), {
    foreignKey: 'bucketID', 
    targetKey: 'bucketId' 
  });

  return objects
}

