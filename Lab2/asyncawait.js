function getData() {
  console.log("Fetching data...");
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  console.log("Data fetched");
}

//console.log('Start of the program');
//getData();
//console.log('End of the program');

async function getDataAsync() {
  console.log("Fetching data...");
  try {
    var response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    console.log(response.json());
  } catch (error) {
    console.log(error);
  }
  console.log("Data fetched");
}

console.log("Start of the program");
getDataAsync();
console.log("End of the program");
