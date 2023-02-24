
const axios = require('axios')

let host = `https://api.the-odds-api.com`

const Leagues = (async(req, res)=>{

 await axios.get(host+"/v4/sports?apiKey="+process.env.Odd_API_KEY)
 .then(response =>{
  res.status(200).json(response.data)
 })
 .catch(err =>{
  console.log(err)
 })
})



module.exports = {Leagues }
