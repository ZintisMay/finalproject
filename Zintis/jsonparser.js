fs = require('fs');



// // var bigJSON = JSON.parse(bigObject);

// // fs.writeFile('bigJSON.json', bigJSON);

// console.log(bigObject);

// console.log(bigJSON);

fs.readFile('./trie-js/dict/simple.js', (err, data) => {
  if (err) throw err;
    console.log("data");
  console.log(typeof data);
	// bigObject = JSON.parse(data);
 //  console.log("bigObject");
 //    console.log(bigObject);

var bigObject = data;

console.log(data);

console.log(bigObject.a.a.h.$);
});