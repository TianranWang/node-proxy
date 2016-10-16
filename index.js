'use strict';

var proxy = require('./proxy.js');

require('http').createServer((req,res)=>{
	res.end('hello')
}).listen(4050)

proxy({
	host:'localhost',
	port:4050,
	proxyPort:4040
});
