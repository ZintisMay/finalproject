console.log("gamefunctions+");

//bank of words, targetarray, timer length,used word array
function newWord(sss, jjj, ppp, kkk){

	var xxx = Math.floor(Math.random() * sss.length);
	if(kkk.indexOf(sss[xxx])) !=-1){
		jjj.push({name: sss[xxx], num: ppp});
	}else{
		newWord(sss, jjj, ppp, kkk);
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