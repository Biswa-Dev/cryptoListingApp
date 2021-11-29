// requiring all the packages needed for this app
require('dotenv').config({path:'./.env'});
const express = require('express');
const http = require('http');
var axios = require("axios");

//declaring our app
const app = express();
//DB connection
require('./db/conn')
//User Model
const Crypto = require('./models/cryptoschema');

app.use(express.json());


app.get("/home",(req,res)=>{
    // const url = "https://api.nomics.com/v1/currencies/ticker?key="+ process.env.NOMICS_API_KEY ;
    // axios
    // .get(url)
    // .then(response => console.log(response))
    // .catch(error => {
    //     console.log(error);
    // });
    res.send("this is home");
});

app.post("/",async (req,res) => {
    const{name,symbol,image,current_price,market_cap} = req.body;
    try{
        const cryptoFound = await Crypto.findOne({symbol: symbol});
        if(cryptoFound){
            return res.status(422).json({error: "Crypto already exist!"});
        }else{
            const crypto =  new Crypto({name,symbol,image,current_price,market_cap});
            await crypto.save();
            res.status(201).json({message: "Crypto is saved to your database."});
        }
    }catch(err){
        console.log(err);
    }
});

app.get("/view",async (req,res) => {
    try{
        const cryptos = await Crypto.find();
        if(!cryptos){
            throw new Error("No Crypto saved yet!");
        }else{
            res.status(200).send(cryptos);
        }
    }catch(err){
        console.log(err);
    }
});

app.post("/view",async (req,res) => {
    const symbol = req.body.symbol;
    console.log(symbol);
    try{
        const dlt = await Crypto.deleteOne({symbol: symbol});
        if(dlt){
            console.log("Coin successfully deleted.");
            res.status(200).json({message: "Coin successfully deleted."});
        }else{
            console.log("Something went wrong while deleting coin!");
            res.status(422).json({error: "Something went wrong while deleting coin!"});
        }
    }catch(err){
        console.log(err);
    }
});

//listening to port
app.listen(5000,()=>{
    console.log("Server started on port 5000.");
});