// 诗词数据处理工具函数

export interface PoetryItem {
  id: string;
  title: string;
  author: string;
  dynasty?: string;
  tune?: string;
  content: string;
  tags: string[];
  grade: string;
  type?: 'classic' | 'tangshi' | 'songci' | 'yuanqu';
  length?: number;
}

export interface PoetryDetail extends PoetryItem {
  contentLines: string[];
  analysis: string;
  translation?: string;
  authorInfo?: string;
}

// 将诗词内容按句分割
export function splitContent(content: string): string[] {
  return content.split(/[。！？]/).filter(line => line.trim());
}

// 获取诗词字数
export function getContentLength(content: string): number {
  return content.replace(/[，。！？、]/g, '').length;
}

// 格式化年级显示
export function formatGrade(grade: string): string {
  const gradeMap: { [key: string]: string } = {
    'primary': '小学',
    'middle': '中学',
    'high': '高中'
  };
  return gradeMap[grade] || grade;
}

// 格式化类型显示
export function formatType(type: string): string {
  const typeMap: { [key: string]: string } = {
    'classic': '经典古诗词',
    'tangshi': '唐诗',
    'songci': '宋词',
    'yuanqu': '元曲'
  };
  return typeMap[type] || type;
}

// 搜索诗词
export function searchPoetry(poetryList: PoetryItem[], keyword: string): PoetryItem[] {
  if (!keyword.trim()) return poetryList;
  
  return poetryList.filter(item => 
    item.title.includes(keyword) ||
    item.author.includes(keyword) ||
    item.content.includes(keyword) ||
    item.tags.some(tag => tag.includes(keyword))
  );
}

// 按年级筛选
export function filterByGrade(poetryList: PoetryItem[], grade: string): PoetryItem[] {
  return poetryList.filter(item => item.grade === grade);
}

// 按类型筛选
export function filterByType(poetryList: PoetryItem[], type: string): PoetryItem[] {
  return poetryList.filter(item => item.type === type);
}

// 收藏相关操作
export function addToCollection(poetryId: string): void {
  const collections = wx.getStorageSync('collections') || [];
  if (!collections.includes(poetryId)) {
    collections.push(poetryId);
    wx.setStorageSync('collections', collections);
  }
}

export function removeFromCollection(poetryId: string): void {
  let collections = wx.getStorageSync('collections') || [];
  collections = collections.filter((id: string) => id !== poetryId);
  wx.setStorageSync('collections', collections);
}

export function isCollected(poetryId: string): boolean {
  const collections = wx.getStorageSync('collections') || [];
  return collections.includes(poetryId);
}

export function getCollections(): string[] {
  return wx.getStorageSync('collections') || [];
}
