let nextID = 0;
let vendor = {};
let item = {};

window.onload = function(){
	document.getElementById("update").addEventListener('click', update);
    document.getElementById("addNewItem").addEventListener('click', addItem);

	getCurrVendor(function(searchVendor){
		//Get number of current vendor's items
		Object.keys(searchVendor.supplies).forEach(elem => {
			Object.keys(searchVendor.supplies[elem]).forEach(id => {
				nextID++;
			});
		});

		vendor = searchVendor;
		
	});
}

function getVendorID() {
	return document.getElementById("vendorID").innerText;
}

function getSelectedCategory() {
	let categorySelect = document.getElementById("category-select");
	return categorySelect.options[categorySelect.selectedIndex].value;
}


function makeRequest(method, path, data = null, callback = null) {
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			let responseObject = JSON.parse(this.responseText);
			if (callback)
				callback(responseObject);
		}
		else if (this.readyState==4) {
			alert(`${this.status} ERROR`);
		}
	}
    //Send a GET request to the server containing the vendor data
	req.open(method, path);
	if (method === "GET")
		req.setRequestHeader("Accept", "application/json");
	if (method === "POST"|| method === "PUT")
		req.setRequestHeader("Content-Type", "application/json");
	if (data !== null)
		req.send(JSON.stringify(data));
	else {
		req.send();
	}
}

function getCurrVendor(callback) {
	makeRequest("GET",`/vendors/${getVendorID()}`, null, callback);
}


function addItem() {
    item.name = document.getElementById("itemName").value;
	item.description = document.getElementById("itemDescription").value;
	item.price = parseInt(document.getElementById("itemPrice").value);
    item.stock = parseInt(document.getElementById("itemStock").value);

	item.id = nextID++;

	// update html page
	getCategory(getSelectedCategory()).appendChild(generateItemElem(item));
	
	// update server data
	addItemToSupplies();

}


function addItemToSupplies() {

	const selectedCategory = getSelectedCategory();

	const newItem = {};
	newItem.name = item.name;
	newItem.description = item.description;
	newItem.price = item.price;
	newItem.stock = item.stock;

	vendor.supplies[selectedCategory][item.id] = newItem;

}


function generateItemElem(item){
	const newDiv = document.createElement("div");
	newDiv.className = "item";

	const newID = document.createElement("p");
	const newName = document.createElement("p");
	const newDescription = document.createElement("p");
	const newPrice = document.createElement("p");
	const newStock = document.createElement("p");

	newID.innerHTML = `item ID: ${item.id}`;
	newName.innerHTML = `item name: ${item.name}`;
	newDescription.innerHTML = `item description: ${item.description}`;
	newPrice.innerHTML = `item price: ${item.price}`;
	newStock.innerHTML = `item stock: ${item.stock}`;

	newDiv.appendChild(newID);
	newDiv.appendChild(newName);
	newDiv.appendChild(newDescription);
	newDiv.appendChild(newPrice);
	newDiv.appendChild(newStock);

	return newDiv;

}

function getCategory(categoryName){
	let categories = document.getElementsByClassName("category");
	for (let category of categories) {
		if (category.firstChild.innerHTML.startsWith(categoryName)) {
			return category;
		}
	}
	return null;
}

function update() {
    vendor.name = document.getElementById("curVendorName").value;
	vendor.delivery_fee = parseInt(document.getElementById("curVendorDeliveryFee").value);
	vendor.min_order = parseInt(document.getElementById("curVendorMinimum").value);

	let xhttp = new XMLHttpRequest()
	xhttp.onreadystatechange = function() { //An event 
		if (this.readyState == 4 && this.status == 200) {
            alert("changes saved.")
        }
	}

	xhttp.open("PUT", `/vendors/${getVendorID()}`)
    xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(vendor));
    
}