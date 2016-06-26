var fs = require('fs');
var prompt = require('prompt');
prompt.start();

//holds the data file
var hugeString;

console.time('now');
console.timeEnd('now');

//read datafile
fs.readFile('./string.txt', "utf-8", (err, data) => {

    if (err) throw err;

    hugeString = data;

	console.log(hugeString.search('zymotic'));

	console.timeEnd('now');

	lookForWord();
	
});

function lookForWord(){

	prompt.get(['word'],function(err, result){

			console.time('xxx');
		
		console.log(result.word);

		var foundIt = hugeString.search(result.word);

		if(foundIt>=0){console.log("found it")}else{console.log('not there')}

			console.timeEnd('xxx');

		lookForWord();


	});
}
