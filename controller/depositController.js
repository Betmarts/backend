const deposit = require('../model/deposit')


//..create a new deposit 
exports.createDeposit = async (req, res) => {
    try{
        const newDeposit = new deposit({
            ID: req.body.ID,
            currency: req.body.currency,
            network: req.body.network,
            amount: req.body.amount,
            walletaddress: req.body.walletaddress,
            depositamount: req.body.depositamount,
            status: req.body.status,
            date: req.body.date
        })

       const  depositData = await newDeposit.save()
       res.status(200).json({depositData})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//.. Get all deposits 
exports.getAllDeposits = async(req, res) => {
    const {ID} = req.deposit._id
    try{
        const allDeposits = await deposit.find({ID})
        res.status(200).json({allDeposits})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}