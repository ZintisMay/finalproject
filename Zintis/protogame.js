var prompt = require('prompt');
prompt.start();
var fs = require('fs');
var wordsArray = [];
var hugeString = "";

var words = [];
var time = [];
var counter = 0;

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

function iterate(){
	setInterval(function(){ 

		countDown();
		newWord();
		gameStateLog();	
	}, 4000);
}

function newWord(){
	var randomTargetWord = Math.floor(Math.random() * wordsArray.length);
	words.push(wordsArray[randomTargetWord]);
	time.push(4);
}

function gameStateLog(){
	logger();
	for (x=words.length-1;x>=0;x--){
		console.log(words[x], time[x]);
	}
	logger();
}

function wordEntry(){
	prompt.get(['userWord'],function(err, result){
		var da = words.indexOf(result.userWord);
		
		if (da>=0){
			spliceTimeWord(da);
		}

		wordEntry();
	});
}

function countDown(){

	for(x=0;x<time.length;x++){

		time[x] = time[x]-1;

		if (time[x] == 0){

			spliceTimeWord(x);

		}
	}
}

function spliceTimeWord(x){
	time.splice(x, 1);
	words.splice(x, 1);

}

function logger(){
	console.log("==============================");
}


