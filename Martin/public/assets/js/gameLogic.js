console.log("gamelogic+");

var request = require('request');

var URL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=10&limit=1000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

var wordsObjectArray = [];
var wordsActiveArray = [];
var wordsInactiveArray = [];

request.get(URL, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
    // console.log(response);
  }
	console.log(typeof body);
	// console.log(typeof response);
	var jsonbody = JSON.parse(body);

	console.log(typeof jsonbody);

	console.log(jsonbody[0]);


  for(zzz = 0;zzz < jsonbody.length;zzz++){
  	if(jsonbody[zzz].word[0] >= 'a' && jsonbody[zzz].word[0] <= 'z' && jsonbody[zzz].word.indexOf('-') == -1 && jsonbody[zzz].word.indexOf("'") == -1 ){
	  	wordObjectArray.push(jsonbody[zzz].word);
  	}
  }
  
	console.log(wordObjectArray);
	console.log(wordObjectArray.length);

	// newWord(wordObjectArray, wordsUsedArray, 5);
	console.log(wordsUsedArray);

	for(q=0;q<5;q++){
		newWord(wordObjectArray, wordsActiveArray, 5, wordsInactiveArray);
	}


});



//randomly plucks word from wordlist, adds to the appropriate arrays
// pulls from sss, into jjj, time ppp




// var wordBank = ["flank", "bank", "tank", "rank", "dank"];


// var gameState = {
// 	loseGame: false,
// 	missedWords: 0
// }

// var gameClock = setInterval(
// 	function(){
// 		countDown(); 

// 		if(gameState.loseGame == true){
// 			clearInterval(gameClock);
// 			console.log("You Lose");
// 			}
// 		newWord(5);
// 	}, 1000);

// function countDown () {
// 	for(x=0;x<wordObjectArray.length;x++){

// 		wordObjectArray[x].num -= 1;

// 		if (wordObjectArray[x].num == 0){

// 			wordObjectArray.splice(x, 1);
// 			gameState.missedWords += 1;

// 		}

// 		if(gameState.missedWords >= 3){gameState.loseGame = true;}
// 		if (x==wordObjectArray.length-1){
// 			logger();
// 			console.log(wordObjectArray);
// 		}
// 	}
// }

// function newWord(rrr){
// 	var randomTargetWord = Math.floor(Math.random() * wordBank.length);
// 	wordObjectArray.push({word: wordBank[randomTargetWord], num: rrr});
// }

// function logger(){
// 	console.log("==============================");
// }