const deposit = require('../model/deposit')


//..create a new deposit 
const Deposit = async (req, res) => {

    const { coin_name,  coin_amount, gas_fee, usd_amount, wallet_address,  network_address } = req.body

    if( !coin_name || !coin_amount || !gas_fee || !wallet_address || !usd_amount || !network_address){
        res.status(401).json({error : "All field is required"})
    }else{
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
}

//..create a new deposit 
const Withdraw = async (req, res) => {

    const { coin_name,  coin_amount, gas_fee, usd_amount, wallet_address,  network_address } = req.body

    if( !coin_name || !coin_amount || !gas_fee || !wallet_address || !usd_amount || !network_address){
        res.status(401).json({error : "All field is required"})
    }else{
        const user_id = req.user._id
        const status = "pending"
        const  date_time = new Date()
        const type = `Withdraw`

    try{
    const depositData = await deposit.create({user_id, coin_name,  coin_amount, usd_amount, wallet_address,gas_fee,  network_address,type, status, date_time })

       res.status(200).json(depositData)
    } catch(error){
        res.status(500).json({error: error.message})
    }
}
}

//.. Get all deposits 
const depositHistory  = async(req, res) => {
    const user_id = req.user._id
    try{
        const allDeposits = await deposit.find({user_id})
        res.status(200).json(allDeposits)
    } catch(error){
        res.status(500).json({error: error.message})
    }
}



// Swap coins
const ToMain = async(req,res) =>{
    // Coin is the name of the coin to transfer from
    // Price is the price of coin to deduct
    // PriceConvert is the amount to be added to the main balanace
    const { coin ,price, priceConvert } = req.body
    
    const user_id = req.user._id
 
    if(!user_id){
       res.status(404).json({error:"User does not exit"})
    }else{
 
       const user =  await deposit.findOne({user_id})
       
       if(coin === "sol"){
          let totalcoin = user.sol - price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{sol: totalcoin, accBalance:  totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "nexo"){
          let totalcoin = user.nexo -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{nexo:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "bnb"){
          let totalcoin = user.bnb -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{bnb:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "matic"){
          let totalcoin = user.matic -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{matic:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "eth"){
          let totalcoin = user.eth -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{eth:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "btc"){
          let totalcoin = user.btc -price
          let totalbal = user.accBalance + priceConvert
          
          deposit.updateOne({user_id},{btc:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "usdc"){
          let totalcoin = user.usdc -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{usdc:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "usdt"){
          let totalcoin = user.usdt -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{btc:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "busd"){
          let totalcoin = user.busd -price
          let totalbal = user.accBalance + priceConvert
          deposit.updateOne({user_id},{busd:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
    }
 }
 
 
 
 // Swap coins
 const ToCoin = async(req,res) =>{
    // Coin is the name of the coin 
    // Price is the amount to deduct from main balance
    // Pricecovert is the price to be added to a coin
    const { coin , price, priceConvert } = req.body
    
    const user_id = req.user._id
 
    if(!user_id){
       res.status(404).json({error:"User does not exit"})
    }else{
 
       const user =  await deposit.findOne({user_id})
 
 
       
       if(coin === "sol"){
          let totalcoin = user.sol + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{sol: totalcoin, accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "nexo"){
          let totalcoin = user.nexo + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{nexo:totalcoin,  accBalance: totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "bnb"){
          let totalcoin = user.bnb + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{bnb:totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "matic"){
          let totalcoin = user.matic + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{matic: totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "eth"){
          let totalcoin = user.eth + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{eth: totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult = await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "btc"){
          let totalcoin = user.btc + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{btc: totalcoin, accBalance:totalbal }, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "usdc"){
          let totalcoin = user.usdc + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{usdc: totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "usdt"){
          let totalcoin = user.usdt + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{usdt: totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
 
       if(coin === "busd"){
          let totalcoin = user.busd + priceConvert 
          let totalbal = user.accBalance -  price
          deposit.updateOne({user_id},{busd:  totalcoin, accBalance:totalbal}, ((err,result)=>{
             if (err) {
               console.log(err)
             } else {
               console.log(result)
             }
          }));
          const userResult =   await deposit.findOne({user_id})
          res.status(200).json(userResult)
       }
    }
 }
 

module.exports = {depositHistory ,Withdraw , Deposit, ToCoin, ToMain }