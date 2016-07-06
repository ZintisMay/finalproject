var $SearchField;

//zzzzzzzzzzzzzzzzzzzzzz
//the various buckets of words
var wordsObjectArray = []; //word bank
var wordsActiveArray = []; //words on screen
var wordsInactiveArray = []; //used words
///experimental dynmic div creator
var wordRowIncrement = 1; // is the ticker used to make words in different rows
var wordRowIncrementArray = []; //is the first countdown ticker
var wordRowIncrementArray2 = []; //is the second countdown ticker

var tempWordIndex;

var gameState = {
	go: true,
	words: 0,
	points: 0,
	missedWords: 0
}

//zzzzzzzzzzzzzzzzzzzzzzzz

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

//create new divs button
	$('button').click(function(){

		// console.log("pushMe");

		// this takes the contents of the input box
		var inputContents = $('.box').val();

		// console.log(inputContents, inputContents.length);

		//contains the new rod lifecycle
		newWordLifeCycle(inputContents);

	});

});//end document.ready

//this starts a recursive function which selects words, checks their lenths, and recalls itself relative to the length of the last word selected
function gameLoop(xxyy){
	if(gameState.go==true){
		var gameLoopInterval = setInterval(function(){
			if(gameState.go==false){clearInterval(gameLoopInterval);}else{
							selectWord(wordsObjectArray, wordsActiveArray, 1, wordsInactiveArray, 1);
			var tempWordLength = wordsActiveArray[tempWordIndex].length;
			gameLoop(tempWordLength);
			}	
		}, 2000);
	}
	
}

//this function will contain the new word lifecycle
function newWordLifeCycle(inputContents){

	//this line creates the dynamic div that contains the word, and maybe an image
	$('#row' + wordRowIncrement).html('<div class="wordTarget wordTargetDetails wordTargetAnimate' +(inputContents.length) +' word-x1  div6 white"><img width="25" height="25" src="../../public/assets/images/space_invader.png"> '+inputContents+'</div>');

	//this keeps track of which rows have animations
	wordRowIncrementArray.push(wordRowIncrement);

	//this is the timer that removes the div, and replaces it with an explosion
	setTimeout(function(){

		// console.log("wordRowIncrementArray",wordRowIncrementArray);	

		//this creates the explosion div
		$('#row' + wordRowIncrementArray[0]).html('<img class="explosion"'+wordRowIncrementArray2+'" src="../../public/assets/images/explosion.gif">');
		
		//this moves the incrementer to the second counter, then removes the first counter. So that the animations end at the right times
		wordRowIncrementArray2.push(wordRowIncrementArray[0]);
		wordRowIncrementArray.splice(0,1);

		// console.log("wordRowIncrementArray",wordRowIncrementArray);
		// console.log("wordRowIncrementArray2",wordRowIncrementArray2);

		//this adds to the missedwords counter, at @5 will shut down the game
		gameState.missedWords++
		if (gameState.missedWords ==10){
			gameState.go=false;
			for(u = 1; u < 13; u++){
				$("#row" + u).html("YOU LOSE");
			}
		}

		//this ends the explosion div
		setTimeout(function(){

			//blanks the row
			$('#row' + wordRowIncrementArray2[0]).html("");

			//removes the counter
			wordRowIncrementArray2.splice(0,1);

			// console.log(wordRowIncrementArray);
			// console.log(wordRowIncrementArray2);
		}, 500);

		//this sets the timer to the length of the word + 4. So a 1 letter word takes 5 seconds to expire, whereas a 7 letter word would take 11.
	}, (inputContents.length)*1000);

	//this is the counter for the number of word rows
	wordRowIncrement++;
	if (wordRowIncrement >= 13){wordRowIncrement = 1;}
}

//zzzzzzzzzzzzzzzzzzzzzzzz

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
			console.log("targetWord", targetWord);
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



$.ajax({url: URL, success: function(result){
	// console.log('result', result, typeof result, result[0]);

	// var jsonbody = JSON.parse(result);
	// console.log("jsonbody", typeof jsonbody, jsonbody[0], jsonbody[jsonbody.length]);
	for(zzz = 0;zzz < result.length;zzz++){
		if(result[zzz].word[0] >= 'a' && result[zzz].word[0] <= 'z' && result[zzz].word.indexOf('-') == -1 && result[zzz].word.indexOf("'") == -1 ){
		  	wordsObjectArray.push(result[zzz].word);
		}
	  }

	// selectWord(wordsObjectArray, wordsActiveArray, 5, wordsInactiveArray, 5);

	gameLoop(1);

	console.log(wordsObjectArray);
	// console.log(wordsObjectArray, wordsActiveArray);
}});

//zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz

console.log("gamefunctions+");

//bank of words, targetarray, timer length, used word array, number of words to select
function selectWord(sss, jjj, ppp, kkk, yyy){

	for(q=0;q<yyy;q++){
		var xxx = Math.floor(Math.random() * sss.length);

		tempWordIndex = xxx;

		jjj.push({name: sss[xxx], num: ppp});
		sss.splice(xxx, 1);
		// console.log(jjj[jjj.length-1]);
		// console.log(sss.indexOf(jjj[jjj.length-1]));
		newWordLifeCycle(sss[xxx]);
	}
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



// $(document).ready(function() {
function readyfunction(){  


}
// });