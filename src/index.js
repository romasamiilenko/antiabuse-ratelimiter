// rateLimit.js

class RateLimit {
  constructor(options) {
    this.limit = options.limit || 10; // Default limit: 10 requests
    this.interval = options.interval || 60 * 1000; // Default interval: 1 minute (in milliseconds)
    this.requests = {}; // Store requests with timestamps
  }

  // Check if the given IP address has exceeded the rate limit
  checkLimit(ip) {
    const now = Date.now();
    const recentRequests = this.requests[ip] || [];
    // Remove requests that are older than the interval
    this.requests[ip] = recentRequests.filter(request => now - request < this.interval);
    return recentRequests.length >= this.limit;
  }

  // Middleware function to be used in Express.js
  middleware() {
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;
      if (this.checkLimit(ip)) {
        res.status(429).send('Too Many Requests');
      } else {
        this.requests[ip].push(Date.now());
        next();
      }
    };
  }
}

module.exports = RateLimit;
