var Benchmark = require("benchmark");
var Muenchhausen = require("./../lib");
var muenchhausen = new Muenchhausen("en-GB");
var faker = require("faker");
faker.locale = "en"; 

function systeminfo(done){
	var os = require("os");
	var m = new Muenchhausen("en-GB");
	var si = require("systeminformation");
	si.cpu().then(function(cpu){
		si.versions().then(function(version){
			console.log("# Benchmark");
			console.log("");
			console.log("Tested at " + m.render("$(date.now format:{ datetime: full })"));
			console.log(" with node " + "v" + version.node + " on " + os.platform() + " " + os.arch() + " v" + os.release() + " with " + os.totalmem() + " total memory and");
			console.log(" " + cpu.manufacturer + " " + cpu.brand + " " + cpu.speed + " " + cpu.cores + " cores");
			console.log("");
			done();
		}).catch(function(error){ console.error(error) });
	}).catch(function(error){ console.error(error) });
};

function testSuite(functionBundle){

	var suite1 = new Benchmark.Suite();
	suite1
		.add(functionBundle.name1, functionBundle.f1)
		.add(functionBundle.name2, functionBundle.f2)
		.on("cycle", function(event) {
			console.log("- `" + String(event.target) + "`  ");
		})
		.on("complete", function() {
			console.log("  - Fastest is `" + this.filter("fastest").map("name") + "`  ") ;
			console.log("  ");
		})
		.run({ "async": false }); 

	return suite1
}


systeminfo(function(){

	testSuite({
		name1 : "muenchhausen.fake.company.name",
		f1 : function() {
			muenchhausen.fake.company.name({}); 
		},
		name2 : "faker.company.companyName",
		f2 : function() {
			faker.company.companyName(0);
		}
	});  

	testSuite({
		name1 : "muenchhausen.fake.person.firstname",
		f1 : function() {
			muenchhausen.fake.person.firstname({}); 
		},
		name2 : "faker.name.firstName",
		f2 : function() {
			faker.name.firstName();
		}
	});  
	
});