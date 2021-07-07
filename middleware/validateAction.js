module.exports = async function validateAction(req, res, next) {
	const { id } = req.params;
	const action = req.body;
	const notes = action.notes;
	const description = action.description;
	const project = action.project_id;
	action
		? notes
		: description
		? project
		: id
		? res.status(400).json({ message: 'missing action data' })
		: res
				.status(400)
				.json({ message: 'missing required notes or description field' });
	next();
};
