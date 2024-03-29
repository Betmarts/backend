const mongoose = require('mongoose')
const UserProfile =  require('../model/users')
const UsersProfile =  require('../model/profile')
const WalletDB = require("../model/Wallet")
const axios = require("axios")

const API_KEY = 'dd0b81634308844ba6297f591da129124fd417047dd7ef808e4b47ecff0b193b'


var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDate =  year + "-" + month  + "-" +  day 

var week =  year + "-" + month  + "-" + ( parseInt(day) + 2 )

// Get singl
const SingleUser = async(req,res) =>{
   const user_id = req.user._id
   try{
      const users =   await UsersProfile.find({user_id })
      res.status(200).json(users)
   }
   catch(err){
      res.status(501).json({message: err.message})
   }
}

// Get single user's Wallet
const Wallet = async(req,res) =>{
   const user_id = req.user._id
   try{
      const users =   await WalletDB.find({user_id })
      res.status(200).json(users)
   }
   catch(err){
      res.status(501).json({message: err.message})
   }
}


// Get an individual profile
const UserPro = async(req, res)=>{
     const { id } = req.params

     if( !mongoose.Types.ObjectId.isValid(id) ){
            res.status(404).json({error: "NO such profile"})
     }else{
        const SingleProfile = await UserProfile.findById(id)
        if(SingleProfile){
           res.status(201).json(SingleProfile)
        }else{
           res.status(409).json({error: "No such Id "})
        }
     }
}


// update userProfile 
const UpdateUser = async(req, res) =>{

   const {gender , bankName, acc_name, acc_num } = req.body

   if(!gender || !bankName || !acc_name, !acc_num ){
       res.status(401).json({error : "All field is required"})
   }else{
      const user_id = req.user._id
      try{
    const profileUpdate =  await UsersProfile.updateOne({ user_id }, { gender, bankName, acc_name, acc_num });
         
         res.status(201).json(profileUpdate)
      } catch(err){
         res.status(500).json({message: err.message})
      }
   }
}

module.exports = {SingleUser, UserPro, Wallet, UpdateUser  }