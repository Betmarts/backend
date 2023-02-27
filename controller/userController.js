const User = require('../model/users')
const bcrypt = require("bcryptjs");
const validator = require('validator')
const UsersEl = require('../model/users')
const userProfileEl = require('../model/profile')
const OtpDB = require('../model/otp')

// const DeviceDetector = require('node-device-detector');

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
 
let SECRET = "highscoretechBringwexsingthebestamoung23498hx93"

const createToken = ((_id)=>{
   return  jwt.sign({_id}, SECRET, { expiresIn: '3d' })
})

// Login controller
const loginUser = (async (req, res)=>{
    const { email , password } = req.body
    if(!email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        const exist = await User.findOne({ email })
        if (!exist){
            res.status(401).json({error :  "Incorrect email"})
        }else{
            const match = await bcrypt.compare(password,exist.password)
            if (!match){
                res.status(401).json({error : "Incorrect password"})
            }else{

                // const detector = new DeviceDetector({
                //     clientIndexes: true,
                //     deviceIndexes: true,
                //     deviceAliasCode: false,
                //   });
                
                
                // const userAgent = 'Mozilla/5.0 (Linux; Android 5.0; NX505J Build/KVT49L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36';
                // const result = detector.detect(userAgent);
                // console.log('result parse', result);

                try{
                   // create token
                   const Token = createToken(exist._id)
                   res.status(200).json({email, Token})
               } catch (error){
                   res.status(400).json({error : error.message})
               }
            }
        }
    }
})


// Signup controller
const SigninLogins = (async (req, res)=>{ 

    const {  email, password } = req.body


    if( !email || !password){
        res.status(401).json({error : "All field is required"})
    }else{
        if(!validator.isEmail(email)){
            res.status(401).json({error :  "Email is not valid"})
        } else{
            if(!validator.isStrongPassword(password)){
                res.status(401).json({error :  "Passoword is not strong"})
            }else{
                const Emailexist = await User.findOne({ email })
                if (Emailexist){
                    res.status(401).json({error :  "Email already exist"})
                }else{
                    try{
                       
                        res.status(200).json({email, password})
                    } catch (error){
                        res.status(401).json({error : error.message})
                    }
                }
            }
        }
    } 
})


// OTP
const OTP = (async (req, res)=>{

    const { otp, email } = req.body

            if(!email || !otp ){
                res.status(401).json({error : "All field is required"})
            }else{
            const userProfile = await OtpDB.findOne({ otp })
            try{
            res.status(200).json(userProfile)
            } catch (error){
                res.status(400).json({error : error.message})
            }
        }
    }
)

// Signup controller
const SigninCredentials = (async (req, res)=>{
    const {firstname,  surname, country, DOB,  email, password } = req.body
    if( !firstname || !surname || !DOB || !country || !email || !password){
        res.status(401).json({error : "All field is required"})
    }else{

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try{
        let gender = "-"
        let bankName = "-"
        let acc_num = "-"
        let acc_name = "-"
        let mainBal = 0
        let exposure = 0
        const user = await UsersEl.create({ email , password : hash })

        await userProfileEl.create({ firstname, surname, DOB, country, gender, bankName, acc_name, acc_num, mainBal, exposure, user_id:user._id })
        // create token
        const Token = createToken(user._id)
        res.status(200).json({email, Token})
    } catch (error){
        res.status(400).json({error : error.message})
    }
}
})


module.exports = { loginUser, SigninCredentials, OTP, SigninLogins }