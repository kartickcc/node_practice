const express = require('express')
const router = express.Router();
const UserModel = require('../model/userModel')

router.post('/add',async (req,res,next)=>{
    const {name,email} = req.body
    try{
        const result = await UserModel.create({name,email})
        console.log(result)
        res.json({
            status:true,
            data:result
        })
    }catch(err){
        
        console.log('Error:' , err)
        next(err);
    }
    
})

router.get('/fetchusers',async(req,res)=>{
    try{
        let data = await UserModel.find()
       console.log(data)
            res.json({
                status:true,
                data:data 
            })
    }catch(err){
       console.log(err.message)
    }
    
})
router.get('/fetchuser/:id',async(req,res,next)=>{
    const paramId = req.params.id
    try{
        
        let data = await UserModel.findById(paramId)

        console.log(data)
            res.json({
                status:true,
                data:data || {},
            })
    }catch(err){
        console.log('Error:' , err)
        next(err);
    }
    
})
router.put('/update/:id',async(req,res,next)=>{
    const paramId = req.params.id
    try{
        
        let data = await UserModel.updateOne(
            {_id:paramId},
            {$set : {name:req.body.name}}
        )

        console.log(data)
            res.json({
                status:true,
                data:data 
            })
    }catch(err){
        console.log('Error:' , err)
        next(err);
    }
    
})

router.delete('/delete/:id',async(req,res,next)=>{
    const paramId = req.params.id
    try{
        
        let data = await UserModel.updateOne(
            {_id:paramId},
            {$set : {isDeleted:true}}
        )
            res.json({
                status:true,
                message : 'Successfully deleted',
                data:data 
            })
    }catch(err){
        console.log('Error:' , err)
        next(err);
    }
    
})

router.get('/search/query',async(req,res,next)=>{
    const {keyword} = req.query
    try{
        if (!keyword) return res.status(400).json({ message: 'Keyword is required' });
        const data = await UserModel.find(
            { $text: { $search: keyword }, isDeleted: false },
            { score: { $meta: 'textScore' } }
          ).sort({ score: { $meta: 'textScore' } });
    }catch(err){
       next(err)
    } 
})

// exports.getPaginatedUsers = async (req, res) => {
//     try {
//       const { page = 1, limit = 10, age, search } = req.query;
  
//       const query = { isDeleted: false };
  
//       // Optional filter by age
//       if (age) query.age = Number(age);
  
//       // Optional text search
//       if (search) {
//         query.$text = { $search: search };
//       }
  
//       const skip = (page - 1) * limit;
  
//       const [users, total] = await Promise.all([
//         User.find(query)
//           .skip(skip)
//           .limit(Number(limit)),
//         User.countDocuments(query),
//       ]);
  
//       res.json({
//         total,
//         page: Number(page),
//         pageSize: Number(limit),
//         totalPages: Math.ceil(total / limit),
//         users,
//       });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };
  
module.exports = router