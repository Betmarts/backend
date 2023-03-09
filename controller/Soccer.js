const axios = require('axios')

let API_KEY = '28e187c830dda905dca2181caeb576ac61d7d7f64dfe62c6308a210ab0218758'

var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDate =  year + "-" + month  + "-" +  day 

var week =  year + "-" + month  + "-" + ( parseInt(day) + 6 )

const Country = ( async (req, res)=>{
    try{
        await axios.get(`https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${API_KEY}`)
        .then((response)=>{
            let resu = (response.data.result)
            let coun = ["South Africa", "Belgium", "Cyprus", "England", "Europe", "Germany", "Netherlands", "Italy", "Spain", "India", "Kazakhstan"]
            let go = resu.filter((el)=>{
                return coun.includes(el.country_name)
            })
          res.status(200).json(go)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }catch(err){
        res.status(404).json({error: "Request not found"})
    }
})




const League = ( async (req, res)=>{
    const {sport_name, countryId } = req.body
    if(!countryId || !sport_name){
        res.status(500).json({error: "Country Id is missing"})
    }else{
        await axios.get(`https://apiv2.allsportsapi.com/${sport_name}/?met=Leagues&APIkey=${API_KEY}&countryId=${countryId}`)
        .then((response)=>{
            res.status(200).json(response.data.result)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
})

const Cricket_league = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Leagues&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})


const Tennis_league = ( async (req, res)=>{

    await axios.get(`https://apiv2.allsportsapi.com/tennis/?met=Leagues&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})


const defaultFixtures = ( async (req, res)=>{
    
    let odd = []
    let fixture = []

        try{
            await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}&leagueId=44`)
            .then((response)=>{
                fixture.push(response.data.result)
            })
            .catch((error)=>{
                res.status(404).json(error)
            })

        for(let i = 0; i < fixture[0].length; i++){
            await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&matchId=${fixture[0][i].event_key}`)
            .then((response)=>{
                odd.push(response.data.result[fixture[0][i].event_key][0])
            })
            .catch((error)=>{
                res.status(404).json(error)
            })
        }
        res.status(200).json({fixture, odd})
    }catch(err){
        res.status(400).json(err)
    }
})


const defaultFixtures_Cricket = ( async (req, res)=>{
    let odd = []
    let fixture = []

        try{
            await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}`)
            .then((response)=>{
                fixture.push(response.data.result[0])
            })
            .catch((error)=>{
                res.status(404).json(error)
            })

        for(let i = 0; i < fixture.length; i++){
            console.log()
            await axios.get(`https://apiv2.allsportsapi.com/cricket/?&met=Odds&matchId=${fixture[i].event_key}&APIkey=${API_KEY}`)
            .then((response)=>{
                odd.push(response.data.result[fixture[i].event_key])
            })
            .catch((error)=>{
                res.status(404).json(error)
            })
        }
        res.status(200).json({fixture, odd})
    }catch(err){
        res.status(400).json(err)
    }
})


const defaultFixtures_Tennis = ( async (req, res)=>{
    let odd = []
    let fixture = []
    try{
        await axios.get(`https://apiv2.allsportsapi.com/tennis/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}`)
        .then((response)=>{
            fixture.push(response.data.result)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })

     for(let i = 0; i < fixture[0].length; i++){
            await axios.get(`https://apiv2.allsportsapi.com/tennis/?&met=Odds&matchId=7349508&APIkey=${API_KEY}`)
            .then((response)=>{
                odd.push(response.data)
            })
            .catch((error)=>{
                res.status(404).json(error)
            })
        }
        res.status(200).json({fixture})
    }catch(err){
        res.status(400).json(err)
    }
})


const Fixtures = ( async (req, res)=>{
    const {sport_name, leagueId } = req.body
    let odd = []
    let fixture = []

    if(!leagueId || !sport_name){
        res.status(500).json({error: "League Id is missing"})
    }else{
        try{
            await axios.get(`https://apiv2.allsportsapi.com/${sport_name}/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}&leagueId=${leagueId}`)
            .then((response)=>{
                fixture.push(response.data.result)
            })
            .catch((error)=>{
                res.status(404).json(error)
            })

            for(let i = 0; i < fixture[0].length; i++){
                await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&matchId=${fixture[0][i].event_key}`)
                .then((response)=>{
                    odd.push(response.data.result[fixture[0][i].event_key][0])
                })
                .catch((error)=>{
                    res.status(404).json(error)
                })
            }
            res.status(200).json({fixture, odd})

    }catch(err){
        res.status(400).json(err)
    }

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

const Livescore = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const LiveTennis = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/tennis/?met=Livescore&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const LiveCricket= ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Livescore&APIkey=${API_KEY}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})



// Get year, month, and day part from the date
var yearel = date.toLocaleString("default", { year: "numeric" });
var monthel = date.toLocaleString("default", { month: "2-digit" });
var dayel = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDateEL =  yearel + "-" + monthel  + "-" +  dayel


const TodayFootball = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDateEL}&to=${formattedDateEL}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const TodayCricket = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDateEL}&to=${formattedDateEL}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const TodayTennis = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/tennis/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDateEL}&to=${formattedDateEL}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

var datePO = new Date();
// Get year, month, and day part from the date
var yearPO = date.toLocaleString("default", { year: "numeric" });
var monthPO = date.toLocaleString("default", { month: "2-digit" });
var dayPO = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDatePO =  yearPO + "-" + monthPO  + "-" + ( parseInt(dayPO) + 1 )


const TommorowTennis = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/tennis/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDatePO}&to=${formattedDatePO}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const TommorowCricket = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDatePO}&to=${formattedDatePO}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

const TommorowFootball = ( async (req, res)=>{
    await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDatePO}&to=${formattedDatePO}`)
    .then((response)=>{
        res.status(200).json(response.data)
    })
    .catch((error)=>{
        res.status(404).json(error)
    })
})

module.exports = {Country,TodayFootball,TommorowTennis, TommorowFootball, TommorowCricket,  TodayCricket, TodayTennis,  LiveCricket, LiveTennis, defaultFixtures,Cricket_league,Tennis_league, League ,defaultFixtures_Cricket ,defaultFixtures_Tennis , Fixtures, Livescore, Match, Odds}
