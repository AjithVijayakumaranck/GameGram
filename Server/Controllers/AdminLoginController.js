const { Admin } = require("../modals/adminDetails")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../modals/signupModal")




module.exports = {
    login: (req, res, next) => {
        try {

            let { userName, password } = req.body
            let admin = Admin.findOne({ email: userName })
            if (admin) {
                let VerifiedAdmin = bcrypt.compare(req.body.password, user.password)
                if (VerifiedAdmin) {
                    const token = jwt.sign({
                        ...admin
                    }, process.env.JWTPRIVATEKEY, {
                        expiresIn: 1000 * 60 * 60 * 24
                    });
                    res.status(200).json({ token });
                } else {
                    res.status(401).json({ message: "Unauthorized User" })
                }
            } else {
                res.status(500).json({ message: "Internal Server Error" })
            }

        } catch (err) {
            res.status(500).json({ message: "internal server error" })
        }
    },
    getUsers: (req, res, next) => {
        try {
            User.find().then((response) => {
                res.status(200).json(response)
            }).catch((err) => {
                res.status(500).json({ message: "internal server error" })
            })
        } catch (err) {
            res.status(500).json({ message: "internal server error" })
        }
    },
    blockhandler : (req,res,next)=>{
        try{
                let {userId} = req.body
               console.log(userId);
        User.findOne({_id:userId}).then((response)=>{
            console.log(response);
            if(!response.Blocked){
                User.updateOne({_id:userId},{
                    $set:{
                        Blocked:true
                    }
                }).then(()=>{
                    console.log("blocked");
                    res.status(200)
                }).catch((err)=>{
                    console.log("blocking failed");
                    res.status(500)
                })
            }else{
                User.updateOne({_id:userId},{
                    $set:{
                        Blocked:false
                    }
                }).then(()=>{
                    console.log("unblocked");
                    res.status(200)
                }).catch((err)=>{
                    console.log("unblocking failed");
                    res.status(500)
                })
            }
        })
        }catch (err) {
            res.status(500).json({ message: "internal server error" })
        }
    },
    getSingleUser : (req,res,next)=>{
        try{
            console.log(req.params.id);
            let {id} = req.params
            User.findOne({_id:id}).then((response)=>{
                console.log(response);
                 res.status(200).json(response)
            }).catch((err)=>{
                res.status(500).json({message:"internal server error"})
            })
        }catch(err) {
           
            res.status(500).json({ message: "internal server error" })

        }

    }
}