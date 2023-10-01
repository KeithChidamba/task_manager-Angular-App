const User = require('../models/user');
const jwt= require('jsonwebtoken');
const config = require('../config/database');
const Task =require('../models/task');

module.exports = (router) => {
    router.post('/login', async (req,res)=>{
        
        if(!req.body.username){
            res.send(["username required"])
            res.json({success: false, message:"username required"})
        }
        else if(!req.body.password){
            res.send(["password requiered"])
            res.json({success: false, message:"password required"})
        }else{

           const user =  await User.findOne({username:req.body.username.toLowerCase()}, (err,user)=>{
               if(err){
                    return res.status(400).send(["encountered Error",err]);
               }else{
                if(!user){
                    return res.status(421).send(["username not found"]);
                }else{
                   const validPassword= user.comparePassword(req.body.password);
                   if(!validPassword){
                       return res.status(423).send(["password invalid"]);
                   }else{
                     const token = jwt.sign({userId: user._id},config.secret, {expiresIn:'24h'});
                     if(validPassword&&user){
                        return res.send(JSON.stringify(token))
                     }  
                   }
                }
               }
            }).clone();
        }    
      });
    router.post('/register',(req,res)=>{
        
        if(!req.body.email){
            res.json({success: false, message:"email required"})
        }
        else if(!req.body.username){
                res.json({success: false, message:"username required"})
            }
        else if(!req.body.password){
                    res.json({success: false, message:"password required"})
                } 
        else{
                let user = new User({
                    email:req.body.email.toLowerCase(),
                    username:req.body.username.toLowerCase(),
                    password:req.body.password
                });

                user.save((err)=>{
                    if(err){
                        if(err.code ===11000){
                            return res.status(422).send(["username or email already exists"]);
                        }else{
                           if(err.errors.email){
                               res.json({success: false, message:err.errors.email.message});
                           }else{
                            if(err.errors.username){
                                res.json({success: false, message:err.errors.username.message});
                            }else{
                                if(err.errors.password){
                                    res.json({success: false, message:err.errors.password.message});
                                } else{
                                 res.json({success: false, message:"user not saved",err});
                                }
                           }
                        }
                    } 
                    }
                    else{
                        res.json({success: true, message:"account Registered"});
                        res.send('registered');
                    }
                });

                 
            }
    });
    router.use((req,res,next)=>{
        const token = req.headers['authorization'];
        if(!token){
            res.json({success: true, message:"no token"});
            return res.status(426).send(["no token"]);
        }else{
            jwt.verify(token,config.secret,(err,decoded)=>{
                if(err){
                    res.json({success: false, message:"token invalid"+err}); 
                    return res.status(427).send(["token invalid"]); 
                }else{
                    req.decoded = decoded;
                    next();
                }
            })
        }

    });
    router.get('/profile',async(req,res)=>{
        const user = await User.findOne({_id:req.decoded.userId}).select('username email').exec((err,user)=>{
            if(err){
                res.json({success: false, message:err});  
            }else{
                if(!user){
                    res.json({success: false, message:"no user"});
                }else{
                    res.json({name:user.username,email:user.email})
                }
            }
        })

    });
    return router;
}