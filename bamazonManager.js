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
        console.log("there will be function D");
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
		connection.query('SELECT * FROM Products WHERE item_id='+addItem, function(err,res){
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
	
};





