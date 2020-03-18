const express = require('express');
const Projects = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
	Projects.get()
		.then(project => {
			res
				.status(200)
				.json({
					response: 'here are the projects you requested',
					projectList: project,
				});
		})
		.catch(() => {
			res.status(500).json({ response: 'no projects here' });
		});
});

module.exports = router;
