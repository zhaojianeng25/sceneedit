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
 * 人物信息类
 */
var game;
(function (game) {
    var modules;
    (function (modules) {
        var roleinfo;
        (function (roleinfo) {
            var RoleXinxiMediator = /** @class */ (function (_super) {
                __extends(RoleXinxiMediator, _super);
                function RoleXinxiMediator(uiLayer) {
                    var _this = _super.call(this, uiLayer) || this;
                    _this._viewUI = new ui.common.RoleXinxiUI();
                    _this._RoleChenweiMediator = new roleinfo.RoleChenweiMediator(RoleInfoModel.getInstance().appBase);
                    _this._RoleTipMediator = new roleinfo.RoleTipMediator(_this._viewUI);
                    _this._RoleShopMediator = new roleinfo.RoleShopMediator(RoleInfoModel.getInstance().appBase);
                    _this._RoleJiFenDuiHuanMediator = new roleinfo.RoleJiFenDuiHuanMediator(RoleInfoModel.getInstance().appBase);
                    _this._RoleYuanZhuMediator = new roleinfo.RoleYuanZhuMediator(_this._viewUI);
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.bg_img.addChild(_this.scene2DPanel);
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = false;
                    _this.initialize();
                    _this.init();
                    _this.registerEvent();
                    _this.eventListener();
                    return _this;
                }
                /**注册事件监听 */
                RoleXinxiMediator.prototype.eventListener = function () {
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleData_EVENT, this, this.onRefreshRoleData);
                    modules.mainhud.models.HudProxy.getInstance().on(modules.mainhud.models.SRefreshRoleCurrency_EVENT, this, this.onRefreshRoleCurrency);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SApplyYingFuExprience_EVENT, this, this.onApplyYingFuExprience);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.SRspRoleInfo_EVENT, this, this.refresh);
                };
                /**刷新盈福经验值 */
                RoleXinxiMediator.prototype.onApplyYingFuExprience = function () {
                    this._viewUI.yingfu_tet.text = RoleInfoModel.getInstance().SApplyYingFuExprience.toString();
                };
                /**初始化 */
                RoleXinxiMediator.prototype.initialize = function () {
                    this.resObj = RoleInfoModel.getInstance().CResMoneyConfigBinDic;
                    this.model = new ModelsCreate();
                };
                /**注册点击监听 */
                RoleXinxiMediator.prototype.registerEvent = function () {
                    this._viewUI.chenwei_btn.on(LEvent.MOUSE_DOWN, this, this.showChenwei);
                    this._viewUI.tip_btn.on(LEvent.MOUSE_DOWN, this, this.showTip);
                    this._viewUI.hongAdd_btn.on(LEvent.MOUSE_DOWN, this, this.showJiuguan);
                    this._viewUI.lanAdd_btn.on(LEvent.MOUSE_DOWN, this, this.showJiuguan);
                    this._viewUI.jifen_btn.on(LEvent.MOUSE_DOWN, this, this.showJifen);
                    this._viewUI.yuanzhu_btn.on(LEvent.MOUSE_DOWN, this, this.showYuanzhu);
                    this._viewUI.tishi_btn.on(LEvent.MOUSE_DOWN, this, this.showTishi);
                };
                /**显示弹窗信息 */
                RoleXinxiMediator.prototype.showTishi = function () {
                    var param = new Dictionary();
                    param.set("title", RoleEnum.CREDIT_LINE);
                    param.set("contentId", RoleEnum.CREDIT_LINE_TIP);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param);
                };
                /**初始化界面数据*/
                RoleXinxiMediator.prototype.init = function () {
                    this.myData = modules.createrole.models.LoginModel.getInstance().roleDetail;
                    var RoleTitle = game.modules.roleinfo.models.RoleInfoModel.getInstance().CRoleTitleBinDic;
                    this.getRoleTitleData(RoleTitle);
                    var school = modules.createrole.models.LoginModel.getInstance().schoolInfo; //z职业配置表中的内容
                    this._viewUI.roleid_tet.text = "ID " + this.myData.roleid; //ID
                    this._viewUI.rolename_tet.text = this.myData.rolename; //姓名
                    this._viewUI.level_tet.text = "LV." + this.myData.level; //等级;
                    this._viewUI.nextExp_lab.text = this.myData.exp + "/" + this.myData.nexp; //经验
                    this.setZhiyeImg(this.myData.school);
                };
                /**如果这些属性在界面打开之前有变化，重新初始化这些属性 */
                RoleXinxiMediator.prototype.initNum = function () {
                    this._viewUI.zhiye_tet.text = HudModel.getInstance().zhiyeNum.toString(); //职业贡献
                    this._viewUI.gonghui_tet.text = HudModel.getInstance().gonghuiNum.toString(); //公会DKP
                    this._viewUI.shengwang_tet.text = HudModel.getInstance().shengwangNum.toString(); //声望值
                    this._viewUI.xinyong_tet.text = HudModel.getInstance().xinyongNum.toString(); //信用值
                    this._viewUI.rongyu_tet.text = HudModel.getInstance().rongyuNum.toString(); //荣誉值
                    if (HudModel.getInstance().levelNum != 0)
                        this._viewUI.level_tet.text = "LV." + HudModel.getInstance().levelNum; //等级
                    if (HudModel.getInstance().expNum != 0) {
                        if (HudModel.getInstance().levelNum != 0)
                            this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp; //经验
                        else
                            this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[this.myData.level].nextexp; //经验
                    }
                };
                /**发送协议 */
                RoleXinxiMediator.prototype.sendProto = function () {
                    RequesterProtocols._instance.c2s_CReqRoleInfo(1); //请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）1表示请求人物信息界面，2表示战斗结束
                };
                /** 便利称谓配置表的数据 */
                RoleXinxiMediator.prototype.getRoleTitleData = function (data) {
                    this.roleTitleData = new Laya.Dictionary();
                    for (var key in data) {
                        this.roleTitleData.set(key, data[key].titlename);
                    }
                };
                RoleXinxiMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                    var parentui = this._viewUI.parent;
                    this.scene2DPanel.ape.x = parentui.x * parentui.globalScaleX;
                    this.scene2DPanel.ape.y = parentui.y * parentui.globalScaleY;
                    this.sendProto();
                    this.initNum();
                    var data = LoginModel.getInstance().createRoleConfigBinDic; //角色创建配置表
                    /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
                    var modelId = data[this.myData.shape]["model"];
                    modelId = parseInt((modelId + "").replace("2", "1"));
                    this.modelcreate(modelId);
                    var title = this.roleTitleData.get(this.myData.title);
                    //显示称谓
                    if (typeof (title) != "undefined" && title != null) {
                        this._viewUI.title_tet.text = title;
                    }
                    else {
                        this._viewUI.title_tet.text = "";
                    }
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.OPEN_ZHEZHAO, this, this.openZheZhao);
                    roleinfo.models.RoleInfoProxy.getInstance().on(roleinfo.models.CLOSE_ZHEZHAO, this, this.closeZheZhao);
                };
                /** 打开遮罩 */
                RoleXinxiMediator.prototype.openZheZhao = function () {
                    this._viewUI.zhezhao_img.visible = true;
                };
                /** 关闭遮罩 */
                RoleXinxiMediator.prototype.closeZheZhao = function () {
                    this._viewUI.zhezhao_img.visible = false;
                };
                /**人物模型 */
                RoleXinxiMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) {
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    var parentui = this._viewUI.parent;
                    if (parentui) {
                        this.model.role3d = new YxChar3d();
                        this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                        this.model.role3d.set2dPos((this._viewUI.xinxi_box.x + this._viewUI.bg_img.width / 1.6 + this._viewUI.bg_img.x) * parentui.globalScaleX, (this._viewUI.xinxi_box.y + this._viewUI.bg_img.height + this._viewUI.bg_img.y) * parentui.globalScaleY); //坐标
                        this.model.role3d.scale = 1.5;
                        this.model.role3d.rotationY = 180;
                        this.scene2DPanel.addSceneChar(this.model.role3d);
                        BagModel.chargeToWeapon(this.model.role3d);
                    }
                };
                /**人物信息界面回复 */
                RoleXinxiMediator.prototype.refresh = function (e) {
                    var data = roleinfo.models.RoleInfoModel.getInstance().SRspRoleInfoData.get("data");
                    this._viewUI.hp_tet.text = data.hpMpStore.get(RoleEnum.HP_STORE) + "/" + RoleEnum.MAX_STORE_VALUE; //生命储备
                    this._viewUI.mp_tet.text = data.hpMpStore.get(RoleEnum.MP_STORE) + "/" + RoleEnum.MAX_STORE_VALUE; //魔法储备
                    this._viewUI.hp_bar.value = data.hpMpStore.get(RoleEnum.HP_STORE) / RoleEnum.MAX_STORE_VALUE; //生命条
                    this._viewUI.mp_bar.value = data.hpMpStore.get(RoleEnum.MP_STORE) / RoleEnum.MAX_STORE_VALUE; //魔法条
                };
                /**刷新人物属性 */
                RoleXinxiMediator.prototype.onRefreshRoleData = function (e) {
                    if (HudModel.getInstance().levelNum != 0)
                        this._viewUI.level_tet.text = "LV." + HudModel.getInstance().levelNum; //等级
                    this._viewUI.nextExp_lab.text = HudModel.getInstance().expNum + "/" + this.resObj[HudModel.getInstance().levelNum].nextexp; //经验
                };
                /**刷新人物通货的消息 */
                RoleXinxiMediator.prototype.onRefreshRoleCurrency = function (e) {
                    if (HudModel.getInstance().zhiyeNum != 0)
                        this._viewUI.zhiye_tet.text = HudModel.getInstance().zhiyeNum.toString(); //职业贡献
                    if (HudModel.getInstance().gonghuiNum != 0)
                        this._viewUI.gonghui_tet.text = HudModel.getInstance().gonghuiNum.toString(); //帮派贡献
                    if (HudModel.getInstance().shengwangNum != 0)
                        this._viewUI.shengwang_tet.text = HudModel.getInstance().shengwangNum.toString(); //声望值
                    if (HudModel.getInstance().xinyongNum != 0)
                        this._viewUI.xinyong_tet.text = HudModel.getInstance().xinyongNum.toString(); //信用值
                    if (HudModel.getInstance().rongyuNum != 0)
                        this._viewUI.rongyu_tet.text = HudModel.getInstance().rongyuNum.toString(); //荣誉值
                };
                /**设置职业图标 */
                RoleXinxiMediator.prototype.setZhiyeImg = function (school) {
                    //根据职业设置职业图标
                    switch (school) {
                        case zhiye.yunxiao:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/11.png";
                            break;
                        case zhiye.dahuang:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/12.png";
                            break;
                        case zhiye.cangyu:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/13.png";
                            break;
                        case zhiye.feixue:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/14.png";
                            break;
                        case zhiye.tianlei:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/15.png";
                            break;
                        case zhiye.wuliang:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/16.png";
                            break;
                        case zhiye.xuanming:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/17.png";
                            break;
                        case zhiye.qixing:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/18.png";
                            break;
                        case zhiye.danyang:
                            this._viewUI.zhiye_img.skin = "common/ui/tongyong/19.png";
                            break;
                    }
                };
                RoleXinxiMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    roleinfo.models.RoleInfoProxy.getInstance().off(roleinfo.models.OPEN_ZHEZHAO, this, this.openZheZhao);
                    roleinfo.models.RoleInfoProxy.getInstance().off(roleinfo.models.CLOSE_ZHEZHAO, this, this.closeZheZhao);
                };
                RoleXinxiMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                /**打开称谓界面 */
                RoleXinxiMediator.prototype.showChenwei = function () {
                    this._RoleChenweiMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.ROLE_Info);
                };
                /**打开人物提示界面 */
                RoleXinxiMediator.prototype.showTip = function () {
                    this._RoleTipMediator.show();
                };
                /**打开酒馆界面 */
                RoleXinxiMediator.prototype.showJiuguan = function () {
                    this._RoleShopMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.ROLE_Info);
                };
                /**打开积分兑换界面 */
                RoleXinxiMediator.prototype.showJifen = function () {
                    this._RoleJiFenDuiHuanMediator.show();
                    modules.ModuleManager.hide(modules.ModuleNames.ROLE_Info);
                    LoginModel.getInstance().CommonPage = modules.ModuleNames.ROLE_Info;
                };
                /**打开援助统计界面 */
                RoleXinxiMediator.prototype.showYuanzhu = function () {
                    RequesterProtocols._instance.c2s_CReqHelpCountView(); //客户端请求援助统计面板
                    this._RoleYuanZhuMediator.show();
                };
                return RoleXinxiMediator;
            }(game.modules.UiMediator));
            roleinfo.RoleXinxiMediator = RoleXinxiMediator;
        })(roleinfo = modules.roleinfo || (modules.roleinfo = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=RoleXinxiMediator.js.map