const express = require("express");
const connectWithRetry = require('./db')
const userRouter = require('./routes/userRoute')

const app = express()
const PORT = 5000
connectWithRetry()

//
app.use('/user',userRouter)

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})