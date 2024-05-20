// components/side-bar/side-bar.ts
import {
  menuList
} from "../../config";

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    isSideBarOpen: false,
    isSideBarShow: false,
    menuList: [],
    activeItem: {},
  },

  methods: {
    init() {
      this.setData({
        menuList,
        activeItem: menuList[0],
      })
      this.postMenu()
    },
    /**
     * 切换侧边栏
     */
    toggleSideBar() {
      const { isSideBarOpen, isSideBarShow } = this.data;
      this.setData({
        isSideBarShow: !isSideBarShow,
      });
      setTimeout(() => {
        this.setData({
          isSideBarOpen: !isSideBarOpen,
        });
      }, isSideBarOpen ? 300 : 0)

    },

    /**
     * 切换菜单
     * @param e 
     */
    switchMenu(e) {
      const { item } = e.currentTarget.dataset;
      this.setData({
        activeItem: item,
      });
      this.postMenu()
      this.toggleSideBar()
    },

    /**
     * 菜单传给父组件
     */
    postMenu() {
      const { activeItem } = this.data;
      this.triggerEvent('getMenuItem', {
        menuItem: activeItem
      })
    }
  },

  /********************生命周期*********************/
  attached() {
    this.init()
  }
})


