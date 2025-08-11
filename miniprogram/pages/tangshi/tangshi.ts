interface TangPoetryItem {
  id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  grade: string;
  length: number;
}

Page({
  data: {
    selectedGrade: 'primary',
    searchKeyword: '',
    poetryList: [] as TangPoetryItem[],
    hasMore: true,
    page: 1
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

  loadPoetryList() {
    // 模拟唐诗数据
    const mockData: TangPoetryItem[] = [
      {
        id: '1',
        title: '静夜思',
        author: '李白',
        content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
        tags: ['思乡', '月亮', '夜晚'],
        grade: 'primary',
        length: 20
      },
      {
        id: '2',
        title: '春晓',
        author: '孟浩然',
        content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
        tags: ['春天', '自然', '鸟鸣'],
        grade: 'primary',
        length: 20
      },
      {
        id: '3',
        title: '登鹳雀楼',
        author: '王之涣',
        content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
        tags: ['登高', '壮志', '黄河'],
        grade: 'middle',
        length: 20
      },
      {
        id: '4',
        title: '望庐山瀑布',
        author: '李白',
        content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。',
        tags: ['瀑布', '壮观', '庐山'],
        grade: 'middle',
        length: 28
      },
      {
        id: '5',
        title: '将进酒',
        author: '李白',
        content: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。',
        tags: ['豪放', '人生', '饮酒'],
        grade: 'high',
        length: 56
      },
      {
        id: '6',
        title: '长恨歌',
        author: '白居易',
        content: '汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。',
        tags: ['爱情', '宫廷', '悲剧'],
        grade: 'high',
        length: 40
      }
    ];

    // 根据年级和搜索关键词筛选数据
    let filteredData = mockData.filter(item => item.grade === this.data.selectedGrade);
    
    if (this.data.searchKeyword) {
      filteredData = filteredData.filter(item => 
        item.title.includes(this.data.searchKeyword) ||
        item.author.includes(this.data.searchKeyword) ||
        item.content.includes(this.data.searchKeyword) ||
        item.tags.some(tag => tag.includes(this.data.searchKeyword))
      );
    }
    
    this.setData({
      poetryList: filteredData,
      hasMore: false
    });
  },

  loadMore() {
    wx.showToast({
      title: '暂无更多数据',
      icon: 'none'
    });
  },

  goToDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&type=tangshi`
    });
  }
});
