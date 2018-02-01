const { add } = require('@desfero/monorepo-core');

function sum(arr) {
    return arr.reduce(add)
}

console.log(sum([2, 3]));
