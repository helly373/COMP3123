console.log("Hello World")
var obj = {
    name: 'Helly',
    age: 21
}
console.log(obj)

var student = {
    name : 'Zade Medows',
    age : 33,
    Profession : 'FBI Agent',
    Hobbies : ['Stalking', 'Gardening'],
    isAdmin : false,
    wife : true,
    result : ' '

}
console.log(student.name);
console.log(student.age);
console.log(typeof(student.name));
console.log(typeof(student.Hobbies));
console.log(typeof(student.isAdmin));
console.log(typeof(student.result));

function sayHello(){
    console.log("Hello, World");
}
sayHello();

//Arrow Function
var greet = () => {
    console.log("Hello World")
}

const name1 = "Helly";
console.log(name1);
console.log(name1.length);

var greet = name => {
    console.log(`Hello, ${name}`)
}

var add = (a, b) => a + b

var add = (a, b) => {
    return a + b
}


function print(a, b, ...c){
    console.log(arguments);
    console.log(a);
    console.log(b);
    console.log(c);
}

print(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);