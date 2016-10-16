'use strict';

var proxy = require('./proxy.js');

proxy({
	host:'localhost',
	port:80,
	proxyPort:4040
});
