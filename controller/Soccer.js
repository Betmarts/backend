const axios = require('axios')

let API_KEY = '28e187c830dda905dca2181caeb576ac61d7d7f64dfe62c6308a210ab0218758'

// let a = [{
//     key: 23,
//     fol: "loa",
//     country: "Niger"
// },
// {
//     key: 22,
//     fol: "loa",
//     country: "England"
// }]

// let re = [
//     {
//         11: [
//             {
//                 how: "milk",
//                 low: "tea"
//             }
//         ],
//         12: [
//             {
//                 how: "teach",
//                 low: "Laptop"
//             }
//         ],
//         22: [
//             {
//                 how: "school",
//                 low: "knowledge"
//             }
//         ],
//         23: [
//             {
//                 how: "codeing",
//                 low: "hard"
//             }
//         ],
//     }
// ]

// var newArray = a.filter((el) => {
//     console.log(re[0][el.key] );
// });


var date = new Date();
 
// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDate =  year + "-" + month  + "-" +  day 

var week =  year + "-" + month  + "-" + ( parseInt(day) + 6 )

const Country = ( async (req, res)=>{

    await axios.get(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const Livescore = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const League = ( async (req, res)=>{
    const {sport_name, countryId } = req.body
    if(!countryId || !sport_name){
        res.status(500).json({error: "Country Id is missing"})
    }else{
        await axios.get(`https://apiv2.allsportsapi.com/${sport_name}/?met=Leagues&APIkey=${API_KEY}&countryId=${countryId}`)
        .then((response)=>{
            res.status(200).json(response.data)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
})

const Fixtures = ( async (req, res)=>{
    const {sport_name, leagueId } = req.body
    if(!leagueId || !sport_name){
        res.status(500).json({error: "League Id is missing"})
    }else{
        await axios.get(`https://apiv2.allsportsapi.com/${sport_name}/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}&leagueId=${leagueId}`)
        .then((response)=>{
            res.status(200).json(response.data)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
})


const Match = ( async (req, res)=>{
    const {sport_name, matchId } = req.body

    if(!matchId || !sport_name){
        res.status(500).json({error: "Match Id is missing"})
    }else{
        await axios.get(`https://apiv2.allsportsapi.com/${sport_name}/?met=Fixtures&APIkey=Odds&APIkey=${API_KEY}&matchId=${matchId}`)
        .then((response)=>{
            res.status(200).json(response.data)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
})

const Odds = ( async (req, res)=>{
    const {sport_name, matchId } = req.body
    if(!matchId || !sport_name){
        res.status(500).json({error: "Match Id is missing"})
    }else{
         await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&matchId=${matchId}`)
        .then((response)=>{
            res.status(200).json(response.data)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
})

module.exports = {Country, League , Fixtures, Livescore, Match, Odds}
