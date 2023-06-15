window.onload = function(){
	document.getElementById("addNew").addEventListener('click',submit);
}

let vendor = {};

function submit(){
    vendor.name = document.getElementById("vendorName").value;
	vendor.delivery_fee = document.getElementById("vendorDeliveryFee").value;
	vendor.min_order = document.getElementById("vendorMinimum").value;

    let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("vendor saved");
		}
		else if (this.readyState==4 && this.status==400) {
			alert("wrong input");
		}
	}
	
	//Send a POST request to the server containing the recipe data
	req.open("POST", `/vendors`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(vendor));
}


