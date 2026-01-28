

const path= require('path');
const fs= require('fs').promises;

const express=require('express');
const PORT=3000;


const app = express();

//lettura file
const users = require('./users.json');
const flights = require('./flights.json');


//middleware
app.use(express.json());




//GET--------------------------------
//users
app.get("/users",(req,res) =>{
   res.status(200).json(users);
});


app.get("/user/:id",(req,res) =>{
   const id = Number(req.params.id);
   let t=  users.find(tr=> tr.id===id);
   res.status(200).json({t
}
)}
)


app.get("/user/gender/:gender",(req,res) =>{
   const f = String(req.params.gender);
   let t2=  users.filter(tr=> tr.gender===f);
   res.status(200).json({t2
}
   )})


app.get("/users/:firstname-:lastname",(req,res) =>{
   const n = String(req.params.firstname);
   const ln = String(req.params.lastname);  
   let t3=  users.filter(tr=> tr.firstname===n && tr.lastname===ln);
     res.status(200).json({t3
}
   )}
)



//flights

app.get("/flights",(req,res) =>{
   res.status(200).json(flights);
});


app.get("/flight/:id",(req,res) =>{
   const id = Number(req.params.id);
   let t=  flights.find(tr=> tr.id===id);
   res.status(200).json({t
}
)})


app.get("/flight/from/:departurecity/to/:arrivalcity",(req,res) =>{
   const departurecity = req.params.departurecity;
   const arrivalcity = req.params.arrivalcity;
   const voli=  flights.filter(part=> part.departurecity===departurecity && part.arrivalcity===arrivalcity);
   res.status(200).json({voli
}
)}
)


  
//POST---------------------------------------------------
//users

app.post('/users', (req, res) => {
 const nuovoElemento = req.body;   // Dati ricevuti dal client
 users.push(nuovoElemento);     // Inserimento nel "db"
 res.status(200).json({
   message: 'User aggiunto',
  
 });
});












//flight
app.post('/flights', (req, res) => {
 const nuovoElemento = req.body;   // Dati ricevuti dal client
 flights.push(nuovoElemento);     // Inserimento nel "db"
 res.status(200).json({
   message: 'Volo aggiunto',
  
 });
});

//PUT ---------------------------------

app.put('/user/:id', (req, res) => {
  for (let index = 0; index < users.length; index++) {
  
   if (users[index].id === parseInt(req.params.id)){
       users[index].ip = req.body.ip;
       users[index].firstname = req.body.firstname;
       users[index].lastname = req.body.lastname;
       users[index].email = req.body.email;
       users[index].gender = req.body.gender;
   }
 }
 res.status(200).json({
   message: 'Put su user',
  
 });
});




app.put('/user/:id/email', (req, res) => {
  for (let index = 0; index < users.length; index++) {
   if (users[index].id === parseInt(req.params.id)){
       users[index].email = req.body.email;
   }
 }
 res.status(200).json({
   message: 'Put solo su email',
  
 });
});

app.put('/user/:id/ip', (req, res) => {
  for (let index = 0; index < users.length; index++) {
   if (users[index].id === parseInt(req.params.id)){
       users[index].ip = req.body.ip;
   }
 }
 res.status(200).json({
   message: 'Put su Ip ',
  
 });
});


//flight-----
app.put('/flight/:id', (req, res) => {
  for (let index = 0; index < flights.length; index++) {

   if (flights[index].id === parseInt(req.params.id)){
       flights[index].arrivalcity = req.body.arrivalcity;
       flights[index].duration = req.body.duration;
       flights[index].airlinename = req.body.airlinename;
   }
 }
 res.status(200).json({
   message: 'Put flight',
 });
});


app.put('/flight/:id/departuretime', (req, res) => {
  for (let index = 0; index < flights.length; index++) {
   if (flights[index].id === parseInt(req.params.id)){
       flights[index].departuretime = req.body.departuretime;    
   }
 }
 res.status(200).json({
   message: 'Put deparuturetime',
 });
});


app.put('/flight/:id/duration', (req, res) => {
  for (let index = 0; index < flights.length; index++) {  
   if (flights[index].id === parseInt(req.params.id)){
       flights[index].duration = req.body.duration;     
   }
 }
 res.status(200).json({
   message: 'Put duration',
 });
});


app.put('/flight/:id/airlinename', (req, res) => {
  for (let index = 0; index < flights.length; index++) {
   if (flights[index].id === parseInt(req.params.id)){
       flights[index].airlinename = req.body.airlinename;
   }
 }
 res.status(200).json({
   message: 'Put name airline',
 });
});




//DELETE ---------------------------------

app.delete('/user/:id', (req, res) => {
  for (let index = 0; index < users.length; index++) {  
   if (users[index].id === parseInt(req.params.id)){
       users.splice(index, 1);
   }
 }
 res.status(200).json({
   message: 'l\'utente è stato silurato',
 });
});


app.delete('/user/:id/ip', (req, res) => {
  for (let index = 0; index < users.length; index++) {  
   if (users[index].id === parseInt(req.params.id)){
       delete users[index].ip;
   }
 }
 res.status(200).json({
   message: 'l\'ip dell utente è stato silurato',
  
 });
});


//flight
app.delete('/flight/:id', (req, res) => {
  for (let index = 0; index < flights.length; index++) {
  
   if (flights[index].id === parseInt(req.params.id)){
       flights.splice(index, 1);
   }
 }
 res.status(200).json({
   message: 'il volo è stato cancellato',
  
 });
});


app.delete('/flight/:id/airlinename', (req, res) => {
  for (let index = 0; index < flights.length; index++) {
   if (flights[index].id === parseInt(req.params.id)){
       delete flights[index].airlinename;
   }
 }
 res.status(200).json({
   message: 'airline name è stato cancellato',
 });
});



//SERVER----------------------
app.listen(PORT,()=>{

   console.log("Server in ascolto");
})



