import fs from "fs";
import { readdir, readFile} from 'node:fs/promises';

import express from 'express';
let vendors = {}
let id = 2;

try {
	const files = await readdir('vendors')
		for (let file of files){
			let vendor = JSON.parse((await readFile("./vendors/" + `${file}`)).toString());
			console.log(vendor);
			let idString = vendor.id.toString();
			vendors[idString] = vendor;
	
		}
} catch (err) {
	console.error(err);
}

// Another mothod I have tried, please just ignore it.
//
// fs.readdir('vendors', (err, files) => {
//     if (err) throw err
//     for (let file of files){
// 		let vendor = require("./vendors/" + `${file}`);
// 		console.log(vendor);
// 		let idString = vendor.id.toString();
// 		vendors[idString] = vendor;

// 	}
// })
// process.on("uncaughtException", e => e ? console.log(e.message) : console.log(""))


let app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine','pug');
app.use(express.urlencoded({ extended: true }));

// get home page
app.get("/",(req, res) => {
	res.render("home");
});

// get vendors page
app.get("/vendors", respondVendors);


// get add page
app.get("/addvendor",(req, res) => {
	res.render("addvendor", {vendors: vendors});
});

// get a specific vendor page by its id
app.get("/vendors/:id", respondSpecificVendor);

// helper function for add page
function isValid (object){
	return validProperty(object, "name") 
	&& validProperty(object, "delivery_fee")
	&& validProperty(object, "min_order");
}

function validProperty (object, propertyName) {
	return object.hasOwnProperty(propertyName) 
	&& object[propertyName] != null 
	&& object[propertyName].length > 0;
}

// add a vendor
app.post("/vendors", (req, res) => {
	
	console.log(req.body);
	
	if (isValid(req.body)){
		//set id
		id++;
		let idString = id.toString();
		vendors[idString] = req.body;
		vendors[idString].id = idString;

		// add blank supply list
		vendors[idString].supplies = {};

		console.log(vendors);

		// send
		const data = JSON.stringify(vendors[idString]);
		res.send(data);

	} else {
		res.status(400).send();
	}
});

// update vendor
app.put("/vendors/:id", (req, res) => {
	let requestVendor = req.body;
	let serverVendor = vendors[req.params.id];

	if (requestVendor.name !== serverVendor.name)
		serverVendor.name = requestVendor.name;
	if (requestVendor.delivery_fee !== serverVendor.delivery_fee)
		serverVendor.delivery_fee = requestVendor.delivery_fee;
	if (requestVendor.min_order !== serverVendor.min_order)
		serverVendor.min_order = requestVendor.min_order;
	
	serverVendor.supplies = requestVendor.supplies;

	vendors[req.params.id] = serverVendor;

	res.status(200).send();

});

function respondVendors(req, res, next) {
	res.format({
		"text/html": () => {res.render("vendors", {vendors: vendors})},
		
		"application/json": () => {
			res.status(200).json({
				"vendors": Object.entries(vendors).map(([key, value]) => value.id)
			})}

	});
	next();
}

function respondSpecificVendor(req, res, next) {
	res.format({
		"text/html": () =>  {
			if (vendors.hasOwnProperty(req.params.id)) {
				const vendor = vendors[req.params.id];
				res.render("vendor", {vendor: vendor});
	  		} else {
		  		res.status(404);
		  		res.send(`404 error: Vendor with ID ${req.params.id} does not exist.`);
	  		}},		 
		
		"application/json": () => {
			if (vendors.hasOwnProperty(req.params.id)) {
				const vendor = vendors[req.params.id];
				res.status(200).json(vendor);
	  		} else {
		  		res.status(404);
			}}

	});
	next();
}


//Start server
app.listen(3000);
console.log("Server listening at http://localhost:3000");