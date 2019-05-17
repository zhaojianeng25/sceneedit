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
* 任务主界面
*/
var Taskmodels = game.modules.task.models.TaskModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var task;
        (function (task_1) {
            var TaskModule = /** @class */ (function (_super) {
                __extends(TaskModule, _super);
                function TaskModule(app) {
                    var _this = _super.call(this) || this;
                    /**切换界面这个为1否则为0*/
                    _this.tapselect = 0;
                    _this.lastlength = 0;
                    /**当前选择的一级菜单*/
                    _this.currenselectfirst = 0;
                    /**第一个界面选中的第几个一级菜单*/
                    _this.firstuiselect = 0;
                    /**第二个界面选择的第几个一级菜单*/
                    _this.seconduiselect = 0;
                    /**第一个界面二级菜单选择*/
                    _this.firstuisecondnumber = 0;
                    /**第二个界面二级菜单选择*/
                    _this.seconduisecondnumber = 0;
                    /**当前界面的二级菜单选择*/
                    _this.uisecondnumber = 0;
                    /**是否是关闭还是切换*/
                    _this.closeid = 0;
                    /**是否自动做任务*/
                    _this.autotask = 0;
                    /**二级菜单任务ID*/
                    _this.idlist = [];
                    /**天机仙令任务*/
                    _this.tjxlpos = -1;
                    /**一级菜单列表*/
                    _this.firstmenulist = [];
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.TaskUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, _this.close);
                    _this._viewUI.getReward_btn.visible = false;
                    _this._viewUI.taskselect_tap.selectHandler = new Laya.Handler(_this, _this.changetasktype);
                    _this._viewUI.goTask_btn.on(LEvent.MOUSE_DOWN, _this, _this.gototask);
                    _this._viewUI.cancelTask_btn.on(LEvent.MOUSE_DOWN, _this, _this.quit);
                    _this._viewUI.getReward_btn.on(LEvent.MOUSE_DOWN, _this, _this.accessible);
                    _this.desnpc = new Vector2();
                    _this.dialog = new game.modules.commonUI.JuQingMediator(_this._app);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(_this._app);
                    return _this;
                }
                ; /**按钮数量*/
                /**初始化数据*/
                TaskModule.prototype.init = function () {
                    var data = [];
                    this._viewUI.list_panel.vScrollBarSkin = "";
                    this.removefirstmenu();
                    this.initfirstmune();
                };
                /**一级菜单初始化*/
                TaskModule.prototype.initfirstmune = function () {
                    var firstnum = 0;
                    if (this._viewUI.taskselect_tap.selectedIndex == 0) {
                        if (Taskmodels.getInstance().schooltask.keys.length) { /** 推荐*/
                            this.createfirstmenu(240, firstnum);
                            firstnum += 1;
                        }
                        if (Taskmodels.getInstance().accepttask.keys.length) { /**支线 */
                            this.createfirstmenu(244, firstnum);
                            firstnum += 1;
                        }
                        if (Taskmodels.getInstance().maintask.keys.length) { /** 主线*/
                            this.createfirstmenu(243, firstnum);
                            firstnum += 1;
                        }
                        //是否第一次参见
                        if (game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().tjxlInfoData.jointime != 0 && modules.mainhud.models.HudModel.getInstance().levelNum >= 50) { /** 天机仙令*/
                            this.createfirstmenu(11553, firstnum);
                            firstnum += 1;
                        }
                    }
                    else {
                        if (Taskmodels.getInstance().acceptableTask.length) { //可接任务
                            this.createfirstmenu(240, firstnum);
                            firstnum += 1;
                        }
                    }
                    if (firstnum != 0) { //是否有任务
                        this._viewUI.destribe_box.visible = true;
                        this._viewUI.notask_box.visible = false;
                        this.selectfirstbtn(this.currenselectfirst, this.firstmenulist[this.currenselectfirst]);
                    }
                    else {
                        this.movetaskbtn();
                        this._viewUI.destribe_box.visible = false;
                        this._viewUI.notask_box.visible = true;
                    }
                };
                /**创建一级菜单,菜单名字对应的ID，第几个菜单 任务类型id 按钮id*/
                TaskModule.prototype.createfirstmenu = function (tasktypeid, btnid) {
                    var firstbtn = new Laya.Button();
                    var strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[tasktypeid];
                    firstbtn.skin = "common/ui/tongyong/treelhuang1.png";
                    firstbtn.width = 170;
                    firstbtn.height = 70;
                    firstbtn.label = strinfo.msg;
                    firstbtn.name = tasktypeid + "";
                    firstbtn.stateNum = 2;
                    firstbtn.x = 0;
                    firstbtn.labelColors = "#50321a,#50321a";
                    firstbtn.labelSize = 25;
                    firstbtn.y = btnid * 70;
                    this.firstmenulist[btnid] = tasktypeid;
                    this._viewUI.list_panel.addChild(firstbtn);
                    firstbtn.on(LEvent.MOUSE_DOWN, this, this.selectfirstbtn, [btnid, tasktypeid]);
                };
                /**移除一级菜单*/
                TaskModule.prototype.removefirstmenu = function () {
                    for (var index = 0; index < this.firstmenulist.length; index++) {
                        this._viewUI.list_panel.removeChildByName(this.firstmenulist[index] + "");
                    }
                    this.firstmenulist = [];
                    this.lastfirstid = -1;
                };
                /**一级菜单选择,按钮id,任务类型id*/
                TaskModule.prototype.selectfirstbtn = function (btnid, tasktypeid) {
                    if (this.lastfirstid != btnid) { //是否选择相同按钮
                        if (this.tapselect == 1) { //是否已有与可接切换界面
                            this.tapselect = 0;
                        }
                        else {
                            if (this.closeid == 1) { //是否关闭界面
                                this.uisecondnumber = this.firstuisecondnumber;
                            }
                            else {
                                this.uisecondnumber = 0;
                            }
                        }
                        var lastbtn = this._viewUI.list_panel.getChildByName(this.firstmenulist[this.lastfirstid] + "");
                        if (lastbtn) //是否有按钮
                            lastbtn.selected = false;
                        var btn = this._viewUI.list_panel.getChildByName(tasktypeid + "");
                        btn.selected = true;
                        this.lastfirstid = btnid;
                        if (this._viewUI.taskselect_tap.selectedIndex == 0) //是否选择可接界面
                            this.firstuiselect = btnid;
                        else
                            this.seconduiselect = btnid;
                        this.secondmenu(tasktypeid, btnid);
                    }
                };
                /**二级菜选择创建*/
                TaskModule.prototype.secondtask = function (index, btnid) {
                    if (index == 240) { //推荐
                        if (this._viewUI.taskselect_tap.selectedIndex == 0) {
                            for (var key_1 in Taskmodels.getInstance().schooltask.keys) {
                                var task_2 = Taskmodels.getInstance().schooltask.get(Taskmodels.getInstance().schooltask.keys[key_1]);
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[task_2.questtype];
                                this.createtaskbtn(task_2.questid, schoolinfo.strtypename, this.lastlength, btnid);
                                this.idlist[this.lastlength] = task_2.questid;
                                this.lastlength += 1;
                                this.autodo = -1;
                            }
                        }
                        else { //可接界面				
                            for (var key = 0; key < Taskmodels.getInstance().acceptableTask.length; key++) {
                                var accepttable = Taskmodels.getInstance().acceptableTaskData[Taskmodels.getInstance().acceptableTask[key]];
                                this.createtaskbtn(accepttable.id, accepttable.name, this.lastlength, btnid);
                                this.idlist[this.lastlength] = accepttable.id;
                                this.lastlength += 1;
                                this.autodo = -1;
                            }
                        }
                    }
                    else if (index == 244) { //支线
                        for (var key_2 in Taskmodels.getInstance().accepttask.keys) {
                            var accepttasks = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().accepttask.keys[key_2]];
                            this.createtaskbtn(accepttasks.id, accepttasks.MissionName, this.lastlength, btnid);
                            this.idlist[this.lastlength] = accepttasks.id;
                            this.lastlength += 1;
                            this.autodo = -1;
                        }
                    }
                    else if (index == 11553) { /**暗夜任务 */
                        var strinfo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11553];
                        this.createtaskbtn(1080000, strinfo.msg, this.lastlength, btnid);
                        this.idlist[this.lastlength] = 1080000;
                        this.lastlength += 1;
                        this.autodo = -1;
                        for (var index = 0; index < game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks.length; index++) {
                            var anye = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks[index];
                            if (anye.legend == 2 || anye.pos == Taskmodels.getInstance().tjxltansuo) { //处于探索状态						
                                var anyetask = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[anye.id];
                                this.createtaskbtn(anye.id, anyetask.followtitle, this.lastlength, btnid);
                                this.idlist[this.lastlength] = anye.id;
                                this.lastlength += 1;
                                this.autodo = -1;
                                this.tjxlpos = anye.pos;
                                break;
                            }
                        }
                    }
                    else { //主线
                        for (var key_3 in Taskmodels.getInstance().maintask.keys) {
                            var maintasks = Taskmodels.getInstance().missionCMainMissionInfoData[Taskmodels.getInstance().maintask.keys[key_3]];
                            this.createtaskbtn(maintasks.id, maintasks.MissionName, this.lastlength, btnid);
                            this.idlist[this.lastlength] = maintasks.id;
                            this.lastlength += 1;
                            this.autodo = maintasks.AutoDo;
                        }
                    }
                };
                /**移除任务按钮*/
                TaskModule.prototype.movetaskbtn = function () {
                    for (var index = 0; index < this.idlist.length; index++) {
                        this._viewUI.list_panel.removeChildByName(this.idlist[index] + "");
                    }
                    this.idlist = [];
                };
                /**增加二级菜单*/
                TaskModule.prototype.createtaskbtn = function (taskid, taskname, num, index) {
                    var newbtn = new Laya.Button();
                    newbtn.skin = "common/ui/tongyong/treelhuang1.png";
                    newbtn.width = 160;
                    newbtn.height = 60;
                    newbtn.stateNum = 2;
                    newbtn.label = taskname;
                    newbtn.name = taskid + "";
                    newbtn.x = 6;
                    newbtn.labelColors = "#50321a,#50321a";
                    newbtn.labelSize = 20;
                    newbtn.y = 60 * num + 70 * (index + 1);
                    if (num == this.uisecondnumber) { //上次选择的按钮
                        newbtn.selected = true;
                        this.taskid = taskid;
                        modules.mainhud.models.HudModel._instance.taskid = taskid;
                        this.taskxq(taskid);
                    }
                    newbtn.on(LEvent.MOUSE_DOWN, this, this.selectbtn, [num]);
                    this._viewUI.list_panel.addChild(newbtn);
                };
                /**选中按钮查看信息*/
                TaskModule.prototype.selectbtn = function (num) {
                    if (this.idlist && this.idlist.length != 0) {
                        if (num != this.uisecondnumber) { //两次选择的按钮是否相同
                            var btn = this._viewUI.list_panel.getChildByName(this.idlist[num] + "");
                            btn.selected = true;
                            var lastbtn = this._viewUI.list_panel.getChildByName(this.idlist[this.uisecondnumber] + "");
                            if (lastbtn) { //可能存在放弃任务只剩下一个任务存在时，之前点击过的按钮就没必要设置不选中
                                lastbtn.selected = false;
                            }
                            this.uisecondnumber = num;
                            if (this._viewUI.taskselect_tap.selectedIndex == 0) { //当前为哪个界面 0为当前界面
                                this.firstuisecondnumber = num;
                            }
                        }
                        this.taskxq(this.idlist[num]);
                        this.taskid = this.idlist[num];
                        modules.mainhud.models.HudModel._instance.taskid = this.idlist[num];
                    }
                };
                /**任务详情*/
                TaskModule.prototype.taskxq = function (taskid) {
                    Laya.timer.clear(this, this.reducetimer);
                    if (this.firstmenulist[this.currenselectfirst] == 240) { //推荐
                        if (this._viewUI.taskselect_tap.selectedIndex == 0) { //已接任务 需要地图名字 NPC名字 
                            this.autotask = 2;
                            var info = Taskmodels.getInstance().schooltask.get(taskid);
                            var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                            var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(schoolinfo.strtasktitletrack, info.round, 2);
                            var allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[schoolinfo.nacceptchatid];
                            var mapinfo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[info.dstmapid];
                            var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[info.dstnpcid];
                            var petinfo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[info.dstitemid];
                            var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[info.dstitemid];
                            var title = schoolinfo.strtasktitle;
                            var content = schoolinfo.strtaskdes;
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
                                var petnum = 0;
                                for (var key in PetModel.getInstance().pets.keys) {
                                    var pet_1 = PetModel.getInstance().pets.get(PetModel.getInstance().pets.keys[key]);
                                    if (pet_1.key == game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex) { //是否为出战宠物
                                        continue;
                                    }
                                    if (pet_1.id == petinfo.id) { //是否是任务需要的宠物
                                        petnum++;
                                    }
                                }
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, petnum, 8);
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, info.dstitemnum, 9);
                            }
                            if (iteminfo) { //道具
                                title = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(title, iteminfo.name, 6);
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, iteminfo.name, 6);
                                if (info.dstitemid2 != 0 || info.dstitemid != 0) { //是否有道具ID
                                    if (info.dstitemidnum2 != 0) //是否有第二个道具
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, info.dstitemidnum2, 9);
                                    else if (info.dstitemnum != 0) //是否有第一个道具
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, info.dstitemnum, 9);
                                    else
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, info.dstitemid2, 9);
                                    var _dataKeys = Object.keys(game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig);
                                    for (var i = 0; i < _dataKeys.length; i++) {
                                        var cirinfo = game.modules.tianjixianling.models.TianJiXianLingModel._instance.findItemConfig[_dataKeys[i]];
                                        //满足哪个任务的条件
                                        if (cirinfo.ctgroup == schoolinfo.ngroupid && cirinfo.levelmin <= modules.mainhud.models.HudModel.getInstance().levelNum && cirinfo.levelmax >= modules.mainhud.models.HudModel.getInstance().levelNum) {
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, modules.mainhud.models.HudModel.getInstance().levelNum * cirinfo.nqualitya / 1000 - cirinfo.nqualityb, 14);
                                            break;
                                        }
                                    }
                                    //去背包查看是否有该道具						
                                    var ishave = 0;
                                    if (iteminfo.itemtypeid == 25) {
                                        var bag = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                        for (var index = 0; index < bag.items.length; index++) {
                                            var item = bag.items[index];
                                            if (item.id == info.dstitemid) { //是否有该道具	
                                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                                ishave = 1;
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        var bag = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                                        for (var index = 0; index < bag.items.length; index++) {
                                            var item = bag.items[index];
                                            if (item.id == info.dstitemid) { //是否有该道具	
                                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                                ishave = 1;
                                                break;
                                            }
                                        }
                                    }
                                    if (ishave == 0) { //未拥有
                                        content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, 0, 8);
                                    }
                                }
                            }
                            if (allcount) { //任务的总数
                                titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, allcount.maxnum, 7);
                            }
                            this._viewUI.taskGuide_html.innerHTML = title;
                            this._viewUI.taskDescribe_html.innerHTML = content;
                            this._viewUI.taskName_text.text = titleinfo;
                            modules.mainhud.models.HudModel._instance.jumpmapid = info.dstmapid;
                            modules.mainhud.models.HudModel._instance.desnpc.x = info.dstx;
                            modules.mainhud.models.HudModel._instance.desnpc.y = info.dsty;
                            modules.mainhud.models.HudModel._instance.npcid = info.dstnpcid;
                            modules.mainhud.models.HudModel._instance.eventid = schoolinfo.id;
                            modules.mainhud.models.HudModel._instance.tasktype = schoolinfo.etasktype;
                        }
                        else { //未接
                            var schoolinfo = Taskmodels.getInstance().acceptableTaskData[taskid];
                            var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCInfoData[schoolinfo.destnpcid];
                            this._viewUI.taskName_text.text = schoolinfo.name;
                            this._viewUI.taskGuide_html.innerHTML = schoolinfo.aim;
                            this._viewUI.taskDescribe_html.innerHTML = schoolinfo.discribe;
                            modules.mainhud.models.HudModel._instance.jumpmapid = npcinfo.mapid;
                            modules.mainhud.models.HudModel._instance.npcid = schoolinfo.destnpcid;
                            modules.mainhud.models.HudModel._instance.eventid = schoolinfo.id;
                            modules.mainhud.models.HudModel._instance.tasktype = -1;
                        }
                    }
                    else if (this.firstmenulist[this.currenselectfirst] == 244) { //引导
                        var accept = Taskmodels.getInstance().accepttask.get(taskid);
                        var accepttasks = Taskmodels.getInstance().missionCMainMissionInfoData[taskid];
                        this._viewUI.taskName_text.text = accepttasks.MissionTypeString;
                        if (accept.missionstatus == 4) { //进行中
                            this._viewUI.taskGuide_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoTraceListA, accept.missionvalue, 2);
                            this._viewUI.taskDescribe_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(accepttasks.TaskInfoDescriptionListA, accept.missionvalue, 2);
                        }
                        else { //完成
                            this._viewUI.taskGuide_html.innerHTML = accepttasks.TaskInfoTraceListA;
                            this._viewUI.taskDescribe_html.innerHTML = accepttasks.TaskInfoDescriptionListA;
                        }
                        modules.mainhud.models.HudModel._instance.jumpmapid = accepttasks.ActiveInfoMapID;
                        modules.mainhud.models.HudModel._instance.npcid = accepttasks.ActiveInfoNpcID;
                        modules.mainhud.models.HudModel._instance.eventid = accepttasks.id;
                        modules.mainhud.models.HudModel._instance.tasktype = accepttasks.MissionType;
                    }
                    else if (this.firstmenulist[this.currenselectfirst] == 11553) { //暗夜任务
                        if (taskid == 1080000) { //跳转到天机仙令界面
                            var allcount = void 0;
                            var ishave = 0; //0为无
                            for (var index = 20; index <= 27; index++) {
                                allcount = game.modules.task.models.TaskModel.getInstance().cSchoolTaskData[index];
                                //是否满足任务条件
                                if (allcount.levelmin <= modules.mainhud.models.HudModel.getInstance().levelNum && allcount.levelmax >= modules.mainhud.models.HudModel.getInstance().levelNum) {
                                    ishave = 1;
                                    break;
                                }
                            }
                            if (ishave == 1) { //是否满足任务条件
                                var strinfo1 = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11500];
                                var strinfo2 = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11592];
                                var _taskCount = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData.times; //获取天机仙令累积完成次数
                                var _round = Math.ceil(_taskCount / 8); //获得天机仙令任务当前处于的轮数值
                                if (_taskCount % 8 == 0 && _taskCount < 160) {
                                    _round += 1;
                                }
                                else if (_taskCount == 160) {
                                    _round = 20;
                                }
                                var str1 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo1.msg, _round, 11);
                                var str2 = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(strinfo2.msg, _taskCount, 11);
                                this._viewUI.taskName_text.text = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str1, 20, 13);
                                this._viewUI.taskGuide_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str2, allcount.maxnum, 13);
                                this._viewUI.taskDescribe_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(str2, allcount.maxnum, 13);
                                modules.mainhud.models.HudModel._instance.jumpmapid = 0;
                                modules.mainhud.models.HudModel._instance.npcid = 0;
                                modules.mainhud.models.HudModel._instance.eventid = 1080000;
                                modules.mainhud.models.HudModel._instance.tasktype = -1;
                            }
                        }
                        else {
                            var anye = game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks[this.tjxlpos];
                            var anyetask = game.modules.tianjixianling.models.TianJiXianLingModel._instance.tjxlConfig[taskid];
                            var titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(anyetask.titledes, anye.dstitemnum, 9);
                            var content = void 0;
                            var _mapId = game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId;
                            var mapinfo = game.modules.mapworld.models.MapModel.getInstance().WorldMapConfigData[_mapId];
                            if (anye.legend == 3) //完成
                                content = anyetask.dialogdessuccess;
                            else if (anye.legend == 4) //失败
                                content = anyetask.dialogdesfail;
                            else
                                content = anyetask.dialogdes;
                            var iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[anye.dstitemid];
                            if (iteminfo) { //是否有该道具信息
                                titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, iteminfo.name, 6);
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, iteminfo.name, 6);
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, anye.dstitemnum, 9);
                                var ishave = 0;
                                if (iteminfo.itemtypeid == 25) {
                                    var bags = game.modules.bag.models.BagModel.getInstance().bagMap[5];
                                    for (var index = 0; index < bags.items.length; index++) {
                                        var item = bags.items[index];
                                        if (item.id == anye.dstitemid) { //是否拥有该道具
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                            titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                else {
                                    var bags = game.modules.bag.models.BagModel.getInstance().bagMap[1];
                                    for (var index = 0; index < bags.items.length; index++) {
                                        var item = bags.items[index];
                                        if (item.id == anye.dstitemid) { //是否拥有该道具
                                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, item.number, 8);
                                            titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, item.number, 8);
                                            ishave = 1;
                                            break;
                                        }
                                    }
                                }
                                if (ishave == 0) { //是否拥有该道具 0未拥有
                                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, 0, 8);
                                    titleinfo = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(titleinfo, 0, 8);
                                }
                            }
                            if (mapinfo) { //地图
                                content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, mapinfo.mapName, 15);
                            }
                            var _date = new Date();
                            var nums = _date.getTime();
                            var date = new Date(anye.legendend - nums);
                            var str = date.getMinutes() + ":" + date.getSeconds();
                            console.log(game.modules.tianjixianling.models.TianJiXianLingModel.getInstance().someRoundTasks);
                            content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, str, 16);
                            this.lastimer = str;
                            Laya.timer.loop(1000, this, this.reducetimer, [anye.legendend, content]);
                            this._viewUI.taskName_text.text = anyetask.followtitle;
                            this._viewUI.taskGuide_html.innerHTML = titleinfo;
                            this._viewUI.taskDescribe_html.innerHTML = content;
                            if (anye.legend == 2) //是否是探索任务
                                modules.mainhud.models.HudModel._instance.jumpmapid = _mapId;
                            else
                                modules.mainhud.models.HudModel._instance.jumpmapid = 0;
                            modules.mainhud.models.HudModel._instance.npcid = 0;
                            modules.mainhud.models.HudModel._instance.eventid = taskid;
                            modules.mainhud.models.HudModel._instance.tasktype = -1;
                        }
                    }
                    else { //主线
                        this.autotask = 0;
                        var maintasks = Taskmodels.getInstance().missionCMainMissionInfoData[taskid];
                        var accept = Taskmodels.getInstance().maintask.get(taskid);
                        this._viewUI.taskName_text.text = maintasks.MissionName;
                        if (accept.missionstatus == 4) { //进行中
                            this._viewUI.taskGuide_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoTraceListA, accept.missionvalue, 2);
                            this._viewUI.taskDescribe_html.innerHTML = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(maintasks.TaskInfoDescriptionListA, accept.missionvalue, 2);
                        }
                        else {
                            this._viewUI.taskGuide_html.innerHTML = maintasks.TaskInfoTraceListA;
                            this._viewUI.taskDescribe_html.innerHTML = maintasks.TaskInfoDescriptionListA;
                        }
                        modules.mainhud.models.HudModel._instance.jumpmapid = maintasks.ActiveInfoMapID;
                        modules.mainhud.models.HudModel._instance.npcid = maintasks.ActiveInfoNpcID;
                        modules.mainhud.models.HudModel._instance.eventid = maintasks.id;
                        modules.mainhud.models.HudModel._instance.tasktype = maintasks.MissionType;
                        modules.mainhud.models.HudModel._instance.desnpc.x = maintasks.ActiveInfoLeftPos;
                        modules.mainhud.models.HudModel._instance.desnpc.y = maintasks.ActiveInfoTopPos;
                    }
                };
                /**天机仙令任务倒计时*/
                TaskModule.prototype.reducetimer = function (time, content) {
                    var _date = new Date();
                    var nums = _date.getTime();
                    if (time - nums <= 0) { //任务关闭
                        Laya.timer.clear(this, this.reducetimer);
                        return;
                    }
                    var date = new Date(time - nums);
                    var str = date.getMinutes() + ":" + date.getSeconds();
                    content = content.replace(this.lastimer + "", "$time$");
                    content = game.modules.mainhud.models.HudModel.getInstance().taskAssembleBack(content, str, 16);
                    this._viewUI.taskDescribe_html.innerHTML = content;
                };
                /**切换界面*/
                TaskModule.prototype.changetasktype = function (index) {
                    if (this.ishide == 1) //是否相同界面
                        return;
                    this.tapselect = 1;
                    this.closeid = 0;
                    if (index == 0) { //第一个界面的菜单选择	
                        this.seconduisecondnumber = this.uisecondnumber;
                        this.uisecondnumber = this.firstuisecondnumber;
                        this.currenselectfirst = this.firstuiselect;
                        this._viewUI.goTask_btn.visible = true;
                        this._viewUI.cancelTask_btn.visible = true;
                        this._viewUI.getReward_btn.visible = false;
                    }
                    else {
                        this.firstuisecondnumber = this.uisecondnumber;
                        this.uisecondnumber = this.seconduisecondnumber;
                        this.currenselectfirst = this.seconduiselect;
                        this._viewUI.goTask_btn.visible = false;
                        this._viewUI.cancelTask_btn.visible = false;
                        this._viewUI.getReward_btn.visible = true;
                    }
                    this.init();
                };
                /**二级菜单初始化*/
                TaskModule.prototype.secondmenu = function (menuid, btnid) {
                    this.currenselectfirst = btnid;
                    this.movetaskbtn();
                    this.secondtask(menuid, btnid); //根据一级菜单名字不同来选择不同的二级菜单
                    for (var index = 0; index < this.firstmenulist.length; index++) {
                        if (index > btnid) { //界面按钮判断 排列位置
                            var btn = this._viewUI.list_panel.getChildByName(this.firstmenulist[index] + "");
                            btn.y = index * 70 + 60 * this.lastlength;
                        }
                        else {
                            var btn = this._viewUI.list_panel.getChildByName(this.firstmenulist[index] + "");
                            btn.y = index * 70;
                        }
                    }
                    this.lastlength = 0;
                };
                /**跳转地图寻找目标点*/
                TaskModule.prototype.gototask = function () {
                    this._app.sceneRoot.istask = 2;
                    modules.mainhud.models.HudModel.getInstance().autobatt.stop();
                    AutoHangUpModels._instance.autotask = 0;
                    AutoHangUpModels._instance.istaskwalk = this.autotask;
                    modules.mainhud.models.HudModel._instance.useapp = this._app;
                    modules.mainhud.models.HudModel._instance.taskstart();
                    this.hide();
                    //通知主界面关闭蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                /**放弃任务*/
                TaskModule.prototype.quit = function () {
                    //从客户端提示中获取
                    if (this.taskid > 180000 && this.taskid < 190000) { //主线				
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141484];
                        this.tips.onShow(chattext.msg);
                    }
                    else { //其他的
                        this.giveupui = new game.modules.commonUI.RemindViewMediator(this.uiLayer, this._app);
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141086];
                        // let cancel
                        var ofcourse = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2037];
                        var cancel = game.modules.tips.models.TipsModel._instance.cstringResConfigData[2038];
                        this.giveupui.once(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.giveup);
                        this.giveupui.once(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancelevent, [this.giveupui]);
                        //this.giveupui.onShow(chattext.msg, ofcourse.msg, cancel.msg);
                        this.giveupui.onhtmlShow(chattext.msg, ofcourse.msg, cancel.msg);
                    }
                };
                /**放弃任务*/
                TaskModule.prototype.giveup = function () {
                    if (this.taskid >= 1010000 && this.taskid <= 1160000) { //主线不可放弃 其他的可以
                        if (this.taskid == 1030000) { //如果是要放弃日常副本任务
                            var _roleid = LoginModel.getInstance().roleDetail.roleid;
                            //需要判断要放弃的角色是否在队伍
                            var _teaminfo = TeamModel.getInstance().teamMemberBasic; //该存储数据字典的key就是角色id，已经按照队伍的顺序存放数据，队长就是该字典key的第0位
                            if (_teaminfo.keys.length != 0 && _teaminfo.keys[0] != _roleid) { //并且该角色不是队长的话，无法放弃日常副本任务
                                var _msg = ChatModel.getInstance().chatMessageTips[141206].msg;
                                var _disMsgTips = new modules.commonUI.DisappearMessageTipsMediator(this._app);
                                _disMsgTips.onShow(_msg); //弹出提示飘窗
                                return;
                            }
                        }
                        game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.TAKSREFRESH, this, this.refreshtask);
                        RequesterProtocols._instance.c2s_CAbandonQuest(this.taskid);
                    }
                    else if (this.taskid >= 2100202 && this.taskid <= 2511202) { //天机仙令放弃任务
                        game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.TAKSREFRESH, this, this.refreshtask);
                        RequesterProtocols._instance.c2s_CAbandonQuest(1080000);
                    }
                    else {
                        this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141484];
                        this.tips.onShow(chattext.msg);
                    }
                };
                /**放弃*/
                TaskModule.prototype.cancelevent = function (giveupui) {
                    giveupui.off(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.giveup);
                };
                /**刷新任务*/
                TaskModule.prototype.refreshtask = function () {
                    this.init();
                };
                /**可接任务*/
                TaskModule.prototype.accessible = function () {
                    this._app.sceneRoot.istask = 2;
                    modules.mainhud.models.HudModel._instance.useapp = this._app;
                    modules.mainhud.models.HudModel._instance.taskstart();
                    this.hide();
                };
                /**显示*/
                TaskModule.prototype.onShow = function (event) {
                    this.ishide = 0;
                    this._viewUI.taskselect_tap.selectedIndex = 0;
                    this.init();
                    _super.prototype.onShow.call(this, event);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /**关闭界面*/
                TaskModule.prototype.close = function () {
                    this.hide();
                };
                TaskModule.prototype.hide = function () {
                    //通知主界面关闭蒙版
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.ishide = 1;
                    this.closeid = 1;
                    _super.prototype.hide.call(this);
                };
                TaskModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return TaskModule;
            }(game.modules.ModuleMediator));
            task_1.TaskModule = TaskModule;
        })(task = modules.task || (modules.task = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=TaskModule.js.map