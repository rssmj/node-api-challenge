import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/projects.scss';

const initialProject = {
	name: '',
	description: '',
	// completed: '',
};

export const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState(initialProject);

	useEffect(() => {
		axios
			.get('http://localhost:8888/api/projects')
			.then((res) => {
				console.log(res.data);
				setProjects(res.data);
			})
			.catch((err) => {
				console.log(`You got no projects!`, err.response);
			});
	}, []);

	const addProject = () => {
		axios
			.post('http://localhost:8888/api/projects', project)
			.then((res) => {
				console.log(res.data);
				setProject(initialProject);
				setProjects(res.data);
			})
			.catch((err) => {
				console.log(`Added no projects!`, err.response);
			});
	};

	const deleteProject = (project) => {
		axios
			.delete(`http://localhost:8888/api/projects/${project.id}`)
			.then(() => {
				setProjects(projects.filter((item) => item.id !== project.id));
			})
			.catch((err) => {
				console.log(`Deleted no projects!`, err.response);
			});
	};

	const handleChanges = (e) => {
		setProject({
			...project,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='Projects'>
			<>
				<div className='container'>
					<h1 className='projects-header'>Projects</h1>
					<ul className='projects-container'>
						{projects.map((project) => {
							return (
								<li key={project.id}>
									<p className='project-name'> {project.name}</p>
									<p className='project-content'>{project.description}</p>
									{/* <p className='project-completed'>{project.completed}</p> */}
									<span
										className='delete'
										onClick={(e) => {
											e.stopPropagation();
											deleteProject(project);
										}}
									>
										DELETE
									</span>
								</li>
							);
						})}
					</ul>
					<div className='form-container'>
						<form onSubmit={addProject}>
							<label>New Project</label>
							<input
								id='name'
								name='name'
								placeholder='name'
								value={project.name}
								onChange={handleChanges}
							/>
							<textarea
								id='description'
								name='description'
								placeholder='content'
								value={project.description}
								onChange={handleChanges}
							/>
							<div>
								<button type='submit'>Add Project</button>
							</div>
						</form>
					</div>
				</div>
			</>
		</div>
	);
};
