let username;
let playTime;
let url;
let closed;
let complete;
let gamesPlayed;
let rating;

// initialize variables after page loads
window.onload = function() {
  username  = document.getElementById("username");
  playTime  = document.getElementById("playTime");
  url  = document.getElementById("url");
  closed = document.getElementById("closed");
  complete = document.getElementById("complete");
  gamesPlayed = document.getElementById("gamesPlayed");
  rating = document.getElementById("rating");
  
	search.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("button").click();
    }
  });
} // window.onload


// get data from lichess api
function fetchUser() {
  let search = document.getElementById("search").value;  
  if (search == ""){
	  username.innerHTML = "<br> <h2> You didn't enter in a username!", playTime.innerHTML = "", url.innerHTML = "", closed.innerHTML = "", complete.innerHTML = "", gamesPlayed = "", rating = "";
  }
  
  if (search.length > 0){
  fetch('https://api.chess.com/pub/player/' + search)
    .then(response => response.json())
    .then(data => changeInfo(data))
	.catch(error => username.innerHTML = "<br> <h2> No Results", playTime.innerHTML = "", url.innerHTML = "", closed.innerHTML = "", complete.innerHTML = "", gamesPlayed = "", rating = ""
    );
  }
  
 /* fetch('https://lichess.org/api/user/' + search)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(myBlob => {
    myImage.src = URL.createObjectURL(myBlob);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  }); */
} // window.onload 



// change the activity displayed 
function changeInfo(data) {

	console.log(data); 
	if (data.closed == true) {
		username.innerHTML = username.innerHTML = "<h2> Username: " + data.username;
		playTime.innerHTML = "";
		url.innerHTML = "";	
		closed.innerHTML = "<h2> This user's account is closed."
		complete.innerHTML = "";
		gamesPlayed = "";
		rating = "";
	} else {
		if (data.completionRate != undefined) {
			complete.innerHTML = "<h2> Game Completion Rate: " + data.completionRate + "%";
		} else {
			complete.innerHTML = "";
		}
		username.innerHTML = "<h2> Username: " + data.username; 
		gamesPlayed.innerHTML = "<h2> Games Played: " + data.count.all;
		rating.innerHTML = "<h2> Rating: " + data.perfs.blitz.rating;
		
		if (Math.round(data.playTime.total / 3600) == 1){
			playTime.innerHTML = "<h2> Time Played: " + Math.round(data.playTime.total / 3600) + " hour";
		}
		else {
			playTime.innerHTML = "<h2> Time Played: " + Math.round(data.playTime.total / 3600) + " hours";	
		}
		url.innerHTML = "<h2> URL: <a href='" + data.url + "' id='url'>" + data.url + "</a>";	
		closed.innerHTML = "";
	}
} // changeActivityy