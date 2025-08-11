import apiService from '../../utils/api';

interface PoetryItem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string;
  tags: string[];
  grade: string;
}

Page({
  data: {
    selectedGrade: 'primary',
    poetryList: [] as PoetryItem[],
    hasMore: true,
    page: 1,
    loading: false
  },

  onLoad() {
    this.loadPoetryList();
  },

  selectGrade(e: any) {
    const grade = e.currentTarget.dataset.grade;
    this.setData({
      selectedGrade: grade,
      poetryList: [],
      page: 1,
      hasMore: true
    });
    this.loadPoetryList();
  },

  async loadPoetryList() {
    try {
      this.setData({ loading: true });
      
      const response = await apiService.getPoetryList({
        page: this.data.page,
        limit: 20,
        grade: this.data.selectedGrade,
        type: 'classic'
      });
      
      if (response.success) {
        const newList = this.data.page === 1 ? response.data.list : [...this.data.poetryList, ...response.data.list];
        
        this.setData({
          poetryList: newList,
          hasMore: response.data.pagination.page < response.data.pagination.pages,
          loading: false
        });
      } else {
        wx.showToast({
          title: response.message || '获取诗词列表失败',
          icon: 'none'
        });
        this.setData({ loading: false });
      }
    } catch (error) {
      console.error('获取诗词列表失败:', error);
      wx.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  async loadMore() {
    if (this.data.loading || !this.data.hasMore) {
      return;
    }
    
    this.setData({
      page: this.data.page + 1
    });
    
    await this.loadPoetryList();
  },

  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=classic`
    });
  }
});
