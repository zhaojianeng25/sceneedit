var TIPS_TYPE;
(function (TIPS_TYPE) {
    /**
     * 背包
     */
    TIPS_TYPE[TIPS_TYPE["BAG"] = 1] = "BAG";
    /**
     * 强化
     */
    TIPS_TYPE[TIPS_TYPE["QIANGHUA"] = 2] = "QIANGHUA";
    /**
     * 宠物的技能
     */
    TIPS_TYPE[TIPS_TYPE["SKILL"] = 3] = "SKILL";
    /**
     * 通用的物品tips
     */
    TIPS_TYPE[TIPS_TYPE["commonItem"] = 4] = "commonItem";
    /**
     * 活动
     */
    TIPS_TYPE[TIPS_TYPE["ACTIVITY"] = 5] = "ACTIVITY";
    /**
     * 客户端说明类型提示信息
     */
    TIPS_TYPE[TIPS_TYPE["CLIENTMESSAGE"] = 6] = "CLIENTMESSAGE";
    /**
     * 伙伴技能
     */
    TIPS_TYPE[TIPS_TYPE["HUOBANSKILL"] = 7] = "HUOBANSKILL";
    /**
     * 客户端弹窗类型tips
     */
    TIPS_TYPE[TIPS_TYPE["CLIENT_TIPS_MESSAGE"] = 8] = "CLIENT_TIPS_MESSAGE";
    /**
     * 宠物装备背包
     */
    TIPS_TYPE[TIPS_TYPE["PETEQUIP"] = 9] = "PETEQUIP";
    /**
     * 拍卖行tips
     */
    TIPS_TYPE[TIPS_TYPE["AUCTION"] = 10] = "AUCTION";
})(TIPS_TYPE || (TIPS_TYPE = {}));
/** 物品对应的详细类型 只针对页面的跳转，直接使用不算计 */
var ItemTypeId;
(function (ItemTypeId) {
    /**打造材料 */
    ItemTypeId[ItemTypeId["TuzhiItem"] = 2470] = "TuzhiItem";
    /**杂货*/
    ItemTypeId[ItemTypeId["OtherItem"] = 150] = "OtherItem";
    /**奖励 */
    ItemTypeId[ItemTypeId["Present"] = 4262] = "Present";
    /**武器制造材料 */
    ItemTypeId[ItemTypeId["ForgeStone"] = 310] = "ForgeStone";
    /**裁缝制造材料 */
    ItemTypeId[ItemTypeId["TailorDye"] = 326] = "TailorDye";
    /**炼金制造材料 */
    ItemTypeId[ItemTypeId["SmeltFusion"] = 342] = "SmeltFusion";
    /**打造图纸*/
    ItemTypeId[ItemTypeId["TuzhiMake"] = 422] = "TuzhiMake";
    /**洗点道具 */
    ItemTypeId[ItemTypeId["TimeReturn"] = 294] = "TimeReturn";
    /**临时符 */
    ItemTypeId[ItemTypeId["AttrUpItem"] = 358] = "AttrUpItem";
    /**藏宝图 */
    ItemTypeId[ItemTypeId["TreasuremapItem"] = 118] = "TreasuremapItem";
    /**高级藏宝图 */
    ItemTypeId[ItemTypeId["SuperTreasureMapItem"] = 198] = "SuperTreasureMapItem";
    /**巨龙残骸(合成藏宝图)*/
    ItemTypeId[ItemTypeId["SynthesisTresureMap"] = 374] = "SynthesisTresureMap";
    /**光环碎片(合成光环卷轴) */
    ItemTypeId[ItemTypeId["FormBookHalf"] = 262] = "FormBookHalf";
    /**光环卷轴)*/
    ItemTypeId[ItemTypeId["FormBook"] = 278] = "FormBook";
    /**人物专精道具 */
    ItemTypeId[ItemTypeId["RoleParticleBook"] = 566] = "RoleParticleBook";
    /**宠物专精道具*/
    ItemTypeId[ItemTypeId["PetParticleBook"] = 550] = "PetParticleBook";
    /**人物染色 */
    ItemTypeId[ItemTypeId["RoleColorItem"] = 4534] = "RoleColorItem";
    /**人物染色*/
    ItemTypeId[ItemTypeId["PetColorItem"] = 4550] = "PetColorItem";
    /**瑟银钥匙 */
    ItemTypeId[ItemTypeId["SilverKeyItem"] = 4566] = "SilverKeyItem";
    /**氪金钥匙*/
    ItemTypeId[ItemTypeId["GoldKeyItem"] = 4582] = "GoldKeyItem";
    /**更名卡 */
    ItemTypeId[ItemTypeId["RenameCardItem"] = 4614] = "RenameCardItem";
    /**礼物 */
    ItemTypeId[ItemTypeId["ShenShouExchangeItem"] = 4630] = "ShenShouExchangeItem";
    /**宠物技能&*/
    ItemTypeId[ItemTypeId["PetSkillItem"] = 49] = "PetSkillItem";
    /**宝石 */
    ItemTypeId[ItemTypeId["GemItem"] = 5] = "GemItem";
})(ItemTypeId || (ItemTypeId = {}));
/**itemTips的培新 */
var ITEM_TYPE;
(function (ITEM_TYPE) {
    /**背包 */
    ITEM_TYPE[ITEM_TYPE["BAG_ITEM"] = 1] = "BAG_ITEM";
    /**强化 */
    ITEM_TYPE[ITEM_TYPE["QIANGHUA_ITEM"] = 2] = "QIANGHUA_ITEM";
    /**签到*/
    ITEM_TYPE[ITEM_TYPE["QIANDAO_ITEM"] = 3] = "QIANDAO_ITEM";
    /**技能*/
    ITEM_TYPE[ITEM_TYPE["SKILL_ITEM"] = 4] = "SKILL_ITEM";
    /**奖励 */
    ITEM_TYPE[ITEM_TYPE["REWARD_ITEM"] = 5] = "REWARD_ITEM";
    /**活动 */
    ITEM_TYPE[ITEM_TYPE["ACTIVITY_ITEM"] = 6] = "ACTIVITY_ITEM";
})(ITEM_TYPE || (ITEM_TYPE = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tips;
        (function (tips_1) {
            var models;
            (function (models) {
                var TipsModel = /** @class */ (function () {
                    function TipsModel() {
                        /**程序内字符串表 */
                        this.cstringResConfigData = {};
                        /**装备洗练表 */
                        this.equipRefineInfoData = {};
                        /**装备洗特技表 */
                        this.equipRefineSkillInfoData = {};
                        /**附魔效果配置表 */
                        this.cfumoeffectformulaConfigData = {};
                        /**暂时存储洗练返回的属性 */
                        this.equipWashAttr = [];
                        /** 存放是哪个界面打开了查看道具信息tips,供查看道具信息tips跳转拍卖行使用 */
                        this.whichView = "";
                        /** 存放当前被查看信息的道具id */
                        this.currItemId = -1;
                        /** 存放当前被查看信息的道具key */
                        this.currItemKey = -1;
                        /**t特技特效显示表 */
                        this.equipSkillData = {};
                    }
                    TipsModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TipsModel();
                        }
                        return this._instance;
                    };
                    TipsModel.clearModelData = function () {
                        tips.models.TipsModel._instance.equipWashAttr = [];
                        tips.models.TipsModel._instance.whichView = "";
                        tips.models.TipsModel._instance.currItemId = -1;
                        tips.models.TipsModel._instance.currItemKey = -1;
                    };
                    /**
                     * 获取背包中装备的key
                     */
                    TipsModel.prototype.getKey = function (bag, equId) {
                        var items = bag.items; //物品列表
                        for (var i = 0; i < items.length; i++) {
                            var id = items[i].id; //物品id
                            if (equId == id) {
                                var keyinpack = items[i].key;
                                return keyinpack;
                            }
                        }
                        return -1;
                    };
                    /**显示需要银币的数量，改变颜色 */
                    TipsModel.prototype.showNeedNum = function (needNum, haveNum, label, isMoney) {
                        if (isMoney) {
                            label.text = needNum + "";
                            if (haveNum >= needNum) {
                                label.color = "#FFF2DF";
                            }
                            else {
                                label.color = "#FF2800";
                            }
                        }
                        else {
                            var iHaveNum = 0;
                            if (haveNum > 0) {
                                iHaveNum = haveNum;
                            }
                            label.text = iHaveNum + "/" + needNum;
                            if (haveNum >= needNum) {
                                label.color = "#0A6404";
                            }
                            else {
                                label.color = "#FF2800";
                            }
                        }
                    };
                    /**当前装备是否是宠物装备 */
                    TipsModel.prototype.isPetEquip = function (equipId) {
                        var isPetEquip = false;
                        if (equipId >= 130000 && equipId <= 130100) { //当前装备是否为宠物装备
                            isPetEquip = true;
                        }
                        return isPetEquip;
                    };
                    /**
                     *
                     * @param bagType 背包类型
                     * @param keyinpack key
                     * @param data
                     */
                    TipsModel.prototype.ss = function (bagType, keyinpack, data) {
                        var tipsVo = new game.modules.strengThening.models.TipsVo();
                        var foodVo = new game.modules.strengThening.models.FoodVo();
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                        var items = bag.items;
                        for (var i = 0; i < items.length; i++) {
                            var key = items[i].key;
                            if (key == keyinpack) {
                                var id = items[i].id;
                                if (120000 <= id && id <= 126675 || 140000 <= id && id <= 140005 || 10000 <= id && id <= 10009) { //装备  
                                    tipsVo.fromByteArray(data);
                                    return tipsVo;
                                }
                                else if (111000 <= id && id <= 111053) {
                                    foodVo.fromByteArray(data);
                                    return foodVo;
                                }
                            }
                        }
                    };
                    /**
                    * 返回装备背包特技信息
                    */
                    TipsModel.prototype.getEquipStunt = function () {
                        var equipTips = StrengTheningModel.getInstance().equipTips;
                        var equipStunt = [];
                        for (var i = 0; i < equipTips.length; i++) {
                            var tipsKey = equipTips[i].keyinpack;
                            var tipsPackid = equipTips[i].packid;
                            var tips = equipTips[i].tips;
                            var baseAttr = tips.baseAttr; //基础属性
                            var addAttr = tips.addAttr; //附加属性
                            var effect = tips.effect; //特效
                            var skill = tips.skill; //特技
                            if (skill && skill != 0)
                                equipStunt.push(equipTips[i]);
                        }
                        return equipStunt;
                    };
                    /** 获得装备附魔属性的中文名字
                     * @param shuxingid 属性id
                     */
                    TipsModel.prototype.getEquipFuMoName = function (shuxingid) {
                        var shuxingName = "";
                        if (shuxingid) {
                            switch (shuxingid) {
                                case shuxing.MAX_HP:
                                    shuxingName = "生命";
                                    break;
                                case shuxing.ATTACK:
                                    shuxingName = "物理攻击";
                                    break;
                                case shuxing.MAGIC_ATTACK:
                                    shuxingName = "法术攻击";
                                    break;
                                case shuxing.DEFEND:
                                    shuxingName = "物理防御";
                                    break;
                                case shuxing.MAGIC_DEF:
                                    shuxingName = "法术防御";
                                    break;
                                case shuxing.SP:
                                    shuxingName = "怒气";
                                    break;
                                case shuxing.ATTACK:
                                    shuxingName = "治疗强度";
                                    break;
                                case shuxing.SEAL:
                                    shuxingName = "控制命中和控制抗性";
                                    break;
                                case shuxing.SPEED:
                                    shuxingName = "速度";
                                    break;
                            }
                        }
                        return shuxingName;
                    };
                    /** 获得附魔临时加上属性的文本内容
                     * @param fuMoShuXingData 附魔临时加属性的数据
                     */
                    TipsModel.prototype.getFuMoHtmlStr = function (fuMoShuXingData) {
                        var html = "";
                        if (fuMoShuXingData.length != 0) {
                            var _enhancementAttr = fuMoShuXingData[0].enhancementAttr; //当时附魔的属性数据
                            var _keys = _enhancementAttr.keys; //附魔的属性id
                            var _value = _enhancementAttr.get(_keys[0]); //附魔的属性值
                            var _shuxingName = this.getEquipFuMoName(_keys[0]);
                            var _endTime = fuMoShuXingData[0].enhancementtime; //临时附魔结束的时间戳
                            var _currTime = (new Date()).valueOf(); //当前时间的时间戳
                            var _lastTime = Number(_endTime) - Number(_currTime);
                            if (_lastTime > 0) {
                                _lastTime = Math.round(_lastTime / 1000 / 60 / 60 % 24);
                                var _lastTimeStr = "&nbsp;" + this.cstringResConfigData[2162].msg + _lastTime + this.cstringResConfigData[318].msg;
                                html += "<span style='fontSize:15'>&nbsp;&nbsp;&nbsp;&nbsp;  </span><br>";
                                html += "<span style='color:#13FF00;fontSize:24'>" + this.cstringResConfigData[11286].msg + _shuxingName + "&nbsp;+&nbsp;" + _value + _lastTimeStr + "</span><br/>";
                            }
                        }
                        return html;
                    };
                    /**按钮的名称 */
                    TipsModel.stringType = {
                        fenjie: "分解",
                        shanghui: "商会出售",
                        paimai: "拍卖",
                        hecheng: "合成",
                        drop: "丢弃",
                        xiangqian: "镶嵌",
                        xilian: "洗炼",
                        chongzhu: "重铸",
                        xiteji: "洗特技",
                        equipType: "类型:",
                        cishu: "次数:",
                        huoyuedu: "活跃度奖励:",
                        huodongshijian: "活动时间:",
                        roleNum: "人数要求:",
                        levelNum: "等级要求:",
                        zhiliao: "治疗强度",
                        zhudong: "主动",
                        itemNotEnough: "卷轴碎片不足5个，无法合成阵法卷轴",
                    };
                    return TipsModel;
                }());
                models.TipsModel = TipsModel;
            })(models = tips_1.models || (tips_1.models = {}));
        })(tips = modules.tips || (modules.tips = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TipsModel.js.map