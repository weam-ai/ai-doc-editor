import mongoose from 'mongoose';

const ChatHistorySchema = new mongoose.Schema({
  documentId: {
    type: String,
    required: true,
  },
  user: {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  companyId: {
    type: String,
  },
  messages: [{
    type: {
      type: String,
      enum: ['user'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ChatHistorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Clear any existing model to ensure we use the new collection name
if (mongoose.models.ChatHistory) {
  delete mongoose.models.ChatHistory;
}

export default mongoose.model('ChatHistory', ChatHistorySchema, 'solution_aidocs_chat_history');
