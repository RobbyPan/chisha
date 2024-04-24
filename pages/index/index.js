// index.js
import { arrayToString, stringToArray } from "../../utils/utils";
import { homeFoodList, milkTeaList, indulgeFoodList } from "../../config.js";
Page({
  data: {
    title: "看看今天吃啥呢？",
    isTitleShow: true,
    isBtnClick: false,
    list: [],
    allList: [],
    homeFoodList: [],
    milkTeaList: [],
    indulgeFoodList: [],
    activeType: "random",
    randomItem: "疯狂星期四",
    randomTimer: null,
    clickCount: 0,
    toTakeOut: false,
    callMomFood: false,
    isModalShow: false,
    textareaValue: "",
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
      toTakeOut: false,
      callMomFood: false,
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
   * 类型选择
   */
  handleTypeClick(e) {
    const { type } = e.currentTarget.dataset;
    const { homeFoodList, milkTeaList, indulgeFoodList } = this.data;
    this.setData({
      allList: [].concat(homeFoodList, milkTeaList, indulgeFoodList),
    });
    const typeMap = {
      random: this.data.allList,
      home: homeFoodList,
      milkTea: milkTeaList,
      indulge: indulgeFoodList,
    };
    this.setData({
      list: typeMap[type],
      isTitleShow: true,
      toTakeOut: false,
      callMomFood: false,
      randomItem: "疯狂星期四",
      randomTimer: null,
      isBtnClick: false,
      activeType: type,
    });
  },

  /**
   * 自定义菜单
   */
  editHandler() {
    const { activeType, allList, homeFoodList, milkTeaList, indulgeFoodList } =
      this.data;
    const typeMap = {
      random: allList,
      home: homeFoodList,
      milkTea: milkTeaList,
      indulge: indulgeFoodList,
    };
    const value = arrayToString(typeMap[activeType]);
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
    console.log(value);
  },

  /**
   * 自定义确认
   */
  confirmHandler() {
    const { textareaValue, activeType } = this.data;
    const dataList = stringToArray(textareaValue);
    const typeMap = {
      random: () => {
        this.setData({
          allList: dataList,
        });
      },
      home: () => {
        this.setData({
          homeFoodList: dataList,
        });
      },
      milkTea: () => {
        this.setData({
          milkTeaList: dataList,
        });
      },
      indulge: () => {
        this.setData({
          indulgeFoodList: dataList,
        });
      },
    };
    typeMap[activeType]();
    this.setData({
      list: {
        random: this.data.allList,
        home: this.data.homeFoodList,
        milkTea: this.data.milkTeaList,
        indulge: this.data.indulgeFoodList,
      }[activeType],
      isModalShow: false,
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
    // 跳转美团推广页
    // setTimeout(() => {
    //   wx.navigateTo({
    //     url: `/pages/web/web`,
    //   });
    // }, 2000);
    // 跳转美团小程序
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: "wx2c348cf579062e56",
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

  /**
   * 恢复初始状态
   */
  reset() {
    this.setData({
      isTitleShow: true,
      clickCount: 0,
      toTakeOut: false,
      callMomFood: false,
      randomItem: "疯狂星期四",
      randomTimer: null,
      isBtnClick: false,
    });
  },

  /**
   * 复制我的微信号
   */
  callMe() {
    wx.setClipboardData({
      data: "miaopasia",
      success() {
        wx.showToast({
          title: "已复制到剪贴板",
          icon: "none",
          duration: 2000,
        });
      },
    });
  },

  /*******************生命周期*********************/

  onLoad() {
    this.setData({
      allList: [].concat(homeFoodList, milkTeaList, indulgeFoodList),
      homeFoodList,
      milkTeaList,
      indulgeFoodList,
    });
    this.setData({
      list: {
        random: this.data.allList,
        home: this.data.homeFoodList,
        milkTea: this.data.milkTeaList,
        indulge: this.data.indulgeFoodList,
      }[this.data.activeType],
    });
  },

  onShow() {
    this.reset();
  },

  /**
   * 转发给朋友
   */
  onShareAppMessage() {
    return {
      title: "随机抽签吃啥",
      path: "/pages/index/index",
    };
  },

  /**
   * 转发到朋友圈
   */
  onShareTimeline() {
    return {
      title: "随机抽签吃啥",
    };
  },
});
