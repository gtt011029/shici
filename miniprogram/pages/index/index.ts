// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseNicknameComp: false,
  },
  onLoad() {
    if (wx.canIUse('getUserProfile')) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (wx.canIUse('input.type.nickname')) {
      this.setData({
        canIUseNicknameComp: true
      })
    }
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  onChooseAvatar(e: any) {
    const { avatarUrl } = e.detail 
    this.setData({
      'userInfo.avatarUrl': avatarUrl,
    })
  },
  onInputChange(e: any) {
    const nickName = e.detail.value
    this.setData({
      'userInfo.nickName': nickName
    })
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 新增的导航方法
  goToClassic() {
    wx.switchTab({
      url: '/pages/classic/classic'
    });
  },

  goToTangshi() {
    wx.switchTab({
      url: '/pages/tangshi/tangshi'
    });
  },

  goToSongci() {
    wx.switchTab({
      url: '/pages/songci/songci'
    });
  },

  startLearning() {
    wx.switchTab({
      url: '/pages/classic/classic'
    });
  }
})
