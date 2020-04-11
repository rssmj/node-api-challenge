const Actions = require('../data/helpers/actionModel.js');

module.exports = async function validateActionId(req, res, next) {
	const { id } = req.params;
	const action = await Actions.get(id);
	action
		? next()
		: res
				.status(400)
				.json({ result: `Action: ${id} is not here` })
				.catch(() => {
					res.status(500).json({ error: 'action errors' });
				});
};
