export const StarterFunctionSuccessMessage = 'Hey Lambda !';

export const CREATE_TODO_MOCK = {
	message: 'created',
	data: {
		title: 'Hi',
		description: 'Xyz',
		uuid: 'eddcb56e-8b25-4120-b2f6-ad52719351ef',
	},
};

export const GET_TODO_MOCK = {
	message: 'All todos for a user are',
	data: [
		{
			id: 1,
			uuid: '586ffd16-cd7b-441c-b7e1-1b2537750f48',
			title: 'HDD',
			description:
				'Soluta quis incidunt labore dignissimos. Voluptas earum qui dicta consectetur animi. Officiis libero voluptates voluptatem quidem.',
			createdAt: '2023-03-15T17:55:40.000Z',
			updatedAt: '2023-03-15T17:55:40.000Z',
		},
	],
};
export const DELETE_TODO_MOCK = {
	message: 'deleted',
	data: 1,
};

export const UPDATE_TODO_MOCK = {
	message: 'updated',
	data: [1],
};

export const CREATE_USER_MOCK = {
	message: 'User Created',
	data: {
		uuid: 'c0487589-0abe-4545-aeb6-ab8f53d56a97',
		name: 'Myrtice',
	},
};

export const GET_USER_MOCK = {
	message: 'user found',
	data: {
		id: 1,
		name: 'Georgette',
		uuid: '586ffd16-cd7b-441c-b7e1-1b2537750f48',
		createdAt: '2023-03-15T17:55:36.000Z',
		updatedAt: '2023-03-15T17:55:36.000Z',
	},
};
