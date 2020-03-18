const express = require('express');
const server = express().use(express.json());

const helmet = require('helmet');
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');
server.use(helmet());

server.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: `server is running! from what? i don't know...` });
});

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;
