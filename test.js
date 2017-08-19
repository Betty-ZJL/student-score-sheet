var readlineSync = require('readline-sync');

var userName = readlineSync.question('中文 ');
console.log('hi '+userName);