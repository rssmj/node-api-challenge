module.exports = async function validateProject(req, res, next) {
	const project = req.body;
	const name = project.name;
	const description = project.description;
	project
		? name
		: description
		? res.status(400).json({ message: 'missing project data' })
		: res
				.status(400)
				.json({ message: 'missing required name or description field' });
	next();
};
