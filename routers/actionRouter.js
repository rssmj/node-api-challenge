const express = require('express');
const Actions = require('../data/helpers/actionModel.js');
const validateAction = require('../middleware/validateAction');
const validateActionId = require('../middleware/validateActionId');
const router = express.Router();

// get actions
router.get('/', async (req, res) => {
	const action = await Actions.get();
	action
		? res.status(200).json(
				action
				// {
				// 	ACTION: 'here are the actions you requested',
				// 	actionList: action,
				// }
		  )
		: res
				.status(400)
				.json({ HMM: 'no actions here' })
				.catch(() => {
					res.status(500).json({ FAIL: 'error is error' });
				});
});

// get action by id
router.get('/:id', validateActionId, async (req, res) => {
	const { id } = req.params;
	const action = await Actions.get(id);
	action
		? res.status(200).json({
				NEAT: `you requested action: ${id}, so here it is`,
				result: action,
		  })
		: res
				.status(400)
				.json({ ODD: 'missing actions' })
				.catch(() => {
					res.status(500).json({ STRANGE: 'erroring' });
				});
});

// // post insert actions into projects
// router.post('/', validateActionId, async (req, res) => {
// 	const { id } = req.params;
// 	const body = req.body;
// 	const action = await Actions.insert(body, id);
// 	action
// 		? res
// 				.status(201)
// 				.json({ DING: 'new action, ready for pickup', result: body })
// 		: res
// 				.status(400)
// 				.json({ MEH: 'this action is no good' })
// 				.catch(() => {
// 					res.status(500).json({ HUH: 'action explosion' });
// 				});
// });

// --> update actions <--
router.put('/:id', validateAction, validateActionId, async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const action = await Actions.update(id, body);
	action
		? res
				.status(201)
				.json({ IS_GOOD: `action id: ${id} - update updated`, result: body })
		: res
				.status(400)
				.json({ NO_GOOD: `action: ${id} update did not update` })
				.catch(() => {
					res.status(500).json({ NOTHING: 'broken' });
				});
});

// --> delete actions <--
router.delete('/:id', validateActionId, async (req, res) => {
	const { id } = req.params;
	const action = await Actions.remove(id);
	action
		? res.status(201).json({ POOF: `action id: ${id} - gone` })
		: res
				.status(400)
				.json({ WHY: 'no deleting this action' })
				.catch(() => {
					res.status(500).json({ NOTHING: 'broken' });
				});
});

// actions middleware
// async function validateActionId(req, res, next) {
// 	const { id } = req.params;
// 	const action = await Actions.get(id);
// 	action
// 		? next()
// 		: res
// 				.status(400)
// 				.json({ result: `Action: ${id} is not here` })
// 				.catch(() => {
// 					res.status(500).json({ error: 'action errors' });
// 				});
// }

module.exports = router;
