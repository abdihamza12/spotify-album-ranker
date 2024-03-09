//search = prompt("What album are you looking for?");

// const searchQuery =
// {
// 	q : kpop,
// 	type: album
// };

// const queryString = new URLSearchParams(searchQuery);

// fetch("https://accounts.spotify.com/api/search",
// 	{
// 		method: "GET",
// 		body: queryString.toString()
// 		,
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded",
// 			"Authorization": "Basic " + btoa(id_and_secret_b64),
// 		},
// 	})
// 	.then((r) => r.json())	//	access token info is in r.json
// 	.then((r) => {
// 		console.log("Response", r); // You will get JSON response here.
// 	})
// 	.catch((error) => console.error("Error", error));

/* ----------------------------------------------------------------- */
import { drag_drop } from "./drag_drop.mjs";

function getAlbumId(album_name, token = localStorage.getItem("access_token")) {
  fetch(
    "https://api.spotify.com/v1/search?q=" + album_name + "&type=album&limit=1",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((r) => r.json())
    .then((r) => {
      console.log("Response", r.albums.items[0].id);
      let album_id = r.albums.items[0].id;
      getAlbumTracks(album_id, localStorage.getItem("access_token"));
    });
}

function getAlbumTracks(album_id, token) {
  fetch("https://api.spotify.com/v1/albums/" + album_id + "/tracks?limit=30", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((r) => r.json())
    .then((r) => {
      console.log("Response", r.items);
      printTrackList(r.items);
    });
}

function printTrackList(track_json) {
  let track_listing = document.getElementById("track_listing");
  while (track_listing.firstChild)
    track_listing.removeChild(track_listing.firstChild);

  track_json.forEach((item) => {
    var list_item = document.createElement("li");
    list_item.appendChild(document.createTextNode(item.name));
    list_item.className = "drag_item";
    list_item.draggable = true;
    track_listing.appendChild(list_item);
  });
  drag_drop(track_listing);
}

let album_submit = document.getElementById("album_submit");

album_submit.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(localStorage.getItem("access_token"))
  let album_title = document.getElementById("album_name");
  console.log(album_title.value);
  getAlbumId(album_title.value, localStorage.getItem("access_token"));
});
