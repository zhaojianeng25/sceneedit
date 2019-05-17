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
* 活动主界面
*/
var ActivityModel = game.modules.activity.models.ActivityModel;
var ActivityProxy = game.modules.activity.models.ActivityProxy;
var viewType;
(function (viewType) {
    viewType[viewType["VIEW1"] = 1] = "VIEW1";
    viewType[viewType["VIEW2"] = 2] = "VIEW2";
    viewType[viewType["VIEW3"] = 3] = "VIEW3";
})(viewType || (viewType = {}));
var game;
(function (game) {
    var modules;
    (function (modules) {
        var activity;
        (function (activity) {
            var ActivityModule = /** @class */ (function (_super) {
                __extends(ActivityModule, _super);
                function ActivityModule(app) {
                    var _this = _super.call(this) || this;
                    /** 星期天数 */
                    _this.date = new Date();
                    _this.day = _this.date.getDay();
                    /** 是否已经初始化 */
                    _this.isInit = true;
                    /** 活跃度奖励领取特效 */
                    _this.ani1 = new Laya.Animation();
                    _this.ani2 = new Laya.Animation();
                    _this.ani3 = new Laya.Animation();
                    _this.ani4 = new Laya.Animation();
                    _this.ani5 = new Laya.Animation();
                    _this.allChests = new Laya.Dictionary;
                    /** 页面编号 */
                    _this.viewNum = 0;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.ActivityUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._activityZhouLiMediator = new activity.ActivityZhouLiMediator(_this._app);
                    _this._activityTuiSongMediator = new activity.ActivityTuiSongMediator(_this._app);
                    _this._tianJiXianLingModule = new game.modules.tianjixianling.TianJiXianLingModule(_this._app);
                    _this._remindViewMediator = new game.modules.commonUI.RemindViewMediator(_this._viewUI, app);
                    _this._viewUI.activityChoose_btn.selectHandler = new Handler(_this, _this.showList);
                    _this._viewUI.noactivity_img.visible = false;
                    _this._viewUI.tiShi_btn.on(LEvent.MOUSE_DOWN, _this, _this.onLoad);
                    _this._viewUI.zhouLi_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        _this._activityZhouLiMediator.show();
                        _this.hide();
                    });
                    _this._viewUI.tuiSong_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        _this._activityTuiSongMediator.show();
                        _this.hide();
                    });
                    _this._viewUI.lingQu_btn.on(LEvent.MOUSE_DOWN, _this, _this.lingQu);
                    _this._viewUI.dongJie_btn.on(LEvent.MOUSE_DOWN, _this, _this.dongJie);
                    _this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, _this, function () {
                        modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                        _this.hide();
                    });
                    _this.activeGift();
                    if (_this.day == 0) {
                        _this.day = 7;
                    }
                    _this._viewUI.renWu_list.renderHandler = new Handler(_this, _this.dataLoad);
                    game.modules.activity.models.ActivityProxy.getInstance().on(activity.models.REFRESHACTIVITYLIST_EVENT, _this, _this.activeValOn);
                    //推送确定按钮监听
                    game.modules.activity.models.ActivityProxy.getInstance().on(activity.models.TUISONG_TIAOZHUAN_EVENT, _this, _this.onTuiSong);
                    //监听科举类确认框
                    game.modules.keju.models.KejuProxy.getInstance().on(modules.keju.models.CONFIRM_IMP_EXAM, _this, _this.onConfirmImpExam);
                    //答题
                    game.modules.keju.models.KejuProxy.getInstance().on(modules.keju.models.START_IMP_EXAM, _this, _this.onStartImpExam);
                    //天机仙令第一次参加成功
                    game.modules.tianjixianling.models.TianJiXianLingProxy.getInstance().on(modules.tianjixianling.models.JOIN_TJXL_SUCCESS, _this, _this.showTJXL);
                    return _this;
                }
                /** 显示天机仙令界面 */
                ActivityModule.prototype.showTJXL = function () {
                    modules.ModuleManager.show(modules.ModuleNames.TIAN_JI_XIAN_LING, this._app);
                    this.hide();
                };
                /** 确认提示框 */
                ActivityModule.prototype.onConfirmImpExam = function (type) {
                    /**程序内字符串表 */
                    var cstringResConfigData = game.modules.tips.models.TipsModel._instance.cstringResConfigData;
                    var prompt;
                    var id;
                    if (type == ImpExamType.IMPEXAM_VILL) {
                        id = Intra_ProgramString.XIANG_START;
                    }
                    else if (type == ImpExamType.IMPEXAM_PROV) {
                        id = Intra_ProgramString.HUI_START;
                    }
                    else if (type == ImpExamType.IMPEXAM_STATE) {
                        id = Intra_ProgramString.DIAN_START;
                    }
                    prompt = cstringResConfigData[id].msg;
                    var rightBtnName = modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.AGREE);
                    var leftBtnName = modules.mainhud.models.HudModel.getInstance().promptAssembleBack(PromptExplain.REJECT);
                    this._remindViewMediator.onShow(prompt, rightBtnName, leftBtnName);
                    this._remindViewMediator.addSecond(20);
                    this._remindViewMediator.once(game.modules.commonUI.LEFT_BUTTON_EVENT, this, this.onResponseImpExam, [type, false]);
                    this._remindViewMediator.once(game.modules.commonUI.RIGHT_BUTTON_EVENT, this, this.onResponseImpExam, [type, true]);
                };
                /**
                 * @param type 答题类型 @param isAnswer 是否作答
                 * 响应事件
                 */
                ActivityModule.prototype.onResponseImpExam = function (type, isAnswer) {
                    if (isAnswer == true) { /** 拒绝不响应 */
                        RequesterProtocols._instance.c2s_apply_impexam(type, 0);
                    }
                };
                /** 科举答题 */
                ActivityModule.prototype.onStartImpExam = function () {
                    var KejuModule = game.modules.keju.KejuModule.getInstance(this._app);
                    KejuModule.show();
                };
                /** 活动信息数据初始化 */
                ActivityModule.prototype.init = function () {
                    var _activities = activity.models.ActivityModel.getInstance().activities.values;
                    if (_activities.length > 0) {
                        for (var num in _activities) {
                            activity.models.ActivityModel.getInstance().activityInfos.set(_activities[num].num, _activities[num].num2);
                        }
                    }
                    this.isInit = false;
                    this.arrView1 = [];
                    this.arrView2 = [];
                    this.arrView3 = [];
                    for (var i = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1).length; i++) {
                        this.arrView1.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW1)[i]);
                    }
                    for (var i = 0; i < ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW2).length; i++) {
                        this.arrView2.push(ActivityModel.getInstance().ActivityNewBinDicAtType.get(viewType.VIEW2)[i]);
                    }
                    this.arrView1 = this.listSort(this.setData(this.arrView1));
                    this.arrView2 = this.listSort(this.setData(this.arrView2));
                    //判断是否是节日活动，当前时间是否在节日活动周期
                    for (var i = this.arrView2.length - 1; i >= 0; i--) {
                        var actId = ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(this.arrView2[i].id);
                        if (actId[0].weekrepeat == 0) {
                            var startTime = new Date(actId[0].startTime2);
                            var endTime = new Date(actId[actId.length - 1].endTime);
                            if (this.date.getTime() <= startTime.getTime() || endTime.getTime() <= this.date.getTime()) {
                                this.arrView2.splice(i, 1);
                            }
                        }
                    }
                    //显示日常活动
                    this._viewUI.activityChoose_btn.selectedIndex = 0;
                    this.showList(0);
                    this.activeProgress();
                    //显示双倍点数
                    if (ActivityModel.getInstance().RoleHookExpData != undefined) {
                        if (ActivityModel.getInstance().RoleHookExpData.getdpoint == 0) {
                            this._viewUI.dongJie_btn.visible = false;
                        }
                        this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                        this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
                    }
                    else {
                        console.debug("活动双倍点数获取失败");
                        this._viewUI.getdpoint_lab.text = "0";
                        this._viewUI.cangetdpoint_lab.text = "0";
                    }
                };
                /** 活动数据加载 */
                ActivityModule.prototype.setData = function (arr) {
                    var _level; //等级
                    if (HudModel.getInstance().levelNum != 0) {
                        _level = HudModel.getInstance().levelNum;
                    }
                    else {
                        _level = LoginModel.getInstance().roleDetail.level;
                    }
                    var _shape = LoginModel.getInstance().roleDetail.shape;
                    var _activenesst = LoginModel.getInstance().roleDetail.activenesst;
                    var _num = 0; //模拟次数
                    var _serverid = "0"; //模拟服务器id
                    var newArr = [];
                    for (var i = arr.length - 1; i >= 0; i--) {
                        if (arr[i].level > _level && arr[i].serverid == _serverid) {
                            this.arrView3.push(arr[i]);
                            arr.splice(i, 1);
                            continue;
                        }
                        //是否超过等级上线
                        if (arr[i].maxlevel < _level) {
                            arr.splice(i, 1);
                            continue;
                        }
                        //是否超过最大次数
                        if (arr[i].maxnum <= _num && arr[i].maxnum != -1) {
                            arr.splice(i, 1);
                            continue;
                        }
                        var times = arr[i].times.split(",");
                        for (var j = 0; j < times.length; j++) {
                            //判断当天是否在周期内
                            if (times[j] == this.day) {
                                newArr.push(arr[i]);
                            }
                        }
                    }
                    return newArr;
                };
                /** 根据页面编号显示相关页签数据 */
                ActivityModule.prototype.showList = function (index) {
                    if (ActivityModel.getInstance().firstInterface != -1) {
                        index = ActivityModel.getInstance().firstInterface;
                        ActivityModel.getInstance().firstInterface = -1;
                    }
                    switch (index) {
                        case 0:
                            this.view1();
                            this.viewNum = 0;
                            break;
                        case 1:
                            this.view2();
                            this.viewNum = 1;
                            break;
                        case 2:
                            this.view3();
                            this.viewNum = 2;
                            break;
                    }
                };
                /** 日常活动数据过滤 */
                ActivityModule.prototype.view1 = function () {
                    var _activityInfos = activity.models.ActivityModel.getInstance().activityInfos;
                    var data = [];
                    for (var i = 0; i < this.arrView1.length; i++) {
                        var _num = _activityInfos.get(this.arrView1[i].id); //参与的次数
                        var _activenesst = this.arrView1[i].actvalue * _num; //获得的活跃
                        var _maxNum = "无限制";
                        var _maxAct = "无";
                        var _isTuiJian = false;
                        if (this.arrView1[i].maxnum > 0) {
                            _maxNum = _num + "/" + this.arrView1[i].maxnum;
                            if (_num > this.arrView1[i].maxnum) {
                                _maxNum = this.arrView1[i].maxnum + "/" + this.arrView1[i].maxnum;
                            }
                        }
                        if (this.arrView1[i].maxact > 0) {
                            _maxAct = _activenesst + "/" + this.arrView1[i].maxact;
                            if (_activenesst > this.arrView1[i].maxact) {
                                _maxAct = this.arrView1[i].maxact + "/" + this.arrView1[i].maxact;
                            }
                        }
                        if (this.arrView1[i].starttuijian == this.day) {
                            _isTuiJian = true;
                        }
                        data.push({
                            icon_img: { skin: this.getSrc(this.arrView1[i].imgid) },
                            huoDongName_lab: { text: this.arrView1[i].name },
                            huoDongTuiJian_img: { visible: _isTuiJian },
                            huoDongnNumber_lab: { text: _maxNum },
                            huoDongHuoYue_lab: { text: _maxAct },
                            shizhong_img: { visible: false },
                            kaiQITime_lab: { visible: false },
                            timeDiban_img: { visible: false },
                            huoDongJoin_btn: { visible: true }
                        });
                    }
                    this.setList(data);
                };
                /** 限时活动数据过滤 */
                ActivityModule.prototype.view2 = function () {
                    var _activityInfos = activity.models.ActivityModel.getInstance().activityInfos;
                    var data = [];
                    for (var i = 0; i < this.arrView2.length; i++) {
                        var _num = _activityInfos.get(this.arrView2[i].id); //参与的次数
                        var _activenesst = this.arrView2[i].actvalue * _num; //获得的活跃
                        var _maxNum = "无限制";
                        var _maxAct = "无";
                        var _isTuiJian = false;
                        var _kaiQITimeText;
                        var _kaiQITimeVisi = true;
                        var _huoDongJoinVisi = false;
                        var _shiZhongVisi = false;
                        if (this.arrView2[i].maxnum > 0) {
                            _maxNum = _num + "/" + this.arrView2[i].maxnum;
                            if (_num > this.arrView2[i].maxnum) {
                                _maxNum = this.arrView2[i].maxnum + "/" + this.arrView2[i].maxnum;
                            }
                        }
                        if (this.arrView2[i].maxact > 0) {
                            _maxAct = _activenesst + "/" + this.arrView2[i].maxact;
                            if (_activenesst > this.arrView2[i].maxact) {
                                _maxAct = this.arrView2[i].maxact + "/" + this.arrView2[i].maxact;
                            }
                        }
                        if (this.arrView2[i].starttuijian == this.day) {
                            _isTuiJian = true;
                        }
                        if (this.arrView2[i].link == 0 || this.arrView2[i].link == 12) {
                            _kaiQITimeText = this.arrView2[i].protext;
                        }
                        else {
                            var timeArr = this.compareTime(this.arrView2[i].id);
                            if (timeArr[0]) {
                                _kaiQITimeVisi = false;
                                _huoDongJoinVisi = true;
                            }
                            else {
                                _kaiQITimeText = timeArr[1];
                                _shiZhongVisi = true;
                            }
                        }
                        data.push({
                            icon_img: { skin: this.getSrc(this.arrView2[i].imgid) },
                            huoDongName_lab: { text: this.arrView2[i].name },
                            huoDongTuiJian_img: { visible: _isTuiJian },
                            huoDongnNumber_lab: { text: _maxNum },
                            huoDongHuoYue_lab: { text: _maxAct },
                            shizhong_img: { visible: _shiZhongVisi },
                            kaiQITime_lab: { visible: _kaiQITimeVisi, text: _kaiQITimeText },
                            timeDiban_img: { visible: _kaiQITimeVisi },
                            huoDongJoin_btn: { visible: _huoDongJoinVisi }
                        });
                    }
                    this.setList(data);
                };
                /** 即将开始活动数据 */
                ActivityModule.prototype.view3 = function () {
                    var data = [];
                    for (var i = 0; i < this.arrView3.length; i++) {
                        var _maxNum = "无限制";
                        var _maxact = "无";
                        if (this.arrView3[i].maxnum > 0) {
                            _maxNum = "0/" + this.arrView3[i].maxnum;
                        }
                        if (this.arrView3[i].maxact > 0) {
                            _maxact = "0/" + this.arrView3[i].maxact;
                        }
                        data.push({
                            icon_img: { skin: this.getSrc(this.arrView3[i].imgid) },
                            huoDongName_lab: { text: this.arrView3[i].name },
                            huoDongTuiJian_img: { visible: false },
                            huoDongnNumber_lab: { text: _maxNum },
                            huoDongHuoYue_lab: { text: _maxact },
                            shizhong_img: { visible: false },
                            kaiQITime_lab: { visible: true, text: this.arrView3[i].level + "级开启" },
                            timeDiban_img: { visible: true },
                            huoDongJoin_btn: { visible: false }
                        });
                    }
                    this.setList(data);
                };
                /** 判断活动是否在开启时间段 */
                ActivityModule.prototype.compareTime = function (id) {
                    var actId = ActivityModel.getInstance().CheculedActivityBinDicAtActId.get(id);
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var time = date.toLocaleDateString();
                    var timeArr = [];
                    var startTime;
                    var endTime;
                    for (var i = 0; i < actId.length; i++) {
                        if (actId[i].weekrepeat == this.day) {
                            timeArr = actId[i].startTime2.split(":");
                            startTime = new Date(time + " " + actId[i].startTime2).getTime();
                            endTime = new Date(time + " " + actId[i].endTime).getTime();
                        }
                    }
                    if (startTime <= date.getTime() && date.getTime() <= endTime) {
                        return [true, ""];
                    }
                    else {
                        return [false, timeArr[0] + ":" + timeArr[1] + " 开启"];
                    }
                };
                /** 设置数据格式 */
                ActivityModule.prototype.setList = function (data) {
                    this._viewUI.renWu_list.array = data;
                    this._viewUI.renWu_list.vScrollBarSkin = "";
                    this._viewUI.renWu_list.repeatX = 2;
                    this._viewUI.renWu_list.scrollBar.elasticBackTime = 100;
                    this._viewUI.renWu_list.scrollBar.elasticDistance = 0;
                };
                /** 活动参加，物品弹窗按钮监听加载 */
                ActivityModule.prototype.dataLoad = function (cell, index) {
                    var arr = [];
                    switch (this.viewNum) {
                        case 0:
                            arr = this.arrView1;
                            break;
                        case 1:
                            arr = this.arrView2;
                            break;
                        case 2:
                            arr = this.arrView3;
                            break;
                    }
                    var btn = cell.getChildByName("huoDongJoin_btn");
                    btn.on(LEvent.MOUSE_DOWN, this, this.onBtn, [index, arr]);
                    var getTips = cell.getChildByName("getTips_btn");
                    getTips.on(LEvent.MOUSE_DOWN, this, this.getTips, [index, arr]);
                };
                /** 推送弹窗后确定参加按钮监听 */
                ActivityModule.prototype.onTuiSong = function (id) {
                    var actVo = activity.models.ActivityModel.getInstance().ActivityNewBinDic[id];
                    var arr = [];
                    arr.push(actVo);
                    this.onBtn(0, arr);
                };
                /** 参加按钮监听 */
                ActivityModule.prototype.onBtn = function (index, arr) {
                    var npcList = game.scene.models.SceneModel.getInstance().npclist;
                    if (arr[index].link > 0 && arr[index].link != undefined) {
                        var _link = arr[index].link;
                        var _linkid = arr[index].linkid1;
                        var inTeamGroup = HudModel.getInstance().chargeInGroup();
                        if (_link == 1 || _link == 7) { //
                            if (!inTeamGroup) //未处于组队
                             {
                                var _NPCConfigBinDic = HudModel._instance.cNPCConfigData;
                                var _linkid = arr[index].linkid1;
                                this._app.sceneRoot.istask = 2;
                                game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                                game.modules.mainhud.models.HudModel.getInstance().jumpmap(_NPCConfigBinDic[_linkid].mapid, _linkid);
                            }
                            else if (inTeamGroup)
                                this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                        }
                        else if (_link == 2) {
                            if (arr[index].id == 121) {
                                //显示出天机仙令
                                modules.ModuleManager.show(modules.ModuleNames.TIAN_JI_XIAN_LING, this._app);
                                this.hide();
                            }
                        }
                        else if (_link == 5) { //上古邪灵
                            if (!inTeamGroup) //未处于组队
                             {
                                var _ActivityMapListBinDic = ActivityModel.getInstance().ActivityMapListBinDic;
                                var _WorldMapConfigBinDic = MapModel.getInstance().WorldMapConfigData;
                                //var mapId = _ActivityMapListBinDic[arr[index].id].mapid;  //之前的做法取地图id
                                var rolelevel = HudModel.getInstance().levelNum; //玩家当前等级
                                var mapId = this.deciderolelevel(rolelevel); //地图Id
                                var x = Math.floor((_WorldMapConfigBinDic[mapId].topx + _WorldMapConfigBinDic[mapId].bottomx) / 2);
                                var y = Math.floor((_WorldMapConfigBinDic[mapId].topy + _WorldMapConfigBinDic[mapId].bottomy) / 2);
                                RequesterProtocols._instance.c2s_req_goto(mapId, x, y);
                            }
                            else if (inTeamGroup)
                                this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                        }
                        else if (_link == 6) { //师门任务
                            modules.mainhud.models.HudModel._instance.taskid = 1010000;
                            var info = Taskmodels.getInstance().schooltask.get(1010000);
                            this._app.sceneRoot.istask = 2;
                            modules.mainhud.models.HudModel._instance.useapp = this._app;
                            if (info != undefined) {
                                var schoolinfo = Taskmodels.getInstance().cRepeatTaskData[info.questtype];
                                modules.mainhud.models.HudModel._instance.jumpmapid = info.dstmapid;
                                modules.mainhud.models.HudModel._instance.desnpc.x = info.dstx;
                                modules.mainhud.models.HudModel._instance.desnpc.y = info.dsty;
                                modules.mainhud.models.HudModel._instance.npcid = info.dstnpcid;
                                modules.mainhud.models.HudModel._instance.eventid = schoolinfo.id;
                                modules.mainhud.models.HudModel._instance.tasktype = schoolinfo.etasktype;
                                modules.mainhud.models.HudModel._instance.taskstart();
                            }
                            else {
                                var _school = LoginModel.getInstance().roleDetail.school; //职业
                                var npcId = game.modules.achievent.models.AchieventModel.getInstance().MasterNpcDic[_school].masterid;
                                game.modules.mainhud.models.HudModel.getInstance().jumpmap(HudModel._instance.cNPCConfigData[npcId].mapid, npcId);
                            }
                        }
                        else if (_link == 8) { //帮派
                            var clankey = game.modules.mainhud.models.HudModel.getInstance().clankey;
                            if (clankey > 0) {
                                if (!inTeamGroup) //未处于组队
                                 { // 找npc
                                    var _NPCConfigBinDic = HudModel._instance.cNPCConfigData;
                                    var _linkid = arr[index].linkid1;
                                    this._app.sceneRoot.istask = 2;
                                    game.modules.mainhud.models.HudModel.getInstance().useapp = this._app;
                                    game.modules.mainhud.models.HudModel.getInstance().jumpmap(_NPCConfigBinDic[_linkid].mapid, _linkid);
                                }
                                else if (inTeamGroup)
                                    this.showDisappTips(PromptExplain.IN_TEAM_GROUP);
                            }
                            else {
                                //加入帮派窗口
                                modules.ModuleManager.show(modules.ModuleNames.Family, this._app);
                            }
                        }
                        else if (_link == 11 || _link == 10) { //科举
                            /** 当前考试类型 */
                            var impexamtype = KejuModel.getInstance().impexamtype;
                            RequesterProtocols._instance.c2s_apply_impexam(impexamtype, 0);
                            this.hide();
                        }
                        modules.ModuleManager.hide(modules.ModuleNames.ACTIVITY);
                    }
                };
                /**
                 * 判断角色等级 跳转到那个地图
                 * @param rolelevel 玩家当前等级
                 * @param return  返回地图id
                 */
                ActivityModule.prototype.deciderolelevel = function (rolelevel) {
                    if (rolelevel >= 25 && rolelevel < 40) { //望锋亭
                        return 1710;
                    }
                    else if (rolelevel >= 40 && rolelevel < 50) { //相思谷
                        return 1709;
                    }
                    else if (rolelevel >= 50 && rolelevel < 60) { //柳林桃海
                        return 1702;
                    }
                    else if (rolelevel >= 60 && rolelevel < 70) { //城宁道
                        return 1701;
                    }
                    else if (rolelevel >= 70 && rolelevel < 80) { //天州驿站
                        return 1703;
                    }
                    else if (rolelevel >= 80 && rolelevel < 90) { //黄岩岭
                        return 1706;
                    }
                    else if (rolelevel >= 90)
                        return 1705; //白沙小筑
                };
                /** 弹窗飘字提示
                 * @param id 提示语句id
                 */
                ActivityModule.prototype.showDisappTips = function (id) {
                    var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[id];
                    var tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    tips.onShow(chattext.msg);
                };
                /** 物品信息弹窗 */
                ActivityModule.prototype.getTips = function (index, arr) {
                    var id = arr[index].id;
                    var parame = new Dictionary();
                    parame.set("itemId", id);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.ACTIVITY, parame);
                };
                /** 活动排序-按推荐度排名 */
                ActivityModule.prototype.listSort = function (arr) {
                    var _j = 0;
                    for (var i = 0; i < arr.length; i++) {
                        if (i != 0 && arr[i].starttuijian == this.day) {
                            var vo = arr[0];
                            arr[0] = arr[i];
                            arr[i] = vo;
                            _j = 1;
                        }
                    }
                    for (var i = 0; i < arr.length - 1; i++) {
                        for (var j = _j; j < arr.length - 1 - i; j++) {
                            if (arr[j].sort > arr[j + 1].sort) {
                                var vo = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = vo;
                            }
                        }
                    }
                    return arr;
                };
                /** 活跃度奖励数据 */
                ActivityModule.prototype.activeGift = function () {
                    var _this = this;
                    var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                    var _activeGiftBox = ActivityModel.getInstance().ActiveGiftBoxBinDic;
                    var skinArr = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                        "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                        "common/ui/tongyong/jinkuang.png"];
                    for (var i = 1; i <= 5; i++) {
                        var diban_img = this._viewUI.rewardItem_img.getChildByName("rewardItem" + i + "_img");
                        var icon_img = this._viewUI.rewardItem_img.getChildByName("icon" + i + "_img");
                        if (this.activeVal >= 20 && this.chests.get(1) == 0) {
                            this.activeValOn();
                        }
                        diban_img.skin = skinArr[_itemAttrBinDic[_activeGiftBox[i].itemid].nquality - 1];
                        icon_img.skin = this.getSrc(_itemAttrBinDic[_activeGiftBox[i].itemid].icon);
                    }
                    //活跃度按钮1
                    this._viewUI.getReward_btn1.on(LEvent.MOUSE_DOWN, this, function () {
                        if (_this.activeVal >= 20 && _this.allChests.get(1) == 0) {
                            RequesterProtocols._instance.c2s_draw_gift_box(1);
                            var img = _this._viewUI.rewardItem_img.getChildByName("rewardItem1_img");
                            img.removeChild(_this.ani1);
                        }
                        else {
                            var itemId = _activeGiftBox[1].itemid;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            _this._tipsModule = new game.modules.tips.tipsModule(_this._viewUI, _this._app, TIPS_TYPE.commonItem, parame);
                        }
                    });
                    //活跃度按钮2
                    this._viewUI.getReward_btn2.on(LEvent.MOUSE_DOWN, this, function () {
                        if (_this.activeVal >= 40 && _this.allChests.get(2) == 0) {
                            RequesterProtocols._instance.c2s_draw_gift_box(2);
                            var img = _this._viewUI.rewardItem_img.getChildByName("rewardItem2_img");
                            img.removeChild(_this.ani2);
                        }
                        else {
                            var itemId = _activeGiftBox[2].itemid;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            _this._tipsModule = new game.modules.tips.tipsModule(_this._viewUI, _this._app, TIPS_TYPE.commonItem, parame);
                        }
                    });
                    //活跃度按钮3
                    this._viewUI.getReward_btn3.on(LEvent.MOUSE_DOWN, this, function () {
                        if (_this.activeVal >= 60 && _this.allChests.get(3) == 0) {
                            RequesterProtocols._instance.c2s_draw_gift_box(3);
                            var img = _this._viewUI.rewardItem_img.getChildByName("rewardItem3_img");
                            img.removeChild(_this.ani3);
                        }
                        else {
                            var itemId = _activeGiftBox[3].itemid;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            _this._tipsModule = new game.modules.tips.tipsModule(_this._viewUI, _this._app, TIPS_TYPE.commonItem, parame);
                        }
                    });
                    //活跃度按钮4
                    this._viewUI.getReward_btn4.on(LEvent.MOUSE_DOWN, this, function () {
                        if (_this.activeVal >= 80 && _this.allChests.get(4) == 0) {
                            RequesterProtocols._instance.c2s_draw_gift_box(4);
                            var img = _this._viewUI.rewardItem_img.getChildByName("rewardItem4_img");
                            img.removeChild(_this.ani4);
                        }
                        else {
                            var itemId = _activeGiftBox[4].itemid;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            _this._tipsModule = new game.modules.tips.tipsModule(_this._viewUI, _this._app, TIPS_TYPE.commonItem, parame);
                        }
                    });
                    //活跃度按钮5
                    this._viewUI.getReward_btn5.on(LEvent.MOUSE_DOWN, this, function () {
                        if (_this.activeVal >= 100 && _this.allChests.get(5) == 0) {
                            RequesterProtocols._instance.c2s_draw_gift_box(5);
                            var img = _this._viewUI.rewardItem_img.getChildByName("rewardItem5_img");
                            img.removeChild(_this.ani5);
                        }
                        else {
                            var itemId = _activeGiftBox[5].itemid;
                            var parame = new Dictionary();
                            parame.set("itemId", itemId);
                            _this._tipsModule = new game.modules.tips.tipsModule(_this._viewUI, _this._app, TIPS_TYPE.commonItem, parame);
                        }
                    });
                };
                /** 活跃度进度条 */
                ActivityModule.prototype.activeProgress = function () {
                    this.activeVal = ActivityModel.getInstance().activevalue;
                    var actPro = this._viewUI.huoYue_pro;
                    var actLab = this._viewUI.huoYue_lab;
                    var actBox = this._viewUI.pro_box;
                    var _val = this.activeVal / 100 - 0.05;
                    if (_val > 1) {
                        actPro.value = 1;
                        actBox.x = 100 * 4;
                    }
                    else {
                        actPro.value = _val;
                        actBox.x = this.activeVal * 4;
                    }
                    actLab.text = this.activeVal + "";
                    this.activeValOn();
                };
                /** 活跃度领取监听 */
                ActivityModule.prototype.activeValOn = function () {
                    this.chests = ActivityModel.getInstance().chests;
                    if (this.isInit)
                        return;
                    for (var i = 1; i <= 5; i++) {
                        if (this.chests.get(i) != 0 && this.chests.get(i) != undefined) {
                            this.allChests.set(i, 1);
                        }
                        else {
                            this.allChests.set(i, 0);
                        }
                    }
                    if (this.activeVal >= 20 && this.allChests.get(1) == 0) {
                        this.ani1.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani1]));
                        var img = this._viewUI.rewardItem_img.getChildByName("rewardItem1_img");
                        img.addChild(this.ani1);
                        this.ani1.x = -8;
                        this.ani1.y = -8;
                        this.ani1.scaleX = 0.9;
                        this.ani1.scaleY = 0.9;
                    }
                    if (this.activeVal >= 40 && this.allChests.get(2) == 0) {
                        this.ani2.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani2]));
                        var img = this._viewUI.rewardItem_img.getChildByName("rewardItem2_img");
                        img.addChild(this.ani2);
                        this.ani2.x = -8;
                        this.ani2.y = -8;
                        this.ani2.scaleX = 0.9;
                        this.ani2.scaleY = 0.9;
                    }
                    if (this.activeVal >= 60 && this.allChests.get(3) == 0) {
                        this.ani3.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani3]));
                        var img = this._viewUI.rewardItem_img.getChildByName("rewardItem3_img");
                        img.addChild(this.ani3);
                        this.ani3.x = -8;
                        this.ani3.y = -8;
                        this.ani3.scaleX = 0.9;
                        this.ani3.scaleY = 0.9;
                    }
                    if (this.activeVal >= 80 && this.allChests.get(4) == 0) {
                        this.ani4.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani4]));
                        var img = this._viewUI.rewardItem_img.getChildByName("rewardItem4_img");
                        img.addChild(this.ani4);
                        this.ani4.x = -8;
                        this.ani4.y = -8;
                        this.ani4.scaleX = 0.9;
                        this.ani4.scaleY = 0.9;
                    }
                    if (this.activeVal >= 100 && this.allChests.get(5) == 0) {
                        this.ani5.loadAtlas("common/res/atlas/ui/lan.atlas", Laya.Handler.create(this, this.onCreateFrame, [this.ani5]));
                        var img = this._viewUI.rewardItem_img.getChildByName("rewardItem5_img");
                        img.addChild(this.ani5);
                        this.ani5.x = -8;
                        this.ani5.y = -8;
                        this.ani5.scaleX = 0.9;
                        this.ani5.scaleY = 0.9;
                    }
                };
                /** 领取特效 */
                ActivityModule.prototype.onCreateFrame = function (ani) {
                    var effecthPath = this.getEffectUrls("", 14);
                    Laya.Animation.createFrames(effecthPath, "lan");
                    ani.play(0, true, "lan");
                    ani.interval = 112;
                };
                /** 特效资源加载 */
                ActivityModule.prototype.getEffectUrls = function (aniName, length) {
                    var urls = [];
                    for (var index = 1; index <= length; index++) {
                        urls.push("common/ui/lan/" + aniName + index + ".png");
                    }
                    return urls;
                };
                /** 提示按钮监听 */
                ActivityModule.prototype.onLoad = function () {
                    var parameArr = new Dictionary();
                    parameArr.set("title", 11134);
                    parameArr.set("contentId", 11135);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, parameArr);
                };
                /** 领取双倍点数 */
                ActivityModule.prototype.lingQu = function () {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CGetDPoint();
                    activity.models.ActivityProxy.getInstance().on(activity.models.ROLEHOOKEXP_EVENT, this, function () {
                        _this._viewUI.dongJie_btn.visible = true;
                        _this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                        _this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
                    });
                };
                /** 冻结双倍点数 */
                ActivityModule.prototype.dongJie = function () {
                    var _this = this;
                    RequesterProtocols._instance.c2s_CFreezeDPoint();
                    activity.models.ActivityProxy.getInstance().on(activity.models.ROLEHOOKEXP_EVENT, this, function () {
                        _this._viewUI.dongJie_btn.visible = false;
                        _this._viewUI.getdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.getdpoint + "";
                        _this._viewUI.cangetdpoint_lab.text = ActivityModel.getInstance().RoleHookExpData.cangetdpoint + "";
                    });
                };
                /** 获取物品图标 */
                ActivityModule.prototype.getSrc = function (index) {
                    var src = "";
                    if (index <= 10000) {
                        src = "common/icon/skillicon/" + index + ".png";
                    }
                    else if (index <= 10500) {
                        src = "common/icon/bustrole/" + index + ".png";
                    }
                    else if (index <= 11000) {
                        src = "common/icon/bustmonster/" + index + ".png";
                    }
                    else if (index <= 11100) {
                        src = "common/icon/bustpartner/" + index + ".png";
                    }
                    else if (index <= 11200) {
                        src = "common/icon/bustmount/" + index + ".png";
                    }
                    else if (index <= 12000) {
                        src = "common/icon/bustpet/" + index + ".png";
                    }
                    else if (index <= 30000) {
                        src = "common/icon/item/" + index + ".png";
                    }
                    else if (index <= 30500) {
                        src = "common/icon/avatarrole/" + index + ".png";
                    }
                    else if (index <= 31000) {
                        src = "common/icon/avatarmonster/" + index + ".png";
                    }
                    else if (index <= 31100) {
                        src = "common/icon/avatarpartner/" + index + ".png";
                    }
                    else if (index <= 31200) {
                        src = "common/icon/avatarmount/" + index + ".png";
                    }
                    else if (index <= 32000) {
                        src = "common/icon/avatarpet/" + index + ".png";
                    }
                    else if (index <= 40500) {
                        src = "common/icon/grayavatarrole/" + index + ".png";
                    }
                    else if (index <= 41000) {
                        src = "common/icon/grayavatarmonster/" + index + ".png";
                    }
                    else if (index <= 41100) {
                        src = "common/icon/grayavatarpartner/" + index + ".png";
                    }
                    else if (index <= 41200) {
                        src = "common/icon/grayavatarmount/" + index + ".png";
                    }
                    else if (index <= 42000) {
                        src = "common/icon/grayavatarpet/" + index + ".png";
                    }
                    return src;
                };
                ActivityModule.prototype.onShow = function (event) {
                    var _this = this;
                    this._app.uiRoot.closeLoadProgress();
                    RequesterProtocols._instance.c2s_CQueryCircleTaskState(1050000);
                    RequesterProtocols._instance.c2s_sGet_activity_info();
                    RequesterProtocols._instance.c2s_sRefresh_activity_list_finish_times();
                    game.modules.activity.models.ActivityProxy.getInstance().once(game.modules.activity.models.REFRESHACTIVITYLIST_EVENT, this, function () {
                        // game.modules.activity.models.ActivityProxy.getInstance().on(game.modules.activity.models.ACTIVITYINFOS_EVENT, this, () => {
                        _this.init();
                        _this.show();
                        // });
                    });
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                ActivityModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                ActivityModule.prototype.getView = function () {
                    return this._viewUI;
                };
                ActivityModule.prototype.jumpPage = function (index) {
                    this.show();
                };
                return ActivityModule;
            }(game.modules.ModuleMediator));
            activity.ActivityModule = ActivityModule;
        })(activity = modules.activity || (modules.activity = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ActivityModule.js.map