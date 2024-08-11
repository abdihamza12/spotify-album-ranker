import { paramsObj } from "./callback.mjs";
import { client_id, client_secret } from "./pull_env.mjs";

console.log(client_id, client_secret)

// let web_address = new URL(document.location).searchParams;

// let auth_code = web_address.get("code");

// console.log(auth_code)

// const paramsObj = {
//   grant_type: "authorization_code",
//   code: auth_code,
//   redirect_uri: "https://abdihamza12.github.io/spotify-album-ranker/callback.html",
// };

const searchParams = new URLSearchParams(paramsObj);

const id_and_secret_b64 = btoa(client_id + ":" + client_secret);
console.log('Client using env: ' + id_and_secret_b64);

export function getAccessToken() {
    fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: searchParams.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + id_and_secret_b64,
    },
  })
    .then((r) => r.json())
    //	access token info is in r.json
    .catch((error) => console.error("Error", error));
    return r
}



