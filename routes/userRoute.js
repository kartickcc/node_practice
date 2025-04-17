const express = require('express')
const router = express.Router();

router.post('/add',(req,res)=>{
    res.send('test')
})
module.exports = router