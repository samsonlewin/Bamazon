var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
	choices: ["View Product Sales by Department","Create New Department"]
}).then(function(answer){
	switch (answer.actions) {
      case "View Product Sales by Department":
        viewProductSales();
        break;

      case "Create New Department":
        CreateDepartment();
        break;
    };
});
};


function viewProductSales(){


};







