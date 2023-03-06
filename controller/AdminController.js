const BookingDB =  require('../model/Booking')
const crypto = require('crypto');


// Get all user's profile
const BookingCode = async(req,res) =>{

    const { betting_code } = req.body
 
    if(!betting_code){
        res.status(401).json({message: "Field can't be empty"})
    }
    else{
        try{
            const get_slip = await BookingDB.findOne({booking_code:betting_code})

            if(!get_slip){
                res.status(401).json({Error: "Incorrect booking coding"})
            }else{
                res.status(200).json(get_slip)
            }
        }
        catch(err){
            res.status(401).json({message: err.message})
        }
    }
}


// Get all user's profile
const Booking = async(req,res) =>{

    const { bet_slip, stake_amount, potential_win, total_odds } = req.body
    
    if(!bet_slip, !stake_amount || !potential_win || !total_odds){
        res.status(401).json({message: "Field can't be empty"})
    }
    else{
        const booking_code = crypto.randomBytes(8).toString('hex');
        try{
        const user = await BookingDB.create({ bet_slip ,stake_amount, potential_win,booking_code, total_odds})
            res.status(200).json(user)
        }
        catch(err){
            res.status(401).json({message: err.message})
        }
    }
}
 

module.exports = {Booking, BookingCode}
