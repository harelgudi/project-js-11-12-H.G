const mongoose = require('mongoose');
const {config} = require("../config/secret")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://harelgudi:harel7565@cluster0.se5trk5.mongodb.net/idf77`);
  console.log("toys work");

  
  
}
 