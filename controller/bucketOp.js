const fs = require('fs')
const { QueryTypes } = require('sequelize');
const {db} = require("../db/app")
const multer = require('multer');
const { Readable } = require('stream');
const path = require("path");
const { response } = require('express');

const uploadFile = (req, res, next,bucketName,bucketId) => {

    // let url = "/home/agv/JK-Tech-Task/"
    let url = path.join(__dirname,"..")
    console.log("url is 1",url)
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // url += bucketName
        url = path.join(url,bucketName)
        console.log("url is 2",url)
      cb(null, url); 
    },
    filename: function (req, file, cb) {
        // url += file.originalname
        url = path.join(url,file.originalname)
        console.log("url is 3",url)
      cb(null,file.originalname); 
    }
  });

const upload = multer({ storage: storage });

    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error occurred (e.g., file size exceeded)
        return res.status(400).json({ error: 'File upload error', message: err.message });
      } else if (err) {
        // Other errors occurred
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log("File uploaded successfully")
      db.sequelize.query(`INSERT INTO objects (objectUrl,bucketID) VALUES ("${url}","${bucketId}")`,{
        type: QueryTypes.INSERT
         }).then((data)=>{
        res.status(201).send({message: "object uploaded Successfully"})
    })
 
    });
};


module.exports.createBucket = (req,res) =>{
   
    fs.mkdir(req.params.bucketName, async (err)=>{
        if(err){
            console.log("Bucket Already Exist")
            res.status(200).send({message: "Bucket already Exist"})
        }else{
            console.log("file created successfully")
            let bucketName = req.params.bucketName

            db.sequelize.query(`INSERT INTO buckets (bucketName) VALUES ("${bucketName}")`,{
                type: QueryTypes.INSERT
            }).then((data)=>{
                res.status(201).send({message: "Bucket Created Successfully"})
            })
        }
    })

}

module.exports.listBucket = (req,res) =>{

    db.sequelize.query(`SELECT * FROM buckets`,{
        type: QueryTypes.SELECT
    }).then((data)=>{
        res.status(200).send({message: "Retrieved Successfully",data:data})
    })    
}


module.exports.putObject = (req,res,next) => {
    console.log("req.body",req.params.bucketId)
    db.sequelize.query(`SELECT * FROM buckets WHERE bucketId = "${req.params.bucketId}"`,{
        type: QueryTypes.SELECT
    }).then((data)=>{
        console.log("data",data)
        uploadFile(req,res,next,data[0].bucketName,req.params.bucketId)
    })  

}


module.exports.listObjects = (req,res) => {

    db.sequelize.query("select * from objects",{
        type : QueryTypes.SELECT
    }).then((data)=>{
        res.status(200).send({message: "Retrieved Successfully",data:data})
    })
    .catch((e)=>{
        res.status(204).send({message: "No Content Found"})
    })

}


module.exports.getObject = (req,res) =>{

    db.sequelize.query(`SELECT * FROM objects where objectId = "${req.params.objectId}"`,{
        type : QueryTypes.SELECT
    }).then((data)=>{
        console.log("data is",data)
        let redableStream = fs.createReadStream(data[0].objectUrl)

        redableStream.pipe(res)
    
        redableStream.on("end",function (){
            console.log("data written to dest")
        })

        // const readableStream = () =>{
        //     const readable = new Readable({
 
        //         read(){
        //             fs.open("/home/agv/JK-Tech-Task/myBucket/gid.gif",'r',(err,fd)=>{
        //                 if(err){
        //                     this.emit("eror",err)
        //                     return
        //                 }
        //                 let buffer = Buffer.alloc(10000)
                        
        //                 fs.read(fd,buffer,0,buffer.length,0,(err,bytesRead)=>{
        //                     if(bytesRead === 0){
        //                         this.push(null)
        //                         fs.close(fd,(err)=>{
        //                             this.emit("error",err)
        //                         })
        //                     }
    
        //                     bytesRead += bytesRead
        //                     this.push(buffer.slice(0,bytesRead))
        //                 })

                       
        //             })
        //         }
        //     })

        //     return readable
        // }

        // let fileReader = readableStream()
        // fileReader.pipe(res)

    })
}


module.exports.deleteObject = (req,res) => {

   db.sequelize.query(`SELECT * from objects where objectId = "${req.params.objectId}"`,{
    type : QueryTypes.SELECT
   }).then((data)=>{

    if(data.length > 0){

        fs.unlink(data[0].objectUrl,(err)=>{
            if(err){
                console.error('Error deleting file:', err);
                res.status(500).json({ error: 'Internal server error' });
                return
            }

            db.sequelize.query(`DELETE FROM objects where objectId = "${req.params.objectId}"`,{
            type : QueryTypes.DELETE
            }).then((response)=>{
                res.status(200).send({message : "Object Deleted Successfully"})
            }) 

        })

    }else{
        res.status(204).send({message : "No Content Found"})
    }
   }) 


}