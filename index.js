'use strict';

var proxy = require('./proxy.js');

proxy({
	host:'localhost',
	port:4050,
	proxyPort:4040
});
