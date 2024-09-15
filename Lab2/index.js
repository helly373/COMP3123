var f1 = function greet() {
  console.log("Hello World");
};

var f2 = function () {
  console.log("Good Morning");
};

function greetUser(a, greet, morning) {
  if (a == "morning") {
    morning();
  } else {
    greet();
  }
}

console.log("Start of the program");
greetUser("morning", f1, f2);

// setInterval(() => {

// }, interval);
setTimeout(() => {
  console.log("After 5 seconds");
}, 5000);

console.log("End of the program");
