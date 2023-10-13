const lod = require('lodash');

let tab1 = [1, 2, 3, 4, 5];

let max = tab1[0];
let min = tab1[0];

for (let i = 1; i < tab1.length; i++) {
    if (tab1[i] > max) {
        max = tab1[i];
    }
    if (tab1[i] < min) {
        min = tab1[i];
    }
}

console.log("The largest element is: " + max);
console.log("The smallest element is: " + min);