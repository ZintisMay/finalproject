var wordArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
var gameArray = [];
var failArray = [];

// var array = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
// array[0].push([1, 2]);
// array[20].push(1);
// console.log(array);

var prompt = require('prompt');
prompt.start();
makeAList(10);
// goprompt();

function makeAList(ss){
	for (;gameArray.length < ss;){

		randomWord(wordArray, gameArray, failArray);
	}
}


console.log(gameArray);
console.log(failArray);

function goprompt(){

	prompt.get(['word'],function(err, result){

		console.time('xxx');
		
		console.log(result.word);

		var foundIt = wordArray.indexOf(result.word);

		console.log(foundIt);

		if(foundIt>=0){console.log("found it")}else{console.log('not there')}

		console.timeEnd('xxx');

		goprompt();


	});
}
	
function randomWord(a, b, c){

	var chosenword = a[Math.floor((Math.random() * a.length) + 1)-1];

	if(b.indexOf(chosenword) == -1){
		b.push(chosenword);	
	}else{
		c.push(chosenword);
	}

}

	// [result.word.length]}
