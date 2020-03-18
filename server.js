const express = require('express');
const cors = require('cors');
const server = express().use(express.json());

const helmet = require('helmet');
const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');
server.use(helmet());
server.use(cors());
server.use(logger);

server.get('/', (req, res) => {
	res
		.status(200)
		.json({ message: `server is running! from what? i don't know...` });
});

// endpoint routers
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

// middleware
function logger(req, res, next) {
	const method = req.method;
	const endpoint = req.originalUrl;
	console.log(`Requested request: ${method} to ${endpoint}`);
	next();
}

module.exports = server;
