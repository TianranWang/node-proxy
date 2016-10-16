'use strict';

require('http').createServer((req,res)=>{
    res.end(`success\nlocalhost:4050`);
}).listen(4050)

var proxy = require('./proxy.js');

proxy({
	host:'localhost',
	port:4050,
	proxyPort:4040
});
