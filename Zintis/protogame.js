var prompt = require('prompt');
prompt.start();
var fs = require('fs');
var wordsArray = [];
var hugeString = "";

var words = [];
var time = [];
var counter = 0;

//start the game - makes some words and calls up the starting functions.
fs.readFile('./string.txt', "utf-8", (err, data) => {

    if (err) throw err;

    hugeString = data;
	
	stringTextBreaker(hugeString);

	newWord();
	console.log(wordsArray.length);
	console.log(words);
	console.log(time);
	wordEntry();
	iterate();
});

// takes a string of words and spaces and turns it into an array
function stringTextBreaker(x){

	var tempwordholder = "";

	for (z = 0; z < x.length;z++){

		if(x[z] >= 'a' && x[z] <= 'z'){

			tempwordholder += x[z];


		}else if (x[z] == ' '){

			wordsArray.push(tempwordholder);

		    tempwordholder = "";
		}
	}
}

function beginGame(){

}

//this is the timer. every x seconds it counts town the word's timer, makes a new word, and logs the gamestate
function iterate(){
	setInterval(function(){ 

		countDown();
		newWord();
		gameStateLog();	
	}, 4000);
}

//randomly plucks word from wordlist, adds to the appropriate arrays
function newWord(){
	var randomTargetWord = Math.floor(Math.random() * wordsArray.length);
	words.push(wordsArray[randomTargetWord]);
	time.push(4);
}

//prints out the gamestate for the player
function gameStateLog(){
	logger();
	for (x=words.length-1;x>=0;x--){
		console.log(words[x], time[x]);
	}
	logger();
}

//this is a recursive function which checks if your word is in an array, deletes it if it is, and starts itself anew
function wordEntry(){
	prompt.get(['userWord'],function(err, result){
		var da = words.indexOf(result.userWord);
		
		if (da>=0){
			spliceTimeWord(da);
		}

		wordEntry();
	});
}

// every x seconds it ticks down the timer array and deletes words that have 0 seconds on the timer
function countDown(){

	for(x=0;x<time.length;x++){

		time[x] = time[x]-1;

		if (time[x] == 0){

			spliceTimeWord(x);

		}
	}
}

//just combining two functions into one, cuts out entries from the array
function spliceTimeWord(x){
	time.splice(x, 1);
	words.splice(x, 1);

}

//just makes the console easier to read
function logger(){
	console.log("==============================");
}


