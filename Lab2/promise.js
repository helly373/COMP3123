function makePromise(a) {
  var p1 = new Promise((resolve, reject) => {
    if (a > 10) {
      const r = {
        status: true,
        message: "I am resolved",
      };
      resolve(r);
    } else {
      const r = {
        status: false,
        message: "I am rejected",
      };
      reject(r);
    }
  });
  return p1;
}

console.log("Start of the program");
makePromise(10).then(
  (res) => {
    console.log(res);
  },
  (e) => {
    console.log(e);
  }
);

console.log("After the promise");

makePromise(100)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

console.log("End of the program");

// fetch example

var p1 = fetch("https://jsonplaceholder.typicode.com/users/1");
console.log("p1");
p1.then((a) => {
  console.log(a);
  return a.json();
})
  .then((b) => {
    console.log(b);
    return;
  })
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log(e);
  });
