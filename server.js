const express = require("express");
require('dotenv').config()
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectWithRetry = require('./db')
const userRouter = require('./routes/userRoute')


const app = express()
const PORT = 5000
connectWithRetry()

// Use Helmet to set secure HTTP headers
app.use(helmet());
//Sanitize user input:
app.use(mongoSanitize());
app.use(xss());
//Limit body size
app.use(express.json({ limit: '10kb' }));

//router
app.use('/user',userRouter)

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})