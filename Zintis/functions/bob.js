var fs = require('fs');
var bob;

fs.readFile('./bob.txt',"utf-8", (err, data) => {
	if (err) throw err; 
	bob = data;
	console.log(data);
	console.log(typeof bob);
	console.log('here comes bob');
	console.log(bob);
});


