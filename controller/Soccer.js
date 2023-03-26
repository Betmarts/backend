const axios = require('axios')

let API_KEY = 'dd0b81634308844ba6297f591da129124fd417047dd7ef808e4b47ecff0b193b'

var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
var formattedDate =  year + "-" + month  + "-" +  day 

var week =  year + "-" + month  + "-" + ( parseInt(day) + 3 )

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


let a = [{
    key: 90,
    address: "Uyo"
},{
    key: 80,
    address: "Abia"
},
{
    key: 70,
    address: "Abia"
}
]

let b = {
   "90" :[{
    name: "Okon",
    course: "HTML",
    id:90
},
{
    cart: "ol",
    poem: "Mo",
    id:90
},
],
  "80":[ {
    name: "James",
    course: "CSS",
    id:80
},
{
    cart: "op",
    poem: "iu",
    id:90
},],
  "70" :[ {
    name: "Sam",
    course: "js",
    id:70
},{
    cart: "ol",
    poem: "Mo",
    id:90
},]
}

let obj = Object.keys(b)

let r = a.filter((e)=>{
    console.log(obj)
})

// console.log(b)
let cap = []

for(let i = 0; i < a.length; i++){
    let o = (a[i].key)
    if(b[o]){
        if(b[o][0].id === o){
             c = { ...{odds:b[o]}, ...{fixtures: a[i]}}
                cap.push(c)
        }
    }
}

const Fixtures = ( async (req, res)=>{
    let odd = ''
    let cap = []
    let fixture = ''

            await axios.get(`https://apiv2.allsportsapi.com/football/?met=OddsLive&APIkey=${API_KEY}`)
            .then((response)=>{
                odd = (response.data.result)
            })
            .catch((error)=>{
                res.status(404).json(error)
            })

            await axios.get(`https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}`)
            .then((response)=>{
                fixture = (response.data.result)
            })
            .catch((error)=>{
                res.status(404).json(error)
            })

            for(let i = 0; i < fixture.length; i++){
                let o = (fixture[i].event_key)
                if(odd[o]){
                    if(odd[o][0].match_id === o){
                        c = { ...{odds : odd[o]}, ...{fixtures :fixture[i]}}
                        cap.push(c)
                    }
                }
            }
        try{
            res.status(200).json({result: cap})
        }catch(err){
            res.status(400).json(err)
        }
})

const Cricket_fixtures = ( async (req, res)=>{
    let fix = [ ]
    let odd = [ ]

    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}`)
    .then((response)=>{
        fix.push(response.data.result)
    })
    .catch((error)=>{
        console.log("error")
    })

    for(let i = 0; i < fix[0].length; i++){
        await axios.get(`https://apiv2.allsportsapi.com/cricket/?&met=Odds&APIkey=${API_KEY}&matchId=${fix[0][i].event_key}`)
        .then((response)=>{

            odd.push(response.data.result)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
    try{
        res.status(200).json({fix, odd})
    }catch(err){
        res.status(400).json(err)
    }
})



const Tennis_fixtures = ( async (req, res)=>{
    let fix = [ ]
    let odd = [ ]

    await axios.get(`https://apiv2.allsportsapi.com/cricket/?met=Fixtures&APIkey=${API_KEY}&from=${formattedDate}&to=${week}`)
    .then((response)=>{
        fix.push(response.data.result)
    })
    .catch((error)=>{
        console.log("error")
    })

    for(let i = 0; i < fix[0].length; i++){
        await axios.get(`https://apiv2.allsportsapi.com/football/?&met=Odds&APIkey=${API_KEY}&matchId=${fix[0][i].event_key}`)
        .then((response)=>{
            odd.push(response.data.result)
        })
        .catch((error)=>{
            res.status(404).json(error)
        })
    }
    try{
        res.status(200).json({fix, odd})
    }catch(err){
        res.status(400).json(err)
    }
})


const defaultFixtures = ( async (req, res)=>{
    let odd = []
    let fixture = []

    // await axios.get(`https://apiv2.allsportsapi.com/football/?met=OddsLive&APIkey=${API_KEY}`)
    // .then((response)=>{
    //     res.status(200).json(response.data)
    // })

        // for(let i = 0; i < fixture[0].length; i++){
               await axios.get(`https://apiv2.allsportsapi.com/football/?met=OddsLive&APIkey=${API_KEY}`)
                .then((response)=>{
                    res.status(200).json(response.data.result)
                    console.log(Object.keys(response.data.result))
                })
                .catch((error)=>{
                    res.status(404).json(error)
                })
        // }
    //     console.log(odd)
    //  console.log(Object.keys(odd))           
        // res.status(200).json({fixture})
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

module.exports = { Country, TodayFootball, TommorowTennis, TommorowFootball, TommorowCricket, 
    TodayCricket, TodayTennis,  LiveCricket,  LiveTennis,  defaultFixtures, Cricket_league, Tennis_league, 
    League ,Tennis_fixtures, Fixtures,  Cricket_fixtures,  Livescore,  Match }
