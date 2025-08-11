const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  poetryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poetry',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 创建复合索引，确保用户不能重复收藏同一首诗词
collectionSchema.index({ userId: 1, poetryId: 1 }, { unique: true });

module.exports = mongoose.model('Collection', collectionSchema);
