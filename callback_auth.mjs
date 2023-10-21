import { client_secret } from "./client_credentials.mjs";
import { client_id } from "./client_credentials.mjs";

console.log(client_id, client_secret);

// import queryString from "./node_modules/querystring"
// const querystring = require('node:querystring');

let web_address = new URL(document.location).searchParams;

let auth_code = web_address.get("code");

// console.log(auth_code)

const paramsObj = {
  grant_type: "authorization_code",
  code: auth_code,
  redirect_uri: "http://127.0.0.1:8080/callback.html",
};

const searchParams = new URLSearchParams(paramsObj);

const id_and_secret_b64 = client_id + ":" + client_secret;
console.log(btoa(id_and_secret_b64));

fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: searchParams.toString(),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Basic " + btoa(id_and_secret_b64),
  },
})
  .then((r) => r.json())
  .then((r) => {
    console.log("Response", r); // You will get JSON response here.
  })
  .catch((error) => console.error("Error", error));
