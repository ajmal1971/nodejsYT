const fs = require('fs');
const os = require('os');

//Create
//Async
//fs.writeFile('test.txt', 'Ajmal Hossain Opu', () => { });

//Sync
// fs.writeFileSync('./test.txt', 'Ajmal Hossain Opu Sync');

//Read
//Async
// fs.readFile('test.txt', 'utf-8', (err, res) => {
//     if (err) {
//         console.log("Error:: ", err);
//     } else {
//         console.log("Result:: ", res);
//     }
// });

//Sync
// const result = fs.readFileSync('./test.txt', 'utf-8');

// console.log(result);

//Update
//Async
// fs.appendFile('text.txt', `Time: ${new Date().toLocaleString()} | Name: Ajmal Hossain Opu\n`, () => { });

//Delete
// fs.unlink('test.txt', () => { });

console.log(os.cpus().length);