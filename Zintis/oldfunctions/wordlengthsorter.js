var fs = require('fs');
var prompt = require('prompt');
prompt.start();

//holds the data file
var hugeString;

var wordsDivided = ["","","","","","","","","","","","",""];


//read datafile
fs.readFile('./string.txt', "utf-8", (err, data) => {

    if (err) throw err;

    hugeString = data;



	console.log(typeof hugeString);

	console.log(hugeString[0]);

	stringTextBreaker(hugeString);

	console.log(hugeString.length);

	// lookForWord();
	
});

function stringTextBreaker(x){

	var tempwordholder = "";

	for (z = 0; z < hugeString.length;z++){

		if(hugeString[z] >= 'a' && hugeString[z] <= 'z'){

			tempwordholder += hugeString[z];

			console.log(tempwordholder);

		}else if (hugeString[z] == ' '){

			console.log("   pushword: " + tempwordholder.length);

			var targetfile = './dict/string-' + tempwordholder.length + '.txt';

			tempwordholder += ' ';

			fs.appendFile(targetfile, tempwordholder, function(err){

			    if (err) throw err;

			});

		    tempwordholder = "";

		}
	}

}

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