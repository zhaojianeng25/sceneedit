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
 * 红包记录界面
 */
var RedPackRoleRecordVo = game.modules.redPacket.models.RedPackRoleRecordVo;
var RedPackRoleRecordViewVo = game.modules.redPacket.models.RedPackRoleRecordViewVo;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var redPacket;
        (function (redPacket) {
            var RedPacketRecordMediator = /** @class */ (function (_super) {
                __extends(RedPacketRecordMediator, _super);
                function RedPacketRecordMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 红包历史里列表数据 */
                    _this.record_info_data = [];
                    /** 红包历史界面信息数据 */
                    _this.role_redPack_record_data = [];
                    /** 红包被领取的记录信息 */
                    _this.redpack_getRecord_infoData = [];
                    _this.i = 0;
                    /** 角色头像配置数据 */
                    _this.roleIcon = {};
                    _this._viewUI = new ui.common.RedRecordUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                RedPacketRecordMediator.prototype.showUI = function () {
                    this.show();
                };
                RedPacketRecordMediator.prototype.show = function () {
                    this._init_UI();
                    this.registerEvent();
                    _super.prototype.show.call(this);
                    this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.hide);
                    this._loginModel = game.modules.createrole.models.LoginModel.getInstance();
                };
                ////////////////
                ///事件
                ////////////////
                /**
                 * @describe  注册事件
                 */
                RedPacketRecordMediator.prototype.registerEvent = function () {
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.LOOK_RECORD_EVENT, this, this._refresh_getRecord_infoData);
                    redPacket.models.RedPacketProxy.getInstance().on(redPacket.models.ROLE_REDPACK_RECORD_EVENT, this, this.refreshData);
                    this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.onHide);
                };
                /**
                 * 关闭某些弹窗
                 */
                RedPacketRecordMediator.prototype.onHide = function () {
                    //如果有，则关闭查看红包被领取记录的弹窗
                    if (this._viewUI._redPackRecord_Box.visible) {
                        this._viewUI._redPackRecord_Box.visible = false;
                        this._viewUI.hideBg_img.mouseThrough = true;
                    }
                };
                /**
                 * @describe  刷新红包历史记录里的红包领取情况信息
                 */
                RedPacketRecordMediator.prototype._refresh_getRecord_infoData = function (redpackid) {
                    console.log("------------------------------------红包历史界面查看红包领取记录---------------------------------------");
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
                    this._show_getRecord_UI(redpackid);
                };
                /**
                 * @describe 显示查看红包领取记录的UI
                 */
                RedPacketRecordMediator.prototype._show_getRecord_UI = function (redpackid) {
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
                    this._init_redPackRecord_list();
                    this._viewUI._redPackRecord_Box.visible = true;
                    this._viewUI.hideBg_img.mouseThrough = false;
                    this._viewUI._redPackRecord_Box.on(LEvent.CLICK, this, this.box_hide, [this._viewUI._redPackRecord_Box]);
                };
                RedPacketRecordMediator.prototype.box_hide = function (box) {
                    console.log("******************************红包历史界面查看红包领取记录界面关闭************************************");
                    box.visible = false;
                };
                /**
                 * @describe 对红包领取记录里的列表进行初始化
                 */
                RedPacketRecordMediator.prototype._init_redPackRecord_list = function () {
                    var redPackRecord_list = this._viewUI.redPackRecord_list;
                    redPackRecord_list.array = this.redpack_getRecord_infoData;
                    redPackRecord_list.repeatX = 1;
                    redPackRecord_list.repeatY = this.redpack_getRecord_infoData.length;
                    redPackRecord_list.vScrollBarSkin = '';
                    redPackRecord_list.scrollBar.elasticBackTime = 200;
                    redPackRecord_list.scrollBar.elasticDistance = 100;
                    redPackRecord_list.renderHandler = new Handler(this, this._show_get_record_list);
                };
                RedPacketRecordMediator.prototype._show_get_record_list = function (cell, index) {
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
                RedPacketRecordMediator.prototype._init_UI = function () {
                    this._init_btnUI();
                };
                RedPacketRecordMediator.prototype._init_btnUI = function () {
                    this.curr_redPackRecordState = RedPackRecordState.RECEIVED_RED_PACK;
                    this._btn_is_selected(this.curr_redPackRecordState);
                    this._viewUI.receive_btn.on(LEvent.CLICK, this, this._btn_is_selected, [RedPackRecordState.RECEIVED_RED_PACK]); //为收到按钮添加事件监听  
                    this._viewUI.send_btn.on(LEvent.CLICK, this, this._btn_is_selected, [RedPackRecordState.SEND_RED_PACK]); //为发送按钮添加事件监听  
                };
                RedPacketRecordMediator.prototype._btn_is_selected = function (btn) {
                    var redpackid = 0;
                    this.record_info_data = [];
                    switch (btn) {
                        case RedPackRecordState.RECEIVED_RED_PACK:
                            this._viewUI.receive_btn.selected = true;
                            this._viewUI.send_btn.selected = false;
                            RequesterProtocols._instance.c2s_CSendRedPackRoleRecordView(btn, redpackid.toString());
                            this._init_record_UI(btn);
                            break;
                        case RedPackRecordState.SEND_RED_PACK:
                            this._viewUI.receive_btn.selected = false;
                            this._viewUI.send_btn.selected = true;
                            RequesterProtocols._instance.c2s_CSendRedPackRoleRecordView(btn, redpackid.toString());
                            this._init_record_UI(btn);
                            break;
                    }
                };
                RedPacketRecordMediator.prototype.refreshData = function (modeltype, data) {
                    this.record_info_data = data;
                    this.role_redPack_record_data = redPacket.models.RedPacketModel._instance.redPack_roleRecordViewVo;
                    console.log("--------------------------数据成功拿到！---------------------------");
                    // var _rolename:string; 
                    // var _roleNameIndexArray:Array<number> = [];//存放不是当前玩家名字在record_info_data红包历史列表数据中的索引，注意，不能用玩家id来遍历，其服务器下发的id是所抢红包的发送者id      
                    // for(let index = 0; index < this.record_info_data.length; index ++){
                    //     _rolename= this.record_info_data[index]["rolename"];
                    //     if(_rolename != this._loginModel.roleDetail.rolename){
                    //        _roleNameIndexArray.push(index);
                    //     }
                    // }
                    // //对不是属于当前玩家的的数据进行移除
                    // for(let i = 0; i< _roleNameIndexArray.length; i++){
                    //     this.record_info_data.splice(_roleNameIndexArray[i]);
                    // }
                    this._init_record_UI(modeltype);
                };
                RedPacketRecordMediator.prototype.hide = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    // if(LoginModel.getInstance().CommonPage != ""){
                    // 	ModuleManager.show(LoginModel.getInstance().CommonPage,this.app);
                    // 	LoginModel.getInstance().CommonPage == "";
                    // }            
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.LOOK_RECORD_EVENT, this, this._refresh_getRecord_infoData);
                    redPacket.models.RedPacketProxy.getInstance().off(redPacket.models.ROLE_REDPACK_RECORD_EVENT, this, this.refreshData);
                    modules.ModuleManager.show(modules.ModuleNames.RED_PACKET, this._app);
                    _super.prototype.hide.call(this);
                };
                RedPacketRecordMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                RedPacketRecordMediator.prototype._init_record_UI = function (modeltype) {
                    console.log("--------------------------开始初始化红包历史记录界面---------------------------");
                    this.curr_redPackRecordState = modeltype;
                    switch (modeltype) {
                        case RedPackRecordState.RECEIVED_RED_PACK:
                            this._viewUI.redPackType_label.text = "收到红包数：";
                            this._viewUI.redPackNum_text.text = '0';
                            this._viewUI.jinb_image.visible = true;
                            this._viewUI.yuanbao_image.visible = false;
                            this._viewUI.moneyType_text.text = "总金额：";
                            this._viewUI.zongMoneyNum_text.text = '0';
                            break;
                        case RedPackRecordState.SEND_RED_PACK:
                            this._viewUI.redPackType_label.text = "发送红包数：";
                            this._viewUI.redPackNum_text.text = '0';
                            this._viewUI.jinb_image.visible = false;
                            this._viewUI.yuanbao_image.visible = true;
                            this._viewUI.moneyType_text.text = "总元宝：";
                            this._viewUI.zongMoneyNum_text.text = '0';
                            break;
                    }
                    if (!this.record_info_data || this.record_info_data.length == 0) {
                        this._viewUI.record_box.visible = false;
                        return;
                    }
                    var firstpageflag = this.role_redPack_record_data["firstpageflag"];
                    var redpackallnum = this.role_redPack_record_data["redpackallnum"];
                    var redpackallmoney = this.role_redPack_record_data["redpackallmoney"];
                    var redpackallfushi = this.role_redPack_record_data["redpackallfushi"];
                    this._viewUI.redPackNum_text.text = this.record_info_data.length.toString();
                    switch (modeltype) {
                        case RedPackRecordState.RECEIVED_RED_PACK:
                            this._viewUI.zongMoneyNum_text.text = redpackallmoney.toString();
                            break;
                        case RedPackRecordState.SEND_RED_PACK:
                            this._viewUI.zongMoneyNum_text.text = redpackallfushi.toString();
                            break;
                    }
                    this._init_record_list();
                };
                /**
                 * 初始化红包历史记录列表
                 */
                RedPacketRecordMediator.prototype._init_record_list = function () {
                    this._viewUI.record_box.visible = true;
                    this.roleIcon = _LoginModel.getInstance().cnpcShapeInfo;
                    var record_list = this._viewUI.record_box.getChildByName("record_list");
                    record_list.array = this.record_info_data;
                    record_list.repeatX = 1;
                    record_list.repeatY = this.record_info_data.length;
                    record_list.vScrollBarSkin = '';
                    record_list.scrollBar.elasticBackTime = 200;
                    record_list.scrollBar.elasticDistance = 100;
                    record_list.renderHandler = new Handler(this, this._show_record_list);
                };
                /**
                 * 显示红包历史列表内容
                 */
                RedPacketRecordMediator.prototype._show_record_list = function (cell, index) {
                    if (index < 0 || index > this.record_info_data.length) {
                        return;
                    }
                    var moneyNum_text = cell.getChildByName("moneyNum_image").getChildByName("moneyNum_text");
                    var roleName_or_time_text = cell.getChildByName("roleName_or_time_text");
                    var fa_image = cell.getChildByName("fa_image");
                    var shou_image = cell.getChildByName("shou_image");
                    var role_image = cell.getChildByName("role_image");
                    var shape = this.record_info_data[index]["shape"];
                    var littleShapeId = this.roleIcon[shape];
                    role_image.skin = "common/icon/avatarrole/" + littleShapeId.littleheadID + ".png";
                    var modeltype = this.record_info_data[index]["modeltype"];
                    var redpackid = this.record_info_data[index]["redpackid"];
                    var rolename = this.record_info_data[index]["rolename"];
                    var redpackmoney = this.record_info_data[index]["redpackmoney"];
                    var time = this.record_info_data[index]["time"];
                    var date = new Date(time);
                    var Y = '' + date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate() + '';
                    switch (this.curr_redPackRecordState) {
                        case RedPackRecordState.RECEIVED_RED_PACK:
                            shou_image.visible = true;
                            fa_image.visible = false;
                            roleName_or_time_text.text = rolename;
                            break;
                        case RedPackRecordState.SEND_RED_PACK:
                            shou_image.visible = false;
                            fa_image.visible = true;
                            roleName_or_time_text.text = Y + M + D;
                            break;
                    }
                    moneyNum_text.text = redpackmoney.toString();
                    cell.on(LEvent.CLICK, this, this.look_record, [modeltype, redpackid]);
                };
                RedPacketRecordMediator.prototype.look_record = function (modeltype, redpackid) {
                    RequesterProtocols._instance.c2s_CSendRedPackHisView(modeltype, redpackid);
                };
                return RedPacketRecordMediator;
            }(game.modules.UiMediator));
            redPacket.RedPacketRecordMediator = RedPacketRecordMediator;
        })(redPacket = modules.redPacket || (modules.redPacket = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RedPacketRecordMediator.js.map