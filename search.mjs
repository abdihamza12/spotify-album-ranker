//search = prompt("What album are you looking for?");

const searchQuery = 
{
	q : kpop,
	type: album
};

const queryString = new URLSearchParams(searchQuery);

fetch("https://accounts.spotify.com/api/search",
	{
		method: "GET",
		body: queryString.toString()
		,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Basic " + btoa(id_and_secret_b64),
		},
	})
	.then((r) => r.json())	//	access token info is in r.json
	.then((r) => {
		console.log("Response", r); // You will get JSON response here.
	})
	.catch((error) => console.error("Error", error));