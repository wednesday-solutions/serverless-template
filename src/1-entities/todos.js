/**
 *
 * A way to create an entity
 *
 * a constructor class or a function
 *
 * this will not change.
 *
 * We'll decide what a todo entity will contain.
 */

export default class Todo {
	constructor({ title, description, createdAt, updatedAt, deletedAt }) {
		this.title = title;
		this.description = description;
	}
}
