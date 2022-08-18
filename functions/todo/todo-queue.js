import Queue from '@aws/sqs-client';

class TodoQueue extends Queue {
	enqueuTodo(todo) {
		return this.enqueue({
			MessageBody: JSON.stringify(todo),
			MessageGroupId: 1,
		});
	}

	listTodos() {
		return this.dequeue();
	}
}

export default TodoQueue;
