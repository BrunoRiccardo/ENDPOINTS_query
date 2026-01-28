

const path= require('path');
const fs= require('fs').promises;
const db = require('./db');
const express=require('express');
const PORT=3000;


const app = express();

//lettura file non più necessaria con db.js
const users = require('./users.json');
const flights = require('./flights.json');


//middleware
app.use(express.json());




//GET--------------------------------
//users
app.get("/users",async(req,res) =>{
    const users = await db.getAllUsers(); 
    res.status(200).json(users);

});


app.get("/user/:id",async(req,res) =>{
    


   const id = Number(req.params.id);
   const user = await db.findUserById(id); 
   res.status(200).json({user

}
)}
)
app.get("/user/gender/:gender",async(req,res) =>{


   const gender = String(req.params.gender);
   const filteredUsers= await db.filterUserByGender(gender);
   res.status(200).json({filteredUsers
}
   )})

   

app.get("/users/:firstname-:lastname",async(req,res) =>{
   const name = String(req.params.firstname);
   const lastname = String(req.params.lastname); 
   const result= await db.findUserByNameAndLastname(name, lastname); 

   
   res.status(200).json({result
}
   )}
)



//flights

app.get("/flights",async(req,res) =>{
  const flights = await db.getAllFlights();
   res.status(200).json(flights);
});


app.get("/flight/:id",async (req,res) =>{
   const id = Number(req.params.id);
   let flight= await db.findFlightById(id);
   res.status(200).json({flight
}
)})


app.get("/flight/from/:departurecity/to/:arrivalcity",async(req,res) =>{
   const departurecity = req.params.departurecity;
   const arrivalcity = req.params.arrivalcity;
   const flight= await db.findFlightByDepartureArrival(departurecity, arrivalcity);
   res.status(200).json({flight
}
)}
)


  
//POST---------------------------------------------------
//users

app.post('/users', async(req, res) => {
  
   const { firstname, lastname, email, gender, ip } = req.body;
   await db.addUser(firstname, lastname, email, gender, ip);
 res.status(200).json({
 

   message: 'User aggiunto con successo',
  
 });
});


//flight
app.post('/flights', async(req, res) => {
 const {flightnumber, departurecode, departurecity, arrivalcode, arrivalciry,airlinecode,airlinename,departuretime,duration } = req.body; 
 await db.addFlight(flightnumber, departurecode, departurecity, arrivalcode, arrivalciry,airlinecode,airlinename,departuretime,duration);
 res.status(200).json({
   message: 'Volo aggiunto',
  
 });
});

//PUT ---------------------------------

app.put('/user/:id', async(req, res) => {

  let index= Number(req.params.id);
  const { firstname, lastname, email, gender, ip } = req.body;
  await db.updateUser(index, firstname, lastname, email  , gender, ip);

  
 res.status(200).json({
   message: 'User aggiornato',
  
 });
});




app.put('/user/:id/email', async(req, res) => {

  let index= Number(req.params.id);
  const { email } = req.body;
  await db.updateEmail(index,  email );

  
 res.status(200).json({
   message: 'Email utente aggiornata',
  
 });
});

app.put('/user/:id/ip', async(req, res) => {

  let index= Number(req.params.id);
  const { ip } = req.body;
  await db.updateIp(index,  ip );

  
 res.status(200).json({
   message: 'IP utente aggiornato',
  
 });
});


//flight-----
app.put('/flight/:id/departuretime', async (req, res) => {
  
  let index= Number(req.params.id);
  const { departuretime } = req.body;
  await db.updateDeparturetime(index,  departuretime );


 res.status(200).json({
   message: 'Put deparuturetime',
 });
});


app.put('/flight/:id/duration', async (req, res) => {
  
  let index= Number(req.params.id);
  const { duration } = req.body;
  await db.updateDuration(index,  duration );

 res.status(200).json({
   message: 'Put duration',
 });
});

app.put('/flight/:id', async (req, res) => {
  let index= Number(req.params.id);
  const{arrivalcity,duration,airlinename}= req.body;
  await db.updateFlight(index, arrivalcity,duration,airlinename);
  
 res.status(200).json({
   message: 'Put flight',
 });
});

app.put('/flight/:id/airlinename', async(req, res) => {
  let index= Number(req.params.id);
  const{airlinename}= req.body;
  await db.updateAirlinename(index, airlinename);
 res.status(200).json({
   message: 'Put name airline',
 });
});




//DELETE ---------------------------------




app.delete('/user/:id', async(req, res) => {

  let index= Number(req.params.id);
  
  await db.deleteUser(index);

  
 res.status(200).json({
   message: 'l\' utente è stato silurato',
  
 });
});

app.delete('/user/:id/ip', async(req, res) => {

  let index= Number(req.params.id);
  
  await db.deleteIp(index);

  
 res.status(200).json({
   message: 'l\' ip è stato silurato',
  
 });
});


//flight
app.delete('/flight/:id', async(req, res) => {
 
  let index= Number(req.params.id);
  await db.deleteFlight(index);
 res.status(200).json({
   message: 'il volo è stato cancellato',
  
 });
});


app.delete('/flight/:id/airlinename', async(req, res) => {
 
  let index= Number(req.params.id);
  await db.deleteAirlinename(index);
 res.status(200).json({
   message: 'nome del volo è stato cancellato',
  
 });
});



//SERVER----------------------
app.listen(PORT,()=>{

   console.log("Server in ascolto");
})



