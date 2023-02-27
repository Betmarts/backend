const BetDB =  require('../model/Bet_slip')

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

    const { bet_data, potential_win,  total_odds } = req.body

    if(!potential_win || !total_odds ){
        res.status(401).json({message: "Field can't be empty"})
    }

    else{
        let type = "Multi"
        const user_Id = req.user._id
        try{
            let data =  await BetDB.create({ bet_data, potential_win,  total_odds,type, user_Id })
            res.status(200).json(data)
        }
        catch(err){
            res.status(401).json({message: err.message})
        }
    }
}


module.exports = { BetSlip, MultiSlip }
