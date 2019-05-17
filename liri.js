require("dotenv").config();


// ====== Globales ===== //

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require("moment")

var fs = require("fs");

var argument = process.argv;
var command = process.argv[2];
var query = "";
var queryArray = [];
// ====== Globales ===== //

//=== SPOTIFY function  === //

function spotifyThis(){

    queryArray = [];
    for (var i = 3; i < argument.length; i++) {
        queryArray.push(argument[i]);
    };
    query = queryArray.join(" ")

    //If no song is provided, then display The sign info...
    
    if(command === "spotify-this-song" && query === ""){
        query = "The Sign Ace of Base"
    };

    spotify 
        .search({
            type: "track",
            query: query,
            limit:1
    })
    .then(function(response){
            console.log("\n================= * Spotify! * =================\n")
            console.log("Artist:", response.tracks.items[0].artists[0].name);
            console.log("Song:", response.tracks.items[0].name);
            console.log("Album:",response.tracks.items[0].album.name);
            console.log("Preview:",response.tracks.items[0].preview_url);
            console.log("\n================= * Spotify! * =================");
    })
    .catch(function(err){
            console.log(err);
    });  
};
//=== SPOTIFY function ends === //

// === OMDB === //

function movieThis(){

    queryArray = [];
    for (var i = 3; i < argument.length; i++) {
        queryArray.push(argument[i]);  
    };

    query = queryArray.join("+");

    if (query === ""){
        query = "Mr+Nobody";
    };


    axios.get("http://www.omdbapi.com/?t=" + query + "&apikey=trilogy").then(
        function(response){
            console.log("\n================= * OMDB Movies! * =================\n")
            console.log("Title: \n" + response.data.Title + "\n");
            console.log("Year: \n" + response.data.Year + "\n");
            console.log("IMDB Rating: \n" + response.data.imdbRating + "\n");
            console.log("Rotten Tomatoes Rating: \n" + response.data.Ratings[1].Value + "\n");
            console.log("Country: \n" + response.data.Country + "\n");
            console.log("Language: \n" + response.data.Language + "\n");
            console.log("Plot: \n" + response.data.Plot + "\n");
            console.log("Actors: \n" + response.data.Actors + "\n");
            console.log("\n================= * OMDB Movies! * =================\n")
        }
    ) ;  
};



/* ====== BANDS IN TOWN ===== */


function concertThis(){

    queryArray= [];
    for (var y = 3; y < argument.length; y++) {
        queryArray.push(argument[y]);        
    }

    query = queryArray.join("");
    var artistDisplay = queryArray.join(" ");

    axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(function(response){

        console.log("\n================= * BandsInTown! * =================\n")

            for (var x = 0; x < response.data.length; x++) {
                console.log("Artist: " + artistDisplay.toUpperCase())
                console.log(response.data[x].venue.name)
                console.log(response.data[x].venue.city + ", "+ response.data[0].venue.country );
                console.log(moment(response.data[x].datetime).format("MMMM Do YYYY, HH:mm") + "\n\n");
            };

        console.log("================= * BandsInTown! * =================")
/* 
        var test = moment(response.data[1].datetime).format('MMMM Do YYYY, h:mm:ss');
        console.log(test); */ 
    });
};


/* ======  RANDOM TEXT ===== */

function myRandom(){
    
    fs.readFile("random.txt", "utf8", function(error, data){

        if(error){
            return console.log(error);
        }

        var randomArray = data.split(",");       
        command = randomArray[0];
        query = randomArray[1];

        console.log(command);
        console.log(query)

        spotifyThis();
        

    });

}

//myRandom();

//****************************** */ Where magic happens! **********************++//


switch (command) {
    case "spotify-this-song":
    spotifyThis();
        break;

    case "movie-this":
    movieThis();
        break;
    
    case "concert-this":
    concertThis();
        break;    

    default:
    console.log("Sorry, I don't understand :(");
        break;

    case "do-what-it-says":
    myRandom();
        break;
};
