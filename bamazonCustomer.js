const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(connection);
  console.log("connected as id " + connection.threadId);
  displayInventory()
});

function displayInventory() {
  connection.query("SELECT * FROM products",
    function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    inquirerOrder();
}

function inquirerOrder() {
  inquirer.prompt([{
    type: "input",
    name: "itemID",
    message: "What is the product (ID) that you would like to submit?"
  }, {
    type: "input",
    name: "itemQuantity",
    message: "How many units of the product would you like to buy?",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function (user) {
    // Create variables that take in user input of placed order
    const userQuantity = user.itemQuantity;
    const useritemID = user.itemID

    // Use these variables as parameters for function that checks if store has sufficient inventory
    bamazonDBInventoryCheck(userQuantity, useritemID);
  });
}

function bamazonDBInventoryCheck(userQuantity, useritemID) {
  connection.query(`SELECT product_name, price, stock_quantity FROM products WHERE item_id = ${useritemID}`, function (err, newRes) {

    if (err) throw err; 

    // check the user's desired quantity against the stock quantity
    if (userQuantity <= newRes[0].stock_quantity) {
      connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${userQuantity} WHERE item_id = ${useritemID}`);
      // show the total cost of purchase 
      const totalorderCost = newRes[0].price * userQuantity;
      console.log(`You made an order for ${newRes[0].product_name} with a total of $${totalorderCost}. Thank you, Come again!`)
    } else {
      console.log(`Our apologies but we are currently out of stock for ${newRes[0].product_name}`);
    }
  })
  connection.end(); 
};