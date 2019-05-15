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
var RedPackInfoVo = game.modules.redPacket.models.RedPackInfoVo;
var SRRedPackNumVo = game.modules.redPacket.models.SRRedPackNumVo;
var RedPackRoleTipVo = game.modules.redPacket.models.RedPackRoleTipVo;
var RedPackRoleHisInfoVo = game.modules.redPacket.models.RedPackRoleHisInfoVo;
var GetRedPackVo = game.modules.redPacket.models.GetRedPackVo;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            /** * 红包系统主界面 */
            var RedPacketMediator = /** @class */ (function (_super) {
                __extends(RedPacketMediator, _super);
                function RedPacketMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 红包界面信息数据 */
                    _this.redpack_infoData = [];
                    /** 红包被领取的记录信息 */
                    _this.redpack_getRecord_infoData = [];
                    /** 抢红包的信息 */
                    _this.redpack_get_infoData = [];
                    /** 红包推送消息数据 */
                    _this.redPack_tipData = [];
                    /**客户端信息提示表 */
                    _this._chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    _this._viewUI = new ui.common.RedPacketUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                RedPacketMediator.prototype.show = function (redpacktype) {
                    if (redpacktype != undefined) {
                        this._init_UI(redpacktype);
                    }
                    else {
                        this._init_UI();
                    }
                    this.registerEvent();
                    _super.prototype.show.call(this);
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /**
                 * @describe  注册事件
                 */
                RedPacketMediator.prototype.registerEvent = function () {
                    //消息事件
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.GET_REDPACK_SUCCESS, this, this.refreshData_3);
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.NONE_REDPACK, this, this.showNone);
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.SEE_RECORD_EVENT, this, this.refreshData_2);
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.SEND_REDPACK_VIEW, this, this.refreshData_1);
                    modules.chat.models.ChatProxy.getInstance().on(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.SEND_REDPACK_SUCCESS, this, this.updateBoolean);
                    // models.RedPacketProxy.getInstance().on(models.NOTICE_REPACK_EVENT,this,this.onShowImage);
                    //给选择红包类型的按钮添加监听事件，并向服务器发起红包界面请求
                    this._viewUI.world_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_WORLD]);
                    this._viewUI.faction_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_CLAN]);
                    this._viewUI.team_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_TEAM]);
                    //历史记录按钮添加点击监听事件
                    this._viewUI.redPacket_record_btn.on(LEvent.CLICK, this, this.show_redPacket_Record_UI);
                    //发放红包按钮添加点击监听事件
                    this._viewUI.send_redPacket_btn.on(LEvent.CLICK, this, this.show_send_redPacket_UI);
                    //界面关闭按钮添加点击监听事件
                    this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.clickCloseBtn);
                    // //界面关闭，监听显示小红包图标消息
                    // this._viewUI.close_btn.on(RedPacketMediator.SHOW_XIAOREDPACK_EVENT,this,this.onShowImage);
                    //tips按钮被点
                    this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN, this, this.onSHowTipsUI);
                    //背景图片添加监听事件
                    this._viewUI.bg_img.on(LEvent.CLICK, this, this.onHide);
                };
                /**
                 * 显示tipsUI
                 */
                RedPacketMediator.prototype.onSHowTipsUI = function () {
                    var param = new Laya.Dictionary();
                    param.set("title", 11490);
                    switch (this.cruee_redPack_type) {
                        case RedPackType.TYPE_WORLD:
                            param.set("contentId", 11487);
                            break;
                        case RedPackType.TYPE_CLAN:
                            param.set("contentId", 11488);
                            break;
                        case RedPackType.TYPE_TEAM:
                            param.set("contentId", 11489);
                            break;
                    }
                    if (!this._tipsModule) {
                        this._tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
                    }
                    else {
                        this.onHide();
                        this._tipsModule = new modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
                    }
                    this._viewUI.bg_img.mouseThrough = false;
                };
                /**
                 * 关闭某些弹窗
                 */
                RedPacketMediator.prototype.onHide = function () {
                    //如果有，则关闭说明型提示弹窗
                    if (this._tipsModule) {
                        this._tipsModule.hide();
                        this._viewUI.bg_img.mouseThrough = true;
                    }
                    //如果有，则关闭查看红包被领取记录的弹窗
                    if (this._viewUI.redPackRecord_box.visible) {
                        this._viewUI.redPackRecord_box.visible = false;
                        this._viewUI.bg_img.mouseThrough = true;
                    }
                };
                /**
                 * 更新业务所需的判断值,并发出提示消息
                 */
                RedPacketMediator.prototype.updateBoolean = function () {
                    //this._isSendNewRedPack = true;
                    var _msg = this._chatMessageTips["172004"].msg;
                    this.show_Msg(_msg);
                };
                // /**
                //  * 显示红包图标
                //  */
                // private onShowImage(roleName?:string,redpackid?:string,modeltype?:number):void{
                //     if(!roleName) return;
                //     this._appearRedPackMediator = new modules.commonUI.AppearRedPackMediator(this._app);
                //     if(roleName != null){
                //         this._appearRedPackMediator.onShow(roleName,redpackid,modeltype,this._viewUI.visible);
                //         this._tempRoleName = roleName;
                //         this._tempRedPackId = redpackid;
                //         this._tempRedPackType = modeltype;
                //     }
                //     else{
                //         //if(this._isFirstOpen) return;//如果该界面第一次打开，就返回
                //         if(this._isSendNewRedPack == false) return;//如果玩家没发新红包，就返回
                //         //只判断玩家当前最新发的红包状态
                //         if(this.redpack_infoData[0]["redpackstate"] == RedPackState.STATE_CANGET){                    
                //             this._appearRedPackMediator.onShow(this._tempRoleName,this._tempRedPackId,this._tempRedPackType,false);
                //         }
                //         else{
                //             this._appearRedPackMediator.onShow(this._tempRoleName,this._tempRedPackId,this._tempRedPackType,true);
                //         }
                //     }
                // }
                /**
                 * @describe 显示没人发送红包界面
                 */
                RedPacketMediator.prototype.showNone = function () {
                    this._viewUI.none_redPack_msg.visible = true;
                    this._viewUI.redPack_list.visible = false;
                };
                RedPacketMediator.prototype._init_UI = function (redpacktype) {
                    if (redpacktype != undefined) {
                        this.cruee_redPack_type = redpacktype;
                        this._redPacket_is_selected(redpacktype);
                    }
                    else {
                        this.cruee_redPack_type = RedPackType.TYPE_WORLD;
                        this._redPacket_is_selected(this.cruee_redPack_type);
                    }
                };
                /**
                 * 显示发红包界面
                 */
                RedPacketMediator.prototype.show_send_redPacket_UI = function () {
                    this._redPacketSendMediator = new redPacket.RedPacketSendMediator(this._app);
                    if (this.cruee_redPack_type == RedPackType.TYPE_TEAM) {
                        var teamInfo = modules.team.models.TeamModel.getInstance().screateTeam;
                        var arr = Object.keys(teamInfo);
                        if (arr.length == 0) {
                            var _chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                            this.show_Msg(_chatMessageTips[140498].msg);
                            return;
                        }
                        this._redPacketSendMediator.showUI(RedPackType.TYPE_TEAM);
                    }
                    else if (this.cruee_redPack_type == RedPackType.TYPE_CLAN) {
                        if (game.modules.mainhud.models.HudModel.getInstance().clankey == 0) {
                            var _chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                            this.show_Msg(_chatMessageTips[145077].msg);
                            return;
                        }
                        this._redPacketSendMediator.showUI(RedPackType.TYPE_CLAN);
                    }
                    else if (this.cruee_redPack_type == RedPackType.TYPE_WORLD) {
                        this._redPacketSendMediator.showUI(RedPackType.TYPE_WORLD);
                    }
                    //LoginModel.getInstance().CommonPage = "redpacket";
                    this.hide();
                };
                /**
                 * 显示个人红包历史记录
                 */
                RedPacketMediator.prototype.show_redPacket_Record_UI = function () {
                    this._redPacketRecordMediator = new redPacket.RedPacketRecordMediator(this._app);
                    this._redPacketRecordMediator.showUI();
                    //LoginModel.getInstance().CommonPage = "redpacket";
                    this.hide();
                };
                RedPacketMediator.prototype._redPacket_is_selected = function (btn) {
                    var redpack_id = '0'; //测试，暂时先用第一页，即0
                    var configure_Vo = redPacket.models.RedPacketModel.getInstance().redPackDic[btn];
                    this._viewUI.hongBaoTitle_lab.text = configure_Vo.name;
                    this._viewUI.hongBaoFenLei_lab.text = configure_Vo.name;
                    this._viewUI.world_redPacket_btn.selected = false;
                    this._viewUI.faction_redPacket_btn.selected = false;
                    this._viewUI.team_redPacket_btn.selected = false;
                    switch (btn) {
                        case RedPackType.TYPE_WORLD:
                            RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                            this._viewUI.world_redPacket_btn.selected = true;
                            this.cruee_redPack_type = RedPackType.TYPE_WORLD;
                            break;
                        case RedPackType.TYPE_CLAN:
                            RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                            this._viewUI.faction_redPacket_btn.selected = true;
                            this.cruee_redPack_type = RedPackType.TYPE_CLAN;
                            break;
                        case RedPackType.TYPE_TEAM:
                            RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                            this._viewUI.team_redPacket_btn.selected = true;
                            this.cruee_redPack_type = RedPackType.TYPE_TEAM;
                            break;
                    }
                };
                /**
                 * @describe 移除事件监听
                 */
                RedPacketMediator.prototype.removeEvent = function () {
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.GET_REDPACK_SUCCESS, this, this.refreshData_3);
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.SEE_RECORD_EVENT, this, this.refreshData_2);
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.SEND_REDPACK_VIEW, this, this.refreshData_1);
                    modules.chat.models.ChatProxy.getInstance().off(modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.NONE_REDPACK, this, this.showNone);
                    // models.RedPacketProxy.getInstance().off(models.NOTICE_REPACK_EVENT,this,this.onShowImage);
                    this._viewUI.world_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
                    this._viewUI.faction_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
                    this._viewUI.team_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
                    this._viewUI.redPacket_record_btn.off(LEvent.CLICK, this, this.show_redPacket_Record_UI);
                    this._viewUI.send_redPacket_btn.off(LEvent.CLICK, this, this.show_send_redPacket_UI);
                    this._viewUI.close_btn.off(LEvent.MOUSE_UP, this, this.clickCloseBtn);
                };
                RedPacketMediator.prototype.clickCloseBtn = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    if (LoginModel.getInstance().CommonPage != "") {
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                    this.hide();
                };
                RedPacketMediator.prototype.hide = function () {
                    this.onHide();
                    this.removeEvent();
                    _super.prototype.hide.call(this);
                    //this._viewUI.close_btn.event(RedPacketMediator.SHOW_XIAOREDPACK_EVENT);
                    // if(LoginModel.getInstance().CommonPage != "")
                    // {
                    // 	ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
                    // 	LoginModel.getInstance().CommonPage = "";
                    // }
                };
                RedPacketMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**
                 * @describe 获取抢红包信息数据
                 */
                /** 抢红包成功刷新数据 */
                RedPacketMediator.prototype.refreshData_3 = function (successflag, redpackid, state) {
                    this.redpack_get_infoData = redPacket.models.RedPacketModel._instance.redPack_get_info;
                    //红包是否抢成功，失败则返回
                    if (successflag == 0 && state == RedPackState.STATE_NONE) { //抢红包失败,红包已过期或者该红包已经退回给当前玩家
                        var arr = [];
                        for (var i = 0; i < this.redpack_infoData.length; i++) {
                            if (this.redpack_infoData[i]["redpackid"] != this.redpack_get_infoData["redpackid"]) {
                                arr.push(this.redpack_infoData[i]);
                            }
                            else {
                                redPacket.models.RedPacketModel.getInstance().expiredRedPackData.push(this.redpack_infoData[i]);
                            }
                        }
                        this.redpack_infoData = arr;
                    }
                    else if (successflag == 1) {
                        for (var index = 0; index < this.redpack_infoData.length; index++) {
                            if (this.redpack_infoData[index]["redpackid"] == this.redpack_get_infoData["redpackid"]) {
                                this.redpack_infoData[index]["redpackstate"] = this.redpack_get_infoData["state"];
                                break;
                            }
                        }
                    }
                    this.refresh_showRedPack_UI();
                };
                /**
                 * 弹出消息气泡
                 */
                RedPacketMediator.prototype.show_Msg = function (msg) {
                    this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                    this._disappearMessageTipsMediator.onShow(msg);
                };
                /**
                 * @describe 获取红包被领取的记录信息数据以及被领取的红包信息数据
                 * @param redpackid
                 */
                /** 刷新红包被领取的记录信息数据 */
                RedPacketMediator.prototype.refreshData_2 = function (redpackid) {
                    this.redpack_getRecord_infoData = redPacket.models.RedPacketModel._instance.redpack_roleHisInfoList;
                    this.redpack_his_infoData = redPacket.models.RedPacketModel._instance.redPack_HisView_info;
                    var numSize = this.redpack_getRecord_infoData.length;
                    if (numSize == 1) {
                        this.moneyNum_getMax_roleId = this.redpack_getRecord_infoData[numSize - 1]["roleid"];
                    }
                    else {
                        var maxNum = this.redpack_getRecord_infoData[0]["redpackmoney"];
                        var max_i = 0;
                        var minNum = this.redpack_getRecord_infoData[0]["redpackmoney"];
                        var min_i = 0;
                        for (var i = numSize - 1; i > -1; i--) {
                            var curr_num = this.redpack_getRecord_infoData[i]["redpackmoney"];
                            if (maxNum < curr_num) {
                                maxNum = curr_num;
                                max_i = i;
                            }
                            if (minNum > curr_num) {
                                minNum = curr_num;
                                min_i = i;
                            }
                        }
                        this.moneyNum_getMax_roleId = this.redpack_getRecord_infoData[max_i]["roleid"];
                        this.moneyNum_getMin_roleId = this.redpack_getRecord_infoData[min_i]["roleid"];
                    }
                    this._init_redPackRecordUI(redpackid);
                };
                /**
                 * @describe 查看红包领取的UI初始化
                 * @param redpackid
                 */
                RedPacketMediator.prototype._init_redPackRecordUI = function (redpackid) {
                    var redPack_time = 0;
                    redPack_time = this.redpack_his_infoData.get(redpackid)["time"]; //获取时间
                    var redpackdes = this.redpack_his_infoData.get(redpackid)["redpackdes"]; //获取寄语
                    var redpackallnum = this.redpack_his_infoData.get(redpackid)["redpackallnum"]; //获取红包总数量
                    var redpackallmoney = this.redpack_his_infoData.get(redpackid)["redpackallmoney"]; //获取红包总金额
                    var date = new Date(redPack_time);
                    var Y = '' + date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + '';
                    this._viewUI.timr_label.text = Y + M + D;
                    this._viewUI.JiYu_label.text = redpackdes;
                    this._viewUI.redPackNum_label.text = this.redpack_getRecord_infoData.length.toString() + '/' + redpackallnum.toString();
                    this._viewUI.moneyNum_label.text = redpackallmoney.toString();
                    this._init_redPackRecord_list(); //对红包领取记录里的列表进行初始化
                    this._viewUI.redPackRecord_box.visible = true;
                    this._viewUI.bg_img.mouseThrough = false;
                    this._viewUI.redPackRecord_box.on(LEvent.CLICK, this, this.box_hide, [this._viewUI.redPackRecord_box]);
                };
                RedPacketMediator.prototype.box_hide = function (box) {
                    box.visible = false;
                };
                /**
                 * @describe 红包领取记录里列表初始化
                 */
                RedPacketMediator.prototype._init_redPackRecord_list = function () {
                    var redPackRecord_list = this._viewUI.redPackRecord_list;
                    redPackRecord_list.array = this.redpack_getRecord_infoData;
                    redPackRecord_list.repeatX = 1;
                    redPackRecord_list.repeatY = this.redpack_getRecord_infoData.length;
                    redPackRecord_list.vScrollBarSkin = '';
                    redPackRecord_list.scrollBar.elasticBackTime = 200;
                    redPackRecord_list.scrollBar.elasticDistance = 100;
                    redPackRecord_list.renderHandler = new Handler(this, this._show_get_record_list);
                };
                RedPacketMediator.prototype._show_get_record_list = function (cell, index) {
                    var moneyNum_label = cell.getChildByName("moneyNum_label");
                    var roleName_label = cell.getChildByName("roleName_label");
                    var zuijia_image = cell.getChildByName("zuijia_image");
                    var zuicha_image = cell.getChildByName("zuicha_image");
                    moneyNum_label.text = this.redpack_getRecord_infoData[index]["redpackmoney"].toString();
                    roleName_label.text = this.redpack_getRecord_infoData[index]["rolename"];
                    var roleid = this.redpack_getRecord_infoData[index]["roleid"];
                    switch (roleid) {
                        case this.moneyNum_getMax_roleId:
                            zuijia_image.visible = true;
                            break;
                        case this.moneyNum_getMin_roleId:
                            zuicha_image.visible = true;
                            break;
                    }
                };
                /**
                 * @describe 获取红包界面的数据
                 */
                /** 刷新获取红包界面信息数据 */
                RedPacketMediator.prototype.refreshData_1 = function () {
                    this.redpack_infoData = redPacket.models.RedPacketModel._instance.redpack_infoList;
                    var guoqiRedPackData = redPacket.models.RedPacketModel.getInstance().expiredRedPackData;
                    if (guoqiRedPackData.length != 0) {
                        var arr = [];
                        for (var i = 0; i < this.redpack_infoData.length; i++) {
                            for (var j = 0; j < guoqiRedPackData.length; j++) {
                                if (this.redpack_infoData[i]["redpackid"] != guoqiRedPackData[j]["redpackid"]) {
                                    arr.push(this.redpack_infoData[i]);
                                }
                            }
                        }
                        this.redpack_infoData = arr;
                    }
                    this.refresh_showRedPack_UI();
                };
                /**
                 * @describe 红包界面的UI初始化
                 */
                RedPacketMediator.prototype.refresh_showRedPack_UI = function () {
                    this._viewUI.none_redPack_msg.visible = false;
                    this._viewUI.redPack_list.visible = true;
                    var redPack_list = this._viewUI.redPack_list;
                    redPack_list.vScrollBarSkin = "";
                    redPack_list.array = this.redpack_infoData;
                    redPack_list.repeatX = 2;
                    redPack_list.repeatY = Math.ceil(this.redpack_infoData.length / 2);
                    redPack_list.scrollBar.elasticBackTime = 200;
                    redPack_list.scrollBar.elasticDistance = 100;
                    redPack_list.renderHandler = new Handler(this, this._showRedPackListRender);
                };
                RedPacketMediator.prototype._showRedPackListRender = function (cell, index) {
                    if (index > this.redpack_infoData.length || index == this.redpack_infoData.length) {
                        return;
                    }
                    var roleName_label = cell.getChildByName("roleName_label");
                    roleName_label.text = this.redpack_infoData[index]["rolename"];
                    var JiYu_label = cell.getChildByName("JiYu_label");
                    JiYu_label.text = this.redpack_infoData[index]["redpackdes"];
                    var redpackid = this.redpack_infoData[index]["redpackid"];
                    cell.name = redpackid + "";
                    var redState = this.redpack_infoData[index]["redpackstate"];
                    var fushi = this.redpack_infoData[index]["fushi"];
                    this.is_redPack_kai(redpackid, redState, cell, fushi);
                    if (!cell.visible) {
                        cell.visible = true;
                    }
                };
                /**
                 * @describe 根据当前红包状态来显示UI
                 * @param redpackid
                 * @param state
                 * @param cell
                 * @param index
                 */
                RedPacketMediator.prototype.is_redPack_kai = function (redpackid, state, cell, fushi) {
                    var hongbao_image = cell.getChildByName("hongbao_image");
                    var jinbi_image = cell.getChildByName("jinbi_image");
                    var qiang_redPack_btn = cell.getChildByName("qiang_redPack_btn");
                    var status_image = cell.getChildByName("status_image");
                    var look_record_label = cell.getChildByName("look_record_label");
                    var JiYu_label = cell.getChildByName("JiYu_label");
                    switch (state) {
                        case RedPackState.STATE_CANGET:
                            if (fushi > 1000 || fushi == 1000) {
                                hongbao_image.skin = "common/ui/redpacket/fushibao.png";
                            }
                            else if (fushi == 18 || fushi < 1000) {
                                hongbao_image.skin = "common/ui/redpacket/jinbibao.png";
                            }
                            jinbi_image.visible = true;
                            qiang_redPack_btn.visible = true;
                            qiang_redPack_btn.mouseEnabled = true;
                            qiang_redPack_btn.on(LEvent.CLICK, this, this.qiang_redPack, [redpackid]);
                            status_image.skin = "";
                            look_record_label.visible = false;
                            look_record_label.mouseEnabled = false;
                            JiYu_label.visible = false;
                            break;
                        case RedPackState.STATE_HAVE:
                        case RedPackState.STATE_NONE:
                            if (fushi > 1000 || fushi == 1000) {
                                hongbao_image.skin = "common/ui/redpacket/fushibaokai.png";
                            }
                            else if (fushi == 18 || fushi < 1000) {
                                hongbao_image.skin = "common/ui/redpacket/jinbibaokai.png";
                            }
                            jinbi_image.visible = false;
                            qiang_redPack_btn.visible = false;
                            qiang_redPack_btn.mouseEnabled = false;
                            if (state == RedPackState.STATE_HAVE) {
                                status_image.skin = "common/ui/redpacket/qu.png";
                            }
                            else {
                                status_image.skin = "common/ui/redpacket/guang.png";
                            }
                            look_record_label.visible = true;
                            look_record_label.mouseEnabled = true;
                            look_record_label.on(LEvent.CLICK, this, this.look_get_record, [redpackid]);
                            JiYu_label.visible = true;
                            break;
                    }
                };
                RedPacketMediator.prototype.look_get_record = function (redpackid) {
                    RequesterProtocols._instance.c2s_CSendRedPackHisView(this.cruee_redPack_type, redpackid);
                };
                /**
                 * 抢红包
                 * @param redpackid 红包id
                 */
                /** 抢红包点击事件 */
                RedPacketMediator.prototype.qiang_redPack = function (redpackid) {
                    RequesterProtocols._instance.c2s_CGetRedPack(this.cruee_redPack_type, redpackid);
                };
                /** 点击红包图标，抢红包事件 */
                RedPacketMediator.QIANG_HONGBAO_EVENT = "qiangHongBaoEvent";
                return RedPacketMediator;
            }(game.modules.UiMediator));
            redPacket.RedPacketMediator = RedPacketMediator;
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketMediator.js.map