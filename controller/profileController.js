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


// update userProfile 
const defaultMatch = async (req, res) =>{

   const { game_id } = req.body

   if( !game_id ){
       res.status(401).json({error : "All field is required"})
   }else{
      let odd = ''
      let cap = []
      let fixture = ''
      const user_id = req.user._id
      try{

         await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&from=${formattedDate}&to=${week}&matchId=${game_id}`)
         .then((response)=>{
            odd = (response.data.result)
         })
         .catch((error)=>{
            res.status(404).json(error)
         })
         
         await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&matchId=${game_id}`)
         .then((response)=>{
             fixture = (response.data.result)
         })
         .catch((error)=>{
             res.status(404).json(error)
         })
         
         for(let i = 0; i < fixture.length; i++){
             let o = (fixture[i].event_key)
             if(odd[o]){
                 if(odd[o][0].match_id === o){
                     c = { ...odd[o][3], ...fixture[i]}
                     cap.push(c)
                 }
             }
         }
         
         res.status(201).json({result : cap})
      } catch(err){
         res.status(500).json({message: err.message})
      }
   }
}

module.exports = {SingleUser, UserPro, Wallet, UpdateUser, defaultMatch  }