var hs = require('http-server');

hs.createServer({ root: './test/site/' }).listen(9000);
