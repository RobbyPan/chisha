// index.js
import { arrayToString, stringToArray, getTime } from '../../utils/utils';
import { elementPath, meituanPath, menuList } from '../../config';
Page({
  data: {
    isTitleShow: true,
    isBtnClick: false,
    list: [],
    randomItem: {
      name: '',
      type: '',
      time: '',
    },
    randomItemList: [],
    randomTimer: null,
    clickCount: 0,
    toTakeOut: false,
    isModalShow: false,
    textareaValue: '',

    historyTop: 60, // 历史记录顶部距离页面顶部的距离
    historyHeight: 60, // 历史记录的高度
    menuButtonWidth: 60, // ...菜单按钮宽度
    menuButtonLeft: 280, // ...菜单按钮距离页面左边的距离

    menuItem: {
      label: '随便选',
      type: '吃',
      id: '1',
      list: [],
    }, // 菜单对象
  },

  /**
   * 获取菜单列表
   */
  getMenuItem(data) {
    if (this.data.randomTimer) {
      clearInterval(this.data.randomTimer);
    }
    const { menuItem } = data.detail;
    this.setData({
      menuItem: {
        list: stringToArray(menuItem.list),
        label: menuItem.label,
        type: menuItem.type,
        id: menuItem.id,
      },
      isTitleShow: true,
      toTakeOut: false,
      randomItem: {
        name: '',
        type: '',
      },
      randomTimer: null,
      isBtnClick: false,
    });
  },

  /**
   * 处理按钮点击事件
   */
  handleBtnClick() {
    wx.vibrateShort({
      type: 'heavy',
    });
    this.setData({
      isTitleShow: false,
      clickCount: this.data.clickCount > 10 ? 0 : this.data.clickCount,
      toTakeOut: this.data.clickCount === 5,
    });
    if (this.data.isBtnClick) {
      clearInterval(this.data.randomTimer);
      this.setData({
        isBtnClick: false,
        randomItemList: this.data.randomItemList.concat([
          {
            name: this.data.randomItem.name,
            type: this.data.randomItem.type,
            time: getTime(),
          },
        ]),
      });
      wx.setStorage({
        key: 'randomItemList',
        data: this.data.randomItemList,
      });
      return;
    }
    this.setData({
      isBtnClick: true,
      clickCount: this.data.clickCount + 1,
      toTakeOut: false,
      randomTimer: setInterval(() => {
        this.getRandomFromList();
      }, 80),
    });
  },

  /**
   * 从列表中随机获取一个元素
   */
  getRandomFromList() {
    const { menuItem } = this.data;
    const randomIndex = Math.floor(Math.random() * menuItem.list.length);
    const name = menuItem.list[randomIndex];
    this.setData({
      randomItem: {
        name: name,
        type: menuItem.label,
      },
    });
  },

  /**
   * 自定义菜单
   */
  editHandler() {
    const { menuItem } = this.data;
    const value = arrayToString(menuItem.list);
    //弹出框
    this.setData({
      textareaValue: value,
      isModalShow: true,
    });
  },

  /**
   * textarea失焦
   */
  textareaBlur(e) {
    const { value } = e.detail;
    this.setData({
      textareaValue: value,
    });
  },

  /**
   * 自定义确认
   */
  confirmHandler() {
    this.setData({
      menuItem: {
        list: stringToArray(this.data.textareaValue),
        label: this.data.menuItem.label,
        type: this.data.menuItem.type,
        id: this.data.menuItem.id,
      },
      isModalShow: false,
    });
  },

  /**
   * 自定义重置
   */
  editResetHandler() {
    menuList.map((item) => {
      if (item.id === this.data.menuItem.id) {
        this.setData({
          textareaValue: item.list,
        });
      }
    });
  },

  /**
   * 跳转bilibili小程序
   */
  gotoBilibili() {
    this.copyFood();
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: 'wx7564fd5313d24844',
      });
    }, 2000);
  },

  /**
   * 跳转小红书
   */
  gotoRedbook() {
    this.copyFood();
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: 'wxb296433268a1c654',
      });
    }, 2000);
  },

  /**
   * 跳转美团不复制剪切板
   */
  gotoMeituanNoCopy() {
    wx.navigateToMiniProgram({
      appId: 'wxde8ac0a21135c07d',
      path: meituanPath,
    });
  },

  /**
   * 跳转美团
   */
  gotoMeituan() {
    this.copyFood();
    setTimeout(() => {
      this.gotoMeituanNoCopy();
    }, 2000);
  },

  /**
   * 跳转饿了么小程序不复制剪切板
   */
  gotoElemeNoCopy() {
    wx.navigateToMiniProgram({
      appId: 'wxece3a9a4c82f58c9',
      path: elementPath,
    });
  },

  /**
   * 跳转饿了么小程序
   */
  gotoEleme() {
    this.copyFood();
    setTimeout(() => {
      this.gotoElemeNoCopy();
    }, 2000);
  },

  /**
   * 跳转腾讯地图小程序
   */
  gotoMap() {
    this.copyFood();
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: 'wx7643d5f831302ab0',
      });
    }, 2000);
  },

  /**
   * 复制随机到的food到剪切板
   */
  copyFood() {
    wx.setClipboardData({
      data: this.data.randomItem.name,
      success() {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  /**
   * 恢复初始状态
   */
  reset() {
    this.setData({
      isTitleShow: true,
      clickCount: 0,
      toTakeOut: false,
      randomItem: {
        name: '',
        type: '随便选',
      },
      randomTimer: null,
      isBtnClick: false,
    });
  },

  /**
   * 提醒我吃饭
   */
  remindToEatHandler() {
    const { randomItem, menuItem } = this.data;
    const isDrink = menuItem.type === '喝';
    wx.addPhoneCalendar({
      title: !!randomItem.name
        ? `该${isDrink ? '喝水' : '吃饭'}啦，今天${isDrink ? '喝' : '吃'}${
            randomItem.name
          }吧！`
        : `该${isDrink ? '喝水' : '吃饭'}啦`,
      startTime: Math.round(new Date().getTime() / 1000), //unix时间戳
    });
  },

  /**
   * 复制我的微信号
   */
  callMe() {
    wx.setClipboardData({
      data: 'miaopasia',
      success() {
        wx.showToast({
          title: '已复制到剪贴板',
          icon: 'none',
          duration: 2000,
        });
      },
    });
  },

  /**
   * 跳转历史页面
   */
  toHistory() {
    wx.navigateTo({
      url: '../history/history',
    });
  },

  /*******************生命周期*********************/

  onLoad() {
    const ButtonBoundingClient = wx.getMenuButtonBoundingClientRect();
    this.setData({
      randomItemList: wx.getStorageSync('randomItemList') || [],
      historyTop: ButtonBoundingClient.top,
      historyHeight: ButtonBoundingClient.height,
      menuButtonWidth: ButtonBoundingClient.width,
      menuButtonLeft: ButtonBoundingClient.left,
    });
  },

  onShow() {
    this.reset();
  },

  onHide() {
    // 如果存在定时器则关闭
    if (this.data.randomTimer) {
      clearInterval(this.data.randomTimer);
    }
  },

  /**
   * 转发给朋友
   */
  onShareAppMessage() {
    return {
      title: '随机抽签吃啥',
      path: '/pages/index/index',
    };
  },

  /**
   * 转发到朋友圈
   */
  onShareTimeline() {
    return {
      title: '随机抽签吃啥',
    };
  },
});
