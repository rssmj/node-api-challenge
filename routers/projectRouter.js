const express = require('express');
const Projects = require('../data/helpers/projectModel.js');
// const Actions = require('../helpers/actionModel.js');

const router = express.Router();

// get projects
router.get('/', async (req, res) => {
	const project = await Projects.get();
	project
		? res.status(200).json({
				YAHTZEE: 'here are the projects you requested',
				projectList: project,
		  })
		: res
				.status(400)
				.json({ YIKES: 'no projects here' })
				.catch(() => {
					res.status(500).json({ TRAGIC: 'much error' });
				});
});

// get project by id
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const project = await Projects.get(id);
	project
		? res.status(200).json({
				WINNER: `special delivery project: ${id}, just for you`,
				result: project,
		  })
		: res
				.status(400)
				.json({ BAD: `Project: ${id} is not here` })
				.catch(() => {
					res.status(500).json({ WORSE: 'nothing here' });
				});
});

// --> get actions for projects <--

// post insert project
router.post('/', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const project = Projects.insert(body, id);
	project
		? res
				.status(201)
				.json({ SWELL: 'new project, hot off the presses', result: body })
		: res
				.status(400)
				.json({ BAD: 'where are the projects' })
				.catch(() => {
					res.status(500).json({ OOPS: 'project crash' });
				});
});

// --> update projects <--

// --> delete projects <--

// projects middleware
async function validateProjectId(req, res, next) {
	const { id } = req.params;
	const project = await Projects.get(id);
	project
		? next()
		: res
				.status(400)
				.json({ result: `Project: ${id} is not here` })
				.catch(() => {
					res.status(500).json({ error: 'project errors' });
				});
}

module.exports = router;
