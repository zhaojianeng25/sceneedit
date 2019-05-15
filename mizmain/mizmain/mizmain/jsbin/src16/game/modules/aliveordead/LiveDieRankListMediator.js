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
        var aliveordead;
        (function (aliveordead) {
            /** 生死战排行榜 */
            var LiveDieRankListMediator = /** @class */ (function (_super) {
                __extends(LiveDieRankListMediator, _super);
                function LiveDieRankListMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.LiveDieRankUI();
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    //获取造型配置表
                    _this._shapeConfig = LoginModel.getInstance().cnpcShapeInfo;
                    _this._LDRankNameArr = ["本日决斗", "本周决斗", "历史决斗", "我的决斗"];
                    _this._numDic = new Laya.Dictionary();
                    return _this;
                }
                /** 供其它地方使用该界面 */
                LiveDieRankListMediator.prototype.onShow = function () {
                    this.registerEvent();
                    this.show();
                    this._viewUI.rankType_lst.selectedIndex = LDmodelType.DAY_FIGHT - 1; //默认先显示本日的生死战排行榜
                };
                /** 请求生死战排行榜 */
                LiveDieRankListMediator.prototype.requestLDRankLstData = function (modeltype) {
                    RequesterProtocols._instance.c2s_CLiveDieBattleRankView(modeltype);
                };
                /** 事件注册 */
                LiveDieRankListMediator.prototype.registerEvent = function () {
                    //UI控件事件监听            
                    this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
                    //消息事件监听
                    aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.GetLDRankLstData, this, this.LDRankLstDataInit);
                    aliveordead.models.AliveOrDeadProxy.getInstance().on(aliveordead.models.RoseSuccess, this, this.roseDataInit);
                };
                /** 点赞成功返回的数据处理
                 * @param vedioid 某场生死场的录像id
                 * @param rosenum 点赞次数
                 * @param roseflag 是否还能点赞
                 */
                LiveDieRankListMediator.prototype.roseDataInit = function (vedioid, rosenum, roseflag) {
                    this._LDRankLstData = aliveordead.models.AliveOrDeadModel.getInstance()._rolefightlist;
                    for (var i = 0; i < this._LDRankLstData.length; i++) {
                        var rolefight = this._LDRankLstData[i];
                        if (rolefight.videoid == vedioid) {
                            rolefight.rosenum = rosenum;
                            rolefight.roseflag = roseflag;
                        }
                    }
                    this.rankLstInit();
                    this._viewUI.rank_lst.scrollTo(this._LDRankLstIndex);
                };
                /** 生死战排行榜数据初始化 */
                LiveDieRankListMediator.prototype.LDRankLstDataInit = function (rolefightlist) {
                    this._LDRankLstData = [];
                    this._LDRankLstData = rolefightlist;
                    this.rankLstInit();
                };
                /** 界面的初始化 */
                LiveDieRankListMediator.prototype.init = function () {
                    this._LDRankTypeDic = new Laya.Dictionary();
                    this._LDRankTypeDic.set("本日决斗", LDmodelType.DAY_FIGHT);
                    this._LDRankTypeDic.set("本周决斗", LDmodelType.WEEK_FIGHT);
                    this._LDRankTypeDic.set("历史决斗", LDmodelType.HIS_FIGHT);
                    this._LDRankTypeDic.set("我的决斗", LDmodelType.SELF_FIGHT);
                    this._LDRankLstData = [];
                    this.rankTypeLstInit();
                    this.rankLstInit();
                };
                /** 生死榜列表初始化 */
                LiveDieRankListMediator.prototype.rankLstInit = function () {
                    var lst = this._viewUI.rank_lst;
                    lst.vScrollBarSkin = "";
                    lst.scrollBar.elasticBackTime = 100;
                    lst.scrollBar.elasticDistance = 100;
                    lst.array = this._LDRankLstData;
                    lst.renderHandler = new Laya.Handler(this, this.rankLstRender);
                    lst.selectHandler = new Laya.Handler(this, this.rankLstSelect);
                };
                /** 生死榜的点击 */
                LiveDieRankListMediator.prototype.rankLstSelect = function (index) {
                };
                /** 顺序列表初始化
                 * @param lst 顺序列表
                 * @param ranking 第几个
                 */
                LiveDieRankListMediator.prototype.rankingLstInit = function (lst, ranking) {
                    var _numArr = [];
                    ranking++;
                    if (ranking < 10) {
                        _numArr.push(ranking);
                    }
                    else {
                        var rankingStr = ranking.toString();
                        for (var i = 0; i < rankingStr.length; i++) {
                            _numArr.push(Number(rankingStr[i]));
                        }
                    }
                    lst.array = _numArr;
                    this._numDic.set(lst, _numArr);
                    lst.renderHandler = new Laya.Handler(this, this.rankingLstRender, [lst]);
                };
                /** 顺序列表的渲染 */
                LiveDieRankListMediator.prototype.rankingLstRender = function (lst, cell, index) {
                    var num_img = cell.getChildByName("num_img");
                    num_img.skin = "common/ui/guanghuan/" + this._numDic.get(lst)[index] + ".png";
                };
                /** 生死榜的渲染 */
                LiveDieRankListMediator.prototype.rankLstRender = function (cell, index) {
                    if (index < 0 || index > this._LDRankLstData.length - 1)
                        return;
                    var _rolefight = this._LDRankLstData[index];
                    var ranking_lst = cell.getChildByName("ranking_lst");
                    this.rankingLstInit(ranking_lst, index);
                    var role1_box = cell.getChildByName("role1_box");
                    this.roleBoxInit(role1_box, _rolefight.role1, _rolefight.teamlist1);
                    var role2_box = cell.getChildByName("role2_box");
                    this.roleBoxInit(role2_box, _rolefight.role2, _rolefight.teamlist2);
                    var rosenum_lab = cell.getChildByName("rosenum_lab");
                    rosenum_lab.text = _rolefight.rosenum.toString();
                    var result_img = cell.getChildByName("result_img");
                    if (_rolefight.battleresult == LDBattleResult.victory) { //胜利
                        result_img.skin = "common/ui/tongyong/sheng.png";
                    }
                    else if (_rolefight.battleresult == LDBattleResult.failure) { //失败
                        result_img.skin = "common/ui/tongyong/bai.png";
                    }
                    else { //平局
                        result_img.skin = "common/ui/tongyong/ping.png";
                    }
                    var rose_btn = cell.getChildByName("rose_btn");
                    if (_rolefight.roseflag == RoseFlag.can) {
                        rose_btn.mouseEnabled = true;
                        rose_btn.on(LEvent.CLICK, this, this.requestRose, [_rolefight.videoid, index]);
                    }
                    else {
                        rose_btn.mouseEnabled = false;
                        rose_btn.off(LEvent.CLICK, this, this.requestRose);
                    }
                };
                /** 请求点赞 */
                LiveDieRankListMediator.prototype.requestRose = function (vedioid, index) {
                    this._LDRankLstIndex = index;
                    RequesterProtocols._instance.c2s_CLiveDieBattleGiveRose(vedioid);
                };
                /** 对手盒子初始化
                 * @param rolebox 角色盒子
                 * @param roleinfo 角色信息
                 * @param teaminfo 队伍信息
                 */
                LiveDieRankListMediator.prototype.roleBoxInit = function (rolebox, roleinfo, teaminfo) {
                    var role_img = rolebox.getChildByName("role_img");
                    var _littleheadID = this._shapeConfig[roleinfo.shape]["littleheadID"];
                    role_img.skin = "common/icon/avatarrole/" + _littleheadID + ".png";
                    var roleName_lab = rolebox.getChildByName("roleName_lab");
                    roleName_lab.text = roleinfo.rolename;
                    var school_img = rolebox.getChildByName("school_img");
                    school_img.skin = "common/ui/tongyong/" + roleinfo.school + ".png";
                    var selectType_lab = rolebox.getChildByName("selectType_lab");
                    var teamNum_lab = rolebox.getChildByName("teamNum_lab");
                    if (roleinfo.teamnum == 0 && roleinfo.teamnummax == 0) {
                        selectType_lab.text = "单人";
                        teamNum_lab.visible = false;
                    }
                    else {
                        selectType_lab.text = "组队";
                        teamNum_lab.visible = true;
                        teamNum_lab.text = roleinfo.teamnum + "/" + roleinfo.teamnummax;
                    }
                };
                /** 生死榜类型列表初始化 */
                LiveDieRankListMediator.prototype.rankTypeLstInit = function () {
                    var lst = this._viewUI.rankType_lst;
                    lst.repeatY = this._LDRankNameArr.length;
                    lst.array = this._LDRankNameArr;
                    lst.renderHandler = new Laya.Handler(this, this.rankTypeLstRender);
                    lst.selectHandler = new Laya.Handler(this, this.rankTypeLstSelect);
                };
                /** 生死战类型列表点击 */
                LiveDieRankListMediator.prototype.rankTypeLstSelect = function (index) {
                    var rankType_btn = this._viewUI.rankType_lst.getCell(index).getChildByName("rankType_btn");
                    var _LDRankTpye = this._LDRankTypeDic.get(rankType_btn.label);
                    this.requestLDRankLstData(_LDRankTpye);
                    rankType_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    if (this._lastSelectTypeBtn) {
                        rankType_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    }
                    this._lastSelectTypeBtn = rankType_btn;
                };
                /** 生死榜类型列表渲染 */
                LiveDieRankListMediator.prototype.rankTypeLstRender = function (cell, index) {
                    if (index < 0 || index > this._LDRankNameArr.length - 1)
                        return;
                    var rankType_btn = cell.getChildByName("rankType_btn");
                    rankType_btn.label = this._LDRankNameArr[index];
                    rankType_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
                    if (this._lastSelectTypeBtn && this._lastSelectTypeBtn == rankType_btn) {
                        rankType_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
                    }
                };
                LiveDieRankListMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.init();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                LiveDieRankListMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    this.removeEvent();
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                };
                /** 移除事件 */
                LiveDieRankListMediator.prototype.removeEvent = function () {
                    this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
                    aliveordead.models.AliveOrDeadProxy.getInstance().off(aliveordead.models.GetLDRankLstData, this, this.LDRankLstDataInit);
                    aliveordead.models.AliveOrDeadProxy.getInstance().off(aliveordead.models.RoseSuccess, this, this.roseDataInit);
                };
                LiveDieRankListMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return LiveDieRankListMediator;
            }(game.modules.UiMediator));
            aliveordead.LiveDieRankListMediator = LiveDieRankListMediator;
        })(aliveordead = modules.aliveordead || (modules.aliveordead = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LiveDieRankListMediator.js.map