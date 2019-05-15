var actiontype;
(function (actiontype) {
    /**容器 */
    actiontype[actiontype["rongqi"] = 1] = "rongqi";
    /**购买关注 */
    actiontype[actiontype["buy"] = 2] = "buy";
    /**公示关注 */
    actiontype[actiontype["gongshi"] = 3] = "gongshi";
    /**搜索返回 */
    actiontype[actiontype["search"] = 4] = "search";
})(actiontype || (actiontype = {}));
/**
 * 关注类型
 */
var attentype;
(function (attentype) {
    /**购买关注 */
    attentype[attentype["buy"] = 1] = "buy";
    /**公示关注 */
    attentype[attentype["gongshi"] = 2] = "gongshi";
})(attentype || (attentype = {}));
/**
 * 关注 或 取消关注
 */
var attention;
(function (attention) {
    /**关注 */
    attention[attention["attent"] = 1] = "attent";
    /**取消关注 */
    attention[attention["cancelAttent"] = 2] = "cancelAttent";
})(attention || (attention = {}));
/**逻辑类型 */
var m_logictype;
(function (m_logictype) {
    /**逻辑类型为0：表示不显示区间列表 */
    m_logictype[m_logictype["zero"] = 0] = "zero";
    /**逻辑类型为1：表示显示等级、物品id */
    m_logictype[m_logictype["one"] = 1] = "one";
    /**逻辑类型为2：表示显示等级、物品id */
    m_logictype[m_logictype["two"] = 2] = "two";
    /**逻辑类型为3：表示显示品质区间、等级区间 */
    m_logictype[m_logictype["three"] = 3] = "three";
    /**逻辑类型为4：表示显示品质区间、等级区间 */
    m_logictype[m_logictype["four"] = 4] = "four";
})(m_logictype || (m_logictype = {}));
/** 拍卖行页面索引 */
var ViewIndex;
(function (ViewIndex) {
    /** 购买 */
    ViewIndex[ViewIndex["BUY"] = 0] = "BUY";
    /** 出售 */
    ViewIndex[ViewIndex["SELL"] = 1] = "SELL";
    /** 公示 */
    ViewIndex[ViewIndex["PUBLICITY"] = 2] = "PUBLICITY";
})(ViewIndex || (ViewIndex = {}));
/** 拍卖行品质索引*/
var NqualityType;
(function (NqualityType) {
    NqualityType[NqualityType["WHILE"] = 1] = "WHILE";
    NqualityType[NqualityType["GREEN"] = 2] = "GREEN";
    NqualityType[NqualityType["BLUE"] = 3] = "BLUE";
    NqualityType[NqualityType["VLOLET"] = 4] = "VLOLET";
    NqualityType[NqualityType["ORANGE"] = 5] = "ORANGE";
})(NqualityType || (NqualityType = {}));
/** 拍卖装备类型索引*/
var EquipTypeIndex;
(function (EquipTypeIndex) {
    EquipTypeIndex[EquipTypeIndex["GEM"] = 2] = "GEM";
    EquipTypeIndex[EquipTypeIndex["TASK"] = 3] = "TASK";
    EquipTypeIndex[EquipTypeIndex["PET"] = 13] = "PET";
    EquipTypeIndex[EquipTypeIndex["PUBLICITYPET"] = 6] = "PUBLICITYPET";
})(EquipTypeIndex || (EquipTypeIndex = {}));
/** 拍卖行品质下标索引*/
var TraitIndex;
(function (TraitIndex) {
    TraitIndex[TraitIndex["zero"] = 0] = "zero";
    TraitIndex[TraitIndex["one"] = 1] = "one";
    TraitIndex[TraitIndex["two"] = 2] = "two";
})(TraitIndex || (TraitIndex = {}));
/** 品质筛选单选框下标索引*/
var ScreenIndex;
(function (ScreenIndex) {
    ScreenIndex[ScreenIndex["checkone"] = 1] = "checkone";
    ScreenIndex[ScreenIndex["checktwo"] = 2] = "checktwo";
    ScreenIndex[ScreenIndex["checkthree"] = 3] = "checkthree";
})(ScreenIndex || (ScreenIndex = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var sale;
        (function (sale) {
            var models;
            (function (models) {
                var SaleModel = /** @class */ (function () {
                    function SaleModel() {
                        /**bMT3摆摊一级表 */
                        this.cMarketFirstTableData = {};
                        /**bMT3摆摊二级表 */
                        this.cMarketSecondTableData = {};
                        /**bMT3摆摊三级表 */
                        this.cMarketThreeTableData = {};
                        /**bMT3摆摊三级表以name为key */
                        this.cMarketThreeTableDataForName = {};
                        /**bMT3摆摊三级表以itemid为key */
                        this.cMarketThreeTableDataForItemid = {};
                        /**重新排序之后的一级摆摊列表 */
                        this.m_cMarketFirstTableData = [];
                        /**食品表 */
                        this.foodAndDrugEffectData = {};
                        /**食品公式表 */
                        this.foodAndDrugFormulaData = {};
                        /**上架物品信息 */
                        this.GoodList = new Laya.Dictionary();
                        /**存储上架物品点击时的物品id,以备返回tips时使用 */
                        this.itemId = -1;
                        /**购买界面返回的物品信息 */
                        this.bugGoodlist = [];
                        /**筛选返回的当前页数 */
                        this.currPage = 1;
                        /**筛选返回的总的页数 */
                        this.totalPage = 1;
                        /**搜索历史纪录 */
                        this.searchRecordArr = [];
                        /**购买记录 */
                        this.buyRecordArr = [];
                        /**出售记录 */
                        this.saleRecordArr = [];
                        /**宠物技能 */
                        this.petSkillIndexArr = [];
                        this.isJumpItemid = -1;
                        /** 跳转哪个子界面 0：购买 1：出售 2：公示 */
                        this.tiaozhuanid = 0;
                        /**存储当前上架物品的id */
                        this.saleItmeId = -1;
                        /** 判断搜索数据返回是否有值 */
                        this.isSeekback = false;
                        /**基础属性 */
                        this.equBaseAttrArr = [{ name: "物理攻击", id: 130 }, { name: "法术攻击", id: 150 }, { name: "治疗强度", id: 170 }, { name: "速度", id: 200 },
                            { name: "生命", id: 60 }, { name: "魔法", id: 90 }, { name: "物理防御", id: 140 }, { name: "法术防御", id: 140 }];
                        /**装备附加属性 */
                        this.equAddAttr = [{ name: "体质", id: 10 }, { name: "智力", id: 20 }, { name: "力量", id: 30 }, { name: "耐力", id: 40 }, { name: "敏捷", id: 50 }];
                        /**宠物资质评分 */
                        this.petZizhiArr = [{ name: "生命资质", id: 1460 }, { name: "法术资质", id: 1470 }, { name: "物攻资质", id: 1440 }, { name: "防御资质", id: 1450 }, { name: "速度资质", id: 1480 }];
                        /**宠物基础属性 */
                        this.petBaseAttr = [{ name: "生命", id: 60 }, { name: "物理攻击", id: 130 }, { name: "物理防御", id: 140 }, { name: "法术攻击", id: 150 }, { name: "法术防御", id: 160 }, { name: "速度", id: 200 }];
                        this.SMarketPetTipsData = new Laya.Dictionary();
                        this.GongshiGuanZhuData = new Laya.Dictionary();
                        this.GoumaiGuanZhuData = new Laya.Dictionary();
                        this.SOtherItemTipsDsc = new Laya.Dictionary();
                        this.AuctionSearchData = new Laya.Dictionary();
                        this.SearchResultData = new Laya.Dictionary();
                    }
                    SaleModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new SaleModel();
                        }
                        return this._instance;
                    };
                    SaleModel.clearModelData = function () {
                        sale.models.SaleModel._instance.m_cMarketFirstTableData = [];
                        sale.models.SaleModel._instance.GoodList = new Laya.Dictionary();
                        sale.models.SaleModel._instance.SMarketPetTipsData = new Laya.Dictionary();
                        sale.models.SaleModel._instance.GoumaiGuanZhuData = new Laya.Dictionary();
                        sale.models.SaleModel._instance.GongshiGuanZhuData = new Laya.Dictionary();
                        sale.models.SaleModel._instance.SOtherItemTipsDsc = new Laya.Dictionary();
                        sale.models.SaleModel._instance.AuctionSearchData = new Laya.Dictionary();
                        sale.models.SaleModel._instance.SearchResultData = new Laya.Dictionary();
                        sale.models.SaleModel._instance.itemId = -1;
                        sale.models.SaleModel._instance.bugGoodlist = [];
                        sale.models.SaleModel._instance.currPage = 1;
                        sale.models.SaleModel._instance.totalPage = 1;
                        sale.models.SaleModel._instance.saleTargetId = 0;
                        sale.models.SaleModel._instance.searchRecordArr = [];
                        sale.models.SaleModel._instance.buyRecordArr = [];
                        sale.models.SaleModel._instance.saleRecordArr = [];
                        sale.models.SaleModel._instance.petSkillIndexArr = [];
                        sale.models.SaleModel._instance.isJumpItemid = -1;
                        sale.models.SaleModel._instance.tiaozhuanid = 0;
                        sale.models.SaleModel._instance.saleItmeId = -1;
                        sale.models.SaleModel._instance.isSeekback = false;
                    };
                    /**根据iconId获取图片地址 */
                    SaleModel.prototype.getIcon = function (iconId) {
                        if (20001 <= iconId && iconId <= 30000) {
                            return "common/icon/item/" + iconId + ".png";
                        }
                        else if (30001 <= iconId && iconId <= 30500) {
                            return "common/icon/avatarrole/" + iconId + ".png";
                        }
                        else if (31201 <= iconId && iconId <= 32000) {
                            return "common/icon/avatarpet/" + iconId + ".png";
                        }
                        else if (1 <= iconId && iconId <= 10000) {
                            return "common/icon/skill/" + iconId + ".png";
                        }
                        return "";
                    };
                    /**显示列表 */
                    SaleModel.prototype.showList = function (list, arr) {
                        list.vScrollBarSkin = "";
                        list.scrollBar.elasticBackTime = 200;
                        list.scrollBar.elasticDistance = 50;
                        list.repeatY = arr.length;
                        list.array = arr;
                    };
                    /**
                     * 获取tips
                     * @param packid
                     * @param key
                     */
                    SaleModel.prototype.getItemTips = function (packid, key) {
                        var tips = game.modules.strengThening.models.StrengTheningModel._instance.equipTips;
                        for (var i = 0; i < tips.length; i++) {
                            if (packid == tips[i].packid && key == tips[i].keyinpack) {
                                return tips[i].tips;
                            }
                        }
                        return -1;
                    };
                    /**上架或者下架 */
                    SaleModel.salePetMarketUpOrDown = {
                        /**上架 */
                        MarketUp: "上架",
                        /**下架 */
                        MarketDown: "下架",
                    };
                    return SaleModel;
                }());
                models.SaleModel = SaleModel;
            })(models = sale.models || (sale.models = {}));
        })(sale = modules.sale || (modules.sale = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=SaleModel.js.map