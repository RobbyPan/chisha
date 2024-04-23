// index.js
Page({
  data: {
    title: "看看今天吃啥呢？",
    isTitleShow: true,
    isBtnClick: false,
    list: [
      "红烧肉鹌鹑蛋",
      "番茄土豆炖牛腩",
      "梅菜扣肉",
      "红烧猪蹄",
      "红烧牛排骨",
      "红烧肉",
      "糖醋排骨",
      "番茄炒蛋",
      "酱油鸡",
      "板栗焖鸡",
      "蒜香鸡翅",
      "蜜汁鸡腿",
      "脆皮鸡翅",
      "香煎带鱼",
      "剁椒鱼头",
      "红烧大黄鱼",
      "清蒸鲈鱼",
      "黄焖鸡",
      "鱼香肉丝",
      "京酱肉丝",
      "青椒肉丝",
      "奥尔良烤翅",
      "小炒牛肉",
      "可乐鸡翅",
      "青椒酿虾滑",
      "番茄粉丝虾滑汤",
      "蒜蓉粉丝虾",
      "凉拌皮蛋",
      "柠檬鸡爪",
      "凉拌黄瓜",
      "粉丝蒸鲍鱼",
    ],
    randomItem: "疯狂星期四",
    randomTimer: null,
    clickCount: 0,
    toTakeOut: false,
    callMomFood: false,
  },
  /**
   * 处理按钮点击事件
   */
  handleBtnClick() {
    this.setData({
      isTitleShow: false,
      clickCount: this.data.clickCount > 10 ? 0 : this.data.clickCount,
      toTakeOut: this.data.clickCount === 5,
      callMomFood: this.data.clickCount === 10,
    });
    if (this.data.isBtnClick) {
      clearInterval(this.data.randomTimer);
      this.setData({
        isBtnClick: false,
      });
      return;
    }
    this.setData({
      isBtnClick: true,
      clickCount: this.data.clickCount + 1,
      callMomFood: this.data.clickCount > 10,
      randomTimer: setInterval(() => {
        this.getRandomFromList();
      }, 80),
    });
  },
  /**
   * 从列表中随机获取一个元素
   */
  getRandomFromList() {
    const { list } = this.data;
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomItem = list[randomIndex];
    this.setData({
      randomItem,
    });
  },
  /**
   * 跳转bilibili小程序
   */
  gotoBilibili() {
    wx.setClipboardData({
      data: this.data.randomItem,
      success() {
        wx.showToast({
          title: "已复制到剪贴板",
          icon: "none",
          duration: 2000,
        });
      },
    });
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: "wx7564fd5313d24844",
      });
    }, 2000);
  },
  /**
   * 跳转小红书
   */
  gotoRedbook() {
    wx.setClipboardData({
      data: this.data.randomItem,
      success() {
        wx.showToast({
          title: "已复制到剪贴板",
          icon: "none",
          duration: 2000,
        });
      },
    });
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: "wxb296433268a1c654",
      });
    }, 2000);
  },
  /**
   * 跳转美团
   */
  gotoMeituan() {
    wx.setClipboardData({
      data: this.data.randomItem,
      success() {
        wx.showToast({
          title: "已复制到剪贴板",
          icon: "none",
          duration: 2000,
        });
      },
    });
    setTimeout(() => {
      wx.navigateTo({
        url: `/pages/web/web`,
      });
    }, 2000);
  },
  /**
   * 跳转腾讯地图小程序
   */
  gotoMap() {
    wx.setClipboardData({
      data: this.data.randomItem,
      success() {
        wx.showToast({
          title: "已复制到剪贴板",
          icon: "none",
          duration: 2000,
        });
      },
    });
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: "wx7643d5f831302ab0",
      });
    }, 2000);
  },

  onLoad() {
    console.log("onLoad");
  },
  onShow() {
    console.log("onShow");
  },
});
