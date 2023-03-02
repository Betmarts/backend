const BetDB =  require('../model/Bet_slip')
const MultiDB =  require('../model/Multi_market')

// Get all user's profile
const BetSlip = async(req,res) =>{

    const { bet_data, potential_win,  total_odds } = req.body

    if(!potential_win || !total_odds ){
        res.status(401).json({message: "Field can't be empty"})
    }

    else{
        const user_Id = req.user._id
        let type = "Single"
        try{
            let data =  await BetDB.create({ bet_data, potential_win,  total_odds,type, user_Id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({message: err.message})
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
        const user_Id = req.user._id
        try{
            let data =  await MultiDB.create({ game_id, game_type, user_Id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({message: err.message})
        }
    }
}

// Get all user's profile
const Delete_Multi = async(req,res) =>{

    const { game_id, game_type } = req.body

    if(!game_id || !game_type ){
        res.status(401).json({message: "Field can't be empty"})
    }
    else{
        const user_Id = req.user._id
        try{
            let data =  await MultiDB.create({ game_id, game_type, user_Id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({message: err.message})
        }
    }
}


module.exports = { BetSlip, MultiSlip, Delete_Multi }
