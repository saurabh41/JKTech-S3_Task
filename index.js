const express = require("express")
const initialize = require("./db/app")
const routes = require("./apiRoutes")
const app =  express()
// app.use(express.json()); 

app.use('/',routes)

const port = 3000
app.listen(port, async ()=>{
    initialize.initialize()
    console.log(`server started on port ${port}`)

})