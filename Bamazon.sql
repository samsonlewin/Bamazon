CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL, 
department_name VARCHAR(50) NOT NULL, 
price DECIMAL(19,4) NOT NULL,
stock_quantity INTEGER(30),
PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(50) NOT NULL,
over_head_costs DECIMAL(19,4)NOT NULL,
total_sales DECIMAL(19,4) NOT NULL,
PRIMARY KEY (department_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Milk Cholocate", "Groceries", 4.5, 5000);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Small wooden table", "Furniture",250, 100);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Bunk beds", "Furniture",820.99, 10);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Painting of a cat", "Art",10009.76, 1);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Bananas", "Groceries",1.99, 10000);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Apples", "Groceries",0.99, 20000);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Apple TV", "Tech",100.89, 20);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Google Home", "Tech",120.59, 30);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Cooking Book", "Kitchen",20.29, 35);

INSERT INTO products (product_name,department_name,price,stock_quantity )
VALUES ("Rice Cooker", "Kitchen",53.66, 3);

ALTER TABLE products
ADD product_sales DECIMAL(19,4) NOT NULL;

SELECT * FROM products;
SELECT * FROM departments;


