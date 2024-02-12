import express from 'express';
import { rateLimit } from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter);

app.get('/', (req, res)=>{
    res.send("Hello World!");
});

const port=3000;
app.listen(port, ()=>{
    console.log(`ExpressJS Server running on port ${port}`);
});

