const express = require('express');
const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
	Actions.get()
		.then(action => {
			res
				.status(200)
				.json({
					response: 'here are the actions you requested',
					actionList: action,
				});
		})
		.catch(() => {
			res.status(500).json({ response: 'no actions here' });
		});
});

module.exports = router;
