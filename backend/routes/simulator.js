import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const errorsLookup = {
  CORS_ERROR: {
    errorType: 'CORS_ERROR',
    title: 'Cross-Origin Resource Sharing (CORS) Block',
    layer: 'REST API',
    message: "Access to fetch at 'http://localhost:5001/api/courses' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    consoleOutput: `Fetch API Error:\nTypeError: Failed to fetch\n  at fetchCourses (App.tsx:30:17)\n  at useEffect (App.tsx:66:5)\nCross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:5001/api/courses. (Reason: CORS header 'Access-Control-Allow-Origin' missing).`,
    solutionSteps: [
      '1. Open backend/server.js',
      "2. Install and import cors package: import cors from 'cors';",
      "3. Register middleware: app.use(cors({ origin: 'http://localhost:5173' })); before routes.",
      '4. Restart backend server.'
    ],
    solution: "CORS blocks occur when a frontend domain (e.g. localhost:5173) makes an HTTP request to a backend domain (e.g. localhost:5001) that has not explicitly authorized it. Solve this by registering the `cors` middleware in Express."
  },
  MONGO_CONNECTION_ERROR: {
    errorType: 'MONGO_CONNECTION_ERROR',
    title: 'MongoDB Connection Fail / Connection Timeout',
    layer: 'MongoDB',
    message: 'MongooseServerSelectionError: connection timed out. Could not connect to any servers in your MongoDB URI. Confirm database instance is active.',
    consoleOutput: `MongooseServerSelectionError: connection timed out after 30000ms\n    at Connection.openUri (node_modules/mongoose/lib/connection.js:827:32)\n    at async connectDB (backend/config/db.js:5:18)\n  code: 'ETIMEDOUT',\n  reason: TopologyDescription { type: 'Unknown', servers: Map(1) { 'localhost:27017' => [ServerDescription] } }`,
    solutionSteps: [
      '1. Check if MongoDB daemon is running locally (run: brew services start mongodb-community or net start MongoDB).',
      '2. Verify database connection URI in backend/.env (e.g., MONGO_URI=mongodb://127.0.0.1:27017/learnhub).',
      '3. Ensure your local IP address is whitelisted in MongoDB Atlas Network Security access list if hosting in the cloud.'
    ],
    solution: "MongoDB Connection timeouts happen when the driver fails to establish a socket connection with the MongoDB instance. Check that the MongoDB service is active, running, and listening on the designated port (27017)."
  },
  JWT_ERROR: {
    errorType: 'JWT_ERROR',
    title: 'Expired / Invalid JWT Authentication Token',
    layer: 'Express Server',
    message: 'JsonWebTokenError: invalid signature. Access token verification failed. The provided JWT signature does not match the server secret.',
    consoleOutput: `Unauthorized Request:\nJsonWebTokenError: invalid signature\n    at verifyToken (middleware/auth.js:14:19)\n    at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)\n    at next (node_modules/express/lib/router/route.js:144:13)`,
    solutionSteps: [
      '1. Confirm JWT_SECRET key matches exactly between creation (auth.js route) and validation (auth.js middleware).',
      '2. Check if the token has expired (expiresIn expiration parameter was reached).',
      '3. Ensure client fetches and sends the token with the exact prefix format: Bearer <token_string>.'
    ],
    solution: "Authentication middleware verifies that the token payload signature matches the local JWT_SECRET key. If the signature fails, it indicates an invalid key configuration or tampered client-side cookie/header."
  },
  VALIDATION_ERROR: {
    errorType: 'VALIDATION_ERROR',
    title: 'Mongoose Schema Validation Fail',
    layer: 'MongoDB',
    message: 'ValidationError: User validation failed: email: Path `email` is required, password: Path `password` is shorter than the minimum allowed length (6).',
    consoleOutput: `MongooseValidationError: User validation failed:\n  email: Path \`email\` is required. (value: undefined)\n  password: Path \`password\` (1) is shorter than minimum allowed length (6).\n    at Document.validate (node_modules/mongoose/lib/document.js:3012:19)`,
    solutionSteps: [
      '1. Review Mongoose Model schema constraints (e.g., models/User.js).',
      '2. Ensure user request request-body contains all required fields with proper types.',
      '3. Add frontend form validations to intercept empty inputs before requesting backend routes.'
    ],
    solution: "Validation errors occur when the schema rules (e.g., required: true, minlength: 6) are violated during document creation/updation. Confirm that request parameters are formatted correctly before saving."
  },
  HTTP_404_ERROR: {
    errorType: 'HTTP_404_ERROR',
    title: 'HTTP 404 Endpoint Not Found',
    layer: 'REST API',
    message: "Cannot GET /api/courses-invalid-endpoint. The requested REST endpoint does not map to any registered route handlers on the Express router.",
    consoleOutput: `HTTP/1.1 404 Not Found\nContent-Type: html/text\nContent-Length: 35\nError Code: CANNOT_GET\nResponse body: "Cannot GET /api/courses-invalid-endpoint"`,
    solutionSteps: [
      '1. Open backend/server.js and verify correct router path registration: app.use(\'/api/courses\', courseRoutes).',
      '2. Double-check router file and confirm exact route bindings: router.get(\'/\', callback).',
      '3. Verify frontend URL endpoint matches the server path exactly.'
    ],
    solution: "A 404 Error is returned when the routing tree of Express fails to find a matcher. Verify HTTP methods (GET/POST) and URL spelling match exactly."
  },
  HTTP_500_ERROR: {
    errorType: 'HTTP_500_ERROR',
    title: 'HTTP 500 Internal Server Crash',
    layer: 'Express Server',
    message: 'TypeError: Cannot read properties of undefined (reading \'password\'). Server crashed due to unhandled exceptions.',
    consoleOutput: `TypeError: Cannot read properties of undefined (reading 'password')\n    at routes/auth.js:52:43\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n[nodemon] app crashed - waiting for file changes...`,
    solutionSteps: [
      '1. Identify the crashed line in backend logs (e.g., lines inside routes/auth.js).',
      '2. Add optional chaining (?.) or parameter verification logic (e.g., if (!req.body) ...).',
      '3. Wrap database / async logic inside try-catch blocks to prevent unhandled app terminations.'
    ],
    solution: "A 500 error represents a crash in the execution logic. Ensure all input properties are checked before access, and encapsulate operations inside try-catch blocks."
  },
  NETWORK_TIMEOUT: {
    errorType: 'NETWORK_TIMEOUT',
    title: 'Network Gateway / Server Connection Timeout',
    layer: 'Browser',
    message: 'AxiosError: timeout of 5000ms exceeded. The client application timed out waiting for the server to reply.',
    consoleOutput: `AxiosError: timeout of 5000ms exceeded\n  at createError (axios/lib/core/createError.js:16:15)\n  at handleTimeout (axios/lib/adapters/xhr.js:98:9)\n  code: 'ECONNABORTED'`,
    solutionSteps: [
      '1. Verify the server is active, listening on port 5001, and not blocked by a local firewall.',
      '2. Check if a database query is taking too long to resolve (missing index or database deadlocks).',
      '3. Increase the timeout limit threshold on the Axios instance config.'
    ],
    solution: "Connection timeouts occur when the request is sent but the target server fails to write a response stream within the client's timeout threshold limit."
  }
};

// @desc    Simulate full-stack error log
// @route   POST /api/simulator/trigger
// @access  Private
router.post('/trigger', protect, async (req, res) => {
  const { errorType } = req.body;

  if (!errorType || !errorsLookup[errorType]) {
    return res.status(400).json({ message: 'Valid errorType is required' });
  }

  // Increment solves counter on simulation trigger to engage XP
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp += 10;
      await user.save();
    }
  } catch (err) {
    // Ignore db save issue on simulation
  }

  res.json(errorsLookup[errorType]);
});

export default router;
