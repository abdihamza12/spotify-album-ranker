import { client_secret } from "./client_credentials.mjs";
import { client_id } from "./client_credentials.mjs";

// console.log(client_id, client_secret);


let web_address = new URL(document.location).searchParams;

let auth_code = web_address.get("code");

// console.log(auth_code)

const paramsObj = {
  grant_type: "authorization_code",
  code: auth_code,
  redirect_uri: "http://127.0.0.1:8080/callback.html",
};

const searchParams = new URLSearchParams(paramsObj);

const id_and_secret_b64 = btoa(client_id + ":" + client_secret);
console.log(id_and_secret_b64);

fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: searchParams.toString(),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + id_and_secret_b64,
  },
})
  .then((r) => r.json())	//	access token info is in r.json
  .then((r) => {
    localStorage.setItem("access_token", r.access_token)
    localStorage.setItem("refresh_token", r.refresh_token)
    // console.log(localStorage.getItem('access_token'))
    console.log("Response", r); // You will get JSON response here.
  })
  .catch((error) => console.error("Error", error));


  const getRefreshToken = async() => {
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
    const body = await fetch(url, refreshParamObj)
    const response = await body.json()

    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("refresh_token", response.refresh_token)
    console.log("Response", response)
  } 