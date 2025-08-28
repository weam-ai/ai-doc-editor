import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  contentHtml: {
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
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  },
  templateName: {
    type: String,
  },
  editor: {
    type: String,
    enum: ['html', 'rich-text', 'markdown', 'annual-report', 'two-column'],
    default: 'rich-text'
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
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

DocumentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
