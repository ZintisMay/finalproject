var fs = require('fs');
var prompt = require('prompt');
prompt.start();

//holds the data file
var hugeString;

// var wordsDivided = ["","","","","","","","","","","","",""];

var wordArray= [[],[],[],[],[],[],[],[],[],[],[],[],[]];


//read datafile

fs.readFile('./string.txt', "utf-8", (err, data) => {

    if (err) throw err;
//stores all the words raw
    hugeString = data;

	console.log(typeof hugeString);

	console.log(hugeString[0]);
//splits the text into words lengths
	stringTextBreaker(hugeString);

	console.log(hugeString.length);

	// lookForWord();
	console.log("wordArray----------------------");
	// console.log(wordArray);
	
});




//functions only ****************************

//pulls apart a string, makes words out of them and pushes the words into an array
function stringTextBreaker(x){
//make a temp word
	var tempwordholder = "";
//run through the file
	for (z = 0; z < hugeString.length;z++){
//letter? add to temp word
		if(hugeString[z] >= 'a' && hugeString[z] <= 'z'){

			tempwordholder += hugeString[z];

			// console.log(tempwordholder);
//space? word is over, push word into 
		}else if (hugeString[z] == ' '){
// switchpush function (pushes into appropriate wordArray entry based on length)
			tempwordholder += " ";

			switchPush(tempwordholder);
//reset tempwordholder
		    tempwordholder = "";

		}
	}
//this goes through 
	for (p = 0; p < wordArray.length; p++){

		var targetfile = './dict/string-' + p + '.txt';

		// var stickTheseWordsInAFile = "var allTheWords = '"+ wordsDivided[p] + "';";
		var stickTheseWordsInAFile = wordArray[p];

		fs.appendFile(targetfile, stickTheseWordsInAFile, function(err){

	    if (err) throw err;

		});
	}

}

//takes a prompt input, looks through 'hugestring' for instance of word, replies with found/not there
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

//pass tempwordholder.length into it, then switch will push tempword + " " into the var. when file is done, append
function switchPush(k){

	// wordsDivided[k.length] += " "+k;
	wordArray[k.length].push(k);

}

// switch (k) {
// 	    case 1:
// 	        ltr1 += tempwordholder + " ";
// 	        break;
// 	    case 2:
// 	        ltr2 += tempwordholder + " ";
// 	        break;
// 	    case 3:
// 	        ltr3 += tempwordholder + " ";
// 	        break;
// 	    case 4:
// 	        ltr4 += tempwordholder + " ";
// 	        break;
// 	    case 5:
// 	        ltr5 += tempwordholder + " ";
// 	        break;
// 	    case 6:
// 	        ltr6 += tempwordholder + " ";
// 	        break;		
// 	    case 7:
// 	        ltr7 += tempwordholder + " ";
// 	        break;		
// 	    case 8:
// 	        ltr8 += tempwordholder + " ";
// 	        break;		
// 	    case 9:
// 	        ltr9 += tempwordholder + " ";
// 	        break;		
// 	    case 10:
// 	        ltr10 += tempwordholder + " ";
// 	        break;		
// 	    case 11:
// 	        ltr11 += tempwordholder + " ";
// 	        break;		
// 	    case 12:
// 	        ltr12 += tempwordholder + " ";
// 	        break;		
// 	    case 13:
// 	        ltr13 += tempwordholder + " ";
// 	        break;	
// 	    default:
// 	    break;	
// }