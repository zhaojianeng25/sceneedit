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
        var task;
        (function (task_1) {
            var models;
            (function (models) {
                /**使用道具*/
                models.USEITEM = "useitem";
                /**打断*/
                models.INTERRUPT = "interrupt";
                /**制作成功*/
                models.MAKESUCCESS = "makesucess";
                /**宠物或者道具提交*/
                models.ITEMORPETSUBMIT = "itemorpetsubmit";
                /**任务刷新*/
                models.TAKSREFRESH = "taskrefresh";
                /**新的任务*/
                models.NEWTASK = "newtask";
                /**领取多倍点数*/
                models.GETDPOINT = "getDPoint";
                /** 接受下一轮日常副本任务 */
                models.ACCEPTNEXTROUNDTASK = "acceptNextRoundTask";
                /**选择宠物*/
                models.SELECTPET = "selectpet";
                /** 接受下一轮门派任务 */
                models.ACCEPTNEXTROUND_SCHOOLTASK = "acceptNextRound_schoolTask";
                /** 任务相关的协议 */
                var TaskProxy = /** @class */ (function (_super) {
                    __extends(TaskProxy, _super);
                    function TaskProxy() {
                        var _this = _super.call(this) || this;
                        TaskProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    TaskProxy.prototype.init = function () {
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/mission.cmainmissioninfo.bin", Handler.create(this, this.onloadedMissionCMainMissionInfoComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/circletask.crepeattask.bin", Handler.create(this, this.onloadedCRepeatTaskComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/circletask.cschooltask.bin", Handler.create(this, this.onloadedCSchoolTaskComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/mission.cacceptabletask.bin", Handler.create(this, this.onloadedAcceptableTaskComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/circletask.crepeattaskchat.bin", Handler.create(this, this.onloadedCRepeatTaskChatComplete), null, Loader.BUFFER);
                    };
                    TaskProxy.prototype.addNetworkListener = function () {
                        /**活动任务列表*/
                        Network._instance.addHanlder(ProtocolsEnum.SSendActiveQuestList, this, this.onLoadTask);
                        /**加载主线*/
                        Network._instance.addHanlder(ProtocolsEnum.STrackedMissions, this, this.onMainOrGuideTask);
                        /**加载师门任务*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshSpecialQuest, this, this.onSchoolTask);
                        /**获取循环任务*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshSpecialQuestState, this, this.onRefreshSchoolTask);
                        /**获得可接受任务id*/
                        Network._instance.addHanlder(ProtocolsEnum.SReqMissionCanAccept, this, this.onAcceptableTask);
                        /**获取已接受任务*/
                        Network._instance.addHanlder(ProtocolsEnum.SAcceptMission, this, this.onAcceptMission);
                        /**刷新任务状态*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshMissionState, this, this.onRefreshMissionstate);
                        /**刷新任务信息*/
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshMissionValue, this, this.onRefreshMissValue);
                        /**npc服务*/
                        Network._instance.addHanlder(ProtocolsEnum.SSendNpcService, this, this.onNpcSerivceInfo);
                        /**刷新上交后NPC位置*/
                        Network._instance.addHanlder(ProtocolsEnum.SSubmit2Npc, this, this.onSubMit2Npc);
                        //刷新任务数据下发返回
                        Network._instance.addHanlder(ProtocolsEnum.SRefreshQuestData, this, this.onRefreshTaskDatas);
                    };
                    /**x循环任务/x循环任务对话配置 */
                    TaskProxy.prototype.onloadedCRepeatTaskChatComplete = function () {
                        console.log("CRepeatTaskChat表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattaskchat.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TaskModel.getInstance().cRepeatTaskChatData, CRepeatTaskChatBaseVo, "id");
                    };
                    /**r任务相关/k可接任务信息*/
                    TaskProxy.prototype.onloadedAcceptableTaskComplete = function () {
                        console.log("AcceptableTaskData表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cacceptabletask.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TaskModel.getInstance().acceptableTaskData, AcceptableTaskBaseVo, "id");
                    };
                    /**x循环任务/x循环任务总表 */
                    TaskProxy.prototype.onloadedCSchoolTaskComplete = function () {
                        console.log("CSchoolTask表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooltask.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TaskModel.getInstance().cSchoolTaskData, CSchoolTaskBaseVo, "id");
                        data.pos = 0;
                        size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillMap(data, size, models.TaskModel.getInstance().cSchoolTaskDataByType, CSchoolTaskBaseVo, "type");
                    };
                    /**x循环任务/x循环任务配置表 */
                    TaskProxy.prototype.onloadedCRepeatTaskComplete = function () {
                        console.log("CRepeatTask表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattask.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TaskModel.getInstance().cRepeatTaskData, CRepeatTaskBaseVo, "id");
                    };
                    /**r任务相关/z主任务配置 */
                    TaskProxy.prototype.onloadedMissionCMainMissionInfoComplete = function () {
                        console.log("MissionCMainMissionInfo表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/mission.cmainmissioninfo.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.TaskModel.getInstance().missionCMainMissionInfoData, MissionCMainMissionInfoBaseVo, "id");
                    };
                    //上交物品
                    TaskProxy.prototype.onSubMit2Npc = function (optcode, msg) {
                        this.event(models.ITEMORPETSUBMIT, [msg.questid, msg.npckey, msg.submittype, msg.availableIds, msg.availablePos]);
                    };
                    /** 获取刷新的任务数据 */
                    TaskProxy.prototype.onRefreshTaskDatas = function (optcode, msg) {
                        if (models.TaskModel.getInstance().datas != msg.datas) {
                            var _keys = msg.datas.keys;
                            for (var i = 0; i < _keys.length; i++) {
                                models.TaskModel.getInstance().datas.set(_keys[i], msg.datas.get(_keys[i]));
                            }
                        }
                        var tempdatas = models.TaskModel.getInstance().datas;
                        models.TaskModel.getInstance().refreshTaskDatas.set(msg.questid, tempdatas);
                        if (msg.questid == 1030000 && msg.datas.get(RefreshDataType.DEST_ITEM1_NUM)) { //日常副本任务
                            var _isAbandon = game.modules.task.models.TaskModel.getInstance().isAbandon;
                            if (_isAbandon) { //如果是主动放弃日常副本任务，则不跳出是否接受下一轮的日常副本任务的客户端确认弹窗
                                game.modules.task.models.TaskModel.getInstance().isAbandon = false;
                            }
                            if (msg.datas.get(RefreshDataType.DEST_ITEM1_NUM) == 1) {
                                var _schooltask = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
                                if (_schooltask && _schooltask.sumnum >= 9 && _schooltask.sumnum < 12) {
                                    //是否接收下一轮日常副本弹窗
                                    this.event(models.ACCEPTNEXTROUNDTASK, msg.questid);
                                }
                                var info = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
                                game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.questid);
                                game.modules.task.models.TaskModel.getInstance().renwuid.remove(info.dstnpcid);
                                //通知移除任务栏日常副本信息
                                this.event(models.TAKSREFRESH);
                            }
                        }
                    };
                    TaskProxy.prototype.onRefreshMissValue = function (optcode, msg) {
                        if ((msg.missionid > 500000 && msg.missionid < 600000)) {
                            var task_2 = models.TaskModel.getInstance().accepttask.get(msg.missionid);
                            if (task_2) {
                                task_2.missionround = msg.missionidround;
                                task_2.missionvalue = msg.missionidvalue;
                                models.TaskModel.getInstance().accepttask.set(msg.missionid, task_2);
                            }
                        }
                        else if (msg.missionid > 180000 && msg.missionid < 190000) {
                            var task_3 = models.TaskModel.getInstance().maintask.get(msg.missionid);
                            if (task_3) {
                                task_3.missionround = msg.missionidround;
                                task_3.missionvalue = msg.missionidvalue;
                                models.TaskModel.getInstance().maintask.set(msg.missionid, task_3);
                            }
                        }
                        else {
                            var task_4 = models.TaskModel.getInstance().schooltask.get(msg.missionid);
                            task_4.round = msg.missionidround;
                            task_4.sumnum = msg.missionidvalue;
                            models.TaskModel.getInstance().accepttask.set(msg.missionid, task_4);
                        }
                        this.event(models.TAKSREFRESH);
                    };
                    TaskProxy.prototype.onRefreshMissionstate = function (optcode, msg) {
                        if ((msg.missionid > 500000 && msg.missionid < 600000)) {
                            if (msg.missionstatus == 1) {
                                models.TaskModel.getInstance().taskStateDic.set(msg.missionid, msg.missionstatus);
                                models.TaskModel.getInstance().accepttask.remove(msg.missionid);
                            }
                            else {
                                var task_5 = models.TaskModel.getInstance().accepttask.get(msg.missionid);
                                task_5.missionstatus = msg.missionstatus;
                                models.TaskModel.getInstance().accepttask.set(msg.missionid, task_5);
                            }
                        }
                        else if (msg.missionid > 180000 && msg.missionid < 190000) { //主线任务
                            if (msg.missionstatus == 1) {
                                models.TaskModel.getInstance().maintask.remove(msg.missionid);
                            }
                            else {
                                var task_6 = models.TaskModel.getInstance().maintask.get(msg.missionid);
                                if (task_6) {
                                    task_6.missionstatus = msg.missionstatus;
                                    models.TaskModel.getInstance().maintask.set(msg.missionid, task_6);
                                }
                            }
                        }
                        this.event(models.TAKSREFRESH);
                    };
                    TaskProxy.prototype.onAcceptMission = function (optcode, msg) {
                        if (msg.missioninfo.missionid >= 500301 && msg.missioninfo.missionid <= 500306) {
                            return;
                        }
                        if (msg.missioninfo.missionid > 180000 && msg.missioninfo.missionid < 190000) { // 主线任务
                            models.TaskModel.getInstance().maintask.set(msg.missioninfo.missionid, msg.missioninfo);
                        }
                        else if ((msg.missioninfo.missionid > 500000 && msg.missioninfo.missionid < 600000)) { //支线
                            models.TaskModel.getInstance().accepttask.set(msg.missioninfo.missionid, msg.missioninfo);
                            // 取出所有，再进行排序
                            var alltaskinfo = [];
                            for (var key in models.TaskModel.getInstance().accepttask.keys) {
                                alltaskinfo.push(models.TaskModel.getInstance().accepttask.get(models.TaskModel.getInstance().accepttask.keys[key]));
                            }
                            for (var index = 0; index < alltaskinfo.length - 1; index++) {
                                for (var num = index + 1; num < alltaskinfo.length; num++) {
                                    if (alltaskinfo[index].missionid > alltaskinfo[num].missionid) { //前一个任务是否大于后一个任务id
                                        var missioninfo = alltaskinfo[num];
                                        alltaskinfo[num] = alltaskinfo[index];
                                        alltaskinfo[index] = missioninfo;
                                    }
                                }
                            }
                            for (var index = 0; index < alltaskinfo.length; index++) {
                                models.TaskModel.getInstance().accepttask.set(alltaskinfo[index].missionid, alltaskinfo[index]);
                            }
                        }
                        this.event(models.TAKSREFRESH);
                    };
                    TaskProxy.prototype.onLoadTask = function (optcode, msg) {
                        console.log("暂未使用");
                    };
                    TaskProxy.prototype.onMainOrGuideTask = function (optcode, msg) {
                        for (var k in msg.trackedmissions.keys) {
                            models.TaskModel.getInstance().tracktask.set(msg.trackedmissions.keys[k], msg.trackedmissions.get(msg.trackedmissions.keys[k]));
                        }
                    };
                    TaskProxy.prototype.onSchoolTask = function (optcode, msg) {
                        if (msg.menpaitaks.questtype != 0) { //任务类型不为0
                            models.TaskModel.getInstance().isRefreshSpecialQuest = true;
                            game.modules.task.models.TaskModel.getInstance().schooltask.set(msg.menpaitaks.questid, msg.menpaitaks);
                            // game.modules.task.models.TaskModel.getInstance().renwuid.set(msg.menpaitaks.dstnpcid, msg.menpaitaks.questtype)
                            game.modules.task.models.TaskModel.getInstance().renwuid.set(msg.menpaitaks.dstnpcid, msg.menpaitaks);
                            this.event(models.NEWTASK);
                            if (msg.menpaitaks.questid == 1030000) { //如果接取的任务类型是日常活动副本
                                /** 已领取的多倍点数 */
                                var _getdpoint = modules.activity.models.ActivityModel.getInstance().RoleHookExpData.getdpoint;
                                /** 可领取的多倍点数 */
                                var _canGetDPoint = modules.activity.models.ActivityModel.getInstance().RoleHookExpData.cangetdpoint;
                                if (_canGetDPoint > 0 && _getdpoint == 0) { //并且有多倍点数，还处于未领取多倍点数的状态
                                    this.event(models.GETDPOINT);
                                }
                            }
                        }
                    };
                    TaskProxy.prototype.onRefreshSchoolTask = function (optcode, msg) {
                        if (msg.questid >= 3010010 && msg.questid <= 3010035 && msg.questid % 5 == 0) {
                            this.event(models.TAKSREFRESH, [false, true]);
                        }
                        var info = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
                        var isRemoveFlag = true;
                        if (info) {
                            if (msg.state == SpecialQuestState.SUCCESS || msg.state == SpecialQuestState.ABANDONED || msg.state == SpecialQuestState.INSTANCE_ABANDONED) { //完成或者放弃
                                if (msg.state == SpecialQuestState.ABANDONED) { //放弃
                                    models.TaskModel.getInstance().isAbandon = true;
                                }
                                var _schooltask = game.modules.task.models.TaskModel.getInstance().schooltask.get(msg.questid);
                                if (msg.questid == 1030000 && msg.state == SpecialQuestState.SUCCESS) { //如果是循环任务中门派任务
                                    isRemoveFlag = false;
                                }
                                if (msg.questid == 1010000 && msg.state == SpecialQuestState.SUCCESS) { //如果是循环任务中门派任务
                                    if (_schooltask.round != 10) { //如果任务环数不等于10
                                        isRemoveFlag = false; //不进行移除门派一系列任务的操作
                                    }
                                    else {
                                        this.event(models.ACCEPTNEXTROUND_SCHOOLTASK, msg.questid);
                                    }
                                }
                                if (isRemoveFlag) {
                                    game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.questid);
                                    game.modules.task.models.TaskModel.getInstance().renwuid.remove(info.dstnpcid);
                                }
                            }
                            else {
                                info.queststate = msg.state;
                                game.modules.task.models.TaskModel.getInstance().schooltask.set(info.questid, info);
                                game.modules.task.models.TaskModel.getInstance().renwuid.set(info.dstnpcid, info);
                            }
                            this.event(models.TAKSREFRESH);
                        }
                    };
                    TaskProxy.prototype.onAcceptableTask = function (optcode, msg) {
                        game.modules.task.models.TaskModel.getInstance().acceptableTask = msg.missions;
                        // for (let i = 0; i < msg.missions.length; i++) {
                        // 	if (msg.missions[i] == 1030000) {//日常副本任务
                        // 		var _isAbandon = game.modules.task.models.TaskModel.getInstance().isAbandon;
                        // 		if (_isAbandon) {//如果是主动放弃日常副本任务，则不跳出是否接受下一轮的日常副本任务的客户端确认弹窗
                        // 			game.modules.task.models.TaskModel.getInstance().isAbandon = false;
                        // 			break;
                        // 		}
                        // 		var _refreshTaskDatas = game.modules.task.models.TaskModel.getInstance().refreshTaskDatas;
                        // 		var _keys = _refreshTaskDatas.keys;
                        // 		if (_keys.length == 0) {
                        // 			break;
                        // 		}
                        // 		if (_refreshTaskDatas.get(msg.missions[i]).get(RefreshDataType.DEST_ITEM1_NUM) == 1) {
                        // 			game.modules.task.models.TaskModel.getInstance().schooltask.remove(msg.missions[i]);
                        // 			this.event(TAKSREFRESH);
                        // 		} else {
                        // 			this.event(ACCEPTNEXTROUNDTASK, msg.missions[i]);
                        // 		}
                        // 		break;
                        // 	}
                        // }
                    };
                    TaskProxy.prototype.onNpcSerivceInfo = function (optcode, msg) {
                        console.log(msg.npckey, msg.service, msg.title);
                    };
                    TaskProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new TaskProxy();
                        }
                        return this._instance;
                    };
                    return TaskProxy;
                }(hanlder.ProxyBase));
                models.TaskProxy = TaskProxy;
            })(models = task_1.models || (task_1.models = {}));
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskProxy.js.map