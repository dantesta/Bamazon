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


function makePurchase() {

    inquirer.prompt([

    {
        
        type: 'input',
        name: 'id',
        message: 'What item would you like to purchase? (Insert ID)',
        validate: function(value) {
            var regexp = /^\d+$/;
            return regexp.test(value) ? true : "Please enter number only.";
        }
    }, 

    {
        type: 'input',
        name: 'quantity',
        message: 'How much of this product do you want?',
        validate: function(value) {
            var regexp = /^\d+$/;
            return regexp.test(value) ? true : "Please enter a number, no letters.";
        }


    }]).then(function(data) {

        let id = parseInt(data.id);
        connection.query("SELECT * FROM products WHERE id = " + id, function(error, results) {
            if (error) {
                console.log("Sorry, ID you entered does not match our records.");

                newPurchase();
            } else {
                let selectedProduct = results[0];

                if (data.quantity <= selectedProduct.stock_quantity) {
                    let newStock = selectedProduct.stock_quantity - data.quantity;
                    connection.query("UPDATE products SET stock_quantity = " + newStock + "WHERE id = " + id, function(error, results) {
                        let totalCost = parseFloat(selectedProduct.price) * parseFloat(data.quantity);
                        console.log("Thank you for shopping at Bamazon! Your total is: " + totalCost);
         
                        console.log("\n");
                        newPurchase();
                    });
                } else {
                    console.log("\nOut of Stock, please try a different item.");
                    console.log("\n");
                    newPurchase();
                }
            }


        });
    });
}



function newPurchase() {

    inquirer.prompt([{
        type: "confirm",
        name: "purchase",
        message: "Keep shopping?",

    }]).then(function(data) {

        if (data.purchase) {
            makePurchase();

        } else {
            console.log('Thanks for shopping at Bamazon!');
            connection.end();
        }
    });
}




