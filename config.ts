import { arrayToString } from "./utils/utils";

/**
 * 饿了么链接
 */
const elementPath: string =
  "pages/sharePid/web/index?o2i_sharefrom=wxminiapp&scene=u.ele.me%2Fidf4UiIo"; //饿了么红包领不停-升级版
// "ele-recommend-price/pages/guest/index?inviterId=eb3ee92&chInfo=ch_wechat_chsub_CopyLink&_ltracker_f=grzx0913" //饿了么个人分享红包链接

/**
 * 美团链接
 */
const meituanPath: string =
  "index/pages/h5/h5?noshare=1&f_openId=0&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D2%26p%3DF8_gxb5zT9HA&f_userId=0&f_token=0";

/**
 * 家常菜
 */
const homeFoodList: string[] = [
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
];

/**
 * 奶茶饮料
 */
const milkTeaList: string[] = [
  "纯净水",
  "怡宝",
  "农夫山泉",
  "依云",
  "百岁山",
  "宇治抹茶拿铁",
  "蓝莓之夜",
  "柠檬蜂蜜红茶",
  "蜜桃乌龙茶",
  "养乐多绿茶",
  "芋头奶茶",
  "波霸奶茶",
  "芒果绿茶",
  "红豆奶茶",
  "奥利奥奶茶",
  "泰式奶茶",
  "玄米绿茶",
  "金桔柠檬茶",
  "玫瑰花茶",
  "港式冻鸳鸯",
  "芝士奶盖绿茶",
  "冰淇淋红茶",
  "幽兰拿铁",
  "蜂蜜柚子茶",
  "烤布蕾奶茶",
  "焦糖布丁珍奶",
  "草莓多多",
  "蜂蜜柠檬绿茶",
  "巧克力香蕉奶茶",
  "珍珠奶茶",
  "泡沫红茶",
  "草莓果茶",
  "豆乳玉麒麟",
  "金桔柠檬",
  "四季春茶",
  "杨枝甘露",
  "荔枝玉露",
  "草莓多肉",
  "红柚多多",
  "芒果多肉",
  "原味珍珠奶茶",
  "芋圆奶茶",
  "黑糖珍珠奶茶",
  "超级水果四季春",
  "百香柠檬",
  "浮云沉香茶",
  "白桃乌龙茶",
  "玫瑰荔枝茶",
  "曲奇冰淇淋奶茶",
  "蓝莓爆珠奶茶",
  "招牌芝士奶盖茶",
  "醇香红茶拿铁",
  "焦糖布丁奶茶",
  "龙珠蓝莓冰",
  "茉莉绿茶",
  "京都抹茶",
  "板栗乌龙拿铁",
  "凤梨百香清茶",
  "布雷奶茶",
  "黄金芒果优格",
  "满杯西柚",
  "芝士金凤茶王",
  "满杯水果茶",
  "满杯红柚",
  "芝芝莓莓",
  "芝芝芒芒",
  "桃桃茉莉",
  "荔枝青茶",
  "黑糖波波奶茶",
  "厚芋泥波波奶茶",
];

/**
 * 放纵餐
 */
const indulgeFoodList: string[] = [
  "中式炸鸡",
  "韩式炸鸡",
  "烧烤猪肋排",
  "意大利肉酱面",
  "墨西哥玉米片",
  "印度榴莲鸡",
  "日式天妇罗",
  "美国汉堡",
  "中式红烧肉",
  "泰式绿咖喱鸡",
  "海鲜大餐",
  "法式可丽饼",
  "葡式蛋挞",
  "巧克力软心蛋糕",
  "奶酪火锅",
  "羊肉串",
  "烤火鸡",
  "烟熏三文鱼",
  "寿司拼盘",
  "炸鱿鱼圈",
  "肉酱千层面",
  "冰淇淋圣代",
  "芝士蛋糕",
  "油炸蛤蜊条",
  "韩式泡菜炒饭",
  "西班牙海鲜炖饭",
  "意大利香肠比萨",
  "香辣鸡腿堡",
  "新奥尔良烤翅",
  "劲爆鸡米花",
  "黄金鸡块",
  "葡式蛋挞",
  "香辣鸡翅",
  "玉米沙拉",
  "红豆派",
  "土豆泥",
  "老北京鸡肉卷",
  "巧克力圣代",
  "吮指原味鸡",
  "上校鸡块",
  "深海鳕鱼条",
  "川辣泡椒鸡",
  "北京炸酱面",
  "醇香土豆泥",
  "苹果派",
  "巨无霸",
  "麦辣鸡腿堡",
  "安格斯牛肉堡",
  "麦乐鸡",
  "麦麦脆汁鸡",
  "苹果派",
  "草莓圣代",
  "巧克力圣代",
  "麦辣鸡翅",
  "麦香鸡",
  "麦旋风",
  "双层吉士堡",
  "烟肉蛋麦满分",
  "猪柳蛋麦满分",
  "那么大鸡排",
  "开心乐园餐",
  "不素之霸牛堡",
];

/**
 * 麦当劳
 */
const MDL: string[] = [
  "巨无霸",
  "麦辣鸡腿汉堡",
  "原味板烧鸡腿堡",
  "麦香鸡",
  "吉士汉堡包",
  "双层吉士汉堡",
  "不素之霸双层牛堡",
  "双层深海鳕鱼堡",
  "安格斯MAX厚牛培根堡",
  "安格斯MAX厚牛芝士堡",
  "双层安格斯MAX厚牛培根堡",
  "双层安格斯MAX厚牛芝士堡",
  "培根蔬萃双层牛堡",
  "麦乐鸡",
  "麦辣鸡翅",
  "那么大鸡排",
  "玉米杯",
  "苹果片",
  "麦麦脆汁鸡（琵琶腿）",
  "麦麦脆汁鸡（鸡胸）",
  "圆筒冰淇淋",
  "朱古力新地",
  "草莓新地",
  "奥利奥麦旋风",
  "奥利奥草莓麦旋风",
  "香芋派",
  "菠萝派",
  "猪柳麦满分",
  "猪柳蛋麦满分",
  "双层猪柳蛋麦满分",
  "吉士蛋麦满分",
  "火腿扒麦满分",
  "双层火腿扒麦满分",
  "原味板烧鸡腿麦满分",
  "双层板烧鸡腿麦满分",
  "板烧鸡腿炒双蛋堡",
  "猪柳炒双蛋堡",
  "吉士炒双蛋堡",
  "德式香肠炒双蛋堡",
  "火腿扒早安营养卷",
  "香肠早安营养卷",
  "皮蛋鸡肉粥",
  "雪菜脆笋鸡肉粥",
  "脆薯饼",
  "脆香油条",
  "德式图林根香肠",
  "500大卡餐",
  "开心乐园餐",
];

/**
 * 肯德基
 */
const KFC: string[] = [
  "香辣鸡腿堡",
  "汁汁厚作芝士安格斯牛堡",
  "新奥尔良烤鸡腿堡",
  "老北京肉卷",
  "汁汁厚作芝士双层安格斯牛堡",
  "劲爆鸡米花",
  "热辣香骨鸡",
  "薯条",
  "香辣鸡翅",
  "新奥尔良鸡翅",
  "葡式蛋挞",
  "吮指原味鸡",
  "黄金脆皮鸡",
  "上校鸡块",
  "醇香土豆泥",
  "芙蓉荟蔬汤",
  "港式烧味脆皮大鸡腿饭",
  "红豆派",
  "圣代",
  "冰淇淋花筒",
];

/**
 * 瑞幸咖啡
 */
const LuckinCoffee: string[] = [
  "酱香拿铁",
  "夏日青提拿铁",
  "云南小甘橘·冰美式",
  "陨石拿铁",
  "碧螺知春拿铁",
  "冰厚乳拿铁",
  "冰吸生椰拿铁",
  "加农美式",
  "标准美式",
  "冰镇杨梅瑞纳冰",
  "抹茶瑞纳冰",
  "芒果茉莉瑞纳冰",
  "巧克力瑞纳冰",
  "浮云朵朵瑞纳冰",
  "卡布奇诺瑞纳冰",
  "茉莉奶绿瑞纳冰",
  "云南小甘橘·澳瑞白",
  "云南小甘橘·拿铁",
  "云南小甘橘·美式",
  "云南小甘橘·Dirty",
  "碧螺知春拿铁",
  "杏花乌龙拿铁",
  "茉莉海盐拿铁",
  "茉莉花香拿铁",
  "陨石生椰拿铁",
  "冰吸生椰拿铁",
  "生椰丝绒拿铁",
  "茉莉花香拿铁",
  "厚乳拿铁",
  "芒果好喝椰",
  "抹茶好喝椰",
  "生椰爱摩卡",
  "椰云拿铁",
  "陨石厚乳拿铁",
  "海盐芝士厚乳拿铁",
  "茉莉海盐拿铁",
  "茉莉花香拿铁",
  "厚乳拿铁",
  "生椰丝绒拿铁",
  "冲绳黑糖丝绒拿铁",
  "香草丝绒拿铁",
  "生酪拿铁",
  "香草拿铁",
  "冲绳黑糖拿铁",
  "陨石拿铁",
  "拿铁",
];

interface menu {
  label: string;
  type: string;
  id: string;
  list: string;
}

/**
 * 菜单
 */
const menuList: menu[] = [
  {
    label: "随便选",
    type: "吃",
    id: "1",
    list: arrayToString(homeFoodList.concat(indulgeFoodList, MDL, KFC)),
  },
  {
    label: "家常菜",
    type: "吃",
    id: "2",
    list: arrayToString(homeFoodList),
  },
  {
    label: "奶茶类",
    type: "喝",
    id: "3",
    list: arrayToString(milkTeaList),
  },
  {
    label: "放纵餐",
    type: "吃",
    id: "4",
    list: arrayToString(indulgeFoodList),
  },
  {
    label: "M当劳",
    type: "吃",
    id: "5",
    list: arrayToString(MDL),
  },
  {
    label: "K德基",
    type: "吃",
    id: "6",
    list: arrayToString(KFC),
  },
  {
    label: "R幸咖啡",
    type: "喝",
    id: "7",
    list: arrayToString(LuckinCoffee),
  },
];

export {
  menuList,
  elementPath,
  meituanPath,
  homeFoodList,
  milkTeaList,
  indulgeFoodList,
};
