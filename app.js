//npm install express
//npm install mongoose
//npm install express-oauth2-jwt-bearer
//npm install joi
const express=require(`express`);
const app= express();
const port=3000;

app.use(express.json());

const librosRouter=require(`./libros`);
const errorHandler=require(`./errorHandler`);
const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: 'https://localhost:3000/libros',
    issuerBaseURL: 'https://dev-sbaeyf80q56uhxcw.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });
    
app.use(`/libros`,jwtCheck, librosRouter);

app.use(errorHandler);

app.listen(port,()=>{
    console.log("servidor iniciado en el puerto 3000")
})

//http://localhost:3000/libros
//autorization bearer token: 
//eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpEVlBfV05wLTRIM0JCRDZXcWZ2MyJ9.eyJpc3MiOiJodHRwczovL2Rldi1zYmFleWY4MHE1NnVoeGN3LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiI5OGxaNHZTZ2ZaSkRPbzZTSnBXanJyV1FhbmpLZmNQekBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMC9saWJyb3MiLCJpYXQiOjE3MDM2MzkwNjIsImV4cCI6MTcwMzcyNTQ2MiwiYXpwIjoiOThsWjR2U2dmWkpET282U0pwV2pycldRYW5qS2ZjUHoiLCJzY29wZSI6InJlYWQ6bGlicm9zIHdyaXRlOmxpYnJvcyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.iXOuQsBrO2AFHdx7h0dyTeslPCfo-stjpSLJEY8RTtf2zc4LLlgkOemkvCcJW_sVVYyTB9oDQLomNqDIkSJx6RqI0-NpsFtbOv3MZJqz2K62oPk02in6ER9c_p9nHXQcCRVNoZBSAlC3RKpimMtWyC6-WV_vBLzzdERe8sYIMhOd_4FF2TRAMnbg5xpyAkcWzlsXKbTJRReY7F0fX5fDOOk_b80ZS0JMxTy-OvKC9sNi8okTzFGHY-pNv7E98-PSHWVWyB7JbSBLGD0oZDIxyoFG1wv1rMUZqeHXYQI9o7kBjTCMESmuiKbKZ9HmJjnivgQO75J-EcjX65COSVG_BQ