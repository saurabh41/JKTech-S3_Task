module.exports = (sequelize,DataTypes) =>{
    const bucket = sequelize.define("buckets",{
        bucketId: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bucketName : {
            type : DataTypes.STRING
        },
    },{
        timestamps: false 
      })
    
    return bucket;
}

