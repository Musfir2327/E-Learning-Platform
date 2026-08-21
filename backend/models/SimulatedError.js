import mongoose from 'mongoose';

const simulatedErrorSchema = new mongoose.Schema({
  errorType: { type: String, required: true, unique: true }, // e.g. 'CORS_ERROR', '500_ERROR', 'MONGO_CONNECTION_ERROR'
  title: { type: String, required: true },
  layer: { type: String, required: true }, // Browser, React Frontend, REST API, Express Server, MongoDB
  message: { type: String, required: true },
  consoleOutput: { type: String, required: true },
  solutionSteps: { type: [String], required: true },
  solution: { type: String, required: true }
}, {
  timestamps: true
});

const SimulatedError = mongoose.model('SimulatedError', simulatedErrorSchema);
export default SimulatedError;
