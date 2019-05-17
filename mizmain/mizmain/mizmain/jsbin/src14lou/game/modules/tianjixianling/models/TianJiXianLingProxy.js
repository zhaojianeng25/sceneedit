var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var modules;
    (function (modules) {
        var tianjixianling;
        (function (tianjixianling) {
            var models;
            (function (models) {
                /** 得到天机仙令信息与任务的数据事件 */
                models.GET_TIANJIXIANLING_DATA = "getTianJiXianLing";
                /** 因天机仙令任务显示道具提交界面 */
                models.SHOW_ITEM_SUBMIT_JIEMIAN = "showItemSubmitJieMian";
                /** 因天机仙令任务上交宠物对象 */
                models.SUBMIT_PET = "submitPet";
                /** 成功开启天机仙令某个随机任务的探索模式 */
                models.OPEN_EXPLORE_MODE = "openExploreMode";
                /** 表示已经参加了天机仙令 */
                models.ALREADY_JOIN_TJXL = "alreadyJoinTJXL";
                /** 表示第一次参加天机仙令成功 */
                models.JOIN_TJXL_SUCCESS = "joinTJXLSuccess";
                /** 天机仙令proxy */
                var TianJiXianLingProxy = /** @class */ (function (_super) {
                    __extends(TianJiXianLingProxy, _super);
                    function TianJiXianLingProxy() {
                        var _this = _super.call(this) || this;
                        TianJiXianLingProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    TianJiXianLingProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TianJiXianLingProxy();
                        }
                        return this._instance;
                    };
                    TianJiXianLingProxy.prototype.init = function () {
                        models.TianJiXianLingModel.getInstance();
                        this.addNetworkListener();
                        //加载暗夜马戏团（天机仙令）任务配置表
                        Laya.loader.load("common/data/temp/circletask.canyemaxituanconf.bin", Handler.create(this, this.onloadedCAnYeMaXiTuanConfComplete), null, Loader.BUFFER);
                        //加载寻找物品类分表
                        Laya.loader.load("common/data/temp/circletask.ccirctaskitemfind.bin", Handler.create(this, this.onloadedCCircTaskItemFindComplete), null, Loader.BUFFER);
                        //加载收集物品类分表
                        Laya.loader.load("common/data/temp/circletask.ccirctaskitemcollect.bin", Handler.create(this, this.onloadedCCircTaskItemCollectComplete), null, Loader.BUFFER);
                    };
                    /**
                     * 加载收集物品类分表
                     */
                    TianJiXianLingProxy.prototype.onloadedCCircTaskItemCollectComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemcollect.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TianJiXianLingModel.getInstance().collectItemConfig, game.data.template.CCircTaskItemCollectBaseVo, "id");
                    };
                    /**
                     * 加载寻找物品类分表
                     */
                    TianJiXianLingProxy.prototype.onloadedCCircTaskItemFindComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemfind.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TianJiXianLingModel.getInstance().findItemConfig, game.data.template.CCircTaskItemFindBaseVo, "id");
                    };
                    /**
                     * 加载暗夜马戏团（天机仙令）任务配置表
                     */
                    TianJiXianLingProxy.prototype.onloadedCAnYeMaXiTuanConfComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.canyemaxituanconf.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TianJiXianLingModel.getInstance().tjxlConfig, game.data.template.CAnYeMaXiTuanConfBaseVo, "id");
                    };
                    /** 消息协议监听 */
                    TianJiXianLingProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshAnYeData, this, this.onSRefreshAnYeData);
                        Network._instance.addHanlder(ProtocolsEnum.SLengendAnYetask, this, this.onSLengendAnYetask);
                    };
                    /**
                     * 天机仙令的探索开启返回
                     */
                    TianJiXianLingProxy.prototype.onSLengendAnYetask = function (optcode, msg) {
                        if (msg.result == 1) { //结果1成功
                            models.TianJiXianLingProxy.getInstance().event(models.OPEN_EXPLORE_MODE);
                        }
                    };
                    /**
                     * 天机仙令信息与任务数据返回
                     */
                    TianJiXianLingProxy.prototype.onSRefreshAnYeData = function (optcode, msg) {
                        //以下是判断，以防止某个任务完成干扰到其它任务
                        var _anyetasks = msg.anyetasks;
                        for (var i = 0; i < _anyetasks.length; i++) {
                            var _anYeTaskVo = _anyetasks[i];
                            if (_anYeTaskVo.state == TaskState.DONE && _anYeTaskVo.kind == TaskType.Item) {
                                var _dstitemid = _anYeTaskVo.dstitemid;
                                var _ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(_dstitemid); //获取该道具的拥有数量
                                if (_ownedTargetNum == 0) {
                                    _anyetasks[i].state = TaskState.UNDONE;
                                }
                            }
                        }
                        if (msg.anyetasks.length != 0 && msg.anyetasks.length != 1) {
                            models.TianJiXianLingModel._instance.someRoundTasks = _anyetasks;
                        }
                        /** 临时信息数据 */
                        var _tempInfoData = new models.TianJiXianLingDataVo();
                        _tempInfoData.times = msg.times;
                        _tempInfoData.renxins = msg.renxins;
                        _tempInfoData.awardexp = msg.awardexp;
                        _tempInfoData.awardsilver = msg.awardsilver;
                        _tempInfoData.swardgold = msg.swardgold;
                        _tempInfoData.jointime = msg.jointime;
                        _tempInfoData.legendpos = msg.legendpos;
                        models.TianJiXianLingModel._instance.tjxlInfoData = _tempInfoData;
                        models.TianJiXianLingProxy.getInstance().event(models.GET_TIANJIXIANLING_DATA, [msg.anyetasks, _tempInfoData]);
                        /** 处于探索的状态下的任务栏位 */
                        var _legendpos = msg.legendpos;
                        if (_legendpos >= 0 && _legendpos <= 7) {
                            game.modules.task.models.TaskModel.getInstance().tjxltansuo = _legendpos;
                            game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId = models.TianJiXianLingModel._instance.getExploreTaskMapId(_legendpos);
                            game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.TAKSREFRESH);
                        }
                        if (msg.anyetasks.length == 0) { //如果传过来的数据是空，说明要请求参加天机仙令
                            models.TianJiXianLingProxy.getInstance().event(models.JOIN_TJXL_SUCCESS);
                            modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.TAKSREFRESH);
                        }
                    };
                    return TianJiXianLingProxy;
                }(hanlder.ProxyBase));
                models.TianJiXianLingProxy = TianJiXianLingProxy;
            })(models = tianjixianling.models || (tianjixianling.models = {}));
        })(tianjixianling = modules.tianjixianling || (modules.tianjixianling = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TianJiXianLingProxy.js.map