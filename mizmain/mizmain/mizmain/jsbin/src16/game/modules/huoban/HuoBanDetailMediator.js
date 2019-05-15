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
* 伙伴详情
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var HuoBanDetailMediator = /** @class */ (function (_super) {
                __extends(HuoBanDetailMediator, _super);
                function HuoBanDetailMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /*门派图片名字*/
                    _this.menpaiImage = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
                    /**门派类型*/
                    _this.menpainame = [];
                    _this._viewUI = new ui.common.HuoBanDetailUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.model = new ModelsCreate();
                    _this.scene2DPanel = new TestRole2dPanel();
                    _this._viewUI.bg3_img.addChild(_this.scene2DPanel);
                    _this.scene2DPanel.ape.x = 100;
                    _this.scene2DPanel.ape.y = 200;
                    for (var index = 11378; index <= 11386; index++) {
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index];
                        _this.menpainame.push(chattext.msg);
                    }
                    return _this;
                }
                /**模型创建*/
                HuoBanDetailMediator.prototype.modelcreate = function (modelid) {
                    if (this.model.role3d) { //是否拥有模型
                        this.scene2DPanel.removeSceneChar(this.model.role3d);
                    }
                    this.model.role3d = new YxChar3d();
                    this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
                    this.model.role3d.set2dPos((this._viewUI.huobanbk_img.x + this._viewUI.bg3_img.width / 2 + this._viewUI.bg3_img.x) * this._viewUI.globalScaleX * 1.17, (this._viewUI.huobanbk_img.y + this._viewUI.bg3_img.height / 3 * 2 + this._viewUI.bg3_img.y) * this._viewUI.globalScaleY * 1.17); //坐标
                    this.model.role3d.scale = 1.5;
                    this.model.role3d.rotationX = 0;
                    this.model.role3d.rotationY = 135;
                    this.scene2DPanel.addSceneChar(this.model.role3d);
                };
                /**查看的伙伴id 拥有的伙伴列表 未拥有的伙伴列表 出战的伙伴列表 当前选择的第几个伙伴 */
                HuoBanDetailMediator.prototype.init = function (huobanid, havehuobanlist, nohavelist, isbattlelist, num) {
                    _super.prototype.show.call(this);
                    this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX;
                    this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY;
                    this.havelist = havehuobanlist;
                    this.nohave = nohavelist;
                    this.isbattle = isbattlelist;
                    this.currentnumber = num;
                    this.huobanid = huobanid;
                    RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(huobanid);
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.HUOBANDETAIL_EVENT, this, this.initdata);
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.HUOBANJIESUO_EVENT, this, this.initdata);
                    this._viewUI.left_btn.clickHandler = new Laya.Handler(this, this.selectlefthuoban);
                    this._viewUI.right_btn.clickHandler = new Laya.Handler(this, this.selectrighthuoban);
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.jieSuo_btn.clickHandler = new Laya.Handler(this, this.jiesuo);
                    this._viewUI.shangZhen_btn.clickHandler = new Laya.Handler(this, this.shangzhen);
                };
                /**初始化伙伴数据*/
                HuoBanDetailMediator.prototype.initdata = function () {
                    var free = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104];
                    var day = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105];
                    var hour = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315];
                    var shang = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11824];
                    var xia = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11825];
                    var wuli = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11826];
                    var fagong = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11827];
                    var huobaninfo = HuoBanModel.getInstance().huobandetail;
                    this.huobanid = huobaninfo.huobanID;
                    var shape = LoginModel.getInstance().cnpcShapeInfo[huobaninfo.huobanID];
                    this.modelcreate(parseInt(shape.shape));
                    var detailinfo = HuoBanModel.getInstance().cheroBaseInfoData[huobaninfo.huobanID];
                    if (detailinfo.acttype == 1) { //1为物理伙伴 2为法术伙伴
                        this._viewUI.attrtype_lab.text = wuli.msg;
                    }
                    else {
                        this._viewUI.attrtype_lab.text = fagong.msg;
                    }
                    this._viewUI.life_lab.text = huobaninfo.datas[7] + "";
                    this._viewUI.zhiliao_lab.text = huobaninfo.datas[6] + "";
                    this._viewUI.attack_lab.text = huobaninfo.datas[1] + "";
                    this._viewUI.defen_lab.text = huobaninfo.datas[8] + "";
                    this._viewUI.control_lab.text = huobaninfo.datas[2] + "";
                    this._viewUI.magicdefen_lab.text = huobaninfo.datas[0] + "";
                    this._viewUI.speed_lab.text = huobaninfo.datas[4] + "";
                    this._viewUI.kangkong_lab.text = huobaninfo.datas[9] + "";
                    this._viewUI.menpai_img.skin = "common/ui/huoban/" + this.menpaiImage[detailinfo.school - 11];
                    this._viewUI.menpainame_lab.text = this.menpainame[detailinfo.school - 11];
                    this._viewUI.huobanname_lab.text = detailinfo.name;
                    this._viewUI.huobanlv_lab.text = LoginModel.getInstance().roleDetail.level + "";
                    //判断是否拥有
                    //是否在出战列表中
                    if (this.currentnumber < this.isbattle.length) {
                        huobaninfo.infight = this.isbattle[this.currentnumber].infight;
                    }
                    //是否在已拥有的列表中
                    else if (this.currentnumber < this.isbattle.length + this.havelist.length) {
                        huobaninfo.infight = this.havelist[this.currentnumber - this.isbattle.length].infight;
                    }
                    else {
                        huobaninfo.infight = this.nohave[this.currentnumber - this.isbattle.length - this.havelist.length].infight;
                    }
                    if (huobaninfo.weekfree == 1) { //本周免费
                        this._viewUI.free_box.visible = true;
                        this._viewUI.timelimit_lab.text = free.msg;
                    }
                    //永久
                    else if (huobaninfo.state == 0) {
                        this._viewUI.free_box.visible = false;
                    }
                    else if (huobaninfo.state != 1) { //限时
                        this._viewUI.free_box.visible = true;
                        var time = huobaninfo.state;
                        time = time / 3600;
                        if (time > 24)
                            this._viewUI.timelimit_lab.text = (time / 24).toFixed(0) + day.msg;
                        else
                            this._viewUI.timelimit_lab.text = (time).toFixed(0) + hour.msg;
                    }
                    if (huobaninfo.state == 1) { //永久的
                        this._viewUI.jieSuo_btn.visible = false;
                        this._viewUI.shangZhen_btn.visible = true;
                        this._viewUI.free_box.visible = false;
                        if (huobaninfo.infight == 1) { //是否参战					
                            this._viewUI.shangZhen_btn.label = xia.msg;
                        }
                        else {
                            this._viewUI.shangZhen_btn.label = shang.msg;
                        }
                    }
                    else if (huobaninfo.weekfree == 1 || huobaninfo.state > 1) { //免费的 限时的
                        this._viewUI.jieSuo_btn.visible = true;
                        this._viewUI.shangZhen_btn.visible = true;
                        this._viewUI.free_box.visible = true;
                        if (huobaninfo.infight == 1) { //是否参战					
                            this._viewUI.shangZhen_btn.label = xia.msg;
                        }
                        else {
                            this._viewUI.shangZhen_btn.label = shang.msg;
                        }
                    }
                    else { //未解锁
                        this._viewUI.jieSuo_btn.visible = true;
                        this._viewUI.shangZhen_btn.visible = false;
                    }
                    var skillid = detailinfo.skillid;
                    this.skillidlist = skillid;
                    var first_skill = detailinfo.first_skill;
                    var data = [];
                    for (var index = 0; index < 10; index++) {
                        if (index < skillid.length) {
                            var skilldata = HuoBanModel.getInstance().friendSkillData[skillid[index]];
                            if (first_skill == skillid[index]) { //精通技能
                                data.push({ skillicon_img: "common/icon/skill/" + skilldata.imageID + ".png", jingtong_img: "common/ui/huoban/huoban_jingtong.png" });
                            }
                            else {
                                data.push({ skillicon_img: "common/icon/skill/" + skilldata.imageID + ".png", jingtong_img: "" });
                            }
                        }
                        else {
                            data.push({ skillicon_img: "", jingtong_img: "" });
                        }
                    }
                    this._viewUI.skill_list.array = data;
                    this._viewUI.skill_list.repeatY = data.length;
                    this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.initskill);
                };
                /**初始化技能响应事件*/
                HuoBanDetailMediator.prototype.initskill = function (cell, index) {
                    var img = cell.getChildByName("skillicon_img");
                    img.on(LEvent.MOUSE_DOWN, this, this.skilltips, [index]);
                };
                /**技能提示*/
                HuoBanDetailMediator.prototype.skilltips = function (index) {
                    if (index < this.skillidlist.length) { //是否有效技能栏
                        var parame = new Dictionary();
                        parame.set("itemId", this.skillidlist[index]);
                        this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.HUOBANSKILL, parame);
                    }
                };
                /**下一个伙伴*/
                HuoBanDetailMediator.prototype.selectrighthuoban = function () {
                    if (this.currentnumber + 1 >= this.havelist.length + this.nohave.length + this.isbattle.length) { //选择的伙伴是否到底
                        var prompt_1 = HudModel.getInstance().promptAssembleBack(PromptExplain.BEHIND_NO_PARTNER);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt_1);
                        return;
                    }
                    if (this.currentnumber + 1 < this.isbattle.length) { //是否是出战伙伴
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.isbattle[this.currentnumber + 1].huobanID);
                    }
                    else if (this.currentnumber + 1 < this.havelist.length + this.isbattle.length) { //是否是已拥有的伙伴
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.havelist[this.currentnumber + 1 - this.isbattle.length].huobanID);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.nohave[this.currentnumber + 1 - this.havelist.length - this.isbattle.length].huobanID);
                    }
                    this.currentnumber += 1;
                };
                /**上一个伙伴信息*/
                HuoBanDetailMediator.prototype.selectlefthuoban = function () {
                    if (this.currentnumber - 1 < 0) { //选择的伙伴是否到头
                        var prompt_2 = HudModel.getInstance().promptAssembleBack(PromptExplain.FRONT_NO_PARTNER);
                        this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                        this.DisappearMessageTipsMediator.onShow(prompt_2);
                        return;
                    }
                    if (this.currentnumber - 1 < this.isbattle.length) { //是否是出战伙伴
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.isbattle[this.currentnumber - 1].huobanID);
                    }
                    else if (this.currentnumber - 1 < this.havelist.length + this.isbattle.length) { //是否是已拥有的伙伴
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.havelist[this.currentnumber - 1 - this.isbattle.length].huobanID);
                    }
                    else {
                        RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.nohave[this.currentnumber - 1 - this.havelist.length - this.isbattle.length].huobanID);
                    }
                    this.currentnumber -= 1;
                };
                /**上阵*/
                HuoBanDetailMediator.prototype.shangzhen = function () {
                    var currentzr = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
                    var shang = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11824];
                    var huobanlist = [];
                    var num = 0;
                    var zrlength = 0;
                    if (this._viewUI.shangZhen_btn.label == shang.msg) { //是否上阵
                        if (currentzr) { //当前阵容是否有
                            for (var index = 0; index < currentzr.huobanlist.length; index++) { //当前阵容人数
                                huobanlist[index] = currentzr.huobanlist[index];
                                zrlength += 1;
                            }
                            if (currentzr.huobanlist.length < 4) { //人数未满
                                zrlength += 1;
                                huobanlist[currentzr.huobanlist.length] = HuoBanModel.getInstance().huobandetail.huobanID;
                                RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
                            }
                        }
                        else {
                            huobanlist[0] = HuoBanModel.getInstance().huobandetail.huobanID;
                            zrlength += 1;
                            RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
                        }
                    }
                    else {
                        for (var index = 0; index < currentzr.huobanlist.length; index++) {
                            if (currentzr.huobanlist[index] != HuoBanModel.getInstance().huobandetail.huobanID) { //是否已上阵
                                huobanlist[num] = currentzr.huobanlist[index];
                                num += 1;
                                zrlength += 1;
                            }
                        }
                        RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
                    }
                    huoban.models.HuoBanProxy.getInstance().event(huoban.models.SHANGZHENTISHI_EVENT, zrlength);
                    this.hide();
                };
                /**解锁*/
                HuoBanDetailMediator.prototype.jiesuo = function () {
                    this.huobanjiesuo = new huoban.HuoBanJieSuoMediator(this._app);
                    this.huobanjiesuo.init(this.huobanid);
                    huoban.models.HuoBanProxy.getInstance().once(huoban.models.JIEMIANCHANGE_EVENT, this, this.show);
                    _super.prototype.hide.call(this);
                };
                HuoBanDetailMediator.prototype.show = function () {
                    console.log("界面切回");
                    _super.prototype.show.call(this);
                };
                HuoBanDetailMediator.prototype.hide = function () {
                    modules.ModuleManager.show(modules.ModuleNames.HUOBAN, this._app);
                    huoban.models.HuoBanProxy.getInstance().off(huoban.models.JIEMIANCHANGE_EVENT, this, this.show);
                    huoban.models.HuoBanProxy.getInstance().off(huoban.models.HUOBANDETAIL_EVENT, this, this.initdata);
                    huoban.models.HuoBanProxy.getInstance().off(huoban.models.HUOBANJIESUO_EVENT, this, this.initdata);
                    _super.prototype.hide.call(this);
                };
                HuoBanDetailMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return HuoBanDetailMediator;
            }(game.modules.UiMediator));
            huoban.HuoBanDetailMediator = HuoBanDetailMediator;
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanDetailMediator.js.map