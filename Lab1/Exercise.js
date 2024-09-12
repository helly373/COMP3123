function capitalizeFirstLetters(string){
    return string.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' ')    
}
const sentence = 'the quick brown fox'
console.log(capitalizeFirstLetters(sentence));