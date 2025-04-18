const express = require("express");
require('dotenv').config()
const helmet = require('helmet');
//const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectWithRetry = require('./db')
const userRouter = require('./routes/userRoute')


const app = express()
const errorHandler = require('./middleware/errorHandler');
const PORT = 5000
connectWithRetry()
//middleware
app.use(express.json()); 
// Use Helmet to set secure HTTP headers
app.use(helmet());
//Sanitize user input:
// Custom sanitizer (safe fallback)
const sanitize = (req, res, next) => {
  const sanitizeObject = (obj) => {
    for (let key in obj) {
      if (/^\$/.test(key)) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitizeObject(obj[key]);
      }
    }
  };

  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
};

app.use(sanitize);
//app.use(xss());
//Limit body size
app.use(express.json({ limit: '10kb' }));

//router
app.use('/user',userRouter)
// Register the global error handler at the bottom
app.use(errorHandler);
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})