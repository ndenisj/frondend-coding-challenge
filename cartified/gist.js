cart = [];
if (!localStorage.getItem("cart")) {
	localStorage.setItem("cart", JSON.stringify(cart));
}
function addItem(id, quantity) {
	let data = {
		id,
		quantity,
	};

	let oldItems = JSON.parse(localStorage.getItem("cart"));

	// check if the ID is in the cart then increase the quantity if true
	if (idExistsInArray(oldItems, data.id)) {
		// get it and update only the quantity
		oldItems.find((o, i) => {
			if (o.id === data.id) {
				oldItems[i].quantity = data.quantity;
				localStorage.setItem("cart", JSON.stringify(oldItems));
				// remove the item if the quantity is 0
				if (data.quantity == 0) {
					oldItems = oldItems.filter(function(obj) {
						return obj.id !== data.id;
					});
					localStorage.setItem("cart", JSON.stringify(oldItems));
				}
				return true; // stop searching
			}
		});
	} else {
		oldItems.push(data);
	}
	// persist item in localStorage
	localStorage.setItem("cart", JSON.stringify(oldItems));

	return true;
}

function idExistsInArray(array, id) {
	var regex = new RegExp('"id":' + id + "(,|})");
	return regex.test(JSON.stringify(array));
}
