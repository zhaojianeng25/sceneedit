/** 传说的状态（探索状态） */
var LegendState;
(function (LegendState) {
    /** 不可传说 */
    LegendState[LegendState["NoLegend"] = 0] = "NoLegend";
    /** 可传说 */
    LegendState[LegendState["CanLegend"] = 1] = "CanLegend";
    /** 已传说 */
    LegendState[LegendState["Legend"] = 2] = "Legend";
    /** 成功 */
    LegendState[LegendState["LegendSuccess"] = 3] = "LegendSuccess";
    /** 失败 */
    LegendState[LegendState["LegendFailure"] = 4] = "LegendFailure";
})(LegendState || (LegendState = {}));
;
/** 任务类型 */
var TaskType;
(function (TaskType) {
    /** 道具相关（寻物、珍宝、鉴宝等等） */
    TaskType[TaskType["Item"] = 4] = "Item";
    /** 寻宠 */
    TaskType[TaskType["Pet"] = 5] = "Pet";
    /** 挑战 */
    TaskType[TaskType["NPC"] = 9] = "NPC";
})(TaskType || (TaskType = {}));
;
/** 任务状态 */
var TaskState;
(function (TaskState) {
    /** 已成功，(已提交) */
    TaskState[TaskState["SUCCESS"] = 1] = "SUCCESS";
    /** 已失败 */
    TaskState[TaskState["FAIL"] = 2] = "FAIL";
    /** 已完成 */
    TaskState[TaskState["DONE"] = 3] = "DONE";
    /** 未完成 */
    TaskState[TaskState["UNDONE"] = 4] = "UNDONE";
    /** 已放弃 */
    TaskState[TaskState["ABANDONED"] = 5] = "ABANDONED";
    /** 回收 */
    TaskState[TaskState["RECYCLE"] = 6] = "RECYCLE";
    /** 副本中放弃 */
    TaskState[TaskState["INSTANCE_ABANDONED"] = 7] = "INSTANCE_ABANDONED";
})(TaskState || (TaskState = {}));
;
/** 上交对象类型 */
var SubmitType;
(function (SubmitType) {
    /** 物品 */
    SubmitType[SubmitType["ITEM"] = 1] = "ITEM";
    /** 宠物 */
    SubmitType[SubmitType["PET"] = 2] = "PET";
    /** 金钱 */
    SubmitType[SubmitType["MONEY"] = 3] = "MONEY";
    /** 公会银箱 */
    SubmitType[SubmitType["FACTION_MONEY_BOX"] = 4] = "FACTION_MONEY_BOX";
    /** 银箱 */
    SubmitType[SubmitType["FAMILY_MONEY_BOX"] = 5] = "FAMILY_MONEY_BOX";
    /** 副本玩法内的提交物品 */
    SubmitType[SubmitType["INSTANCE_ZONE_ITEM"] = 13] = "INSTANCE_ZONE_ITEM";
    /** 公会副本玩法内的提交物品 */
    SubmitType[SubmitType["GUILD_ZONE_ITEM"] = 22] = "GUILD_ZONE_ITEM";
})(SubmitType || (SubmitType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tianjixianling;
        (function (tianjixianling) {
            var models;
            (function (models) {
                /** 天机仙令model */
                var TianJiXianLingModel = /** @class */ (function () {
                    function TianJiXianLingModel() {
                        /** 存放天机仙令随机任务配置数据 */
                        this.tjxlConfig = {};
                        /** 寻找物品类配置表数据 */
                        this.findItemConfig = {};
                        /** 收集物品类配置表数据 */
                        this.collectItemConfig = {};
                        /** 存放天机仙令某轮的任务数据 */
                        this.someRoundTasks = [];
                        /** 天机仙令信息数据 */
                        this.tjxlInfoData = new models.TianJiXianLingDataVo();
                    }
                    TianJiXianLingModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TianJiXianLingModel();
                        }
                        return this._instance;
                    };
                    TianJiXianLingModel.clearModelData = function () {
                        tianjixianling.models.TianJiXianLingModel._instance.someRoundTasks = [];
                        tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData = new models.TianJiXianLingDataVo();
                        tianjixianling.models.TianJiXianLingModel._instance.completedTaskRoleId = 0;
                        tianjixianling.models.TianJiXianLingModel._instance.taskPos = -1;
                    };
                    /**
                     * 获取探索任务所要跳转地图的id
                     * @param index 处于探索状态的任务索引
                     */
                    TianJiXianLingModel.prototype.getExploreTaskMapId = function (index) {
                        /** 玩家等级 */
                        var _roleLevel = HudModel._instance.levelNum;
                        /** 临时地图id */
                        var _tempMapId;
                        /** 任务id */
                        var _taskId = this.someRoundTasks[index]["id"];
                        /** 任务类型下标 */
                        var _group = this.tjxlConfig[_taskId]["group"];
                        /** 寻找物品类配置表数据key */
                        var _dataKeys = Object.keys(this.findItemConfig);
                        for (var i = 0; i < _dataKeys.length; i++) {
                            if (this.findItemConfig[_dataKeys[i]]["ctgroup"] == _group) { //如果寻找物品类分表中寻找物品组与天机仙令任务配置表中的任务类型下标值相等
                                if (this.findItemConfig[_dataKeys[i]]["levelmin"] <= _roleLevel && _roleLevel <= this.findItemConfig[_dataKeys[i]]["levelmax"]) { //并且当前玩家的等级符合要求
                                    var _mapid = this.collectItemConfig[_dataKeys[i]]["mapid"];
                                    _mapid = _mapid.replace("@100", "");
                                    _tempMapId = Number(_mapid);
                                }
                            }
                        }
                        return _tempMapId;
                    };
                    /**
                     * 提交目标（道具、装备、宠物等）
                     * @param itemid 目标id
                     * @param taskid 天机仙令任务id
                     * @param useapp
                     * @param useUI
                     */
                    TianJiXianLingModel.prototype.submitTarget = function (itemid, taskid, useapp, useUI) {
                        /** 任务类型 */
                        var tasktype = this.tjxlConfig[taskid]["tasktype"];
                        if (tasktype == TaskType.Item) {
                            /** 道具上交界面 */
                            var _taskItemChooseMediator = new game.modules.task.TaskItemChooseMediator(useapp);
                            _taskItemChooseMediator.init(itemid, useUI);
                        }
                        else if (tasktype == TaskType.Pet) {
                            /** 宠物上交界面 */
                            var _taskPetChooseMediator = new game.modules.task.TaskPetChooseMediator(useapp);
                            _taskPetChooseMediator.init(taskid, 0, SubmitType.PET, itemid); //第二参数为零，是在天机仙令上交宠物不需要NPC
                        }
                    };
                    /**
                     * 判断玩家拥有宠物的数量
                     * @param petId 宠物id
                     */
                    TianJiXianLingModel.prototype.checkOwnPetNum = function (petId) {
                        /** 临时计数 */
                        var _tempCount = 0;
                        /** 拥有的所有的宠物 */
                        var _pets = game.modules.pet.models.PetModel._instance.pets;
                        var _petsKeys = _pets.keys;
                        /** 当前所选中的出战宠物索引 */
                        var _petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
                        for (var i = 0; i < _petsKeys.length; i++) { //遍历循环
                            var _petId = _pets.get(_petsKeys[i])["id"];
                            if (_petId == petId && _petsKeys[i] != _petIndex) { //如果有并且不是出战的宠物
                                _tempCount++; //计数加一
                            }
                        }
                        return _tempCount;
                    };
                    /**
                     * 得到商店类型
                     * @param id  物品id（物品包括在酒馆、药品商店、兵器铺所出售的）
                     */
                    TianJiXianLingModel.prototype.getShopType = function (id) {
                        /** 道具复合表 */
                        var _itemAttrData = modules.bag.models.BagModel._instance.itemAttrData;
                        /** 售卖道具相应商店类型 */
                        var _shopType = _itemAttrData[id]["nshoptype"];
                        /** 售卖道具相应NPC的id */
                        var _itemNPCid = _itemAttrData[id]["npcid2"];
                        /** NPC买卖物品表 */
                        var _cNPCSaleDic = RoleInfoModel.getInstance().CNpcSaleBinDic;
                        /** 临时商店类型 */
                        var tempShopType;
                        for (var i = 0; i < Object.keys(_cNPCSaleDic).length; i++) {
                            if (_cNPCSaleDic[Object.keys(_cNPCSaleDic)[i]]["npcId"] == _itemNPCid) { //如果NPC的id对应上
                                tempShopType = _cNPCSaleDic[Object.keys(_cNPCSaleDic)[i]]["id"]; //则重新赋值上商店ID
                            }
                        }
                        if (_shopType == SellType.SALE_STORE) { //如果是售卖枚举类型中的拍卖，
                            tempShopType = shopType.SALE_STORE; //商店类型重新赋值为商店枚举类型中的拍卖行
                        }
                        return tempShopType;
                    };
                    return TianJiXianLingModel;
                }());
                models.TianJiXianLingModel = TianJiXianLingModel;
            })(models = tianjixianling.models || (tianjixianling.models = {}));
        })(tianjixianling = modules.tianjixianling || (modules.tianjixianling = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TianJiXianLingModel.js.map