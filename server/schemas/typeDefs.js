const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		password: String
		projects: [Project!]!
	}

	type Project {
		_id: ID
		projectTitle: String
		userId: ID
		user: User
		tasks: [Task]
		title: String
	}

	type Task {
		_id: ID!
		task: String!
		taskDescription: String
		columnId: String!
		projectId: ID
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		user(username: String!): User
		projects(projectId: ID!): [Project!]!
		project(projectId: ID!): Project
		tasks(projectId: ID!): [Task]
		me: User
	}

	type Mutation {
		addProject(projectTitle: String!): Project
		addTask(
			task: String!
			projectId: ID!
			taskDescription: String!
			columnId: String!
		): Task
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		removeProject(projectId: ID!): Project
	}
`;

module.exports = typeDefs;
