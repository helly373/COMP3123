// 1st
function gretter(myArray, counter) {
    const greenText = 'Hello';
    for(let x of myArray) console.log(greenText + ' ' + x);
}
let names = ['Randy Savage', 'Ric Flair', 'Hulk Hogan'];

gretter(names, 3);

//2nd

const capitalize = (word) => {
    if (!word) return ''; // Check for an empty string
    let firstLetter = word[0].toUpperCase(); // Capitalize the first letter
    let restOfWord = word.slice(1).toLowerCase(); // Convert the rest of the word to lowercase
    return firstLetter + restOfWord;


}

console.log(capitalize('fooBar'));
console.log(capitalize('nodeJS'));

//3d
const colors = ['red', 'blue', 'green', 'yellow'];

const capitalizedColors = colors.map(color => capitalize(color));
console.log(capitalizedColors);

//4th 
const filterLessThan20 = (arr) => arr.filter((val) => val < 20)
console.log(filterLessThan20([1, 60, 30, 15, 7]))

//5th
const calculateProduct = (arr) => arr.reduce((val, total = 1) => total * val);
console.log(calculateProduct([1, 2,3,4]));

const calculateSum = (arr) => arr.reduce((val, total = 0) => total + val);
console.log(calculateSum([10, 16, 8, 13]))

//6th 
class Car{
    constructor(model, year){
        this.year = year
        this.model = model
    }
    details(){
        return "Model : " + this.model + " Year : " + this.year;
     }
}

class Sedan extends Car{
    constructor(year, balance, model){
        super(model, year)
        this.bal = balance
    }
    information(){
        return super.details() + " has a balance of : " + this.bal;
    }
}

const car = new Car("Mercedes", 1979)
const sedan = new Sedan(2018,'Volvo SD', 30000)
console.log(car.details())
console.log(sedan.information())


