var SErrorCode;
(function (SErrorCode) {
    /**
     * 寒铁不足
     */
    SErrorCode[SErrorCode["TIE_NOT_ENOUGH"] = -3] = "TIE_NOT_ENOUGH";
    /**
     * 图纸不足
     */
    SErrorCode[SErrorCode["TUZHI_NOT_ENOUGH"] = -4] = "TUZHI_NOT_ENOUGH";
    /**
     * 金钱不足
     */
    SErrorCode[SErrorCode["MONEY_NOT_ENOUGH"] = -5] = "MONEY_NOT_ENOUGH";
    /**
     * 制造符不足
     */
    SErrorCode[SErrorCode["ZHI_ZHAO_FU_NOT_ENOUGH"] = -11] = "ZHI_ZHAO_FU_NOT_ENOUGH";
    /**
     * 强化石不足
     */
    SErrorCode[SErrorCode["QIANG_HUA_SHI_NOT_ENOUGH"] = -12] = "QIANG_HUA_SHI_NOT_ENOUGH";
    /**
     * 修理材料不足
     */
    SErrorCode[SErrorCode["XIU_LI_CAI_LIAO_NOT_ENOUGH"] = -13] = "XIU_LI_CAI_LIAO_NOT_ENOUGH";
})(SErrorCode || (SErrorCode = {}));
var repairResult;
(function (repairResult) {
    /**修理成功 */
    repairResult[repairResult["REPAIR_SUCCESS"] = 1] = "REPAIR_SUCCESS";
    /**修理失败 */
    repairResult[repairResult["REPAIR_FAIL"] = 0] = "REPAIR_FAIL";
})(repairResult || (repairResult = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var strengThening;
        (function (strengThening) {
            var models;
            (function (models) {
                var StrengTheningModel = /** @class */ (function () {
                    function StrengTheningModel() {
                        /**装备打造表 */
                        this.equipMakeInfoData = {};
                        /**装备表1 */
                        this.equipEffectData = {};
                        /**装备表-宝石-修理 */
                        this.equipItemAttrData = {};
                        /**宝石表 */
                        this.gemEffectData = {};
                        /**杂货表 */
                        this.groceryEffectData = {};
                        /**道具类型表 */
                        this.itemTypeData = {};
                        /**宝石类型表 */
                        this.gemTypeData = {};
                        /**装备部件对应表 */
                        this.equipPosNameData = {};
                        /**道具合成表 */
                        this.cequipCombinData = {};
                        /**装备附加属性库 */
                        this.equipAddattributelibData = {};
                        /**装备附加属性库by skillid */
                        this.equipAddattributelibDataBySkill = {};
                        /**装备生成基础属性表 */
                        this.equipIteminfoData = {};
                        /**属性效果id表 */
                        this.attributeDesConfigData = {};
                        /**获取途径表 */
                        this.comeFromData = {};
                        /**拥有的装备id */
                        this.haveEquIdArr = [];
                        /**拥有的杂货id */
                        this.havegroceryEffectArr = [];
                        /**玩家拥有的宝石id、数量 */
                        this.haveGemIdArr = [];
                        /** 镶嵌列表要显示的装备 */
                        this.insetEquipment = new Laya.Dictionary;
                        /**
                         * 物品边框
                         */
                        this.frameSkinArr = [
                            "common/ui/tongyong/baikuang.png",
                            "common/ui/tongyong/lvkuang.png",
                            "common/ui/tongyong/lankuang.png",
                            "common/ui/tongyong/zikuang.png",
                            "common/ui/tongyong/jinkuang.png"
                        ]; //金框
                        /**
                         * 装备tips
                         */
                        this.equipTips = [];
                        this.tabNum = 0;
                        /**强化id */
                        this.strengTheningId = -1;
                    }
                    /**
                     * 显示界面的拥有银币数量
                     */
                    StrengTheningModel.prototype.inintHaveMoney = function (haveMoneylab) {
                        var sliverIcon = bagModel.getInstance().sliverIcon; //银币
                        if (sliverIcon == undefined) {
                            haveMoneylab.text = "0";
                        }
                        else {
                            haveMoneylab.text = sliverIcon + "";
                        }
                    };
                    StrengTheningModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new StrengTheningModel();
                        }
                        return this._instance;
                    };
                    StrengTheningModel.clearModelData = function () {
                        strengThening.models.StrengTheningModel._instance.StrengTheningDatail = new models.StrengTheningDatailVo();
                        strengThening.models.StrengTheningModel._instance.haveEquIdArr = [];
                        strengThening.models.StrengTheningModel._instance.havegroceryEffectArr = [];
                        strengThening.models.StrengTheningModel._instance.haveGemIdArr = [];
                        strengThening.models.StrengTheningModel._instance.insetEquipment = new Laya.Dictionary();
                    };
                    /**获取当前装备镶嵌的宝石
                     * @param packid 背包Id
                     * @param key  key
                    */
                    StrengTheningModel.prototype.equGem = function (packid, key) {
                        var diamondID = [];
                        var equipTips = models.StrengTheningModel._instance.equipTips;
                        for (var i in equipTips) {
                            var equPackid = equipTips[i].packid; //背包id
                            var equKey = equipTips[i].keyinpack; //装备的key
                            if (packid == equPackid && key == equKey) {
                                diamondID = equipTips[i].tips.diamondID;
                                return diamondID;
                            }
                        }
                        return diamondID;
                    };
                    /** 获取当前需要镶嵌的装备在先前界面初始化后的位置 */
                    StrengTheningModel.prototype.getInsertEquipPos = function (equarr) {
                        if (equarr === void 0) { equarr = []; }
                        var packid_key = this.insetEquipment.keys[0];
                        var key_value = this.insetEquipment.get(packid_key);
                        for (var _index = 0; _index < equarr.length; _index++) {
                            if (equarr[_index].packid == packid_key && equarr[_index].key == key_value) {
                                this.insetEquipment.clear();
                                return _index;
                            }
                        }
                        return -1;
                    };
                    /**当前装备是否是已经装备的
                     * @param equipId 装备id
                     * @param equipKey 装备key
                     */
                    StrengTheningModel.prototype.isWearEquip = function (equipId, equipKey) {
                        var isWear = false;
                        var bag3 = bagModel.getInstance().bagMap[BagTypes.EQUIP];
                        var items = [];
                        if (bag3) {
                            items = bag3.items;
                        }
                        for (var i in items) {
                            var id = items[i].id;
                            var key = items[i].key;
                            if (id == equipId && key == equipKey) {
                                isWear = true;
                            }
                        }
                        return isWear;
                    };
                    /**强化提示 */
                    StrengTheningModel.makeType = {
                        make_qinghua: "强化打造不同品质装备概率",
                        make_putong: "强化打造不同品质装备概率"
                    };
                    return StrengTheningModel;
                }());
                models.StrengTheningModel = StrengTheningModel;
            })(models = strengThening.models || (strengThening.models = {}));
        })(strengThening = modules.strengThening || (modules.strengThening = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=StrengTheningModel.js.map