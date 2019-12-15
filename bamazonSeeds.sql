DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id int AUTO_INCREMENT NOT NULL ,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price decimal default 0,
stock_quantity int NULL,
primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Switch','Toys & Games',299.00,15000),
('Keurig K-Duo Coffee Maker','Home & Appliances',139.99,6000),
("Men's Tissot Swiss Watch",'Fashion',775.00,200),
('GPS Quadcopter Drone','Toys & Games',169.99,4000),
('MacBook Air','Computers & Accessories',699.95,8000),
('Samsung Chromebook 3','Computers & Accessories',177.99,10000),
('Heated Seat Cushion','Automotive & Motorcycle',49.98,2500),
('Nikon D750 Digital SLR','Camera & Photo',1196.95,1000),
('KEF T205 5.1 Home Theater System','Home & Appliances',1199.99,2000),
('Carry-On Spinner','Fashion',479.00,5000);

