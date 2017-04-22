var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

choices();

function choices(){
inquirer.prompt({
	type:"list",
	name:"actions",
	message: "What would you like to do?",
	choices: ["View Products for Sale","View Low Inventory", "Add to Inventory", "Add New Product"]
}).then(function(answer){
	switch (answer.actions) {
      case "View Products for Sale":
        viewProduct();
        break;

      case "View Low Inventory":
        viewLowInventory();
        break;

      case "Add to Inventory":
        addToInventory();
        break;

      case "Add New Product":
        AddNewProduct();
        break;
    };
});
};



// list every available item: the item IDs, names, prices, and quantities.
function viewProduct(){
	connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err,res){
	if (err) throw err;
	for (var i=0; i<res.length;i++){
		console.log("id: " + res[i].item_id + ", name: "+ res[i].product_name + ", price: "+ res[i].price + ", quantity: "+res[i].stock_quantity);
	};
});

};

//list all items with a inventory count lower than five.
function viewLowInventory(){
	connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
		for (var i=0; i<res.length;i++){
		console.log("id: " + res[i].item_id + ", name: "+ res[i].product_name + ", price: "+ res[i].price + ", quantity: "+res[i].stock_quantity);
		};
	});

};

//"add more" of any item currently in the store.
function addToInventory(){
	inquirer.prompt({
		type:"input",
		name:"add",
		message: "To what item would you like to add more inventory?"
	}).then(function(answer){
		var addItem = answer.add;
		connection.query('SELECT * FROM products WHERE item_id='+addItem, function(err,res){
		console.log("id: " + res[0].item_id + ", name: "+ res[0].product_name + ", price: "+ res[0].price + ", quantity: "+res[0].stock_quantity);
	inquirer.prompt({
		type:"input",
		name:"many",
		message:"How many items would you like to add to your inventory?"
	}).then(function(answer){
		connection.query("UPDATE products SET ? WHERE ?", [{
  						stock_quantity: res[0].stock_quantity+parseInt(answer.many)
						}, {
  						item_id: addItem
						}],function(err,res){});

	});


		});
	});

};

function AddNewProduct(){
	inquirer.prompt({
		type:"input",
		name:"productName",
		message: "Name of the product you would like to add"
	}).then(function(answer){
		var productName = answer.productName;
		inquirer.prompt({
			type:"input",
			name:"departmentName",
			message: "name of the department the product belongs to?"
		}).then(function(answer){
			var departmentName = answer.departmentName;
			inquirer.prompt({
			type:"input",
			name:"price",
			message: "price of this product?"
		}).then(function(answer){
			var price = answer.price;
			inquirer.prompt({
			type:"input",
			name:"stock",
			message: "How many of this products is there in stock?"
		}).then(function(answer){
			var stock = answer.stock;
				connection.query("INSERT INTO products SET ?", {
  				product_name: productName,
  				department_name: departmentName,
  				price: price,
  				stock_quantity:stock
				}, function(err, res) {
					console.log("Your product "+ productName + " was successfully added!");
				});
		});
		});
		});
	});

};




