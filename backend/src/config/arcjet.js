const arcjet =require("@arcjet/node");
const {tokenBucket,shield,detectBot}=require("@arcjet/node");
const ENV=require("./env");



const aj = arcjet({
    key:ENV.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
      shield({node:"LIVE"}) ,
       detectBot({
        node:"LIVE",
        allow:[
            "CATEGORY:SEARCH_ENGINE",
        ]
       }),

       tokenBucket({
        mode:"LIVE",
        refillRate:10,
        interval:10,
        capacity:15,
       })
    ],
})

module.exports = aj