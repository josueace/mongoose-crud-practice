const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

//mongoose.set('useFindAndModify', false);
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    var myRecipe = new Recipe({ 
      title:"scrambled eggs",
    level:"Easy Peasy",//Easy Peasy - Amateur Chef - UltraPro Chef
    ingredients:["eggs","furnace","butter"],
    cuisine:"Hells Kitchen",
    dishType:"breakfast",
    duration:5,
    creator:"josue",
    created:'2020-12-25'
  });
  
  let promise1 =myRecipe.save() // Create a new user and return a promise
    .then(user => { console.log('The user was created') })
    .catch(err => { console.log('An error occured', err) });
  
  let promise2 =Recipe.insertMany(data)
  .then(result =>console.log('yaiiiii many'))
  .catch(err => console.log("nope    ",err))
  
  //5e8b9ea5b886597fa5c9ad0a
/*
  Recipe.findByIdAndUpdate("5e8b9ea5b886597fa5c9ad0a", { $inc:{duration: 100} })
  .then(success =>console.log("Congrats on the update"))
  .catch(err => console.log("SIKEEEE" ,err));
*/
var query ={title:"Rigatoni alla Genovese"}
let promise3 =Recipe.findOneAndUpdate(query, { duration:100 })
.then(succ =>console.log("updatyyyy guccii"))
.catch(err =>console.log("Nopeee ",err))

  let promise4 =Recipe.deleteOne({ title: "Carrot Cake"})
  .then(result => console.log("successful termination"))
  .catch(err=> console.log("still living",err));

 
  Promise.all([promise1, promise2 ,promise3,promise4])
  .then(values => {
    console.log("All tasks have been resolved , terminating connection");
    
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstName: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstName: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelona', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
    mongoose.connection.close();
  })
  
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

