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
* 伙伴界面
*/
var HuoBanModel = game.modules.huoban.models.HuoBanModel;
var game;
(function (game) {
    var modules;
    (function (modules) {
        var huoban;
        (function (huoban) {
            var HuoBanModule = /** @class */ (function (_super) {
                __extends(HuoBanModule, _super);
                function HuoBanModule(app) {
                    var _this = _super.call(this) || this;
                    /*门派图片名字*/
                    _this.menpaiImage = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
                    /**门派类型*/
                    _this.menpainame = [];
                    /** 已拥有的数量*/
                    _this.ishavenum = 0;
                    /**未拥有的数量*/
                    _this.unlockednum = 0;
                    /**出战的伙伴数量*/
                    _this.isbattelenum = 0;
                    /**已拥有的*/
                    _this.usehuobanid = [];
                    /** 未拥有的*/
                    _this.unlockedid = [];
                    /**上阵*/
                    _this.isbattle = [];
                    /**是否选择添加伙伴*/
                    _this.isselectfight = 0;
                    /**选择的类型*/
                    _this.type = 0;
                    /**当前选择添加伙伴的位置*/
                    _this.currentselect = 0;
                    /**是否第一次进入阵法界面*/
                    _this.isinit = 0;
                    /** 当前使用的阵法编号 */
                    _this.zhenFaNum = 1;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.HuoBanZhuZhanUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.l_list.visible = false;
                    _this.remind = new game.modules.commonUI.RemindViewMediator(_this._viewUI, _this._app);
                    for (var index = 11378; index <= 11386; index++) {
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index];
                        _this.menpainame.push(chattext.msg);
                    }
                    _this.ani = new Laya.Animation();
                    return _this;
                }
                /**
                 *  初始化所有数据
                 */
                HuoBanModule.prototype.init = function () {
                    if (this.ani) {
                        this.ani.clear();
                    }
                    this.isselectfight = 0;
                    this.type = 0;
                    RequesterProtocols._instance.c2s_CGet_HuoBanList();
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.HUOBANLIST_EVENT, this, this.enterhuoban);
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.ZHENRONG_EVENT, this, this.zhenrongselect);
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.HUOBANJIESUO_EVENT, this, this.enterhuoban);
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                    this._viewUI.all_btn.label = chattext.msg;
                    this._viewUI.msgTips1_img.visible = false;
                    this._viewUI.menPai_img.visible = false;
                    this._viewUI.up_img.visible = false;
                    this._viewUI.down_img.visible = true;
                    this._viewUI.faShu1_btn.selected = false;
                    this._viewUI.zhiLiao1_btn.selected = false;
                    this._viewUI.fuZhu1_btn.selected = false;
                    this._viewUI.kongZhi1_btn.selected = false;
                    this._viewUI.wuLi1_btn.selected = false;
                    this._viewUI.yunxiao_btn.selected = false;
                    this._viewUI.huoyun_btn.selected = false;
                    this._viewUI.cangyu_btn.selected = false;
                    this._viewUI.feixue_btn.selected = false;
                    this._viewUI.tianlei_btn.selected = false;
                    this._viewUI.wuliang_btn.selected = false;
                    this._viewUI.youming_btn.selected = false;
                    this._viewUI.qixing_btn.selected = false;
                    this._viewUI.danyang_btn.selected = false;
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.close);
                    this._viewUI.zhenrongone_ck.clickHandler = new Laya.Handler(this, this.change1state);
                    this._viewUI.zhenrongtwo_ck.clickHandler = new Laya.Handler(this, this.change2state);
                    this._viewUI.zhenrongtree_ck.clickHandler = new Laya.Handler(this, this.change3state);
                    this._viewUI.zr1select_btn.clickHandler = new Laya.Handler(this, this.zr1select);
                    this._viewUI.zr2select_btn.clickHandler = new Laya.Handler(this, this.zr2select);
                    this._viewUI.zr3select_btn.clickHandler = new Laya.Handler(this, this.zr3select);
                    this._viewUI.wuLi1_btn.clickHandler = new Laya.Handler(this, this.wulihuoban);
                    this._viewUI.faShu1_btn.clickHandler = new Laya.Handler(this, this.fashuhuoban);
                    this._viewUI.zhiLiao1_btn.clickHandler = new Laya.Handler(this, this.zhilaohuoban);
                    this._viewUI.fuZhu1_btn.clickHandler = new Laya.Handler(this, this.fuzhuhuoban);
                    this._viewUI.kongZhi1_btn.clickHandler = new Laya.Handler(this, this.kongzhihuoban);
                    this._viewUI.huoBan_btn.clickHandler = new Laya.Handler(this, this.selectshowway);
                    this._viewUI.all_btn.clickHandler = new Laya.Handler(this, this.selectmenpai);
                    this._viewUI.yunxiao_btn.clickHandler = new Laya.Handler(this, this.yunxiao);
                    this._viewUI.huoyun_btn.clickHandler = new Laya.Handler(this, this.huoyun);
                    this._viewUI.cangyu_btn.clickHandler = new Laya.Handler(this, this.cangyu);
                    this._viewUI.feixue_btn.clickHandler = new Laya.Handler(this, this.feixue);
                    this._viewUI.tianlei_btn.clickHandler = new Laya.Handler(this, this.tianlei);
                    this._viewUI.wuliang_btn.clickHandler = new Laya.Handler(this, this.wuliang);
                    this._viewUI.youming_btn.clickHandler = new Laya.Handler(this, this.youming);
                    this._viewUI.qixing_btn.clickHandler = new Laya.Handler(this, this.qixing);
                    this._viewUI.danyang_btn.clickHandler = new Laya.Handler(this, this.danyang);
                    this._viewUI.zhenFa_btn.clickHandler = new Laya.Handler(this, this.zhenfaguanghuan);
                    this._viewUI.m_list.renderHandler = new Laya.Handler(this, this.selecthuobaninfo);
                    this._viewUI.l_list.renderHandler = new Laya.Handler(this, this.selectsmallinfo);
                    this._viewUI.zhenrong_list.renderHandler = new Laya.Handler(this, this.selectoraddhuoban);
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.SWITCHCHANGE_EVENT, this, this.switchchange);
                    this._viewUI.m_list.vScrollBarSkin = "";
                    this._viewUI.l_list.vScrollBarSkin = "";
                };
                /**cell 当前选择容器 index 当前选择  */
                HuoBanModule.prototype.selectoraddhuoban = function (cell, index) {
                    var selecticon = cell.getChildByName("icon_img");
                    selecticon.on(Laya.Event.CLICK, this, this.change, [cell, index]);
                    var leave = cell.getChildByName("leave_img");
                    if (leave.skin == "") {
                        leave.off(Laya.Event.CLICK, this, this.huobanleave);
                    }
                    else {
                        leave.on(Laya.Event.CLICK, this, this.huobanleave, [cell, index]);
                    }
                    var change = cell.getChildByName("change_img");
                    change.on(Laya.Event.CLICK, this, this.changezhenrong, [cell, index]);
                };
                /**	 * 多行单列监听 cell index 	 */
                HuoBanModule.prototype.selecthuobaninfo = function (cell, index) {
                    var selecthuoban = cell.getChildByName("select_btn");
                    selecthuoban.on(Laya.Event.CLICK, this, this.getinfo, [cell, index]);
                };
                /**
                 * 多行多列监听*cell  * index  */
                HuoBanModule.prototype.selectsmallinfo = function (cell, index) {
                    var clickinfo = cell.getChildByName("huobanicon_img");
                    clickinfo.on(Laya.Event.CLICK, this, this.getinfo, [cell, index]);
                };
                /**	 * 伙伴脱离整容 * 当前选择的伙伴容器  *当前选择的伙伴位置		 */
                HuoBanModule.prototype.huobanleave = function (cell, index) {
                    var huobanlist = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
                    var newhuobanlist = [];
                    var num = 0;
                    for (var indexs = 0; indexs < huobanlist.huobanlist.length; indexs++) {
                        if (index != indexs) { //新的伙伴列表ID
                            newhuobanlist[num] = huobanlist.huobanlist[indexs];
                            num++;
                        }
                    }
                    this.tishiinfo(150112, this.isbattelenum - 1);
                    RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, newhuobanlist);
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                /**	阵容内伙伴位置对调		 */
                HuoBanModule.prototype.changezhenrong = function (cell, index) {
                    if (this.ani) {
                        this.ani.clear();
                    }
                    console.log("更改阵容");
                    if (index != this.currentselect) { //是否是当前选择阵容
                        var currenid = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index];
                        HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index] = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.currentselect];
                        HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.currentselect] = currenid;
                        RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist);
                    }
                };
                /** 创建动画 */
                HuoBanModule.prototype.onCreateFrame = function () {
                    var effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
                    Laya.Animation.createFrames(effecthPath, "xuanzhong");
                    this.ani.play(0, true, "xuanzhong");
                    this.ani.interval = 112;
                };
                /** 选择添加的伙伴，并检查是否已在阵容内 */
                HuoBanModule.prototype.change = function (cell, index) {
                    var _selecticon = cell.getChildByName("icon_img");
                    if (_selecticon.skin != "") {
                        this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
                        _selecticon.addChild(this.ani);
                        this.ani.x = -13;
                        this.ani.y = -13;
                        this.ani.scaleX = 0.9;
                        this.ani.scaleY = 0.9;
                    }
                    var currentid = 0;
                    currentid = HuoBanModel.getInstance().currentzrid;
                    var zhenrong = HuoBanModel.getInstance().zrhuobanlist[currentid];
                    var num = 0;
                    if (zhenrong) { //阵容是否有
                        for (var indexs = 0; indexs < zhenrong.huobanlist.length; indexs++) {
                            if (num == index) {
                                break;
                            }
                            num++;
                        }
                    }
                    if (index == num) { //选择哪个伙伴
                        if (this.isselectfight == 1 && this.currentselect == index) { //当前选择的伙伴是否出战
                            this.isselectfight = 0;
                            this.currentselect = -1;
                            if (this.ani) {
                                this.ani.clear();
                            }
                        }
                        else {
                            this.isselectfight = 1;
                            this.currentselect = index;
                        }
                        if (this.type == 0) //0为显示全部伙伴
                            this.inithuobanlist();
                        else
                            this.typehuoban(this.type);
                    }
                    //刷新阵容信息
                    this.refreshzhenrong();
                };
                /**	 * 上阵伙伴是否符合条件		 */
                HuoBanModule.prototype.getinfo = function (cell, index) {
                    if (this.ani) {
                        this.ani.clear();
                    }
                    if (this.isselectfight == 1) { //添加伙伴
                        if (index < this.isbattelenum) { //是否上阵
                            this.tishiinfo(150114);
                            return;
                        }
                        if (index >= this.isbattelenum + this.ishavenum) { //未解锁伙伴
                            this.tishiinfo(150115);
                            return;
                        }
                        this.addhuoban(this.usehuobanid[index - this.isbattelenum].huobanID);
                    }
                    else { //查看伙伴详情
                        huoban.models.HuoBanProxy.getInstance().on(huoban.models.SHANGZHENTISHI_EVENT, this, this.tishi);
                        if (index < this.isbattelenum) { //是否上阵
                            this._huobandetail = new huoban.HuoBanDetailMediator(this._app);
                            this._huobandetail.init(this.isbattle[index].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
                        }
                        else if (index < this.ishavenum + this.isbattelenum) { //已拥有的			
                            this._huobandetail = new huoban.HuoBanDetailMediator(this._app);
                            this._huobandetail.init(this.usehuobanid[index - this.isbattelenum].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
                        }
                        else { //未解锁的
                            this._huobandetail = new huoban.HuoBanDetailMediator(this._app);
                            this._huobandetail.init(this.unlockedid[index - this.ishavenum - this.isbattelenum].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
                        }
                        this.isinit = 1;
                        modules.ModuleManager.hide(modules.ModuleNames.HUOBAN);
                    }
                };
                /**增加伙伴*/
                HuoBanModule.prototype.addhuoban = function (huobanid) {
                    var currentid = HuoBanModel.getInstance().currentzrid;
                    var huobaninfo = HuoBanModel.getInstance().zrhuobanlist[currentid];
                    var huobanidlist = [];
                    var num = -1; //是否有相同的ID
                    if (huobaninfo != null) {
                        for (var index = 0; index < huobaninfo.huobanlist.length; index++) {
                            huobanidlist[index] = huobaninfo.huobanlist[index];
                            if (huobanidlist[index] == huobanid) { //上阵中是否有相同伙伴
                                num = index;
                            }
                        }
                    }
                    huobanidlist[this.currentselect] = huobanid;
                    if (num != -1 && this.currentselect < huobaninfo.huobanlist.length) { //阵容内互相换位置
                        huobanidlist[num] = huobaninfo.huobanlist[this.currentselect];
                    }
                    if (huobanidlist.length == 4) { //阵容是否满了
                        this.tishiinfo(150113, huobanidlist.length);
                    }
                    else {
                        this.tishiinfo(150112, huobanidlist.length);
                    }
                    RequesterProtocols._instance.c2s_CZhenrong_Member(currentid, huobanidlist);
                };
                /**云霄*/
                HuoBanModule.prototype.yunxiao = function () {
                    if (this._viewUI.yunxiao_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.all_btn.label = this.menpainame[0];
                        this.typehuoban(11);
                        this.type = 11;
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.inithuobanlist();
                        this.type = 0;
                    }
                    this.selectmenpai();
                };
                /**火云*/
                HuoBanModule.prototype.huoyun = function () {
                    if (this._viewUI.huoyun_btn.selected == true) { //显示门派伙伴
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(12);
                        this.type = 12;
                        this._viewUI.all_btn.label = this.menpainame[1];
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**苍羽*/
                HuoBanModule.prototype.cangyu = function () {
                    if (this._viewUI.cangyu_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(13);
                        this.type = 13;
                        this._viewUI.all_btn.label = this.menpainame[2];
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**飞雪*/
                HuoBanModule.prototype.feixue = function () {
                    if (this._viewUI.feixue_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(14);
                        this.type = 14;
                        this._viewUI.all_btn.label = this.menpainame[3];
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**天雷*/
                HuoBanModule.prototype.tianlei = function () {
                    if (this._viewUI.tianlei_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(15);
                        this.type = 15;
                        this._viewUI.all_btn.label = this.menpainame[4];
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**无量*/
                HuoBanModule.prototype.wuliang = function () {
                    if (this._viewUI.wuliang_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(16);
                        this.type = 16;
                        this._viewUI.all_btn.label = this.menpainame[5];
                    }
                    else { //显示所有
                        this.type = 0;
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**幽冥*/
                HuoBanModule.prototype.youming = function () {
                    if (this._viewUI.youming_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this.typehuoban(17);
                        this.type = 17;
                        this._viewUI.all_btn.label = this.menpainame[6];
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**七星*/
                HuoBanModule.prototype.qixing = function () {
                    if (this._viewUI.qixing_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.all_btn.label = this.menpainame[7];
                        this.type = 18;
                        this.typehuoban(18);
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**丹阳*/
                HuoBanModule.prototype.danyang = function () {
                    if (this._viewUI.danyang_btn.selected == true) { //显示门派伙伴
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.all_btn.label = this.menpainame[8];
                        this.type = 19;
                        this.typehuoban(19);
                    }
                    else { //显示所有
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 0;
                        this.inithuobanlist();
                    }
                    this.selectmenpai();
                };
                /**物理*/
                HuoBanModule.prototype.wulihuoban = function () {
                    if (this._viewUI.wuLi1_btn.selected == true) { //伙伴类型
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this.type = 1;
                        this.typehuoban(1);
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                    }
                    else {
                        this.type = 0;
                        this.inithuobanlist();
                    }
                };
                /**法术*/
                HuoBanModule.prototype.fashuhuoban = function () {
                    if (this._viewUI.faShu1_btn.selected == true) { //伙伴类型
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this.type = 2;
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.typehuoban(2);
                    }
                    else {
                        this.type = 0;
                        this.inithuobanlist();
                    }
                };
                /**治疗*/
                HuoBanModule.prototype.zhilaohuoban = function () {
                    if (this._viewUI.zhiLiao1_btn.selected == true) { //伙伴类型
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this.type = 3;
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.typehuoban(3);
                    }
                    else {
                        this.type = 3;
                        this.inithuobanlist();
                    }
                };
                /**辅助*/
                HuoBanModule.prototype.fuzhuhuoban = function () {
                    if (this._viewUI.fuZhu1_btn.selected == true) { //伙伴类型
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.kongZhi1_btn.selected = false;
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this.typehuoban(4);
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 4;
                    }
                    else {
                        this.inithuobanlist();
                        this.type = 4;
                    }
                };
                /**控制*/
                HuoBanModule.prototype.kongzhihuoban = function () {
                    if (this._viewUI.kongZhi1_btn.selected == true) { //伙伴类型
                        this._viewUI.faShu1_btn.selected = false;
                        this._viewUI.zhiLiao1_btn.selected = false;
                        this._viewUI.fuZhu1_btn.selected = false;
                        this._viewUI.wuLi1_btn.selected = false;
                        this._viewUI.huoyun_btn.selected = false;
                        this._viewUI.cangyu_btn.selected = false;
                        this._viewUI.feixue_btn.selected = false;
                        this._viewUI.tianlei_btn.selected = false;
                        this._viewUI.wuliang_btn.selected = false;
                        this._viewUI.youming_btn.selected = false;
                        this._viewUI.qixing_btn.selected = false;
                        this._viewUI.yunxiao_btn.selected = false;
                        this._viewUI.danyang_btn.selected = false;
                        this.typehuoban(5);
                        var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387];
                        this._viewUI.all_btn.label = chattext.msg;
                        this.type = 5;
                    }
                    else {
                        this.inithuobanlist();
                        this.type = 0;
                    }
                };
                /**门派*/
                HuoBanModule.prototype.selectmenpai = function () {
                    if (this._viewUI.up_img.visible == false) { //是否显示门派列表
                        this._viewUI.up_img.visible = true;
                        this._viewUI.down_img.visible = false;
                        this._viewUI.menPai_img.visible = true;
                    }
                    else {
                        this._viewUI.up_img.visible = false;
                        this._viewUI.down_img.visible = true;
                        this._viewUI.menPai_img.visible = false;
                    }
                };
                /**图标大小*/
                HuoBanModule.prototype.selectshowway = function () {
                    if (this._viewUI.bigicon_img.visible == true) { //显示小图标还是大图标
                        this._viewUI.bigicon_img.visible = false;
                        this._viewUI.smallicon_img.visible = true;
                        this._viewUI.m_list.visible = false;
                        this._viewUI.l_list.visible = true;
                    }
                    else {
                        this._viewUI.bigicon_img.visible = true;
                        this._viewUI.smallicon_img.visible = false;
                        this._viewUI.m_list.visible = true;
                        this._viewUI.l_list.visible = false;
                    }
                };
                /**阵容1查看*/
                HuoBanModule.prototype.zr1select = function () {
                    this.zhenFaNum = 1;
                    console.log("阵容1");
                    this.isselectfight = 0;
                    if (this._viewUI.zr1select_btn.selected == false) { //当前阵容未被选择
                        this.zhenrongmenber(0, HuoBanModel.getInstance().zrhuobanlist[0]);
                        for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
                            HuoBanModel.getInstance().huobaninfo[index].infight = 0;
                        }
                        if (HuoBanModel.getInstance().zrhuobanlist[0]) { //是否有人
                            for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[0].huobanlist.length; index++) {
                                HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[0].huobanlist[index] - 40000].infight = 1;
                            }
                        }
                        HuoBanModel.getInstance().currentzrid = 0;
                        if (HuoBanModel.getInstance().zrhuobanlist[0]) { //是否有人
                            HuoBanModel.getInstance().currentzf[0] = HuoBanModel.getInstance().zrhuobanlist[0].zhenfa;
                        }
                        if (this.type == 0) { //0显示全部
                            this.inithuobanlist();
                        }
                        else {
                            this.typehuoban(this.type);
                        }
                    }
                    this._viewUI.zr1select_btn.selected = true;
                    this._viewUI.zr2select_btn.selected = false;
                    this._viewUI.zr3select_btn.selected = false;
                };
                /**阵容2查看*/
                HuoBanModule.prototype.zr2select = function () {
                    this.zhenFaNum = 2;
                    console.log("阵容2");
                    this.isselectfight = 0;
                    if (this._viewUI.zr2select_btn.selected == false) { //当前阵容未被选择
                        this.zhenrongmenber(1, HuoBanModel.getInstance().zrhuobanlist[1]);
                        for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
                            HuoBanModel.getInstance().huobaninfo[index].infight = 0;
                        }
                        if (HuoBanModel.getInstance().zrhuobanlist[1]) { //是否有人
                            for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[1].huobanlist.length; index++) {
                                HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[1].huobanlist[index] - 40000].infight = 1;
                            }
                        }
                        HuoBanModel.getInstance().currentzrid = 1;
                        if (HuoBanModel.getInstance().zrhuobanlist[1]) { //是否有人
                            HuoBanModel.getInstance().currentzf[1] = HuoBanModel.getInstance().zrhuobanlist[1].zhenfa;
                        }
                        if (this.type == 0) { //0显示全部
                            this.inithuobanlist();
                        }
                        else {
                            this.typehuoban(this.type);
                        }
                    }
                    this._viewUI.zr1select_btn.selected = false;
                    this._viewUI.zr2select_btn.selected = true;
                    this._viewUI.zr3select_btn.selected = false;
                };
                /**阵容3查看*/
                HuoBanModule.prototype.zr3select = function () {
                    this.zhenFaNum = 3;
                    console.log("阵容3");
                    this.isselectfight = 0;
                    if (this._viewUI.zr3select_btn.selected == false) { //当前阵容未被选择
                        this.zhenrongmenber(2, HuoBanModel.getInstance().zrhuobanlist[2]);
                        for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
                            HuoBanModel.getInstance().huobaninfo[index].infight = 0;
                        }
                        if (HuoBanModel.getInstance().zrhuobanlist[2]) { //是否有人
                            for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[2].huobanlist.length; index++) {
                                HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[2].huobanlist[index] - 40000].infight = 1;
                            }
                        }
                        HuoBanModel.getInstance().currentzrid = 2;
                        if (HuoBanModel.getInstance().zrhuobanlist[2]) { //是否有人
                            HuoBanModel.getInstance().currentzf[2] = HuoBanModel.getInstance().zrhuobanlist[2].zhenfa;
                        }
                        if (this.type == 0) { //0显示全部
                            this.inithuobanlist();
                        }
                        else {
                            this.typehuoban(this.type);
                        }
                    }
                    this._viewUI.zr1select_btn.selected = false;
                    this._viewUI.zr2select_btn.selected = false;
                    this._viewUI.zr3select_btn.selected = true;
                };
                /**选择阵容1 */
                HuoBanModule.prototype.change1state = function () {
                    if (this._viewUI.zhenrongone_ck.selected) { //是否选择该阵容
                        console.log("选中1");
                        this._viewUI.zhenrongone_ck.mouseEnabled = false;
                        this._viewUI.zhenrongtwo_ck.mouseEnabled = true;
                        this._viewUI.zhenrongtree_ck.mouseEnabled = true;
                        this._viewUI.zhenrongtwo_ck.selected = false;
                        this._viewUI.zhenrongtree_ck.selected = false;
                        RequesterProtocols._instance.c2s_CSwitch_Zhenrong(0);
                    }
                };
                /**选择阵容2*/
                HuoBanModule.prototype.change2state = function () {
                    if (this._viewUI.zhenrongtwo_ck.selected) { //是否选择该阵容
                        console.log("选中2");
                        this._viewUI.zhenrongone_ck.mouseEnabled = true;
                        this._viewUI.zhenrongtwo_ck.mouseEnabled = false;
                        this._viewUI.zhenrongtree_ck.mouseEnabled = true;
                        this._viewUI.zhenrongone_ck.selected = false;
                        this._viewUI.zhenrongtree_ck.selected = false;
                        RequesterProtocols._instance.c2s_CSwitch_Zhenrong(1);
                    }
                };
                /**选择阵容3*/
                HuoBanModule.prototype.change3state = function () {
                    if (this._viewUI.zhenrongtree_ck.selected) { //是否选择该阵容
                        console.log("选中3");
                        this._viewUI.zhenrongone_ck.mouseEnabled = true;
                        this._viewUI.zhenrongtwo_ck.mouseEnabled = true;
                        this._viewUI.zhenrongtree_ck.mouseEnabled = false;
                        this._viewUI.zhenrongone_ck.selected = false;
                        this._viewUI.zhenrongtwo_ck.selected = false;
                        RequesterProtocols._instance.c2s_CSwitch_Zhenrong(2);
                    }
                };
                /**初始化阵容信息*/
                HuoBanModule.prototype.enterhuoban = function () {
                    if (HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid]) { //当前阵容是否有人
                        for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid].huobanlist.length; index++) {
                            HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid].huobanlist[index] - 40000].infight = 1;
                        }
                    }
                    this.inithuobanlist();
                };
                /**初始化所有数据*/
                HuoBanModule.prototype.inithuobanlist = function () {
                    var data = [];
                    var data1 = [];
                    this.ishavenum = 0;
                    this.unlockednum = 0;
                    this.isbattelenum = 0;
                    this.usehuobanid = [];
                    this.unlockedid = [];
                    this.isbattle = [];
                    for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
                        var huobaninfo = HuoBanModel.getInstance().huobaninfo[index];
                        if (huobaninfo.infight == 1) { //是否出战
                            this.isbattle[this.isbattelenum] = huobaninfo;
                            this.isbattelenum += 1;
                        }
                        else if (huobaninfo.state != 0 || huobaninfo.weekfree != 0) { //是否拥有
                            this.usehuobanid[this.ishavenum] = huobaninfo;
                            this.ishavenum += 1;
                        }
                        else {
                            this.unlockedid[this.unlockednum] = huobaninfo;
                            this.unlockednum += 1;
                        }
                    }
                    /**上阵*/
                    var free = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104];
                    var day = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105];
                    var hour = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315];
                    for (var num = 0; num < this.isbattelenum; num++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.isbattle[num].huobanID];
                        if (this.isbattle[num].state == 1) { //永久免费
                            data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "", timelimit_lab: " " });
                            data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: "", isselect_img: "", ishave_img: "" });
                        }
                        else if (this.isbattle[num].weekfree == 1) { //周免
                            data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
                            data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
                        }
                        else { //限时
                            if (this.isbattle[num].state - 10 > 0) { //是否免费
                                var time = (this.isbattle[num].state - 10) / 3600;
                                if (time > 24) { //时间是否超过一天
                                    data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                    data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
                                }
                                else {
                                    data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                    data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
                                }
                            }
                        }
                    }
                    /**拥有*/
                    for (var num = 0; num < this.ishavenum; num++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.usehuobanid[num].huobanID];
                        if (this.usehuobanid[num].state == 1) { //永久免费					
                            if (this.isselectfight == 1) { //是否出战
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " ", select_img: "common/ui/huoban/huoban_UP.png" });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                            }
                            else {
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " ", select_img: "" });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "" });
                            }
                        }
                        else if (this.usehuobanid[num].weekfree == 1) { //周免			
                            if (this.isselectfight == 1) { //是否出战
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg, select_img: "common/ui/huoban/huoban_UP.png" });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                            }
                            else {
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg, select_img: "" });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
                            }
                        }
                        else {
                            if (this.usehuobanid[num].state - 10 > 0) {
                                var time = (this.usehuobanid[num].state - 10) / 3600;
                                if (this.isselectfight == 1) { //是否出战
                                    if (time > 24) { //时间是否超过一天
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                                    }
                                    else {
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                                    }
                                }
                                else {
                                    if (time > 24) { //时间是否超过一天
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
                                    }
                                    else {
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
                                    }
                                }
                            }
                        }
                    }
                    for (var num = 0; num < this.unlockednum; num++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.unlockedid[num].huobanID];
                        data.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "common/ui/huoban/huoban_suo.png", isfree_img: "", timelimit_lab: "" });
                        data1.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "common/ui/huoban/huoban_suo.png" });
                    }
                    this._viewUI.m_list.array = data;
                    this._viewUI.l_list.array = data1;
                };
                /**根据类型显示内容*/
                HuoBanModule.prototype.typehuoban = function (type) {
                    var data = [];
                    var data1 = [];
                    this.ishavenum = 0;
                    this.unlockednum = 0;
                    this.isbattelenum = 0;
                    this.isbattle = [];
                    this.usehuobanid = [];
                    this.unlockedid = [];
                    var free = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104];
                    var day = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105];
                    var hour = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315];
                    for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
                        var huobaninfo = HuoBanModel.getInstance().huobaninfo[index];
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[huobaninfo.huobanID];
                        if (huobanbase.type == type || huobanbase.school == type) { //类型是否对应
                            if (huobaninfo.infight == 1) { //是否出战
                                this.isbattle[this.isbattelenum] = huobaninfo;
                                this.isbattelenum += 1;
                            }
                            else if (huobaninfo.state != 0 || huobaninfo.weekfree != 0) { //是否拥有
                                this.usehuobanid[this.ishavenum] = huobaninfo;
                                this.ishavenum += 1;
                            }
                            else {
                                this.unlockedid[this.unlockednum] = huobaninfo;
                                this.unlockednum += 1;
                            }
                        }
                    }
                    for (var index = 0; index < this.isbattelenum; index++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.isbattle[index].huobanID];
                        if (this.isbattle[index].state == 1) { //永久免费
                            data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "", timelimit_lab: " " });
                            data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: "", isselect_img: "", ishave_img: "" });
                        }
                        else if (this.isbattle[index].weekfree == 1) { //周免
                            data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
                            data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
                        }
                        else {
                            if (this.isbattle[index].state - 10 > 0) { //是否永久
                                var time = (this.isbattle[index].state - 10) / 3600;
                                if (time > 24) { //是否超过一天
                                    data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                    data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
                                }
                                else {
                                    data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                    data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
                                }
                            }
                        }
                    }
                    for (var num = 0; num < this.ishavenum; num++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.usehuobanid[num].huobanID];
                        if (this.usehuobanid[num].state == 1) { //永久免费
                            if (this.isselectfight == 1) { //是否出战
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " " });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                            }
                            else {
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " " });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "" });
                            }
                        }
                        else if (this.usehuobanid[num].weekfree == 1) { //周免
                            if (this.isselectfight == 1) { //是否出战
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                            }
                            else {
                                data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
                                data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
                            }
                        }
                        else {
                            if (this.usehuobanid[num].state - 10 > 0) { //是否永久
                                var time = (this.usehuobanid[num].state - 10) / 3600;
                                if (this.isselectfight == 1) { //是否出战
                                    if (time > 24) { //是否超过一天
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                                    }
                                    else {
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
                                    }
                                }
                                else {
                                    if (time > 24) { //是否超过一天
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
                                    }
                                    else {
                                        data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
                                        data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
                                    }
                                }
                            }
                        }
                    }
                    for (var num = 0; num < this.unlockednum; num++) {
                        var huobanbase = HuoBanModel.getInstance().cheroBaseInfoData[this.unlockedid[num].huobanID];
                        data.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "common/ui/huoban/huoban_suo.png", isfree_img: "", timelimit_lab: "" });
                        data1.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "common/ui/huoban/huoban_suo.png" });
                    }
                    this._viewUI.m_list.array = data;
                    this._viewUI.l_list.array = data1;
                    this._viewUI.m_list.renderHandler = new Laya.Handler(this, this.selecthuobaninfo);
                    this._viewUI.l_list.renderHandler = new Laya.Handler(this, this.selectsmallinfo);
                };
                /**阵容选择*/
                HuoBanModule.prototype.zhenrongselect = function () {
                    this.isselectfight = 0;
                    switch (HuoBanModel.getInstance().zhenrongid) { //0为阵容1 1为阵容2 2为阵容3
                        case 0:
                            this._viewUI.zhenrongone_ck.selected = true;
                            this._viewUI.zhenrongtwo_ck.selected = false;
                            this._viewUI.zhenrongtree_ck.selected = false;
                            this._viewUI.zr1select_btn.selected = true;
                            this._viewUI.zr2select_btn.selected = false;
                            this._viewUI.zr3select_btn.selected = false;
                            break;
                        case 1:
                            this._viewUI.zhenrongone_ck.selected = false;
                            this._viewUI.zhenrongtwo_ck.selected = true;
                            this._viewUI.zhenrongtree_ck.selected = false;
                            this._viewUI.zr1select_btn.selected = false;
                            this._viewUI.zr2select_btn.selected = true;
                            this._viewUI.zr3select_btn.selected = false;
                            break;
                        case 2:
                            this._viewUI.zhenrongone_ck.selected = false;
                            this._viewUI.zhenrongtwo_ck.selected = false;
                            this._viewUI.zhenrongtree_ck.selected = true;
                            this._viewUI.zr1select_btn.selected = false;
                            this._viewUI.zr2select_btn.selected = false;
                            this._viewUI.zr3select_btn.selected = true;
                            break;
                        default:
                            break;
                    }
                    switch (HuoBanModel.getInstance().currentzrid) { //0为阵容1 1为阵容2 2为阵容3
                        case 0:
                            this._viewUI.zr1select_btn.selected = true;
                            this._viewUI.zr2select_btn.selected = false;
                            this._viewUI.zr3select_btn.selected = false;
                            break;
                        case 1:
                            this._viewUI.zr1select_btn.selected = false;
                            this._viewUI.zr2select_btn.selected = true;
                            this._viewUI.zr3select_btn.selected = false;
                            break;
                        case 2:
                            this._viewUI.zr1select_btn.selected = false;
                            this._viewUI.zr2select_btn.selected = false;
                            this._viewUI.zr3select_btn.selected = true;
                            break;
                        default:
                            break;
                    }
                    if (HuoBanModel.getInstance().reason == 3 || HuoBanModel.getInstance().reason == 5) { //更新的原因 3 5查看阵容
                        this.zhenrongmenber(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid]);
                    }
                    else {
                        this.zhenrongmenber(HuoBanModel.getInstance().zhenrongid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid]);
                    }
                    if (this.type == 0) { //0显示全部
                        this.inithuobanlist();
                    }
                    else {
                        this.typehuoban(this.type);
                    }
                };
                /**刷新阵容信息*/
                HuoBanModule.prototype.zhenrongmenber = function (currentselect, allzhenrong) {
                    var data = [];
                    var num = 0;
                    var wuzhenfa = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1731];
                    var lv = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                    if (allzhenrong != null) { //阵容是否有人
                        console.log("阵容有人");
                        for (var index = 0; index < allzhenrong.huobanlist.length; index++) {
                            var huobanid = allzhenrong.huobanlist[index];
                            var huobanicon = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
                            data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
                        }
                        if (allzhenrong.zhenfa == 0) { //是否有阵法
                            this._viewUI.zhenFa_btn.label = wuzhenfa.msg;
                        }
                        else {
                            var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(allzhenrong.zhenfa);
                            var allzhenfa = HuoBanModel.getInstance().FormationbaseConfigData;
                            this._viewUI.zhenFa_btn.label = zfinfo.level + lv.msg + allzhenfa[allzhenrong.zhenfa].name;
                        }
                    }
                    else {
                        //是否有阵法
                        if (HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid] == 0 || HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid] == -1) {
                            this._viewUI.zhenFa_btn.label = wuzhenfa.msg;
                        }
                        else {
                            var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid]);
                            var allzhenfa = HuoBanModel.getInstance().FormationbaseConfigData;
                            this._viewUI.zhenFa_btn.label = zfinfo.level + lv.msg + allzhenfa[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid]].name;
                        }
                    }
                    for (var index = num; index < 4; index++) {
                        if (index == num) { //是否有添加按钮
                            data.push({ leave_img: "", icon_img: "common/ui/tongyong/huoban_jiahao.png", change_img: "" });
                        }
                        else {
                            data.push({ leave_img: "", icon_img: "", change_img: "" });
                        }
                    }
                    this._viewUI.zhenrong_list.array = data;
                };
                /**刷新阵容*/
                HuoBanModule.prototype.refreshzhenrong = function () {
                    var currentid = 0;
                    currentid = HuoBanModel.getInstance().currentzrid;
                    var currentzhenrong = HuoBanModel.getInstance().zrhuobanlist[currentid];
                    var data = [];
                    var num = 0;
                    if (currentzhenrong) { //阵容是否有人
                        for (var index = 0; index < currentzhenrong.huobanlist.length; index++) {
                            var huobanid = currentzhenrong.huobanlist[index];
                            var huobanicon = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
                            if (this.currentselect + 1 <= currentzhenrong.huobanlist.length) {
                                if (this.isselectfight == 1) { //是否出战
                                    if (this.currentselect == index) { //当前选择是否出战
                                        data.push({ leave_img: "common/ui/tongyong/renwu_jianhao1.png", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
                                    }
                                    else {
                                        data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "common/ui/huoban/huoban_jiaohuan.png" });
                                    }
                                }
                                else {
                                    data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
                                }
                            }
                            else {
                                data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
                            }
                            num++;
                        }
                    }
                    for (var index = num; index < 4; index++) {
                        if (index == num) { //是否可添加
                            data.push({ leave_img: "", icon_img: "common/ui/tongyong/huoban_jiahao.png", change_img: "" });
                        }
                        else {
                            data.push({ leave_img: "", icon_img: "", change_img: "" });
                        }
                    }
                    this._viewUI.zhenrong_list.array = data;
                };
                /**提示信息*/
                HuoBanModule.prototype.tishiinfo = function (tishiid, num) {
                    // var data = ChatModel.getInstance().chatMessageTips[tishiid];
                    // var msg = ChatModel.getInstance().chatMessageTips[tishiid]["msg"];
                    // this._viewUI.msgTips_lab.text = data.msg;
                    // this._viewUI.msgTips1_img.visible = true;
                    // Laya.Tween.to(this._viewUI.msgTips1_img, { y: 450 }, 1000, null, Laya.Handler.create(this, function () {
                    // 	this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = 180; this._viewUI.msgTips1_img.y = 638;
                    // }), null, false);
                    var msg;
                    if (num) {
                        var param = [];
                        if (tishiid == 150113) {
                            param = [this.zhenFaNum, 4];
                        }
                        else {
                            param = [this.zhenFaNum, num, 4 - num];
                        }
                        msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(tishiid, param);
                    }
                    else {
                        msg = ChatModel.getInstance().chatMessageTips[tishiid]["msg"];
                    }
                    var _DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                    _DisappearMessageTipsMediator.onShow(msg);
                };
                /**信息提示*/
                HuoBanModule.prototype.tishi = function (e) {
                    var num = e;
                    if (num == 4) { //阵容满了
                        this.tishiinfo(150113, num);
                    }
                    else {
                        this.tishiinfo(150112, num);
                    }
                };
                /** 阵法光环		 */
                HuoBanModule.prototype.zhenfaguanghuan = function () {
                    if (LoginModel.getInstance().roleDetail.learnedFormsMap.keys.length == 0) { //是否学习过阵法
                        var text = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556];
                        var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160042];
                        this.remind.onhtmlShow(chattext.msg, text.msg);
                        this.remind.once(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.joinzhenfa);
                        this.remind.once(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancel);
                    }
                    else {
                        this.joinzhenfa();
                    }
                };
                /**该阵容有阵法直接跳到阵法光环界面*/
                HuoBanModule.prototype.joinzhenfa = function () {
                    modules.ModuleManager.hide(modules.ModuleNames.HUOBAN);
                    this.isinit = 1;
                    game.modules.createrole.models.LoginModel.getInstance().CommonPage = modules.ModuleNames.HUOBAN;
                    console.log(game.modules.createrole.models.LoginModel.getInstance().CommonPage);
                    this._zhenfaguanghuan = new huoban.ZhenFaGuangHuanMediator(this._app);
                    this._zhenfaguanghuan.show();
                    this.remind.off(modules.commonUI.LEFT_BUTTON_EVENT, this, this.cancel);
                };
                /**不跳到阵法光环界面*/
                HuoBanModule.prototype.cancel = function () {
                    this.remind.off(modules.commonUI.RIGHT_BUTTON_EVENT, this, this.joinzhenfa);
                };
                /**更换阵法  */
                HuoBanModule.prototype.switchchange = function () {
                    var chattext = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3];
                    if (HuoBanModel.getInstance().zrhuobanlist.length != 0) { //是否有阵容
                        var zr = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
                        var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(zr.zhenfa);
                        var zhenfa = HuoBanModel.getInstance().FormationbaseConfigData[zr.zhenfa];
                        this._viewUI.zhenFa_btn.label = zfinfo.level + chattext.msg + zhenfa.name;
                    }
                    else {
                        var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]);
                        var zhenfa = HuoBanModel.getInstance().FormationbaseConfigData[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]];
                        this._viewUI.zhenFa_btn.label = zfinfo.level + chattext.msg + zhenfa.name;
                    }
                };
                HuoBanModule.prototype.onShow = function (event) {
                    if (this.isinit == 0) {
                        this.init();
                    }
                    _super.prototype.onShow.call(this, event);
                    if (HuoBanModel.getInstance().zhenfaui == 1) { //是否在阵法学习界面
                        HuoBanModel.getInstance().zhenfaui = 0;
                        this.joinzhenfa();
                    }
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.OPEN_EVENT);
                };
                /**关闭界面*/
                HuoBanModule.prototype.close = function () {
                    modules.mainhud.models.HudProxy.getInstance().event(modules.mainhud.models.CLOSEVIEW_EVENT);
                    this.isinit = 0;
                    this.hide();
                    if (LoginModel.getInstance().CommonPage != "") { //是否从其他界面跳转过来
                        modules.ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                        LoginModel.getInstance().CommonPage = "";
                    }
                };
                HuoBanModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                    if (this.ani) {
                        this.ani.clear();
                    }
                };
                HuoBanModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return HuoBanModule;
            }(game.modules.ModuleMediator));
            huoban.HuoBanModule = HuoBanModule;
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=HuoBanModule.js.map