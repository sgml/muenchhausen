





/*
var generator = require("creditcard-generator");
console.log(
	generator.GenCC("Mastercard", 1, Math.random)
)
*/
var merchandiseTVSpotText = "$(date.now.value suffix : this)-$(date.random suffix : format, min : 20200901)  $(date.random)";
var Muenchhausen = require("./lib/index.js");
var muenchhausen = new Muenchhausen("de");
var news = muenchhausen.render(merchandiseTVSpotText);

console.log(muenchhausen.fake.date.month({"culture":"de"}).text());
console.log(news);

//console.log(methods);