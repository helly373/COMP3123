var http = require("http");
//TODO - Use Employee Module here
var employee = require('./Employee.js')
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8082

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            res.statusCode = 200
            res.setHeader("Content-Type", "text/html")
            res.write("<h1> Welcome to Lab Exercise 03</h1>")
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
        }

        else if (req.url === '/employee') {
            res.statusCode = 200
            res.setHeader("Content-type", "application/json") // Sets the Content-Type header to plain text
            res.write(JSON.stringify(employee))
            //TODO - Display all details for employees in JSON format
        }

        else if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            res.statusCode = 200
            res.setHeader("Content-type", "application/json")
            const sortedNames = employee.sort((a, b) => {
                if(a.firstName == b.firstName){
                    return a.lastName.localeCompare(b.lastName);
                }
                return a.firstName.localeCompare(b.firstName);
            });
            const names = sortedNames.map(emp => `${emp.firstName} ${emp.lastName}`); // Map is used to create a new array by applying a function to each element in sortedNames array. It loops through each element
            res.write(JSON.stringify(names));

        }

        else if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            const totalSalary = employee.reduce((acc, emp) => acc + emp.Salary, 0);
            res.write(JSON.stringify({Total_Salary}))
    }else{
        res.write(`{"error" : "{http.STATUS_CODES[404]}"}`)
    }
     res.end()
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})