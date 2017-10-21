var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  user: "root",
  password: "root",
  database: "bamazon"

});

connection.connect(function(err) {
  if (err) throw err;
 
});

function queryProducts() {
    connection.query("SELECT id, product_name, price FROM products", function(error, results) {
        if (error) throw error;

        console.log("\nWelcome to Bamazon: PRODUCTS FOR SALE");
        console.log("===========");

        console.table(results);
        console.log("===========");
        makePurchase();
    });
}

queryProducts();