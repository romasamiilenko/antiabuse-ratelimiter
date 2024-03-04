# antiabuse-ratelimiter

A simple rate limiting package for Node.js applications designed to prevent abuse and ensure fair usage of resources.

## Installation

You can install the package via npm:

```bash
npm install antiabuse-ratelimiter
```

## Usage

### Initializing Rate Limiter

```javascript
const RateLimiter = require('antiabuse-ratelimiter');

const rateLimiter = new RateLimiter({
  limit: 10, // Allow 10 requests
  interval: 60 * 1000 // per minute
});
```

### Applying Rate Limiting Middleware in Express.js

```javascript
const express = require('express');
const app = express();

app.use(rateLimiter.middleware());

// Your routes and other middleware...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## Configuration Options

The `RateLimiter` constructor accepts an options object with the following properties:

- `limit`: The maximum number of requests allowed within the specified interval (default: `10`).
- `interval`: The interval (in milliseconds) during which the requests are counted (default: `60000` milliseconds or 1 minute).

## License

This package is open source and available under the [MIT License](LICENSE).
