var $SearchField;

//sets up the jquery targets
$(document).ready(function(){
	$SearchField = $('#query');		// 	the text field. This is where the game is played.
	$targets = $('.wordTargetDetails');	//	the word targets. Each one will have the class "wordTarget."

	// var debounced_tableFilter = _.debounce(wordGun, 200);
	// var throttle_tableFilter = _.throttle(wordGun, 500);
	$SearchField.keyup(function(){
		wordGun(this);
	

	});

//zzzzzzzzzzzzzzzzzzzzzzzz
	$('button').click(function(){

		console.log("pushMe");

		var inputContents = $('.box').val();

		console.log(inputContents, inputContents.length);

		//this line creates the dynamic div that contains the word, and maybe an image

			$('#row' + wordRowIncrement).html('<div class="wordTarget wordTargetDetails wordTargetAnimate' +(inputContents.length+4) +' word-x1  div6 white"><img width="25" height="25" src="../../public/assets/images/space_invader.png"> '+inputContents+'</div>');



			wordRowIncrementArray.push(wordRowIncrement);


			//this is the timer that removes the div, and replaces it with an explosion
			setTimeout(function(){

				console.log("wordRowIncrementArray",wordRowIncrementArray);		
				//this creates the explosion div
				$('#row' + wordRowIncrementArray[0]).html('<img class="explosion"'+wordRowIncrementArray2+'" src="../../public/assets/images/explosion.gif">');
				
				wordRowIncrementArray2.push(wordRowIncrementArray[0]);
				wordRowIncrementArray.splice(0,1);

				console.log("wordRowIncrementArray",wordRowIncrementArray);
				console.log("wordRowIncrementArray2",wordRowIncrementArray2);

				//this ends the explosion div
				setTimeout(function(){
					$('#row' + wordRowIncrementArray2[0]).html("");
					wordRowIncrementArray2.splice(0,1);
					console.log(wordRowIncrementArray);
					console.log(wordRowIncrementArray2);
				}, 1000);

			}, (inputContents.length+4)*1000);


			wordRowIncrement++;
			if (wordRowIncrement >= 7){wordRowIncrement = 1;}

		// }

	});

	console.dir(window);
//zzzzzzzzzzzzzzzzzzzzzzzz

});

// removes words
function wordGun(node){

	$targets = $('.wordTargetDetails');

	console.log('wordGun called');

	//on keyup, look at the #query id box word
	var myInput = $SearchField.val();

	console.log('myInput: ', myInput);

	//regex???
	var val = '^(?=.*\\b' + $.trim($(node).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        // search_results = [],		//debugging purposes only, this can be removed since counters are now keeping track of results.
        
        targetCounter = 0,
        text;

    //check for completion
	// if($targets.length < 1){
	// 	alert("Level Clear!");
	// } else {
		$targets.each(function(){
			//gets the text from the targets
			var targetWord = $(this).text();
			//look for spaces in the text, if there is a group of them, make them blank???
			var text = $(this).text().replace(/\s+/g, ' ');
			// checks how many characters were selected?
			var inputSoFar = $SearchField.val().length;
			//
			if(reg.test(text) === true){
				targetCounter++;
				console.log('Targetting Word, ... ', targetWord);
				console.log('Letters Typed: ', inputSoFar);
				//removes the "hidden" class, making it visible
				$(this).removeClass('hidden'); 				// REVEAL TARGET WORD
				//makes a var that is the part fo the word that matches your word
				var inputHighlight = targetWord.slice(inputSoFar);

				console.log("Portion to highlight: ", inputHighlight);
				console.log("My Input: ", myInput);
				
				// DONE 9/27: make the individual letters bold as you type.
				//rewrites the word as "what i've input" + what is left
				$(this).html("<em>" +  myInput + "</em>" + inputHighlight);

				// this marks the completion of a typed word and
				if($SearchField.val() == targetWord){

					// alert("You typed " + targetWord);
					$SearchField.val('');
					$(this).closest('.wordTarget').remove();
					//zzzzzzzzzzzzzzzzzzzzz
					removeWordFromArray(targetWord);
					//zzzzzzzzzzzzzzzzzzzzzz
				}

			} else {
				// $(this).addClass('hidden');
			}
		});
	// }

	//running count of how many words are affected by the wordgun
	if (targetCounter > 0) {
		console.log("%s Current Targets", targetCounter);
	}
};


$('.noEnterSubmit').keypress(function(e){
    if ( e.which == 13 ) return false;
});

//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

console.log("gamelogic+");

// var request = require('request');

var URL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=10&limit=1000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

var wordsObjectArray = [];
var wordsActiveArray = [];
var wordsInactiveArray = [];

$.ajax({url: URL, success: function(result){
	// console.log('result', result, typeof result, result[0]);

	// var jsonbody = JSON.parse(result);
	// console.log("jsonbody", typeof jsonbody, jsonbody[0], jsonbody[jsonbody.length]);
	for(zzz = 0;zzz < result.length;zzz++){
		if(result[zzz].word[0] >= 'a' && result[zzz].word[0] <= 'z' && result[zzz].word.indexOf('-') == -1 && result[zzz].word.indexOf("'") == -1 ){
		  	wordsObjectArray.push(result[zzz].word);
		}
	  }
	for(q=0;q<100;q++){
		newWord(wordsObjectArray, wordsActiveArray, 5, wordsInactiveArray);
	}
	console.log(wordsObjectArray);
	// console.log(wordsObjectArray, wordsActiveArray);
}});

$()

// $.get(URL, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//     // console.log(response);
//   }
// 	console.log(typeof body);
// 	// console.log(typeof response);
// 	var jsonbody = JSON.parse(body);

// 	console.log(typeof jsonbody);

// 	console.log(jsonbody[0]);


//   for(zzz = 0;zzz < jsonbody.length;zzz++){
//   	if(jsonbody[zzz].word[0] >= 'a' && jsonbody[zzz].word[0] <= 'z' && jsonbody[zzz].word.indexOf('-') == -1 && jsonbody[zzz].word.indexOf("'") == -1 ){
// 	  	wordObjectArray.push(jsonbody[zzz].word);
//   	}
//   }
  
// 	console.log(wordObjectArray);
// 	console.log(wordObjectArray.length);

// 	// newWord(wordObjectArray, wordsUsedArray, 5);
// 	console.log(wordsUsedArray);

// 	for(q=0;q<5;q++){
// 		newWord(wordObjectArray, wordsActiveArray, 5, wordsInactiveArray);
// 	}


// });



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

//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

console.log("gamefunctions+");

//bank of words, targetarray, timer length,used word array
function newWord(sss, jjj, ppp, kkk){

	var xxx = Math.floor(Math.random() * sss.length);
	

		jjj.push({name: sss[xxx], num: ppp});
		sss.splice(xxx, 1);
		// console.log(jjj[jjj.length-1]);
		// console.log(sss.indexOf(jjj[jjj.length-1]));


}

// every x seconds it ticks down the timer array and deletes words that have 0 seconds on the timer
function countDown(){

	for(x=0;x<(time.length-1);x++){

		time[x] = time[x]-1;

		if (time[x] == 0){

			loseGame += 1;
			spliceTimeWord(x);

			if (loseGame == 5) {

				clearInterval("iterate");
				console.log("Enter your Name");
				prompt.get(['userName'],function(err, result){

					highScores.push({name: result.userName ,score: points});
					resetGame();
				});

				logger();
				console.log("YOU LOSE, YOU HAD ", points, " POINTS!");

				logger();
				// beginGame();
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

function removeWordFromArray(yy, zz){
	var lookForWord = yy;
	var inArray = zz;

	function findObjectInArray(target){
		return target.name === yy;
	}

	var removeObject = zz.indexOf(zz.find(findObjectInArray))
	zz.splice(removeObject, 1);
}

///experimental dynmic div creator
var wordRowIncrement = 1;
var wordRowIncrementArray = [];
var wordRowIncrementArray2 = [];

// $(document).ready(function() {
function readyfunction(){  


}
// });