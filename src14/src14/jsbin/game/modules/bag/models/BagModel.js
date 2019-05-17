/**
 * @describe  背包类型
 */
var BagTypes;
(function (BagTypes) {
    /**背包为空 */
    BagTypes[BagTypes["EMPTY"] = 0] = "EMPTY";
    /**背包 */
    BagTypes[BagTypes["BAG"] = 1] = "BAG";
    /**仓库 */
    BagTypes[BagTypes["DEPOT"] = 2] = "DEPOT";
    /**装备背包 */
    BagTypes[BagTypes["EQUIP"] = 3] = "EQUIP";
    /**临时背包 */
    BagTypes[BagTypes["TEMP"] = 4] = "TEMP";
    /**任务背包 */
    BagTypes[BagTypes["QUEST"] = 5] = "QUEST";
    /**拍卖背包 */
    BagTypes[BagTypes["MARKET"] = 6] = "MARKET";
    /**黑市背包 */
    BagTypes[BagTypes["BLACKMARKET"] = 7] = "BLACKMARKET";
    /**拍卖临时背包 */
    BagTypes[BagTypes["MARKETTEMP"] = 8] = "MARKETTEMP";
    /**宠物装备 */
    BagTypes[BagTypes["PETEQUIP"] = 9] = "PETEQUIP";
    /**天梯背包 */
    BagTypes[BagTypes["TIANTI"] = 10] = "TIANTI";
})(BagTypes || (BagTypes = {}));
/**
 * op装备
 */
var OpEquip;
(function (OpEquip) {
    /** 穿上装备 */
    OpEquip[OpEquip["PUTON"] = 1] = "PUTON";
    /** 脱下装备 */
    OpEquip[OpEquip["TAKEOFF"] = 2] = "TAKEOFF";
})(OpEquip || (OpEquip = {}));
/**
 * @describe  钱币类型
 */
var MoneyTypes;
(function (MoneyTypes) {
    /**无效类型 */
    MoneyTypes[MoneyTypes["MoneyType_None"] = 0] = "MoneyType_None";
    /**银币 */
    MoneyTypes[MoneyTypes["MoneyType_SilverCoin"] = 1] = "MoneyType_SilverCoin";
    /**金币 */
    MoneyTypes[MoneyTypes["MoneyType_GoldCoin"] = 2] = "MoneyType_GoldCoin";
    /**符石 */
    MoneyTypes[MoneyTypes["MoneyType_HearthStone"] = 3] = "MoneyType_HearthStone";
    /**职业贡献 */
    MoneyTypes[MoneyTypes["MoneyType_ProfContribute"] = 4] = "MoneyType_ProfContribute";
    /**荣誉值 */
    MoneyTypes[MoneyTypes["MoneyType_RongYu"] = 5] = "MoneyType_RongYu";
    /**公会贡献 */
    MoneyTypes[MoneyTypes["MoneyType_FactionContribute"] = 6] = "MoneyType_FactionContribute";
    /**声望 */
    MoneyTypes[MoneyTypes["MoneyType_ShengWang"] = 7] = "MoneyType_ShengWang";
    /**节日积分 */
    MoneyTypes[MoneyTypes["MoneyType_FestivalPoint"] = 8] = "MoneyType_FestivalPoint";
    /**良师值 */
    MoneyTypes[MoneyTypes["MoneyType_GoodTeacherVal"] = 9] = "MoneyType_GoodTeacherVal";
    /**角色经验 */
    MoneyTypes[MoneyTypes["MoneyType_RoleExp"] = 10] = "MoneyType_RoleExp";
    /**活跃度 */
    MoneyTypes[MoneyTypes["MoneyType_Activity"] = 11] = "MoneyType_Activity";
    /**活力 */
    MoneyTypes[MoneyTypes["MoneyType_Energy"] = 12] = "MoneyType_Energy";
    /**信用点 */
    MoneyTypes[MoneyTypes["MoneyType_EreditPoint"] = 13] = "MoneyType_EreditPoint";
    /** 天梯币 */
    MoneyTypes[MoneyTypes["MoneyType_TianTiCoin"] = 14] = "MoneyType_TianTiCoin";
    /**巧匠值 */
    MoneyTypes[MoneyTypes["MoneyType_QiaoJiang"] = 15] = "MoneyType_QiaoJiang";
    /**道具 */
    MoneyTypes[MoneyTypes["MoneyType_Item"] = 99] = "MoneyType_Item";
    /**类型数量 */
    MoneyTypes[MoneyTypes["MoneyType_Num"] = 17] = "MoneyType_Num";
    /** 自己定义使用的金币类型，使用与3类型一致 */
    MoneyTypes[MoneyTypes["MoneyType_SupFushi"] = 20] = "MoneyType_SupFushi";
})(MoneyTypes || (MoneyTypes = {}));
;
var RefreshRoleScore;
(function (RefreshRoleScore) {
    /**综合评分 */
    RefreshRoleScore[RefreshRoleScore["TOTAL_SCORE"] = 1] = "TOTAL_SCORE";
    /**装备评分 */
    RefreshRoleScore[RefreshRoleScore["EQUIP_SCORE"] = 2] = "EQUIP_SCORE";
    /**多宠物评分 */
    RefreshRoleScore[RefreshRoleScore["MANY_PET_SCORE"] = 3] = "MANY_PET_SCORE";
    /**单宠物评分 */
    RefreshRoleScore[RefreshRoleScore["PET_SCORE"] = 4] = "PET_SCORE";
    /**等级评分 */
    RefreshRoleScore[RefreshRoleScore["LEVEL_SCORE"] = 5] = "LEVEL_SCORE";
    /**修炼评分 */
    RefreshRoleScore[RefreshRoleScore["XIULIAN_SCORE"] = 6] = "XIULIAN_SCORE";
    /**人物评分 */
    RefreshRoleScore[RefreshRoleScore["ROLE_SCORE"] = 7] = "ROLE_SCORE";
    /**技能评分 */
    RefreshRoleScore[RefreshRoleScore["SKILL_SCORE"] = 8] = "SKILL_SCORE";
})(RefreshRoleScore || (RefreshRoleScore = {}));
/** tips 用途 */
var ItemPurpose;
(function (ItemPurpose) {
    /** 转移 */
    ItemPurpose[ItemPurpose["ITEM_TRANSFER"] = 1] = "ITEM_TRANSFER";
})(ItemPurpose || (ItemPurpose = {}));
/** 战斗背包药品类型 */
var FightDrugType;
(function (FightDrugType) {
    /** 恢复 */
    FightDrugType[FightDrugType["RECOVER"] = 1] = "RECOVER";
    /** 解控 */
    FightDrugType[FightDrugType["CONTROL"] = 2] = "CONTROL";
    /** 复活 */
    FightDrugType[FightDrugType["RESURRECTION"] = 3] = "RESURRECTION";
    /** 显彰 */
    FightDrugType[FightDrugType["OBVIOUS"] = 4] = "OBVIOUS";
    /** 怒气 */
    FightDrugType[FightDrugType["ANGER"] = 5] = "ANGER";
})(FightDrugType || (FightDrugType = {}));
/** 角色换装枚举 */
var SpriteComponents;
(function (SpriteComponents) {
    /** 武器 */
    SpriteComponents[SpriteComponents["SPRITE_WEAPON"] = 1] = "SPRITE_WEAPON";
    /** 头饰 */
    SpriteComponents[SpriteComponents["SPRITE_HEADDRESS"] = 2] = "SPRITE_HEADDRESS";
    /** 背饰 */
    SpriteComponents[SpriteComponents["SPRITE_BACKDRESS"] = 3] = "SPRITE_BACKDRESS";
    /** 面饰1 */
    SpriteComponents[SpriteComponents["SPRITE_FACEDRESS1"] = 4] = "SPRITE_FACEDRESS1";
    /** 面饰2 */
    SpriteComponents[SpriteComponents["SPRITE_FACEDRESS2"] = 5] = "SPRITE_FACEDRESS2";
    /** 坐骑 */
    SpriteComponents[SpriteComponents["SPRITE_HORSEDRESS"] = 6] = "SPRITE_HORSEDRESS";
    /**  武器颜色	byte 1为白色，2为绿色。。4为紫色 5为橙色*/
    SpriteComponents[SpriteComponents["SPRITE_WEAPONCOLOR"] = 7] = "SPRITE_WEAPONCOLOR";
    /** 时装 */
    SpriteComponents[SpriteComponents["SPRITE_FASHION"] = 8] = "SPRITE_FASHION";
    /** 染色部位1 */
    SpriteComponents[SpriteComponents["ROLE_COLOR1"] = 50] = "ROLE_COLOR1";
    /**  染色部位2*/
    SpriteComponents[SpriteComponents["ROLE_COLOR2"] = 51] = "ROLE_COLOR2";
    /** 装备特效 */
    SpriteComponents[SpriteComponents["SPRITE_EQUIP_EFFECT"] = 60] = "SPRITE_EQUIP_EFFECT";
})(SpriteComponents || (SpriteComponents = {}));
//标志，叠加的时候，flags 也 OR 叠加。
var FlagsType;
(function (FlagsType) {
    /** 不可交易给玩家，不可卖店 */
    FlagsType[FlagsType["BIND"] = 1] = "BIND";
    /** 用符石购买而来 */
    FlagsType[FlagsType["FUSHI"] = 2] = "FUSHI";
    /** 摆摊出售中 */
    FlagsType[FlagsType["ONSTALL"] = 4] = "ONSTALL";
    /** 在商会中上架 */
    FlagsType[FlagsType["ONCOFCSELL"] = 8] = "ONCOFCSELL";
    /** 不能卖店 */
    FlagsType[FlagsType["CANNOTONSTALL"] = 16] = "CANNOTONSTALL";
    /** 类型17 */
    FlagsType[FlagsType["BIND_CANNOTONSTALL"] = 17] = "BIND_CANNOTONSTALL";
    /** 锁定 */
    FlagsType[FlagsType["LOCK"] = 32] = "LOCK";
    /** 时效物品 */
    FlagsType[FlagsType["TIMEOUT"] = 64] = "TIMEOUT";
})(FlagsType || (FlagsType = {}));
/** 装备部位类型 */
var EquipType;
(function (EquipType) {
    /** 武器 */
    EquipType[EquipType["ARMS"] = 0] = "ARMS";
    /** 头盔 */
    EquipType[EquipType["HELMET"] = 1] = "HELMET";
    /** 项链 */
    EquipType[EquipType["NECKLACE"] = 2] = "NECKLACE";
    /** 衣服 */
    EquipType[EquipType["CLOTHES"] = 3] = "CLOTHES";
    /** 腰带 */
    EquipType[EquipType["BELT"] = 4] = "BELT";
    /** 鞋子 */
    EquipType[EquipType["SHOES"] = 5] = "SHOES";
})(EquipType || (EquipType = {}));
/** 道具总类型 */
var ItemTotalType;
(function (ItemTotalType) {
    /** 宠物道具 */
    ItemTotalType[ItemTotalType["PetItem"] = 1] = "PetItem";
    /** 食品道具 */
    ItemTotalType[ItemTotalType["FoodItem"] = 2] = "FoodItem";
    /** 药品道具 */
    ItemTotalType[ItemTotalType["DrugItem"] = 3] = "DrugItem";
    /** 宝石 */
    ItemTotalType[ItemTotalType["GemItem"] = 5] = "GemItem";
    /** 杂货道具 */
    ItemTotalType[ItemTotalType["GroceriesItem"] = 6] = "GroceriesItem";
    /** 装备道具 */
    ItemTotalType[ItemTotalType["EquipItem"] = 8] = "EquipItem";
    /** 任务道具 */
    ItemTotalType[ItemTotalType["TaskItem"] = 9] = "TaskItem";
    /** 宠物装备 */
    ItemTotalType[ItemTotalType["PetEquipItem"] = 10] = "PetEquipItem";
})(ItemTotalType || (ItemTotalType = {}));
/** 装备品质 */
var EquipNquality;
(function (EquipNquality) {
    /** 白色 */
    EquipNquality[EquipNquality["White"] = 1] = "White";
    /** 绿色 */
    EquipNquality[EquipNquality["Green"] = 2] = "Green";
    /** 蓝色 */
    EquipNquality[EquipNquality["Blue"] = 3] = "Blue";
    /** 紫色 */
    EquipNquality[EquipNquality["Purple"] = 4] = "Purple";
    /** 橙色 */
    EquipNquality[EquipNquality["Orange"] = 5] = "Orange";
})(EquipNquality || (EquipNquality = {}));
/** 使用物品（对某对象进行使用）,例如：在c2s_CAppend_Item所需参数会用到该枚举类 */
var IDType;
(function (IDType) {
    /** 人物 */
    IDType[IDType["ROLE"] = 0] = "ROLE";
    /** 宠物 */
    IDType[IDType["PET"] = 1] = "PET";
    /** 物品 */
    IDType[IDType["ITEM"] = 2] = "ITEM";
})(IDType || (IDType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var bag;
        (function (bag_1) {
            var models;
            (function (models) {
                /**仓库数最大上限 */
                var MAX_STOREHOUSE_NUMBER = 10;
                var BagModel = /** @class */ (function () {
                    function BagModel() {
                        /**宝石表、r任务物品表、s食品表、z杂货表、z装备表、c宠物物品表的复合表 */
                        this.itemAttrData = {};
                        /**c宠物物品表 */
                        this.petItemEffectData = {};
                        /**b背包扩充价格表 */
                        this.bagTableData = {};
                        /**c仓库扩充价格 */
                        this.depottableData = {};
                        /**r任务物品表 */
                        this.taskRelativeData = {};
                        /**人物评分 */
                        this.roleScore = 0;
                        /** 符石(元宝数量) */
                        this.fuShiIcon = 0;
                        /**金币数量 */
                        this.globalIcon = 0;
                        /**银币数量 */
                        this.sliverIcon = 0;
                        /**荣誉值*/
                        this.honnorIcon = 0;
                        /** 帮贡 */
                        this.FactionContribute = 0;
                        /**	现有的浮石数量 绑定+非绑定 */
                        this.yuanbaoIcon = 0;
                        /** 总的充值符石数量 */
                        this.totalnum = 0;
                        /**仓库名称数据 */
                        this.storeHouseBtnName = [];
                        /**服务端存储的仓库名称数据 */
                        this.server_storeHouseBtnName = [];
                        /**修改仓库名称的最大的字数 */
                        this._storeHouseRenameNumber = 5;
                        /**修改仓库界面；输入提示 */
                        this._storeHouseRenamePrompt = "点击这里输入";
                        /** 仓库的最小值 */
                        this.minDeptNum = 50;
                        /** 背包格子的最小值 */
                        this.minBagNum = 60;
                        /** 实际背包的格子数 */
                        this.actBagNum = 60;
                        /** 当前所在仓库的Id */
                        this.currDepotId = -1;
                        /**仓库按钮是否打开 */
                        this._isStoreHouseBtnOpen = false;
                        /**bagVo */
                        this.bagMap = {};
                        /**1金币可换取100银币 */
                        this.exchangeRateOfGold = 100;
                        /**1元宝可以换取10000银币 */
                        this.exchangeRateOfYuanBao = 10000;
                        /**当前骑乘的坐骑Id */
                        this.currentRideId = -1;
                        /** 角色是否穿装备 0 脱 其他 穿  */
                        this.rolePutOn = -1;
                        /** 新增物品滑动过场数据 */
                        this.SlideItem = [];
                        /** 道具使用提示表 */
                        this.ItemUseTip = {};
                        /** z战斗中药品类型表.xlsx */
                        this.FightDrugTypeData = {};
                        /**背包界面开关情况 */
                        this.bagkey = true;
                        /** 背包装备替换前存储的数据 key装备类型 value key */
                        this.equipRelace = new Laya.Dictionary;
                        /** 存储被借出道具key key：道具id  value：道具是否要被删除 */
                        this.lendItemsDic = new Laya.Dictionary();
                        /** 存储珍品回收信息数据 */
                        this.itemRecoverInfoData = [];
                        this.roleScore = 0;
                        this.globalIcon = 0;
                        this.sliverIcon = 0;
                        this.honnorIcon = 0;
                        this.yuanbaoIcon = 0;
                        this.depotnameinfo = new Laya.Dictionary();
                        this.depotName = new Laya.Dictionary();
                        this.petequip = new Laya.Dictionary();
                        this.getGoods = new Laya.Dictionary();
                        this.roleComponentsChange = new Laya.Dictionary();
                        this.addItemUseGuide = new Laya.Dictionary();
                        this.initListener();
                    }
                    /**
                     * @describe  获取BagModel的单例
                     */
                    BagModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new BagModel();
                        }
                        return this._instance;
                    };
                    BagModel.clearModelData = function () {
                        bag.models.BagModel._instance.id = 0;
                        bag.models.BagModel._instance.roleScore = 0;
                        bag.models.BagModel._instance.fuShiIcon = 0;
                        bag.models.BagModel._instance.globalIcon = 0;
                        bag.models.BagModel._instance.sliverIcon = 0;
                        bag.models.BagModel._instance.honnorIcon = 0;
                        bag.models.BagModel._instance.FactionContribute = 0;
                        bag.models.BagModel._instance.yuanbaoIcon = 0;
                        bag.models.BagModel._instance.totalnum = 0;
                        bag.models.BagModel._instance.depotnameinfo = new Laya.Dictionary();
                        bag.models.BagModel._instance.depotName = new Laya.Dictionary();
                        bag.models.BagModel._instance.storeHouseBtnName = [];
                        bag.models.BagModel._instance.server_storeHouseBtnName = [];
                        bag.models.BagModel._instance._storeHouseRenameNumber = 5;
                        bag.models.BagModel._instance._storeHouseRenamePrompt = "点击这里输入";
                        bag.models.BagModel._instance.minDeptNum = 50;
                        bag.models.BagModel._instance.minBagNum = 60;
                        bag.models.BagModel._instance.actBagNum = 60;
                        bag.models.BagModel._instance.currDepotId = -1;
                        bag.models.BagModel._instance._isStoreHouseBtnOpen = false;
                        bag.models.BagModel._instance.bagMap = {};
                        bag.models.BagModel._instance.exchangeRateOfGold = 100;
                        bag.models.BagModel._instance.exchangeRateOfYuanBao = 10000;
                        bag.models.BagModel._instance.currentRideId = -1;
                        bag.models.BagModel._instance.petequip = new Laya.Dictionary();
                        bag.models.BagModel._instance.getGoods = new Laya.Dictionary();
                        bag.models.BagModel._instance.roleComponentsChange = new Laya.Dictionary();
                        bag.models.BagModel._instance.rolePutOn = -1;
                        bag.models.BagModel._instance.addItemUseGuide = new Laya.Dictionary();
                        bag.models.BagModel._instance.SlideItem = [];
                        bag.models.BagModel._instance.bagkey = true;
                        bag.models.BagModel._instance.equipRelace = new Laya.Dictionary();
                        bag.models.BagModel._instance.lendItemsDic = new Laya.Dictionary();
                        bag.models.BagModel._instance.itemRecoverInfoData = [];
                        bag.models.BagModel._instance.equipItemRecoverInfoTips = undefined;
                    };
                    /**
                     * @describe  从复合表中取出数据
                     * @param id  编号
                     * @return  该条id信息
                     */
                    BagModel.prototype.getItemAttrData = function (id) {
                        if (this.itemAttrData) {
                            return this.itemAttrData[id];
                        }
                    };
                    /**
                     * @describe  解析背包数据，比如获取准备背包数据
                     * @param bagTypes 背包类型
                     */
                    BagModel.prototype.getBagGameItemData = function (bagType) {
                        var bag = this.bagMap[bagType];
                        console.log("--------------------------------------------------BagTypes = " + BagTypes + ",bag = " + bag);
                        return bag;
                    };
                    /**
                     * @describe  获取服务端的roleDetail.depotNameInfo（仓库名称、个数储存）对象的长度
                     * @return  仓库个数，如果为0则仓库个数为2（赠送两个免费仓库），如果大于0（实际仓库数要加2）
                     */
                    BagModel.prototype.getDepotNumber = function () {
                        var isModifiedflag = this.server_storeHouseBtnName.length == 0 ? false : true;
                        this.storeHouseBtnName = [
                            { label: "免费仓库" },
                            { label: "免费仓库1" },
                        ];
                        if (this.depotnameinfo) {
                            var length_1 = this.depotnameinfo.keys.length;
                            console.log('depotnameinfo.keys.length========' + this.depotnameinfo.keys.length);
                            var judgeNumFlag = false;
                            //需要向this.storeHouseBtnName插入数据
                            for (var deptNum = 0; deptNum < length_1; deptNum++) {
                                this.storeHouseBtnName.push({ label: "仓库" + (deptNum + 1) });
                            }
                            if (length_1 < MAX_STOREHOUSE_NUMBER) { /** 小于仓库数最大值时才添加后面两个 */
                                if (length_1 % 2 == 0)
                                    judgeNumFlag = true;
                                for (var index = 0; index < (judgeNumFlag == true ? 2 : 1); index++) {
                                    this.storeHouseBtnName.push({ label: "" });
                                }
                            }
                            /** 將改名後的倉庫數據進行覆蓋 */
                            if (this.depotName.keys.length != 0) {
                                var keys = this.depotName.keys;
                                for (var deptRemaneIndex = 0; deptRemaneIndex < keys.length; deptRemaneIndex++) {
                                    var label = this.depotName.get(keys[deptRemaneIndex]);
                                    this.storeHouseBtnName[keys[deptRemaneIndex]].label = label;
                                }
                            }
                            return this.storeHouseBtnName.length;
                        }
                        else {
                            /** 是否有改名,有就进 */
                            // if(isModifiedflag) this.fullModified_DepotName(1);
                            for (var a = 0; a < 2; a++) {
                                this.storeHouseBtnName.push({ label: "" });
                            }
                        }
                        if (this.depotName.keys.length != 0) {
                            var keys = this.depotName.keys;
                            for (var deptRemaneIndex = 0; deptRemaneIndex < keys.length; deptRemaneIndex++) {
                                var label = this.depotName.get(keys[deptRemaneIndex]);
                                this.storeHouseBtnName[keys[deptRemaneIndex]].label = label;
                            }
                        }
                        return this.storeHouseBtnName.length;
                    };
                    /**
                     * @describe 获取某个仓库的数据
                     * @param 	pageId	仓库编号
                     * @return  baginfo
                     */
                    BagModel.prototype.getDepotData = function (pageId) {
                        var depotBag = this.bagMap[BagTypes.DEPOT];
                        if (typeof (depotBag) == "undefined")
                            depotBag = {};
                        var bag = depotBag[pageId];
                        return bag;
                    };
                    /**
                     * @describe  获得修改仓库名称的最大字数
                     * @return number   字数
                     */
                    BagModel.prototype.getStoreHouseRenameNumber = function () {
                        return this._storeHouseRenameNumber;
                    };
                    /**
                     * @describe  获得修改仓库界面的提示符
                     * @return  string
                     */
                    BagModel.prototype.getStoreHouseRenamePrompt = function () {
                        return this._storeHouseRenamePrompt;
                    };
                    /**
                     * @describe  获取扩展仓库需要的银币
                     * @param depotitem  已有仓库格
                     * @return  sliverNumber 银币数量
                     */
                    BagModel.prototype.getDeblockingDepotSilverNumber = function (depotItem) {
                        for (var index in this.depottableData) {
                            if (this.depottableData[index].haveCount == depotItem) {
                                return this.depottableData[index].needyinbi;
                            }
                        }
                        return 0;
                    };
                    /**
                     * @describe  获取解锁背包需要的银币
                     * @param   itemNum	已有的背包格子
                     * @return  所需要的银币数两
                     */
                    BagModel.prototype.getDeblockingBagSilverNumber = function (itemNum) {
                        for (var index in this.bagTableData) {
                            if (this.bagTableData[index].haveCount == itemNum) {
                                return this.bagTableData[index].needyinbi;
                            }
                        }
                        return 0;
                    };
                    /** 仓库改名的数据填充 */
                    BagModel.prototype.fullModified_DepotName = function (type) {
                        if (type == 1) {
                            console.log('this.storeHouseBtnName' + this.storeHouseBtnName);
                            this.storeHouseBtnName = this.server_storeHouseBtnName;
                            console.log('this.storeHouseBtnName' + this.storeHouseBtnName);
                        }
                        else {
                            this.server_storeHouseBtnName = this.storeHouseBtnName;
                        }
                    };
                    /**
                     * @describe 判断当前背包数据是否已满
                     * @param true 当前背包数据已满
                     * @param false 当前背包数据未满
                     */
                    BagModel.prototype.chargeBagIsFull = function () {
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                        var capacity = bag.capacity;
                        var itemlength = bag.items.length;
                        /** 格子数与物品数量判断 */
                        return capacity > itemlength ? false : true;
                    };
                    /**
                 * @describe 判断当前背包还有几个位置
                 *
                 */
                    BagModel.prototype.chargeSurplusLattice = function () {
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                        var capacity = bag.capacity;
                        var itemlength = bag.items.length;
                        return (capacity - itemlength);
                    };
                    /** 判断物品数量 */
                    BagModel.prototype.chargeItemNum = function (itemId) {
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                        var item = bag.items;
                        var num = 0;
                        for (var itemIndex = 0; itemIndex < item.length; itemIndex++) {
                            if (item[itemIndex].id == itemId) {
                                num = num + item[itemIndex].number;
                            }
                        }
                        return num;
                    };
                    /** 返回道具数量唯一的物品信息 */
                    BagModel.prototype.chargeItem = function (itemId) {
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);
                        var item = bag.items;
                        for (var itemIndex = 0; itemIndex < item.length; itemIndex++) {
                            if (item[itemIndex].id == itemId) {
                                return item[itemIndex];
                            }
                        }
                        return 0;
                    };
                    /** 返回道具信息数据 ItemVo
                     * @param packid 背包类型id 具体参见BagTypes
                     * @param itemId 道具id
                     * @param key 道具在对应背包里的key
                     * @param depotid 仓库的id 当packid等于BagTypes.DEPOT才有值
                     */
                    BagModel.prototype.getItemInfoData = function (packid, itemId, key, depotid) {
                        var items;
                        if (packid == BagTypes.PETEQUIP) {
                            var petEquipBag = this.bagMap[packid];
                            var petKey = PetModel.getInstance().petbasedata.key;
                            items = petEquipBag.get(petKey).items;
                        }
                        else if (packid == BagTypes.DEPOT) {
                            var depotBag = this.bagMap[packid];
                            items = depotBag[depotid].items;
                        }
                        else {
                            var bag_2 = BagModel.getInstance().getBagGameItemData(packid); //道具所在背包
                            if (!bag_2)
                                return null;
                            items = bag_2.items; //所在背包的所有道具
                        }
                        for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
                            if (items[itemIndex].id == itemId && items[itemIndex].key == key) {
                                return items[itemIndex]; //返回道具相对应的信息数据
                            }
                        }
                        return null;
                    };
                    /** 判断物品key */
                    BagModel.prototype.chargeItemKey = function (bagType, itemId) {
                        var bag = BagModel.getInstance().getBagGameItemData(bagType);
                        var item = bag.items;
                        for (var itemIndex = 0; itemIndex < item.length; itemIndex++) {
                            if (item[itemIndex].id == itemId) {
                                return item[itemIndex].key;
                            }
                        }
                        return -1;
                    };
                    /**
                     * 判断物品在背包中的位置
                     * @param bagType 背包类型 @param itemId 物品id
                     */
                    BagModel.prototype.chargeItemPos = function (bagType, itemId) {
                        var bag = BagModel.getInstance().getBagGameItemData(bagType);
                        var item = bag.items;
                        for (var itemIndex = 0; itemIndex < item.length; itemIndex++) {
                            if (item[itemIndex].id == itemId) {
                                return item[itemIndex].position;
                            }
                        }
                        return -1;
                    };
                    /**
                     * 获取特效路径
                     * @param aniName 特效名称 @param length 长度
                     */
                    BagModel.prototype.getEffectUrls = function (aniName, length) {
                        var urls = [];
                        for (var index = 1; index <= length; index++) {
                            urls.push("common/ui/tuji/" + aniName + index + ".png");
                        }
                        return urls;
                    };
                    /** 获取装备特效路径 */
                    BagModel.prototype.getEquipEffectPath = function (id) {
                        switch (id) {
                            case 10: //体质
                                break;
                            default:
                                break;
                        }
                    };
                    /** 判断当前的物品是否可以直接使用 */
                    BagModel.prototype.isCanDirectUse = function (itemId) {
                        var item = BagModel.getInstance().getItemAttrData(itemId);
                        var roleId = LoginModel.getInstance().roleDetail.roleid;
                        var itemtypeid = item.itemtypeid;
                        for (var i in this.ItemUseTip) {
                            var idnum = this.ItemUseTip[i].idnum;
                            /** 如果表中有该类型或者改Id 则显示 */
                            if (idnum == itemtypeid) {
                                return true;
                            }
                            else if (itemId == idnum) { /** 升级礼包 判断使用等级 */
                                var singleDigit = itemId % 10 * 10;
                                var rolelevel = HudModel.getInstance().levelNum;
                                if (singleDigit > rolelevel)
                                    return false;
                                return true;
                            }
                        }
                        return false;
                        /** 不可使用，战斗中使用 */
                        // if (outbattle == 0 || outbattle == 2) return false;
                        // else if (item.itemtypeid == 3750) return false;
                        // else if (item.itemtypeid == 166) return false;
                        // else if (item.itemtypeid == ItemTypeId.TuzhiItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 100005) return false;
                        // else if (item.itemtypeid == ItemTypeId.OtherItem && itemId <= 101453) return false;
                        // else if (item.itemtypeid == ItemTypeId.Present && itemId <= 100023) return false;
                        // else if (item.itemtypeid == ItemTypeId.ForgeStone || item.itemtypeid == ItemTypeId.TailorDye || item.itemtypeid == ItemTypeId.SmeltFusion) return false;
                        // else if (item.itemtypeid == ItemTypeId.TuzhiMake) return false;
                        // else if (item.itemtypeid == ItemTypeId.TimeReturn || itemId == 339107) return false;
                        // else if (item.itemtypeid == ItemTypeId.AttrUpItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.FormBookHalf) return false;
                        // else if (item.itemtypeid == ItemTypeId.FormBook) return false;
                        // else if (item.itemtypeid == ItemTypeId.RoleParticleBook || item.itemtypeid == ItemTypeId.PetParticleBook) return false;
                        // else if (item.itemtypeid == ItemTypeId.RoleColorItem || item.itemtypeid == ItemTypeId.PetColorItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.SilverKeyItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.GoldKeyItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.RenameCardItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.ShenShouExchangeItem) return false;
                        // else if ((item.itemtypeid == ItemTypeId.Present && itemId >= 337939 && itemId <= 337940) || item.itemtypeid == ItemTypeId.PetSkillItem) return false;
                        // else if (item.itemtypeid == ItemTypeId.GemItem) return false;
                        // else return true;
                    };
                    /** 响应事件监听 */
                    BagModel.prototype.initListener = function () {
                        models.BagProxy.getInstance().on(models.INSPECT_EQUIP, this, this.onChargeEquip);
                    };
                    /** 检测背包数据，引导装备 */
                    BagModel.prototype.onChargeEquip = function () {
                        var bagItem = this.getBagGameItemData(BagTypes.BAG);
                        var equipArr = new Laya.Dictionary; //存储类型
                        var _equipItem = this.getBagGameItemData(BagTypes.EQUIP);
                        for (var _equindex = 0; _equindex < _equipItem.items.length; _equindex++) {
                            var id = _equipItem.items[_equindex].id;
                            var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                            equipArr.set(equipType, id);
                        }
                        if (!bagItem || !_equipItem)
                            return;
                        var level = HudModel.getInstance().levelNum;
                        var shape = LoginModel.getInstance().roleDetail.shape;
                        var school = LoginModel.getInstance().roleDetail.school;
                        var sex = shape % 2 == 0 ? Sex.woman : Sex.man;
                        for (var _bagItem = 0; _bagItem < bagItem.items.length; _bagItem++) {
                            var _bagitem = bagItem.items[_bagItem];
                            if (120000 <= _bagitem.id && _bagitem.id <= 130099) //装备数据
                             {
                                var equipType = StrengTheningModel.getInstance().equipEffectData[_bagitem.id].eequiptype;
                                if (equipArr.keys.indexOf(equipType) != -1) { //检测到同部位装备
                                    var equid = equipArr.get(equipType);
                                    var equobj = BagModel.getInstance().getItemAttrData(equid);
                                    var bagobj = BagModel.getInstance().getItemAttrData(_bagitem.id);
                                    var equlevel = equobj.level;
                                    var baglevel = bagobj.level;
                                    //判断等级
                                    if (level < baglevel)
                                        continue;
                                    var daya = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData;
                                    var needsex = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData[_bagitem.id].sexNeed;
                                    //判断性别
                                    if (needsex != Sex.ManOrWomen && needsex != sex)
                                        continue;
                                    var needSchool = game.modules.strengThening.models.StrengTheningModel.getInstance().equipEffectData[_bagitem.id].needCareer;
                                    var canschool = needSchool.split(";");
                                    //判断职业
                                    if (needSchool != "0" && canschool.indexOf(school.toString()) == -1)
                                        continue;
                                    {
                                        var allequLev = equlevel + equobj.nquality * 10;
                                        var allbagLev = baglevel + bagobj.nquality * 10;
                                        if (allbagLev > allequLev) {
                                            BagModel.getInstance().addItemUseGuide.set(_bagitem.id, _bagitem);
                                            /** 如果容器中存在指定物品才刷新界面 */
                                            var str = "装备";
                                            models.BagProxy.getInstance().event(models.ADDITEM_USE_GUIDE, str);
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    };
                    /**获取当前位置是否存在装备数据
                     * @param equipType 位置
                      */
                    BagModel.prototype._getequipTypeisEquipped = function (equipType) {
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
                        var items = bag.items;
                        if (items.length == 0)
                            return false;
                        for (var _index = 0; _index < items.length; _index++) {
                            var id = items[_index].id;
                            var _equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                            if (equipType == _equipType)
                                return true;
                        }
                        return false;
                    };
                    /** 临时处理删除东西
                     * @param itemkey 要从背包删除掉的道具key
                     * @param flag true:进行记录数据  false：删除记录数据
                     * @describe 当服务端下发移除道具的协议时，客户端若没有可以移除的道具，进入此方法，暂时字典记录下这个道具key，标记是要移除掉该道具
                     * 			后续服务端要有下发增加该道具的协议，再把该道具移除掉，字典也删掉这条记录，不给背包添加该道具
                     * 			此方法只为暂时处理客户端会先接收到服务端下发删除道具的协议，但实际上客户端背包这边并没有该道具的数据
                     */
                    BagModel.prototype.tempBankBag = function (itemkey, flag) {
                        if (flag && !this.lendItemsDic.get(itemkey)) { //如果是要借出道具，并且没有该道具被借出的记录				
                            this.lendItemsDic.set(itemkey, true); //则新建一条记录
                        }
                        else { //如果是还道具回来
                            var value = this.lendItemsDic.get(itemkey);
                            if (value) {
                                this.lendItemsDic.remove(itemkey); //移除记录
                            }
                        }
                    };
                    /** 获得道具总类型
                     * @param itemid 道具id
                     * @describe 除16所得余数对应道具类型的大类
                     */
                    BagModel.prototype.getItemTotalType = function (itemid) {
                        var itemtypeid = this.itemAttrData[itemid]["itemtypeid"]; //道具类型id
                        return itemtypeid % 16;
                    };
                    /** 判断该道具所在的背包里是否为绑定
                     * @param flags 判断是否为绑定的标识，该参数可能有多种值来判断是否为绑定
                     */
                    BagModel.prototype.itemIsBind = function (flags) {
                        if (flags == FlagsType.BIND_CANNOTONSTALL || flags == FlagsType.BIND) {
                            return true; //返回是绑定状态的判断
                        }
                        else {
                            return false; //返回不是绑定状态的判断
                        }
                    };
                    //模型设置武器
                    BagModel.chargeToWeapon = function (char3D) {
                        var school = LoginModel.getInstance().roleDetail.school;
                        var shape = LoginModel.getInstance().roleDetail.shape;
                        var sex = shape % 2 == 0 ? Sex.woman : Sex.man;
                        var weaponName = LoginModel.getweaponBySchool(school, sex);
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
                        var items = bag.items;
                        for (var _i = 0; _i < items.length; _i++) {
                            var id = bag.items[_i].id;
                            var obj = BagModel.getInstance().getItemAttrData(id);
                            var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                            if (equipType != EquipType.ARMS)
                                continue;
                            var weaponNum = StrengTheningModel.getInstance().equipEffectData[id].weaponid;
                            char3D.setWeaponSlotByAvatar(weaponNum, weaponName);
                            return;
                        }
                        char3D.setWeapon(-1);
                    };
                    //设置unit武器
                    BagModel.UnitWeapon = function (unit) {
                        if (unit.School < 0)
                            unit.School = LoginModel.getInstance().roleDetail.school;
                        if (unit.Shape < 0)
                            unit.Shape = LoginModel.getInstance().roleDetail.shape;
                        var bag = BagModel.getInstance().getBagGameItemData(BagTypes.EQUIP);
                        if (!bag)
                            return;
                        var items = bag.items;
                        if (!items)
                            return;
                        for (var _i = 0; _i < items.length; _i++) {
                            var id = bag.items[_i].id;
                            var obj = BagModel.getInstance().getItemAttrData(id);
                            var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                            if (equipType != EquipType.ARMS)
                                continue;
                            var weaponNum = StrengTheningModel.getInstance().equipEffectData[id].weaponid;
                            unit.Weapon = weaponNum;
                            return;
                        }
                    };
                    return BagModel;
                }());
                models.BagModel = BagModel;
            })(models = bag_1.models || (bag_1.models = {}));
        })(bag = modules.bag || (modules.bag = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=BagModel.js.map