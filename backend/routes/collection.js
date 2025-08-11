const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// 获取用户收藏列表
router.get('/list', async (req, res) => {
  try {
    const { userId, page = 1, limit = 20 } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: '用户ID不能为空'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const collections = await Collection.find({ userId })
      .populate('poetryId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Collection.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        list: collections,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取收藏列表失败'
    });
  }
});

// 添加收藏
router.post('/add', async (req, res) => {
  try {
    const { userId, poetryId } = req.body;

    if (!userId || !poetryId) {
      return res.status(400).json({
        success: false,
        message: '用户ID和诗词ID不能为空'
      });
    }

    // 检查是否已收藏
    const existingCollection = await Collection.findOne({ userId, poetryId });
    
    if (existingCollection) {
      return res.status(400).json({
        success: false,
        message: '该诗词已收藏'
      });
    }

    const collection = new Collection({
      userId,
      poetryId
    });

    await collection.save();

    res.json({
      success: true,
      message: '收藏成功',
      data: collection
    });
  } catch (error) {
    console.error('添加收藏失败:', error);
    res.status(500).json({
      success: false,
      message: '添加收藏失败'
    });
  }
});

// 取消收藏
router.delete('/remove', async (req, res) => {
  try {
    const { userId, poetryId } = req.query;

    if (!userId || !poetryId) {
      return res.status(400).json({
        success: false,
        message: '用户ID和诗词ID不能为空'
      });
    }

    const result = await Collection.deleteOne({ userId, poetryId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: '收藏记录不存在'
      });
    }

    res.json({
      success: true,
      message: '取消收藏成功'
    });
  } catch (error) {
    console.error('取消收藏失败:', error);
    res.status(500).json({
      success: false,
      message: '取消收藏失败'
    });
  }
});

// 检查是否已收藏
router.get('/check', async (req, res) => {
  try {
    const { userId, poetryId } = req.query;

    if (!userId || !poetryId) {
      return res.status(400).json({
        success: false,
        message: '用户ID和诗词ID不能为空'
      });
    }

    const collection = await Collection.findOne({ userId, poetryId });

    res.json({
      success: true,
      data: {
        isCollected: !!collection
      }
    });
  } catch (error) {
    console.error('检查收藏状态失败:', error);
    res.status(500).json({
      success: false,
      message: '检查收藏状态失败'
    });
  }
});

// 获取收藏数量
router.get('/count', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: '用户ID不能为空'
      });
    }

    const count = await Collection.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        count
      }
    });
  } catch (error) {
    console.error('获取收藏数量失败:', error);
    res.status(500).json({
      success: false,
      message: '获取收藏数量失败'
    });
  }
});

module.exports = router;
