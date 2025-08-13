import apiService from '../../utils/api';

interface TangPoetryItem {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  grade: string;
  length: number;
  dynasty?: string;
  type?: string;
}

Page({
  data: {
    selectedGrade: 'primary',
    searchKeyword: '',
    poetryList: [] as TangPoetryItem[],
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

  onSearchInput(e: any) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  search() {
    this.setData({
      poetryList: [],
      page: 1,
      hasMore: true
    });
    this.loadPoetryList();
  },

  async loadPoetryList() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    try {
      const params: any = {
        page: this.data.page,
        limit: 20,
        grade: this.data.selectedGrade,
        type: 'tangshi'
      };
      
      // 如果有搜索关键词，使用搜索接口
      if (this.data.searchKeyword) {
        const response = await apiService.searchPoetry(this.data.searchKeyword, this.data.page, 20);
        if (response.success) {
          const newList = response.data.list.filter((item: any) => 
            item.grade === this.data.selectedGrade && item.type === 'tangshi'
          );
          
          this.setData({
            poetryList: this.data.page === 1 ? newList : [...this.data.poetryList, ...newList],
            hasMore: response.data.pagination.page < response.data.pagination.pages,
            loading: false
          });
        } else {
          wx.showToast({
            title: response.message || '搜索失败',
            icon: 'none'
          });
        }
      } else {
        // 使用列表接口
        const response = await apiService.getPoetryList(params);
        if (response.success) {
          this.setData({
            poetryList: this.data.page === 1 ? response.data.list : [...this.data.poetryList, ...response.data.list],
            hasMore: response.data.pagination.page < response.data.pagination.pages,
            loading: false
          });
        } else {
          wx.showToast({
            title: response.message || '获取数据失败',
            icon: 'none'
          });
        }
      }
    } catch (error) {
      console.error('加载唐诗列表失败:', error);
      wx.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },

  async loadMore() {
    if (!this.data.hasMore || this.data.loading) return;
    
    this.setData({
      page: this.data.page + 1
    });
    
    await this.loadPoetryList();
  },

  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=tangshi`
    });
  }
});
