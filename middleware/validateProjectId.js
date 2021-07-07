const Projects = require('../data/helpers/projectModel');

module.exports = async function validateProjectId(req, res, next) {
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
};
