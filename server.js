// To create a server to host a custom api
import express from 'express'
// To keep Client Credentials out of the front end
import dotenv from 'dotenv'
dotenv.config();



// Start the server at ___servername____
const app = express();

app.get("/api", (req, res) => {
    res.json({message: 'Hello from HamzaAPI'})
})

// app.use(express.json());

// app.post("/api/data", (req, res) => {
//     const data = req.body
//     if(data) {
//         fetchAuthCode();
//     }

// })


// Fetch the AuthCode from the client that was API Posted from Callback.mjs. Should be in Object form
async function fetchAuthCode() {
    fetch("https://rankd-testing.vercel.app/api/authcode", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        // Turns the response object to URLSearchParams and runs it as a function input.
        const searchParams = new URLSearchParams(response);
        getAccessToken(searchParams)
    })
}


// Function that does a fetch request
async function getAccessToken(searchParams){
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
    return fetch('https://rankd-testing.vercel.app/api/data', {
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

}

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on https://rankd-testing.vercel.app/api")
})

// app.post('/api/data', (req, res) => {
//     const receivedData = req.body;
//     console.log("Received data:", receivedData)
// })