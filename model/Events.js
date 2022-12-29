const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
   eventName:String,
   description:String,
   organizerName:String,
   numberofSeats:String,
   timing:String,
   email:String,
   pendingPlayers: [
      
   ],
   acceptedPlayers:[
      
   ]
});

module.exports = mongoose.model("events",eventSchema);