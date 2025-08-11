const express = require('express');
const router = express.Router();
const Poetry = require('../models/Poetry');

// 获取诗词列表
router.get('/list', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      grade, 
      type, 
      keyword,
      author,
      dynasty 
    } = req.query;

    const query = {};

    // 按年级筛选
    if (grade) {
      query.grade = grade;
    }

    // 按类型筛选
    if (type) {
      query.type = type;
    }

    // 按作者筛选
    if (author) {
      query.author = new RegExp(author, 'i');
    }

    // 按朝代筛选
    if (dynasty) {
      query.dynasty = new RegExp(dynasty, 'i');
    }

    // 关键词搜索
    if (keyword) {
      query.$text = { $search: keyword };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const poetryList = await Poetry.find(query)
      .select('-contentLines -analysis -translation -authorInfo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Poetry.countDocuments(query);

    res.json({
      success: true,
      data: {
        list: poetryList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('获取诗词列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取诗词列表失败'
    });
  }
});

// 获取诗词详情
router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const poetry = await Poetry.findOne({ id });
    
    if (!poetry) {
      return res.status(404).json({
        success: false,
        message: '诗词不存在'
      });
    }

    res.json({
      success: true,
      data: poetry
    });
  } catch (error) {
    console.error('获取诗词详情失败:', error);
    res.status(500).json({
      success: false,
      message: '获取诗词详情失败'
    });
  }
});

// 搜索诗词
router.get('/search', async (req, res) => {
  try {
    const { keyword, page = 1, limit = 20 } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '搜索关键词不能为空'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const poetryList = await Poetry.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } }
    )
    .select('-contentLines -analysis -translation -authorInfo')
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Poetry.countDocuments({ $text: { $search: keyword } });

    res.json({
      success: true,
      data: {
        list: poetryList,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    console.error('搜索诗词失败:', error);
    res.status(500).json({
      success: false,
      message: '搜索诗词失败'
    });
  }
});

// 获取推荐诗词
router.get('/recommend', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const poetryList = await Poetry.aggregate([
      { $sample: { size: parseInt(limit) } },
      { $project: { contentLines: 0, analysis: 0, translation: 0, authorInfo: 0 } }
    ]);

    res.json({
      success: true,
      data: poetryList
    });
  } catch (error) {
    console.error('获取推荐诗词失败:', error);
    res.status(500).json({
      success: false,
      message: '获取推荐诗词失败'
    });
  }
});

// 获取作者列表
router.get('/authors', async (req, res) => {
  try {
    const { dynasty } = req.query;
    
    const query = {};
    if (dynasty) {
      query.dynasty = new RegExp(dynasty, 'i');
    }

    const authors = await Poetry.distinct('author', query);
    
    res.json({
      success: true,
      data: authors
    });
  } catch (error) {
    console.error('获取作者列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取作者列表失败'
    });
  }
});

// 获取朝代列表
router.get('/dynasties', async (req, res) => {
  try {
    const dynasties = await Poetry.distinct('dynasty');
    
    res.json({
      success: true,
      data: dynasties
    });
  } catch (error) {
    console.error('获取朝代列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取朝代列表失败'
    });
  }
});

// 获取标签列表
router.get('/tags', async (req, res) => {
  try {
    const tags = await Poetry.distinct('tags');
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('获取标签列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取标签列表失败'
    });
  }
});

module.exports = router;
