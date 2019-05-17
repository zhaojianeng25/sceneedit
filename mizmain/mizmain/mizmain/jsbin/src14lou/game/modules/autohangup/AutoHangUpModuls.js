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
* 自动挂机
*/
var AutoHangUpModels = game.modules.autohangup.models.AutoHangUpModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var autohangup;
        (function (autohangup) {
            var AutoHangUpModuls = /** @class */ (function (_super) {
                __extends(AutoHangUpModuls, _super);
                function AutoHangUpModuls(app) {
                    var _this = _super.call(this) || this;
                    _this._app = app;
                    return _this;
                }
                /**开启挂机一进入游戏就开启挂机倒计时，若要关闭则将之屏蔽就行*/
                AutoHangUpModuls.prototype.init = function () {
                    // 暂时关闭在线挂机
                    //Laya.timer.loop(1000, this, this.counttimer)
                };
                /**挂机开始*/
                AutoHangUpModuls.prototype.counttimer = function () {
                    if (AutoHangUpModels.getInstance().isstar == 0) { //0为关闭挂机状态
                        this.stop();
                        return;
                    }
                    // 战斗中关闭挂机状态
                    if (this._app.sceneObjectMgr.mapInfo.inBattle) {
                        this.stop();
                        return;
                    }
                    if (this._app.sceneRoot.hangup == 1) { //已经在挂机巡逻不需要判断了
                        this.stop();
                        return;
                    }
                    var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    var team = role.rolebasicOctets.datas.get(2);
                    if (team) { //有队伍且不是暂离状态的取消挂机状态
                        if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数	若为正数则停止挂机状态			
                            this.stop();
                            return;
                        }
                    }
                    if (AutoHangUpModels.getInstance().notaketimer < 30) { //挂机倒计时
                        AutoHangUpModels.getInstance().notaketimer++;
                        console.log(AutoHangUpModels.getInstance().notaketimer);
                        return;
                    }
                    this._app.sceneRoot.isnpc = 1;
                    /**每次开始自动任务时会先将定时器关闭，然后再完成任务接到新的任务时开启定时器 */
                    if (AutoHangUpModels.getInstance().istaskwalk == 0) { //自动主线任务
                        for (var key in Taskmodels._instance.maintask.keys) {
                            var taskinfo = Taskmodels._instance.maintask.get(Taskmodels._instance.maintask.keys[key]);
                            var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[taskinfo.missionid];
                            if (taskinfo.missionid >= 180000 && taskinfo.missionid <= 190000) { //有任务判断是否有主线，有主线就进行主线任务
                                if (maininfo.MinLevel <= HudModel._instance.levelNum) { //是否满足任务条件
                                    this._app.sceneRoot.istask = 2;
                                    modules.mainhud.models.HudModel._instance.useapp = this._app;
                                    modules.mainhud.models.HudModel._instance.taskid = taskinfo.missionid;
                                    modules.mainhud.models.HudModel._instance.eventid = maininfo.id;
                                    modules.mainhud.models.HudModel._instance.tasktype = maininfo.MissionType;
                                    modules.mainhud.models.HudModel._instance.desnpc.x = maininfo.ActiveInfoLeftPos;
                                    modules.mainhud.models.HudModel._instance.desnpc.y = maininfo.ActiveInfoTopPos;
                                    modules.mainhud.models.HudModel._instance.npcid = maininfo.ActiveInfoNpcID;
                                    modules.mainhud.models.HudModel._instance.jumpmapid = maininfo.ActiveInfoMapID;
                                    AutoHangUpModels._instance.autotask = 1;
                                    AutoHangUpModels._instance.istaskwalk = 0; //处于自动任务行走
                                    modules.mainhud.models.HudModel._instance.taskstart();
                                    this.stop();
                                }
                                else { //前往挂机地图
                                    for (var index = 1801; index <= 1830; index++) {
                                        var mapinfo = game.modules.mapworld.models.MapModel.getInstance().MapConfigData[index];
                                        var role_1 = game.modules.createrole.models.LoginModel.getInstance().roleDetail;
                                        if (mapinfo.LevelLimitMin <= role_1.level && mapinfo.LevelLimitMax >= role_1.level) { //找到适合的挂机地图
                                            this.mapChange(mapinfo.id);
                                            this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0);
                                            this._app.sceneRoot.hangup = 1;
                                            break;
                                        }
                                    }
                                    this.stop();
                                }
                                break;
                            }
                        }
                    }
                    else if (AutoHangUpModels._instance.istaskwalk == 2) { //循环任务 自动
                        for (var key in Taskmodels._instance.schooltask.keys) {
                            if (AutoHangUpModels.getInstance().tasktype == Taskmodels.getInstance().schooltask.keys[key]) { //是否是同个类型的任务
                                this._app.sceneRoot.istask = 2;
                                var schooltaskinfo = game.modules.task.models.TaskModel.getInstance().schooltask.get(AutoHangUpModels.getInstance().tasktype);
                                var info = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[schooltaskinfo.questtype];
                                modules.mainhud.models.HudModel._instance.eventid = schooltaskinfo.questtype;
                                modules.mainhud.models.HudModel._instance.tasktype = info.etasktype;
                                modules.mainhud.models.HudModel._instance.desnpc.x = schooltaskinfo.dstx;
                                modules.mainhud.models.HudModel._instance.desnpc.y = schooltaskinfo.dsty;
                                modules.mainhud.models.HudModel._instance.npcid = schooltaskinfo.dstnpcid;
                                modules.mainhud.models.HudModel._instance.jumpmapid = schooltaskinfo.dstmapid;
                                AutoHangUpModels._instance.autotask = 1;
                                AutoHangUpModels._instance.istaskwalk = 2; //处于自动任务行走
                                modules.mainhud.models.HudModel._instance.taskstart();
                                this.stop();
                                break;
                            }
                        }
                    }
                };
                /**停止挂机*/
                AutoHangUpModuls.prototype.stop = function () {
                    Laya.timer.clear(this, this.counttimer);
                };
                /**跳转地图*/
                AutoHangUpModuls.prototype.mapChange = function (mapid) {
                    this.getpost(mapid);
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                };
                /**获得随机位置 mapid为地图id*/
                AutoHangUpModuls.prototype.getpost = function (mapid) {
                    var MapData = MapModel.getInstance().WorldMapConfigData[mapid];
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    var x, y;
                    x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx);
                    y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy);
                    mainUnit.SetPosX(x);
                    mainUnit.SetPosY(y);
                    mainUnit.SetPos(x, y);
                };
                return AutoHangUpModuls;
            }(game.modules.ModuleMediator));
            autohangup.AutoHangUpModuls = AutoHangUpModuls;
        })(autohangup = modules.autohangup || (modules.autohangup = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=AutoHangUpModuls.js.map