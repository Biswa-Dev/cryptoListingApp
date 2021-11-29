const mongoose = require('mongoose');

//Url for connecting with database(MongoDB Atlas)
const dbUrl = process.env.DB;

//Database connection using async await
(async()=>{
    try{
        await mongoose.connect(dbUrl);
        console.log("Database connection successfull.");
    }catch(err){
        console.log(err);
    }
})();