// API服务工具类
const BASE_URL = 'http://localhost:3000/api';

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginationData<T = any> {
  list: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  // 通用请求方法
  private async request<T>(url: string, options: any = {}): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}${url}`,
        method: options.method || 'GET',
        data: options.data,
        header: {
          'Content-Type': 'application/json',
          ...options.header
        },
        success: (res: any) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(res.data?.message || '请求失败'));
          }
        },
        fail: (error) => {
          reject(new Error('网络请求失败'));
        }
      });
    });
  }

  // 获取诗词列表
  async getPoetryList(params: {
    page?: number;
    limit?: number;
    grade?: string;
    type?: string;
    keyword?: string;
    author?: string;
    dynasty?: string;
  } = {}): Promise<ApiResponse<PaginationData>> {
    const queryString = Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    return this.request<PaginationData>(`/poetry/list?${queryString}`);
  }

  // 获取诗词详情
  async getPoetryDetail(id: string): Promise<ApiResponse<any>> {
    return this.request(`/poetry/detail/${id}`);
  }

  // 搜索诗词
  async searchPoetry(keyword: string, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginationData>> {
    return this.request<PaginationData>(`/poetry/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
  }

  // 获取推荐诗词
  async getRecommendPoetry(limit: number = 10): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/poetry/recommend?limit=${limit}`);
  }

  // 获取作者列表
  async getAuthors(dynasty?: string): Promise<ApiResponse<string[]>> {
    const url = dynasty ? `/poetry/authors?dynasty=${encodeURIComponent(dynasty)}` : '/poetry/authors';
    return this.request<string[]>(url);
  }

  // 获取朝代列表
  async getDynasties(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/poetry/dynasties');
  }

  // 获取标签列表
  async getTags(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/poetry/tags');
  }

  // 获取收藏列表
  async getCollectionList(userId: string, page: number = 1, limit: number = 20): Promise<ApiResponse<PaginationData>> {
    return this.request<PaginationData>(`/collection/list?userId=${userId}&page=${page}&limit=${limit}`);
  }

  // 添加收藏
  async addCollection(userId: string, poetryId: string): Promise<ApiResponse<any>> {
    return this.request('/collection/add', {
      method: 'POST',
      data: { userId, poetryId }
    });
  }

  // 取消收藏
  async removeCollection(userId: string, poetryId: string): Promise<ApiResponse<any>> {
    return this.request(`/collection/remove?userId=${userId}&poetryId=${poetryId}`, {
      method: 'DELETE'
    });
  }

  // 检查收藏状态
  async checkCollection(userId: string, poetryId: string): Promise<ApiResponse<{ isCollected: boolean }>> {
    return this.request<{ isCollected: boolean }>(`/collection/check?userId=${userId}&poetryId=${poetryId}`);
  }

  // 获取收藏数量
  async getCollectionCount(userId: string): Promise<ApiResponse<{ count: number }>> {
    return this.request<{ count: number }>(`/collection/count?userId=${userId}`);
  }

  // 健康检查
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/health');
  }
}

// 创建全局API服务实例
const apiService = new ApiService();

export default apiService;
