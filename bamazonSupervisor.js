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
  connection.query("SELECT * FROM departments", function(err,res){
    //console.log(res);
        var table = new Table({
          head: ['department_id', 'department_name', 'over_head_costs', 'product_sales','total_profit']
        , colWidths: [15, 15, 15, 15, 15]
        });
        for (var i=0;i<res.length;i++){
          table.push(
              [res[i].department_id, res[i].department_name,res[i].over_head_costs, res[i].total_sales, res[i].total_sales-res[i].over_head_costs]
              );
        }
        console.log(table.toString());
  });


};

function CreateDepartment(){
inquirer.prompt({
  type : "input",
  name : "departmentName",
  message : "What is the name of the department you would like to create?"
}).then(function(answer){
  var departmentName = answer.departmentName;
  connection.query("INSERT INTO departments SET ?", {department_name :departmentName, over_head_costs: 0, total_sales : 0}, function(err,res){});
});

};





