const deposit = require('../model/deposit')


//..create a new deposit 
const Deposit = async (req, res) => {

    const { coin_name,  coin_amount, gas_fee, usd_amount, wallet_address,  network_address } = req.body

    if( !coin_name || !coin_amount || !gas_fee || !wallet_address || !usd_amount || !network_address){
        res.status(401).json({error : "All field is required"})
    }
        const user_id = req.user._id
        const status = "pending"
        const  date_time = new Date()
        const type = `Deposit`
    try{
    const depositData = await deposit.create({user_id, coin_name,  coin_amount, usd_amount, wallet_address,gas_fee,  network_address,type, status, date_time })

       res.status(200).json(depositData)
    } catch(error){
        res.status(500).json({message: err.message})
    }
}

//..create a new deposit 
const Withdraw = async (req, res) => {

    const { coin_name,  coin_amount, usd_amount, wallet_address,  network_address } = req.body

    if( !coin_name || !coin_amount || !wallet_address || !usd_amount || !network_address){
        res.status(401).json({error : "All field is required"})
    }
        const user_id = req.user._id
        const status = "pending"
        const  date_time = new Date()
        const type = `Withdraw`

    try{
    const depositData = await deposit.create({user_id, coin_name,  coin_amount, usd_amount, wallet_address,  network_address, type, status, date_time })

       res.status(200).json(depositData)
    } catch(error){
        res.status(500).json({message: err.message})
    }
}

//.. Get all deposits 
const depositHistory  = async(req, res) => {
    const user_id = req.user._id
    try{
        const allDeposits = await deposit.find(user_id)
        res.status(200).json(allDeposits)
    } catch(error){
        res.status(500).json({message: err.message})
    }
}


module.exports = {depositHistory ,Withdraw , Deposit }