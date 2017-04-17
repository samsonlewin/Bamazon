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


buyProduct();


//display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayAll (){
	connection.query('SELECT item_id, product_name, price FROM products', function(err,res){
	if (err) throw err;
	for (var i=0; i<res.length;i++){
		console.log("id: " + res[i].item_id + " name: "+ res[i].product_name + " price: "+ res[i].price);
	};
});

};


//prompt users with two messages.
//ask them the ID of the product they would like to buy
//ask how many units of the product they would like to buy
function buyProduct (){
	displayAll();
	inquirer.prompt({
		type : "input",
		name : "id",
		message : "Select the item id you would like to buy"
	}).then(function(answer){
		connection.query('SELECT * FROM products WHERE ?',{ item_id: answer.id}, function(err, res){
		if (err) throw err;
		var theItem = answer.id;
		var quantity = res[0].stock_quantity;
		inquirer.prompt({
					type : "input",
					name : "units",
					message : "how many units would you like to buy?"
				}).then(function(answer){
					if (answer.units > quantity){
						console.log("Insufficient quantity!");
						buyProduct();
					}else{
						connection.query("UPDATE products SET ? WHERE ?", [{
  						stock_quantity: res[0].stock_quantity-answer.units
						}, {
  						item_id: theItem
						}],function(err,res){});

						console.log("The total cost of your pruchase will be $"+answer.units*res[0].price +". Thanks for buying at Bamazon!");
  
					};

				});

		
		});
	});
};

