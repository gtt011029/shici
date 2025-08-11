import apiService from '../../utils/api';

interface PoetryDetail {
  id: string;
  title: string;
  author: string;
  dynasty?: string;
  tune?: string;
  content: string;
  contentLines: string[];
  tags: string[];
  analysis: string;
  translation?: string;
  authorInfo?: string;
}

Page({
  data: {
    poetry: {} as PoetryDetail,
    isCollected: false,
    loading: true
  },

  onLoad(options: any) {
    const { id, type } = options;
    this.loadPoetryDetail(id, type);
    this.checkCollectionStatus(id);
  },

  async loadPoetryDetail(id: string, type: string) {
    try {
      this.setData({ loading: true });
      const response = await apiService.getPoetryDetail(id);
      
      if (response.success) {
        this.setData({ 
          poetry: response.data,
          loading: false 
        });
      } else {
        wx.showToast({
          title: response.message || '获取诗词详情失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    } catch (error) {
      console.error('获取诗词详情失败:', error);
      wx.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  checkCollectionStatus(id: string) {
    // 检查收藏状态
    const collections = wx.getStorageSync('collections') || [];
    const isCollected = collections.includes(id);
    this.setData({ isCollected });
  },

  toggleCollect() {
    const { poetry, isCollected } = this.data;
    let collections = wx.getStorageSync('collections') || [];
    
    if (isCollected) {
      collections = collections.filter((id: string) => id !== poetry.id);
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    } else {
      collections.push(poetry.id);
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
      });
    }
    
    wx.setStorageSync('collections', collections);
    this.setData({ isCollected: !isCollected });
  },

  sharePoetry() {
    const { poetry } = this.data;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  startRecite() {
    const { poetry } = this.data;
    wx.showModal({
      title: '朗读功能',
      content: '朗读功能正在开发中，敬请期待！',
      showCancel: false
    });
  },

  onShareAppMessage() {
    const { poetry } = this.data;
    return {
      title: `${poetry.title} - ${poetry.author}`,
      path: `/pages/detail/detail?id=${poetry.id}&type=classic`
    };
  }
});
