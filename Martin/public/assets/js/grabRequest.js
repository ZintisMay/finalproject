var request = require('request');
var URL = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=3&maxLength=10&limit=1000&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
console.log("boo");
request.get(URL, function (error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log(response);
  }
});
console.log("baz");
