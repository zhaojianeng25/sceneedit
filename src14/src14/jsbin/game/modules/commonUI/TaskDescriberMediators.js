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
/**Rename.ui */
// import RenWuShuoMingUI = ui.common.component.RenWuShuoMingUI;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var TaskDescriberMediators = /** @class */ (function (_super) {
                __extends(TaskDescriberMediators, _super);
                function TaskDescriberMediators(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI = new ui.common.component.RenWuShuoMingUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    return _this;
                }
                TaskDescriberMediators.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new TaskDescriberMediators(app);
                    }
                    return this._instance;
                };
                ////////////////
                ///业务逻辑
                ////////////////
                /**
                 * @describe  改名卡
                 *
                 */
                TaskDescriberMediators.prototype.onShow = function (displayInfo) {
                    _super.prototype.show.call(this);
                    this.onLoad(displayInfo);
                    this.registEvent();
                };
                /** 初始化数据 */
                TaskDescriberMediators.prototype.onLoad = function (displayInfo) {
                    var taskId = displayInfo.uniqid;
                    if (taskId >= 1010000 && taskId <= 2000000) { /** 师门任务 */
                        var info = Taskmodels.getInstance().schooltask.get(taskId);
                        var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                        var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                        var allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                        var mapinfo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[info.dstmapid];
                        var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[info.dstnpcid];
                        var petinfo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[info.dstitemid];
                        var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[info.dstitemid];
                        var content = schoolinfo.strtaskdes;
                        var title = schoolinfo.strtasktitle;
                        if (allcount) {
                            titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7);
                        }
                        this._viewUI.taskname_lab.text = titleinfo;
                        if (mapinfo) { //地图
                            title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title, mapinfo.mapName, 3);
                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, mapinfo.mapName, 3);
                        }
                        if (npcinfo) { //npc
                            title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title, npcinfo.name, 4);
                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, npcinfo.name, 4);
                        }
                        if (petinfo) { //宠物
                            title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title, petinfo.name, 5);
                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, petinfo.name, 5);
                        }
                        if (iteminfo) { //道具
                            title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title, iteminfo.name, 6);
                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, iteminfo.name, 6);
                            if (info.dstitemid2 != 0) {
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, info.dstitemid2, 9);
                                //去背包查看是否有该道具
                                var ishave = 0;
                                console.log(game.modules.bag.models.BagModel.getInstance().bagMap[1]);
                                if (iteminfo.itemtypeid == 25) {
                                    var bag_1 = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                    for (var index = 0; index < bag_1.items.length; index++) {
                                        var item = bag_1.items[index];
                                        if (item.id == info.dstitemid) {
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    var bag_2 = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                                    for (var index = 0; index < bag_2.items.length; index++) {
                                        var item = bag_2.items[index];
                                        if (item.id == info.dstitemid) {
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                if (ishave == 0) {
                                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, 0, 8);
                                }
                            }
                        }
                        this._viewUI.taskjieshao_lab.innerHTML = title;
                        this._viewUI.taskmiaoshu_lab.innerHTML = content;
                    }
                    else { /** 主线和支线任务 */
                        // this._viewUI.taskname_lab.text = info.MissionName;
                        var maintasks = Taskmodels.getInstance().missionCMainMissionInfoData[taskId];
                        var accept = Taskmodels.getInstance().maintask.get(taskId);
                        this._viewUI.taskname_lab.text = maintasks.MissionName;
                        this._viewUI.taskmiaoshu_lab.innerHTML = maintasks.TaskInfoDescriptionListA; // game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoTraceListA,accept.missionvalue,2);
                        this._viewUI.taskjieshao_lab.innerHTML = maintasks.TaskInfoPurposeListA; //game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoDescriptionListA,accept.missionvalue,2);
                    }
                };
                TaskDescriberMediators.prototype.registEvent = function () {
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                };
                TaskDescriberMediators.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                TaskDescriberMediators.prototype.getView = function () {
                    return this._viewUI;
                };
                return TaskDescriberMediators;
            }(game.modules.UiMediator));
            commonUI.TaskDescriberMediators = TaskDescriberMediators;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskDescriberMediators.js.map