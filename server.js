import express from 'express'
import dotenv from 'dotenv'

const app = express();

app.get("/api/data", async(req, res) => {
    try {

        fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: searchParams.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + id_secret,
            },
        })
        .then((r) => r.json())
        //	access token info is in r.json
        .catch((error) => console.error("Error", error));
    }
    catch(error) {
        console.error("error fetching data:", error)
    }
    })


app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})