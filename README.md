# serverless-template-todo

This is serverless template. This will help you get started with serverless architecture.

# Architecture

We follow [clean code](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).


```
.
└── src/
	├── drivers
	│   └── models
    ├── entities
    ├── interface-adaptors
    └── use-cases
```

## drivers
- Layer #1 for frameworks and drivers.
- This example uses Sequelize, Model definitions are written in this folder
- AWS SDK client creation should be done in this folder

## interface-adaptors
- Layer #2 for adaptors that sit in between your drivers and the business logic.
- Write your DAOs here 
- do not use Models or SDK directly

<blockquote cite="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html"> 
The software in this layer is a set of adapters that convert data from the format most convenient for the use cases and entities, to the format most convenient for some external agency such as the Database or the Web. 
</blockquote>

## use-cases
- Layer #3, for your business logic.

## entities
- Layer #4, your base entities
- use entites to ensure consistency

<br>

# Development

## Local DB setup

To setup up the database locally run<sup>\*</sup>:

```sh
pnpm local:db:up
```

- requires docker

## Creating Models

To create a new Model Test with name of type string, run:

```sh
pnpm model:generate --name Test --attributes name:string
```

## Running migrations

To run migrations, run:

```sh
pnpm db:migrate
```

## Lambda Builder

Build a handler for your lambda with a set of basic middy middlewares.

### Usage

Create a new handler with the basic middlewares

```javascript
// index.js

const baseHandler = (event, context) => {
	// write logic here
};

export const handler = new LambdaBuilder(baseHandler)
	.buildBasicMiddlewares()
	.getLambdaHandler();
```

## Lambda Closer

If you are using the APIGateway, this Class will help you construct success and error responses.

APIGateway expectes the following response signatures.

### Success

```javascript
{
	...
	statusCode: 2XX,
	body: {...}
	...
}
```

### Error

```javascript
{
	...
	statusCode: 4XX, // or 5XX
	body: {...}
}
```

### Usage

### Close the handler with statusCode and body

```javascript
const baseHandler = (event, context) => {
	return new LambdaCloser(data).ok();
};
```

#### 200

```javascript
const response = new LambdaCloser({
	data: {...},
	message: 'response message'
}).ok();

expect(response).toEqual({
	statusCode: 200,
	body: {
		data: {...},
		message: 'response message'
	},
}); //true
```

#### 201

```javascript
const response = new LambdaCloser({
	data: {...},
	message: 'response message'
}).created();

expect(response).toEqual({
	statusCode: 201,
	body: {
		data: {...},
		message: 'response message'
	},
}); // true
```

### Predefined Error codes and messages

The LambdaCloser promotes usage of predefined error codes and error code messages.

Define your error code in utils/error-code.js and add a message for the code in utils/error-code-messages.js

#### 400

```javascript
// create an error code in error-codes.js
const ERROR_CODES = {
	E1: 'E1',
};

// create an error code message for the code in error-code-messages.js
const ERROR_CODE_MESSAGES = {
	E1: 'Custom error message',
};

const response = new LambdaCloser({
	code: 'E1',
}).badRequest();

expect(response).toEqual({
	statusCode: 400,
	body: {
		message: 'Custom error message',
		code: 'E1',
	},
}); // true
```
