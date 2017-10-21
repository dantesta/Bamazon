CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

  id int(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price decimal(8,2) DEFAULT NULL,
  stock_quantity int(11) DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Bananas", "Produce", 3.99, 100), 
		("Xbox One", "Electronics", 299.99, 50), 
		("T-Shirt", "Clothing", 24.99, 200), 
		("PS4", "Electronics", 299.99, 40), 
		("Pillow", "Household", 14.99, 300), 
		("Chocolate", "Candy", 2.99, 500), 
		("Pretzels", "Snacks", 5.99, 80), 
		("Iced Tea", "Beverages", 7.99, 70),
		("Toothpaste", "Hygienics", 5.99, 100),
		("Backpack", "School", 29.99, 45);