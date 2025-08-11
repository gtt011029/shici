const mongoose = require('mongoose');

const poetrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  author: {
    type: String,
    required: true,
    index: true
  },
  dynasty: {
    type: String,
    required: true
  },
  tune: {
    type: String
  },
  content: {
    type: String,
    required: true,
    index: true
  },
  contentLines: [{
    type: String
  }],
  tags: [{
    type: String,
    index: true
  }],
  grade: {
    type: String,
    enum: ['primary', 'middle', 'high'],
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['classic', 'tangshi', 'songci', 'yuanqu'],
    required: true,
    index: true
  },
  length: {
    type: Number
  },
  analysis: {
    type: String,
    required: true
  },
  translation: {
    type: String
  },
  authorInfo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时自动更新updatedAt字段
poetrySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 创建索引
poetrySchema.index({ title: 'text', author: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Poetry', poetrySchema);
