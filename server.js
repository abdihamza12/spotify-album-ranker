import express from 'express'
import dotenv from 'dotenv'
import { paramsObj } from './callback.mjs';
dotenv.config();

const app = express();


const searchParams = new URLSearchParams(paramsObj);


fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: searchParams.toString(),
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET),
    }
})
.then((response) => {
        if(response.ok) {
            console.log("Response sucessfully sent:" + response)
        }
        else {
            throw new Error("Request failed: " + response.status)
        }
        return response.json()
})
.then(apiData => {
    return fetch('http://localhost:3000/api/data', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    })
})
.then(response => {
    if(!response.ok) {
        throw new Error('Failed to post data to personal server')
    }
    return response.json();
})
.then(serverResponse => {
    console.log("Data successfully posted to personal server:", serverResponse)
})
.catch((error) => console.error("Error", error)); 



app.use(express.json());

app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    console.log("Received data:", receivedData)
})

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})