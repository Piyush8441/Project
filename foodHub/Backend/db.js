const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI =
  "mongodb+srv://pfoodhub:844126@piyushproject.l11eo.mongodb.net/pfoodhub?retryWrites=true&w=majority&appName=PiyushProject";
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");

    //Fetched FoodData
    const fetched_data = await mongoose.connection.db.collection("fooddata");
    const data = await fetched_data.find({}).toArray();

    //Fetched FoodCategory
    const foodcat = await mongoose.connection.db.collection("foodcategory");
    const foodcategory = await foodcat.find({}).toArray();

    global.fooddata = data;
    global.foodCategory = foodcategory;
    // console.log(global.fooddata);
  } catch (error) {
    console.error("Database Connection Error", error);
    process.exit(1);
  }
};
module.exports = mongoDB;
