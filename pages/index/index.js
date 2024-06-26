// index.js
import { arrayToString, stringToArray, getTime } from "../../utils/utils";
import {
  homeFoodList,
  milkTeaList,
  indulgeFoodList,
  elementPath,
  meituanPath,
} from "../../config.js";
Page({
  data: {
    isTitleShow: true,
    isBtnClick: false,
    list: [],
    allList: [],
    homeFoodList: [],
    milkTeaList: [],
    indulgeFoodList: [],
    activeType: "random",
    // randomItem: "",
    randomItem: {
      name: "",
      type: "random",
      time: "2077-05-20 20:13:14:",
    },
    randomItemList: [],
    randomTimer: null,
    clickCount: 0,
    toTakeOut: false,
    callMomFood: false,
    isModalShow: false,
    textareaValue: "",
    isDrink: false,

    historyTop: 60, // 历史记录顶部距离页面顶部的距离
    historyHeight: 60, // 历史记录的高度
    menuButtonWidth: 60, // ...菜单按钮宽度
    menuButtonLeft: 280, // ...菜单按钮距离页面左边的距离
  },

  /**
   * 处理按钮点击事件
   */
  handleBtnClick() {
    wx.vibrateShort({
      type: "heavy",
    });
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
        randomItemList: this.data.randomItemList.concat([
          {
            name: this.data.randomItem.name,
            type: this.data.randomItem.type,
            time: getTime(),
          },
        ]),
      });
      wx.setStorage({
        key: "randomItemList",
        data: this.data.randomItemList,
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
    const { list, activeType } = this.data;
    const typeMap = {
      random: "随便选",
      home: "家常菜",
      milkTea: "奶茶类",
      indulge: "放纵餐",
    };
    const randomIndex = Math.floor(Math.random() * list.length);
    const name = list[randomIndex];
    this.setData({
      randomItem: {
        name: name,
        type: typeMap[activeType],
      },
    });
  },

  /**
   * 类型选择
   */
  handleTypeClick(e) {
    // 如果存在定时器则关闭
    if (this.data.randomTimer) {
      clearInterval(this.data.randomTimer);
    }
    const { type } = e.currentTarget.dataset;
    const { homeFoodList, milkTeaList, indulgeFoodList } = this.data;
    this.setData({
      allList: [].concat(homeFoodList, indulgeFoodList),
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
      randomItem: {
        name: "",
        type: "random",
      },
      randomTimer: null,
      isBtnClick: false,
      activeType: type,
      isDrink: type === "milkTea",
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
   * 自定义重置
   */
  editResetHandler() {
    const { activeType } = this.data;
    const typeMap = {
      random: [].concat(homeFoodList, indulgeFoodList),
      home: homeFoodList,
      milkTea: milkTeaList,
      indulge: indulgeFoodList,
    };
    this.setData({
      textareaValue: arrayToString(typeMap[activeType]),
    });
  },

  /**
   * 跳转bilibili小程序
   */
  gotoBilibili() {
    this.copyFood();
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
    this.copyFood();
    setTimeout(() => {
      wx.navigateToMiniProgram({
        appId: "wxb296433268a1c654",
      });
    }, 2000);
  },

  /**
   * 跳转美团不复制剪切板
   */
  gotoMeituanNoCopy() {
    wx.navigateToMiniProgram({
      appId: "wxde8ac0a21135c07d",
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
      appId: "wxece3a9a4c82f58c9",
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
        appId: "wx7643d5f831302ab0",
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
          title: "已复制到剪贴板",
          icon: "none",
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
      callMomFood: false,
      randomItem: {
        name: "",
        type: "random",
      },
      randomTimer: null,
      isBtnClick: false,
    });
  },

  /**
   * 提醒我吃饭
   */
  remindToEatHandler() {
    const { randomItem, isDrink } = this.data;
    wx.addPhoneCalendar({
      title: !!randomItem.name
        ? `该${isDrink ? "喝水" : "吃饭"}啦，今天${isDrink ? "喝" : "吃"}${
            randomItem.name
          }吧！`
        : `该${isDrink ? "喝水" : "吃饭"}啦`,
      startTime: Math.round(new Date().getTime() / 1000), //unix时间戳
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

  /**
   * 跳转历史页面
   */
  toHistory() {
    wx.navigateTo({
      url: "../history/history",
    });
  },

  /*******************生命周期*********************/

  onLoad() {
    this.setData({
      randomItemList: wx.getStorageSync("randomItemList") || [],
      allList: [].concat(homeFoodList, indulgeFoodList),
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

    const ButtonBoundingClient = wx.getMenuButtonBoundingClientRect();
    this.setData({
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
