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
/**
* ActivityProxy
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var models;
            (function (models) {
                /** 双倍点数领取-冻结 */
                models.ROLEHOOKEXP_EVENT = "roleHookExpEvent";
                /** 活动数据 */
                models.REFRESHACTIVITYLIST_EVENT = "refreshActivityListEvent";
                /** 刷新需要推送的内容 */
                models.TUISONG_EVENT = "tuiSongEvent";
                /** 活动消息推送事件派发 */
                models.TUISONG_TIAOZHUAN_EVENT = "tuiSongTiaoZhuanEvent";
                /** 精英副本 */
                models.JINGYINGFUBEN_EVENT = "jingYingFuBenEvent";
                /** 评级 */
                models.PINGJI_EVENT = "pingJiEvent";
                /** 队长副本进度同步 */
                models.DEFINETEAM = "defineTeamEvent";
                var ActivityProxy = /** @class */ (function (_super) {
                    __extends(ActivityProxy, _super);
                    function ActivityProxy() {
                        var _this = _super.call(this) || this;
                        ActivityProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    ActivityProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new ActivityProxy();
                        }
                        return this._instance;
                    };
                    ActivityProxy.prototype.init = function () {
                        models.ActivityModel.getInstance();
                        this.addNetworkListener();
                        //活跃度奖励
                        Laya.loader.load("common/data/temp/mission.cactivegiftbox.bin", Handler.create(this, this.onloadedActiveGiftBoxComplete), null, Loader.BUFFER);
                        //周历
                        Laya.loader.load("common/data/temp/mission.cweeklist.bin", Handler.create(this, this.onloadedWeekListComplete), null, Loader.BUFFER);
                        //消息推送
                        Laya.loader.load("common/data/temp/SysConfig.ctuisongsetting.bin", Handler.create(this, this.onloadedTuiSongSettingComplete), null, Loader.BUFFER);
                        //活动配置表
                        Laya.loader.load("common/data/temp/mission.cactivitynew.bin", Handler.create(this, this.onloadedActivityNewComplete), null, Loader.BUFFER);
                        //定时活动配置
                        Laya.loader.load("common/data/temp/timer.cscheculedactivity.bin", Handler.create(this, this.onloadedCheculedActivityComplete), null, Loader.BUFFER);
                        //活动地图对应表
                        Laya.loader.load("common/data/temp/mission.cactivitymaplist.bin", Handler.create(this, this.onloadedActivityMapList), null, Loader.BUFFER);
                        //精英副本
                        Laya.loader.load("common/data/temp/mission.cshiguangzhixueconfig.bin", Handler.create(this, this.onloadedShiGuangZhiXueConfig), null, Loader.BUFFER);
                        //精英副本npc
                        Laya.loader.load("common/data/temp/instance.cshiguangzhixuenpc.bin", Handler.create(this, this.onloadedJingYingNpc), null, Loader.BUFFER);
                    };
                    ActivityProxy.prototype.onloadedJingYingNpc = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixuenpc.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ActivityModel._instance.JingYingNpc, game.data.template.JingyingConfigBaseVo, "mapid");
                    };
                    ActivityProxy.prototype.onloadedShiGuangZhiXueConfig = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cshiguangzhixueconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.ShiGuangZhiXueBinDic, game.data.template.ShiGuangZhiXueConfigBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ActivityModel._instance.ShiGuangZhiXueByFuBenId, game.data.template.ShiGuangZhiXueConfigBaseVo, "fubenId");
                    };
                    ActivityProxy.prototype.onloadedActivityMapList = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitymaplist.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.ActivityMapListBinDic, game.data.template.ActivityMapListBaseVo, "id");
                    };
                    ActivityProxy.prototype.onloadedCheculedActivityComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivity.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ActivityModel._instance.CheculedActivityBinDicAtActId, game.data.template.CScheculedActivityBaseVo, "activityid");
                    };
                    ActivityProxy.prototype.onloadedActivityNewComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynew.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.ActivityModel._instance.ActivityNewBinDicAtType, game.data.template.ActivityNewBaseVo, "type");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.ActivityNewBinDic, game.data.template.ActivityNewBaseVo, "id");
                        models.ActivityModel._instance.setActivityInfo();
                    };
                    ActivityProxy.prototype.onloadedTuiSongSettingComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctuisongsetting.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.TuiSongSettingBinDic, game.data.template.TuiSongSettingBaseVo, "id");
                    };
                    ActivityProxy.prototype.onloadedWeekListComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cweeklist.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.WeekListBinDic, game.data.template.WeekListBaseVo, "id");
                    };
                    ActivityProxy.prototype.onloadedActiveGiftBoxComplete = function () {
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivegiftbox.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.ActivityModel._instance.ActiveGiftBoxBinDic, game.data.template.ActiveGiftBoxBaseVo, "id");
                    };
                    /** 添加监听 */
                    ActivityProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleHookExpData, this, this.onRefreshRoleHookExpData);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshActivityListFinishTimes, this, this.onRefreshActivityListFinishTimes);
                        Network._instance.addHanlder(ProtocolsEnum.SGetLineState, this, this.onGetLineState);
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshActiveQuest, this, this.onRefreshActiveQuest);
                        Network._instance.addHanlder(ProtocolsEnum.SNotifyTuiSongList, this, this.onNotifyTuiSong);
                        Network._instance.addHanlder(ProtocolsEnum.SGetActivityInfo, this, this.onGetActivityInfo);
                        Network._instance.addHanlder(ProtocolsEnum.SPingJi, this, this.onPingJi);
                        Network._instance.addHanlder(ProtocolsEnum.SDefineTeam, this, this.onDefineTeam);
                    };
                    /** 移除监听 */
                    ActivityProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshRoleHookExpData, this, this.onRefreshRoleHookExpData);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshActivityListFinishTimes, this, this.onRefreshActivityListFinishTimes);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetLineState, this, this.onGetLineState);
                        Network._instance.removeHanlder(ProtocolsEnum.SRefreshActiveQuest, this, this.onRefreshActiveQuest);
                        Network._instance.removeHanlder(ProtocolsEnum.SNotifyTuiSongList, this, this.onNotifyTuiSong);
                        Network._instance.removeHanlder(ProtocolsEnum.SGetActivityInfo, this, this.onGetActivityInfo);
                        Network._instance.removeHanlder(ProtocolsEnum.SPingJi, this, this.onPingJi);
                        Network._instance.removeHanlder(ProtocolsEnum.SDefineTeam, this, this.onDefineTeam);
                    };
                    /** 精英副本队长进度弹窗 */
                    ActivityProxy.prototype.onDefineTeam = function (optcode, msg) {
                        this.event(models.DEFINETEAM, [msg.instid, msg.mystep, msg.tlstep]);
                    };
                    /** 评级 */
                    ActivityProxy.prototype.onPingJi = function (optcode, msg) {
                        modules.activity.models.ActivityModel.getInstance().isOver = true;
                        modules.activity.models.ActivityModel.getInstance().grade = msg.grade;
                        models.ActivityProxy._instance.event(models.PINGJI_EVENT);
                        // game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
                    };
                    /** 精英副本完成信息 */
                    ActivityProxy.prototype.onGetLineState = function (optcode, msg) {
                        models.ActivityModel.getInstance().instances = msg.instances;
                        console.log("-----精英副本完成信息:", msg.instances);
                        models.ActivityProxy._instance.event(models.JINGYINGFUBEN_EVENT);
                    };
                    /** 活跃度和任务次数 */
                    ActivityProxy.prototype.onRefreshActivityListFinishTimes = function (optcode, msg) {
                        models.ActivityModel.getInstance().activevalue = msg.activevalue;
                        models.ActivityModel.getInstance().activities = msg.activities;
                        models.ActivityModel.getInstance().chests = msg.chests;
                        models.ActivityProxy._instance.event(models.REFRESHACTIVITYLIST_EVENT);
                    };
                    /** 双倍点数 */
                    ActivityProxy.prototype.onRefreshRoleHookExpData = function (optcode, msg) {
                        models.ActivityModel.getInstance().RoleHookExpData = msg.RoleHookExpData;
                        models.ActivityProxy._instance.event(models.ROLEHOOKEXP_EVENT);
                    };
                    /** 精英副本环节 */
                    ActivityProxy.prototype.onRefreshActiveQuest = function (optcode, msg) {
                        // models.ActivityModel.getInstance().questdata = msg.questdata;
                        // if (!game.scene.models.SceneModel.getInstance().newnpclist.get(msg.questdata.dstnpckey)) {
                        // 	let npclist: Laya.Dictionary = new Laya.Dictionary()
                        // 	let npcinfo: CNPCConfigBaseVo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[msg.questdata.dstnpcid] as CNPCConfigBaseVo;
                        // 	let npc: game.scene.models.NpcBasicVo = new game.scene.models.NpcBasicVo();
                        // 	npc.npckey = msg.questdata.dstnpckey;
                        // 	npc.id = msg.questdata.dstnpcid;
                        // 	npc.name = npcinfo.name;
                        // 	npc.pos = new Vector2(msg.questdata.dstx, msg.questdata.dsty);
                        // 	npclist.set(msg.questdata.dstnpckey, npc);
                        // 	game.scene.models.SceneModel.getInstance().npclist.set(msg.questdata.dstnpckey, npc);
                        // 	game.scene.models.SceneModel.getInstance().newnpclist = npclist;
                        // 	game.scene.models.SceneProxy.getInstance().event(game.scene.models.MODEL_CREATE);
                        // }
                        // game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.NEWTASK);
                    };
                    ActivityProxy.prototype.onNotifyTuiSong = function (optcode, msg) {
                        console.log("activityProxy-s2c_notify_tuisong_list:", msg.notifyList);
                    };
                    ActivityProxy.prototype.onGetActivityInfo = function (optcode, msg) {
                        console.log("activityProxy-s2c_get_activity_info:", msg.activityinfos);
                    };
                    return ActivityProxy;
                }(hanlder.ProxyBase));
                models.ActivityProxy = ActivityProxy;
            })(models = activity.models || (activity.models = {}));
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityProxy.js.map