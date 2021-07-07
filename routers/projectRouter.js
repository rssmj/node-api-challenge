const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');
const validateAction = require('../middleware/validateAction');
const validateProject = require('../middleware/validateProject');
const validateProjectId = require('../middleware/validateProjectId');

// get projects
router.get('/', async (req, res) => {
	const project = await Projects.get();
	project
		? res.status(200).json(
				project
				// {
				// 	YAHTZEE: 'here are the projects you requested',
				// 	projectList: project,
				// }
		  )
		: res
				.status(400)
				.json({ YIKES: 'no projects here' })
				.catch(() => {
					res.status(500).json({ TRAGIC: 'much error' });
				});
});

// get project by id
router.get('/:id', validateProjectId, async (req, res) => {
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
router.get('/:id/actions', validateProjectId, async (req, res) => {
	const { id } = req.params;
	const project = await Projects.get(id);
	const action = await Projects.getProjectActions(id);
	project
		? res.status(200).json({
				COOL: `special delivery, actions for project ID: ${id}, just for you`,
				result: action,
		  })
		: res
				.status(400)
				.json({ NOT_COOL: `project ID: ${id}, actions not here` })
				.catch(() => {
					res.status(500).json({ WORSE: 'nothing here' });
				});
});

// post insert project
router.post('/', validateProject, async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const project = await Projects.insert(body, id);
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

// post insert actions into projects
router.post('/:id/actions', validateAction, async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const action = await Actions.insert(body, id);
	action
		? res
				.status(201)
				.json({ DING: 'new action, ready for pickup', result: body })
		: res
				.status(400)
				.json({ MEH: 'this action is no good' })
				.catch(() => {
					res.status(500).json({ HUH: 'action explosion' });
				});
});

// --> update projects <--
router.put('/:id', validateProject, validateProjectId, async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const project = await Projects.update(id, body);
	project
		? res
				.status(201)
				.json({ IS_GOOD: `project: ${id} update updated`, result: body })
		: res
				.status(400)
				.json({ NO_GOOD: 'project update did not update' })
				.catch(() => {
					res.status(500).json({ NOTHING: 'broken' });
				});
});

// --> delete projects <--
router.delete('/:id', validateProjectId, async (req, res) => {
	const { id } = req.params;
	const project = await Projects.remove(id);
	project
		? res.status(201).json({ POOF: `project id: ${id} - gone` })
		: res
				.status(400)
				.json({ WHY: 'no deleting this project' })
				.catch(() => {
					res.status(500).json({ NOTHING: 'broken' });
				});
});

// projects middleware
// async function validateProjectId(req, res, next) {
// 	const { id } = req.params;
// 	const project = await Projects.get(id);
// 	project
// 		? next()
// 		: res
// 				.status(400)
// 				.json({ result: `Project: ${id} is not here` })
// 				.catch(() => {
// 					res.status(500).json({ error: 'project errors' });
// 				});
// }

// async function getProjectActions(req, res, next) {
// 	const { id } = req.params;
// 	const actions = await Actions.getProjectActions(id);
// 	actions
// 		? next()
// 		: res
// 				.status(400)
// 				.json({ result: `Actions: ${id} is not here` })
// 				.catch(() => {
// 					res.status(500).json({ error: 'action errors' });
// 				});
// }

module.exports = router;
