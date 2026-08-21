import mongoose from 'mongoose';

const debugHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rawError: { type: String, required: true },
  codeSnippet: { type: String, default: '' },
  layerAnalyzed: { type: String, required: true },
  aiExplanation: { type: String, required: true },
  severity: { type: String, required: true },
  rootCause: { type: String, required: true },
  stepByStepFix: { type: String, required: true },
  preventionTips: { type: String, required: true },
  beginnerExplanation: { type: String, required: true },
  resolved: { type: Boolean, default: false }
}, {
  timestamps: true
});

const DebugHistory = mongoose.model('DebugHistory', debugHistorySchema);
export default DebugHistory;
