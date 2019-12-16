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
    inquirerOptions();
}

function inquirerOptions() {
    inquirer.prompt([{
        type: "list",
        name: "command",
        message: "Welcome to our store! How can we assist you?",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }]).then(function (user) {
        // use a switch function to change options
        switch (user.command) {
            case 'View Products for Sale':
                break;
            case 'View Low Inventory':
                break;
            case 'Add to Inventory':
                break;
            case 'Add New Product':
                break;
        }
    });
}