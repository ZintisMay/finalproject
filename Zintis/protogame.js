var prompt = require('prompt');
prompt.start();
var fs = require('fs');
var wordsArray = [];
var hugeString = "";

var words = [];
var time = [];
var counter = 0;
var points = 0;
var loseGame = 0;



//start the game - makes some words and calls up the starting functions.
fs.readFile('./string.txt', "utf-8", (err, data) => {

    if (err) throw err;

    hugeString = data;
	
	stringTextBreaker(hugeString);

	newWord();
	console.log(wordsArray.length);
	console.log(words);
	console.log(time);

	beginGame();
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
	logger();
	console.log("Welcome to NodeType");
	logger();
	console.log("Choose from the following menu:")
	console.log("1: Play!");
	console.log("2: See High Scores!");
	console.log("3: Exit");
	
	prompt.get(['userInput'],function(err, result){
		

		if (result.userInput == 1){
			
			wordEntry();
			var iterate = setInterval(function(){ 
				countDown();
				newWord();
				gameStateLog();	
			}, 1000);
		
		}else if (result.userInput == 2){
			
			logger();		
			for (x=0;x<highScores.length;x++){

				console.log(highScores[x].name, ": ", highScores[x].score);
			}
			beginGame();
		
		}else if (result.userInput == 3){
			logger();
			console.log("thanks for playing!");
			logger();
			
			process.exit();
		
		}else {console.log("invalid input, try again.");beginGame();}

	});

}

//this is the timer. every x seconds it counts town the word's timer, makes a new word, and logs the gamestate



//randomly plucks word from wordlist, adds to the appropriate arrays
function newWord(){
	var randomTargetWord = Math.floor(Math.random() * wordsArray.length);
	words.push(wordsArray[randomTargetWord]);
	time.push(4);
}

//prints out the gamestate for the player
function gameStateLog(){
	logger();
	for (x=5;x>=0;x--){
		if (words[x]){
			console.log(words[x], time[x]);
		}else{
			console.log("BLANK");
		}

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

	for(x=0;x<(time.length-1);x++){

		time[x] = time[x]-1;

		if (time[x] == 0){

			loseGame += 1;
			spliceTimeWord(x);

			if (loseGame == 5) {

				clearInterval(iterate);
				
				prompt.get(['userName'],function(err, result){

					highScores.push({name: result.userName ,score: points});
					resetGame();
				});

				logger();
				console.log("YOU LOSE, YOU HAD ", point, " POINTS!");
				logger();
				beginGame();
			}

		}
	}
}

//just combining two functions into one, cuts out entries from the array
function spliceTimeWord(x){
	time.splice(x, 1);
	words.splice(x, 1);

}

// resets all base values
function resetGame(){
	time = [];
	words = [];
	points = 0;
	loseGame = 0;
}

//just makes the console easier to read
function logger(){
	console.log("==============================");
}


