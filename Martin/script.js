var $SearchField;

$(document).ready(function(){
	$SearchField = $('#query');		// 	the text field. This is where the game is played.
	$targets = $('.wordTarget');	//	the word targets. Each one will have the class "wordTarget."

	// var debounced_tableFilter = _.debounce(wordGun, 200);
	// var throttle_tableFilter = _.throttle(wordGun, 500);
	$SearchField.keyup(function(){
		wordGun(this);
	});
});

function wordGun(node){
	console.log('wordGun called');

	var myInput = $SearchField.val();

	console.log('myInput: ', myInput);

	var val = '^(?=.*\\b' + $.trim($(node).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        // search_results = [],		//debugging purposes only, this can be removed since counters are now keeping track of results.
        targetCounter = 0,
        text;

	if($targets.length < 1){
		alert("Level Clear!");
	} else {
		$targets.each(function(){
			var targetWord = $(this).text();

			var text = $(this).text().replace(/\s+/g, ' ');

			var inputSoFar = $SearchField.val().length;

			if(reg.test(text) === true){
				targetCounter++;
				console.log('Targetting Word, ... ', targetWord);
				console.log('Letters Typed: ', inputSoFar);

				$(this).removeClass('hidden'); 				// REVEAL TARGET WORD


				var inputHighlight = targetWord.slice(inputSoFar);

				console.log("Portion to highlight: ", inputHighlight);
				console.log("My Input: ", myInput);
				
				// DONE 9/27: make the individual letters bold as you type.

				$(this).html("<em>" +  myInput + "</em>" + inputHighlight);

				// this marks the completion of a typed word and
				if($SearchField.val() == targetWord){
					alert("You typed " + targetWord);
					$SearchField.val('');
					$(this).closest('.wordTarget').remove();
				}

			} else {
				// $(this).addClass('hidden');
				// no longer hiding the other words.
			}
		});
	}

	if (targetCounter > 0) {
		console.log("%s Current Targets", targetCounter);
	}
};


$('.noEnterSubmit').keypress(function(e){
    if ( e.which == 13 ) return false;
});