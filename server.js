const express = require('express');
const server = express().use(express.json());

const helmet = require('helmet');
server.use(helmet());

server.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: `server is running! from what? i don't know...` });
});

module.exports = server;
