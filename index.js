import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Ankit Thakur";
const yourPassword = "Ankit@5500";
const yourAPIKey = "3aaf17dc-baad-41f2-a814-c4251e75862d";
const yourBearerToken = "Bearer a2454f6a-f4d5-4909-a4ba-9f7a3f76014e";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  var apiData = await axios.get(API_URL+"random");
  var dataInString = JSON.stringify(apiData.data);
  res.render("index.ejs",{
    content:dataInString,
  });
});

app.get("/basicAuth", async(req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  var dataFromApi = await axios.get(API_URL+"all?page=2",{
    auth:{
      username:yourUsername,
      password:yourPassword,
    }
  });
  var dataInString = JSON.stringify(dataFromApi.data);
  res.render("index.ejs",{
    content:dataInString,
  });
});

app.get("/apiKey", async(req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  // var dataFromApi = await axios.get();
  var dataFromApi = await axios.get(API_URL+"filter?score=5&apiKey="+yourAPIKey);
  var dataInString = JSON.stringify(dataFromApi.data);
  res.render("index.ejs",{
    content:dataInString,
  });
});

app.get("/bearerToken", async(req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 var dataFromApi = await axios.get(API_URL+"secrets/42",{
  headers:{
    Authorization:yourBearerToken,
  },
 });
 var dataInString = JSON.stringify(dataFromApi.data);
 res.render("index.ejs",{
  content:dataInString,
 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
