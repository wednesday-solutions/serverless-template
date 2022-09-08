# serverless-template-todo

This is serverless template. This will help you get started with serverless architecture.

# Lambda Builder

Build a handler for your lambda with a set of basic middy middlewares.

## Usage
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

# Lambda Closer

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

## Usage

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

Object.is(response, {
	statusCode: 200,
	body: {
		data: {...},
		message: 'response message'
	},
}); // true
```

#### 201

```javascript
const response = new LambdaCloser({
	data: {...},
	message: 'response message'
}).created();

Object.is(response, {
	statusCode: 201,
	body: {
		data: {...},
		message: 'response message'
	},
}); // true
```

### The LambdaCloser promotes usage of predefined error codes and error code messages.

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

Object.is(response, {
	statusCode: 400,
	body: {
		message: 'Custom error message',
		code: 'E1',
	},
}); // true
```
