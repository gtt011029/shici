interface SongYuanItem {
  id: string;
  title: string;
  author: string;
  tune: string;
  content: string;
  tags: string[];
  grade: string;
  type: 'songci' | 'yuanqu';
}

Page({
  data: {
    selectedType: 'songci',
    selectedGrade: 'primary',
    poetryList: [] as SongYuanItem[],
    hasMore: true,
    page: 1
  },

  onLoad() {
    this.loadPoetryList();
  },

  selectType(e: any) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type,
      poetryList: [],
      page: 1,
      hasMore: true
    });
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

  loadPoetryList() {
    // 模拟宋词元曲数据
    const mockData: SongYuanItem[] = [
      {
        id: '1',
        title: '水调歌头·明月几时有',
        author: '苏轼',
        tune: '水调歌头',
        content: '明月几时有，把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。',
        tags: ['思乡', '月亮', '哲理'],
        grade: 'middle',
        type: 'songci'
      },
      {
        id: '2',
        title: '如梦令·昨夜雨疏风骤',
        author: '李清照',
        tune: '如梦令',
        content: '昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。',
        tags: ['春天', '惜花', '闺怨'],
        grade: 'middle',
        type: 'songci'
      },
      {
        id: '3',
        title: '声声慢·寻寻觅觅',
        author: '李清照',
        tune: '声声慢',
        content: '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急？雁过也，正伤心，却是旧时相识。',
        tags: ['悲愁', '思夫', '孤独'],
        grade: 'high',
        type: 'songci'
      },
      {
        id: '4',
        title: '天净沙·秋思',
        author: '马致远',
        tune: '天净沙',
        content: '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。夕阳西下，断肠人在天涯。',
        tags: ['思乡', '秋天', '孤独'],
        grade: 'middle',
        type: 'yuanqu'
      },
      {
        id: '5',
        title: '山坡羊·潼关怀古',
        author: '张养浩',
        tune: '山坡羊',
        content: '峰峦如聚，波涛如怒，山河表里潼关路。望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。兴，百姓苦；亡，百姓苦。',
        tags: ['怀古', '民生', '历史'],
        grade: 'high',
        type: 'yuanqu'
      },
      {
        id: '6',
        title: '卜算子·咏梅',
        author: '陆游',
        tune: '卜算子',
        content: '驿外断桥边，寂寞开无主。已是黄昏独自愁，更著风和雨。无意苦争春，一任群芳妒。零落成泥碾作尘，只有香如故。',
        tags: ['梅花', '品格', '坚韧'],
        grade: 'high',
        type: 'songci'
      }
    ];

    // 根据类型和年级筛选数据
    const filteredData = mockData.filter(item => 
      item.type === this.data.selectedType && 
      item.grade === this.data.selectedGrade
    );
    
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
      url: `/pages/detail/detail?id=${id}&type=${this.data.selectedType}`
    });
  }
});
