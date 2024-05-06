follow these step to setup the project
1) Clone Repo into your machine
2) npm install
3) open config/config.js file and change username and password of MySql database
4) Run "node index.js" command to run the project

Refer following API for CRUD operation

1) createBucket
   
   API Type: GET\
   Endpoint:- http://localhost:3000/createBucket/:bucketName \
   Params :- bucketName

   example:- http://localhost:3000/createBucket/newBucket \
   explaination:- bucket named "newBucket" will be created 

2) ListBucket

   API Type: GET\
   Endpoint:- http://localhost:3000/listAllBuckets 

   example:- http://localhost:3000/listAllBuckets \
   explaination:- List down all the buckets available

3) PutObject
   
   API Type: POST\
   Endpoint:- http://localhost:3000/putObject/:bucketId \
   Params :- bucketId
   
   example:- http://localhost:3000/putObject/3 \
   explaination:- put/upload the file(Object) in specific bucket

   note:- Please use the postman to call this API. use form-data body and use key as "file" and value as a select file from your local computer. 
   
4) ListAllObjects

   API Type:- GET\
   EndPoint:- http://localhost:3000/listAllObjects \

   example:- http://localhost:3000/listAllObjects \
   explaination:- List all objects 

5) GetObject

   API Type:- GET \
   EndPoint:- http://localhost:3000/getObject/:objectId \
   params:- objectId 
   
   example:- http://localhost:3000/getObject/9 \
   explaination:- This API will return the specific Object using unique object Id

6) DeleteObject

  API Type:- GET \
  EndPoint:- http://localhost:3000/deleteObject/:objectId \
  params:- objectId

  example:- http://localhost:3000/deleteObject/9 \
  explaination:- This API will Delete specific Object(File)

  
  
   
   
