Server Setup:
We first import the Express module and create an Express application instance (app).


Flow Summary:
When a GET request is made to the /positive endpoint, it first goes through the positiveIntegerHandler middleware.

If the request parameter number is a positive integer, it sends a success response.

If the parameter is not a positive integer, it triggers an error by passing an error object to the next middleware.

The error handling middleware then catches this error, extracts the status code (set as 400), and sends an appropriate error response.

Finally, the server continues to listen for incoming requests until it is stopped.
