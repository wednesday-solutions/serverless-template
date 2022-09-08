import Queue from '@aws/sqs-client';

class TodoQueue extends Queue {
	constructor() {
		super({
			endpoint:
				'https://sqs.ap-south-1.amazonaws.com/172840532362/local_todo.fifo',
		});
	}

	enqueu(todo) {
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
