const express = require("express")
const router = express.Router()
const bucketOp = require("./controller/bucketOp")

router.get('/createBucket/:bucketName',bucketOp.createBucket)

router.get('/listAllBuckets',bucketOp.listBucket)

router.post('/putObject/:bucketId',bucketOp.putObject)

router.get('/listAllObjects',bucketOp.listObjects)

router.get('/getObject/:objectId',bucketOp.getObject)

router.get('/deleteObject/:objectId',bucketOp.deleteObject)

module.exports = router