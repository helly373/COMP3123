// 1st
function gretter(myArray, counter) {
    const greenText = 'Hello';
    for(let x of myArray) console.log(greenText + ' ' + x);
}
let names = ['Randy Savage', 'Ric Flair', 'Hulk Hogan'];

gretter(names, 3);

//2nd

function capitalize(word){
    const [firstLetter, ...remaining] = word.split('')
    return (firstLetter ? firstLetter.toUpperCase() : '') + remaining.join('');

}
console.log(capitalize('fooBar'));
console.log(capitalize('nodeJS'));