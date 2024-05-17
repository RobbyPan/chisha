// components/side-bar/side-bar.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isSideBarOpen: false,
    isSideBarShow: false,
    menuList: [
      {
        label: '随便选',
        id: '1'
      },
      {
        label: '家常菜',
        id: '2'
      },
      {
        label: '奶茶类',
        id: '3'
      },
      {
        label: '放纵餐',
        id: '4'
      },
    ],
    activeId: '1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSideBar() {
      console.log("toggleSideBar");
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
    switchMenu(e) {
      const { item } = e.currentTarget.dataset;
      console.log("switchMenu", item);
      this.setData({
        activeId: item.id,
      });
    },
  }
})

