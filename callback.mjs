// import {getAccessToken, id_and_secret_b64} from "./callback_request.mjs"

let web_address = new URL(document.location).searchParams;

let auth_code = web_address.get("code");

console.log(auth_code)

const paramsObj = {
  grant_type: "authorization_code",
  code: auth_code,
  redirect_uri: "https://abdihamza12.github.io/spotify-album-ranker/callback.html",
};

fetch('http://localhost:3000/authcode', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: paramsObj
})

// const apiResponse = getAccessToken(id_and_secret_b64)
// localStorage.setItem("access_token", apiResponse.access_token)
// localStorage.setItem("refresh_token", apiResponse.refresh_token)

fetch("http://localhost:3000/api/data", {
  method: "GET",
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error("Failed to fetch data from personal server");
  }
  return response.json();
})
.then(serverData => {
  console.log("Data retrieved from personal server:", serverData)
  localStorage.setItem("access_token", serverData.access_token)
  localStorage.setItem("refresh_token", serverData.refresh_token)
})
.catch(error => {
  console.error("Error:", error)
})


export async function getRefreshToken() {
    const refreshToken = localStorage.getItem('refresh_token')
    const url = "https://accounts.spotify.com/api/token"

    const refreshParamObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + id_and_secret_b64
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: client_id
      }).toString()
    }
    try {
        const response = await fetch(url, refreshParamObj)    
        .then(localStorage.setItem("access_token", response.access_token))
        .then(localStorage.setItem("refresh_token", response.refresh_token))
    }
    catch(e) {
        console.error("Failed to make API request:", e)
        throw e;
    }
    // if(response.status === 401) {
    //     console.log("Token Expired, refreshing token...")
        
    // }
  } 