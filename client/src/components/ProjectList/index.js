import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../../utils/mutations";

const ProjectList = ({
	projects,
	projectTitle,
	showTitle = true,
	showUsername = true,
}) => {
	const [deleteProject] = useMutation(REMOVE_PROJECT);

	const handleDeleteProject = async (projectId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			const { data } = await deleteProject({
				variables: { projectId },
			});
			console.log(`Successfully deleted project with ID ${projectId}`);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	if (!projects) {
		return <h3>No Projects Yet</h3>;
	}

	return (
		<div className="mb-4">
			<ul>
				{projects &&
					projects.map((project) => (
						<li key={project._id}>
							<Link className="projects" to={`/projects/${project._id}`}>
								{project.projectTitle}
							</Link>
							<button
								className="delete-button"
								onClick={() => handleDeleteProject(project._id)}
							>
								Delete
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default ProjectList;
