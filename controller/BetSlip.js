const BetDB =  require('../model/Bet_slip')
const MultiDB =  require('../model/Multi_market')
const axios = require('axios')

let API_KEY = 'dd0b81634308844ba6297f591da129124fd417047dd7ef808e4b47ecff0b193b'

var date = new Date();
 
// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDate =  year + "-" + month  + "-" +  day 

var week =  year + "-" + month  + "-" + ( parseInt(day) + 6 )

// Get all user's profile
const BetSlip = async(req,res) =>{

    const { bet_data, potential_win,  total_odds } = req.body

    if(!potential_win || !total_odds ){
        res.status(401).json({message: "Field can't be empty"})
    }
    else{
        const user_id = req.user._id
        let type = "Single"
        try{
            let data =  await BetDB.create({ bet_data, potential_win,  total_odds,type, user_id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({error: err.message})
        }
    }
}

// Get all user's profile
const MultiSlip = async(req,res) =>{
    const { game_id, game_type } = req.body
    if(!game_id || !game_type ){
        res.status(401).json({message: "Field can't be empty"})
    }
    else{
        const user_id = req.user._id
        try{
            let data =  await MultiDB.create({ game_id, game_type, user_id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({error: err.message})
        }
    }
}

const displayMulti = async(req,res) =>{
        const user_id = req.user._id
        let a = ""
    try{
    const multiResult = await MultiDB.find({user_id})
    let game = []
    let odd = []
    let fixture = []

    multiResult.filter((el) => {
        return game.push(parseInt(el.game_id))
    });

    for(let i = 0; i < game.length; i++){
        await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&matchId=${game[i]}`)
        .then((response)=>{
            fixture.push(response.data.result)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }

    for(let i = 0; i < game.length; i++){
    await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&matchId=${game[i]}`)
    .then((response)=>{
        odd.push(response.data.result)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
    }

    res.status(200).json({fixture, odd })

    } 
    catch(error){
        res.status(500).json({error: error.message})
    }
}


// Get all user's profile
const Delete_Multi = async(req,res) =>{
    const  { id } = req.body
    if( !id ){
        res.status(404).json({error: "NO suchID"})
    }else{
        try{
            MultiDB.deleteOne({ _id: id }, function (err) {
                if(err) console.log(err);
                res.status(200).json({message : "Deleted succesfully"})
            });
        }
        catch(err){
            res.status(401).json({error: err.message})
        }
    }
}

module.exports = { BetSlip, MultiSlip,displayMulti, Delete_Multi }
