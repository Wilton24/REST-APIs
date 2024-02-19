import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const username = `BRENZ_GILBOY`;
const password = 12345687;
const bearerToken = "f2f3fd6e-0089-4ce3-b9e3-50563efac421";
const config = {
  headers: { Authorization: `Bearer ${bearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  try{
    const response = await axios.post(`${API_URL}/secrets`, req.body, {headers:{
      Authorization: `Bearer ${bearerToken}`
    }})
    console.log(req.body);
    res.render("index.ejs", {content: JSON.stringify(response.data)})

  } catch(err){
    console.log(err);
    res.render("index.ejs", {content: `Error Bitch ass nigga! ${err.message}`})
  }
});

app.post("/put-secret", async (req, res) => {
  const id = req.body.id;
  const secret = req.body.secret;
  const score = req.body.score;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  try{
    const response = await axios.put(`${API_URL}/secrets/${id}`, req.body, {headers: {
      Authorization: `Bearer ${bearerToken}`
    }})
    res.render('index.ejs', {content: JSON.stringify(response.data)});
    console.log(response);
  } catch(err){
    console.log(err.message);
    res.render('index.ejs', {content: `Error Bitch ${err.response.data}`})
  }
});

app.post("/patch-secret", async (req, res) => {
  const id = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  try{
    const response = await axios.patch(`${API_URL}/secrets/${id}`, req.body, {headers: {
      Authorization: `Bearer ${bearerToken}`
    }});
    res.render('index.ejs', {content: JSON.stringify(response.data)})
  } catch(err){
    console.log(err.message);
    res.render('index.ejs', {content: `Error Baby!: ${err.response.data}`});
  }
  

});

app.post("/delete-secret", async (req, res) => {
  const id = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try{
    const response = await axios.delete(API_URL + '/secrets/'+ id, {headers: {
      Authorization: `Bearer ${bearerToken}`
    }})
    res.render('index.ejs', {content: JSON.stringify(response.data)})
  } catch(err){
    console.log(err.message);
    res.render('index.ejs', {content: err.response.data})
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
