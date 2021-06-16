if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

let username;
let playTime;
let url;
let closed;
let complete;
let gamesPlayed;
let rating;
let download;

// initialize variables after page loads
window.onload = function() {
  username  = document.getElementById("username");
  playTime  = document.getElementById("playTime");
  url  = document.getElementById("url");
  closed = document.getElementById("closed");
  complete = document.getElementById("complete");
  gamesPlayed = document.getElementById("gamesPlayed");
  rating = document.getElementById("rating");
  download = document.getElementById("download");
  
	search.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("button").click();
    }
  });
} // window.onload

// so ms wear doesn't get mad at me
function noResults(){
	username.innerHTML = "<br> <h2> No Results </h2>";
	playTime.innerHTML = ""; 
	url.innerHTML = ""; 
	closed.innerHTML = ""; 
	complete.innerHTML = ""; 
	gamesPlayed.innerHTML = ""; 
	rating.innerHTML = "";
	download.innerHTML = "";
}

// get data from lichess api
function fetchUser() {
  let search = document.getElementById("search").value;  
  if (search == ""){
	  username.innerHTML = "<br> <h2> You didn't enter in a username! </h2>";
	  playTime.innerHTML = "";
	  url.innerHTML = "";
	  closed.innerHTML = "";
	  complete.innerHTML = "";
	  gamesPlayed.innerHTML = "";
	  rating.innerHTML = "";
	  download.innerHTML = "";
  }
  
  if (search.length > 0){
  fetch('https://lichess.org/api/user/' + search)
    .then(response => response.json())
    .then(data => changeInfo(data))
	.catch(error => noResults()
    );
  }
 
} // window.onload 

// change the activity displayed 
function changeInfo(data) {
	let search = document.getElementById("search").value; 
	console.log(data); 
	if (data.closed == true) {
		username.innerHTML = username.innerHTML = "<h2> Username: " + data.username + "</h2>";
		playTime.innerHTML = "";
		url.innerHTML = "";	
		closed.innerHTML = "<h2> This user's account is closed. </h2>"
		complete.innerHTML = "";
		gamesPlayed.innerHTML = "";
		rating.innerHTML = "";
		download.innerHTML = "";
	} else {
		if (data.completionRate != undefined) {
			complete.innerHTML = "<h2> Game Completion Rate: " + data.completionRate + "% </h2>";
		} else {
			complete.innerHTML = "";	
		}
		username.innerHTML = "<h2> Username: " + data.username + "</h2>"; 
		gamesPlayed.innerHTML = "<h2> Games Played: " + data.count.all + "</h2>";
		rating.innerHTML = "<h2> Rating: " + data.perfs.blitz.rating + "</h2>";
		download.innerHTML = "<h2> <a href='https://lichess.org/api/games/user/" + search + "?max=50' class='url'> Download Games </a> </h2>";
		
		if (Math.round(data.playTime.total / 3600) == 1){
			playTime.innerHTML = "<h2> Time Played: " + Math.round(data.playTime.total / 3600) + " hour </h2>";
		}
		else {
			playTime.innerHTML = "<h2> Time Played: " + Math.round(data.playTime.total / 3600) + " hours </h2>";	
		}
		url.innerHTML = "<h2> URL: <a href='" + data.url + "' class='url'>" + data.url + "</a> </h2>";	
		closed.innerHTML = "";
	}
} // changeActivity