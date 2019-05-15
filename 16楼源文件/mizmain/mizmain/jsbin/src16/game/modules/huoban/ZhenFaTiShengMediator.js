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
        var huoban;
        (function (huoban) {
            /** 阵法提升 */
            var ZhenFaTiShengMediator = /** @class */ (function (_super) {
                __extends(ZhenFaTiShengMediator, _super);
                function ZhenFaTiShengMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /**拥有的卷轴信息*/
                    _this.ownjuanzhou = [];
                    /**所有阵法信息*/
                    _this.allzhenfa = [];
                    /**使用道具的id*/
                    _this.usecount = [];
                    /**增加的经验列表*/
                    _this.alladdexp = [];
                    /**阵法临时等级 */
                    _this.zfLevel2 = 0;
                    _this._viewUI = new ui.common.ArrayUpUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    huoban.models.HuoBanProxy.getInstance().on(huoban.models.OPENZHENFA_EVENT, _this, _this.initjuanzhou);
                    return _this;
                }
                /**初始化阵法*/
                ZhenFaTiShengMediator.prototype.init = function (zhenfaid, zhenfaname) {
                    _super.prototype.show.call(this);
                    this.currentaddid = zhenfaid;
                    this.currentzfname = zhenfaname;
                    this.allzhenfa = HuoBanModel.getInstance().FormationbaseConfigData;
                    var zhenfa = this.allzhenfa[zhenfaid];
                    var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.allzhenfa[zhenfaid].id);
                    var effect = HuoBanModel.getInstance().ZhenFaEffectData;
                    this.zfLevel = zfinfo.level;
                    this.zfLevel2 = zfinfo.level;
                    if (zfinfo.level != 5) { //阵法不满级
                        for (var index = (zhenfaid - 1) * 5 + 1; index <= zhenfaid * 5; index++) {
                            if (effect[index].zhenfaid == zhenfaid && effect[index].zhenfaLv == zfinfo.level) { //预览使用道具阵法的等级变化
                                this._viewUI.zhenfajingyan_lab.text = zfinfo.exp + "/" + effect[index + 1].needexp;
                                break;
                            }
                        }
                    }
                    else {
                        this._viewUI.zhenfajingyan_lab.text = "0/0";
                    }
                    this._viewUI.zhenfaicon_img.skin = "common/icon/item/" + zhenfa.icon + ".png";
                    this._viewUI.zhenfaname_lab.text = zfinfo.level + "级" + zhenfaname;
                    this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
                    this._viewUI.tisheng_btn.skin = "common/ui/tongyong/dangehui.png";
                    this._viewUI.tisheng_btn.mouseEnabled = false;
                    this._viewUI.tisheng_btn.clickHandler = new Laya.Handler(this, this.tishengzhenfalv);
                    this.initjuanzhou();
                };
                /**初始化卷轴信息*/
                ZhenFaTiShengMediator.prototype.initjuanzhou = function () {
                    this.juanzhounumber = 0;
                    var bagvo = BagModel.getInstance().bagMap[1];
                    var data = [];
                    this.ownjuanzhou = [];
                    //将背包里卷轴的ID取出来
                    for (var index = 0; index < bagvo.items.length; index++) {
                        var item = bagvo.items[index];
                        if (item.id >= 101300 && item.id <= 101310) { //阵法卷轴ID范围
                            this.ownjuanzhou[this.juanzhounumber] = item;
                            this.juanzhounumber += 1;
                        }
                    }
                    for (var index = 0; index < this.ownjuanzhou.length; index++) {
                        var zhenfa = this.allzhenfa[this.ownjuanzhou[index].id - 101300];
                        this.usecount[index] = 0;
                        if (this.ownjuanzhou[index].number <= 0)
                            continue;
                        if (zhenfa.id == this.currentaddid) { //是否与当前升级当前相同，一样经验翻倍
                            this.alladdexp[index] = 1200;
                        }
                        else {
                            this.alladdexp[index] = 600;
                        }
                        data.push({ juanzhouicon_img: "common/icon/item/20059.png", juanzhoucount_lab: this.ownjuanzhou[index].number + "", juanzhouname_lab: zhenfa.name + "卷轴" });
                    }
                    this._viewUI.alljuanzhou_list.array = data;
                    this._viewUI.alljuanzhou_list.vScrollBarSkin = "";
                    this._viewUI.alljuanzhou_list.repeatY = 3;
                    this._viewUI.alljuanzhou_list.renderHandler = new Laya.Handler(this, this.initrender);
                };
                /**初始化卷轴列表响应事件*/
                ZhenFaTiShengMediator.prototype.initrender = function (cell, index) {
                    var icon = cell.getChildByName("juanzhouicon_img");
                    var count_img = cell.getChildByName("count_img");
                    var reduce_img = cell.getChildByName("reduce_img");
                    var count_lab = cell.getChildByName("count_lab");
                    count_img.visible = false;
                    reduce_img.visible = false;
                    count_lab.visible = false;
                    icon.on(Laya.Event.CLICK, this, this.addcount, [cell, index]);
                    reduce_img.on(Laya.Event.CLICK, this, this.reducecount, [cell, index]);
                };
                /**增加数量*/
                ZhenFaTiShengMediator.prototype.addcount = function (cell, index) {
                    if (this.zfLevel == 5 || this.zfLevel2 == 5)
                        return;
                    var bagvo = BagModel.getInstance().bagMap[1];
                    var item;
                    for (var i = 0; i < bagvo.items.length; i++) {
                        if (bagvo.items[i].id == this.ownjuanzhou[index].id) {
                            item = bagvo.items[i];
                            break;
                        }
                    }
                    if (!item)
                        return;
                    var count_img = cell.getChildByName("count_img");
                    var reduce_img = cell.getChildByName("reduce_img");
                    var count_lab = cell.getChildByName("count_lab");
                    count_img.visible = true;
                    reduce_img.visible = true;
                    count_lab.visible = true;
                    if (this.usecount[index] < item.number) { //是否超过已拥有数量
                        this.usecount[index] += 1;
                    }
                    var text = cell.getChildByName("count_lab");
                    text.text = this.usecount[index] + "/" + item.number;
                    this.addexp();
                };
                /**减少数量*/
                ZhenFaTiShengMediator.prototype.reducecount = function (cell, index) {
                    if (this.zfLevel2 == 5)
                        this.zfLevel2 -= 1;
                    var bagvo = BagModel.getInstance().bagMap[1];
                    var item;
                    for (var i = 0; i < bagvo.items.length; i++) {
                        if (bagvo.items[i].id == this.ownjuanzhou[index].id) {
                            item = bagvo.items[i];
                            break;
                        }
                    }
                    if (!item)
                        return;
                    var count_img = cell.getChildByName("count_img");
                    var reduce_img = cell.getChildByName("reduce_img");
                    var count_lab = cell.getChildByName("count_lab");
                    this.usecount[index] -= 1;
                    var text = cell.getChildByName("count_lab");
                    text.text = this.usecount[index] + "/" + item.number;
                    if (this.usecount[index] == 0) { //使用的道具数量是否为零
                        count_img.visible = false;
                        reduce_img.visible = false;
                        count_lab.visible = false;
                    }
                    this.addexp();
                };
                /**增加阵法经验*/
                ZhenFaTiShengMediator.prototype.addexp = function () {
                    var allexp = 0;
                    for (var index = 0; index < this.usecount.length; index++) {
                        allexp += this.usecount[index] * this.alladdexp[index];
                    }
                    var zfinfo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.allzhenfa[this.currentaddid].id);
                    if (zfinfo.level != 5) { //阵法不满级 5为阵法最高等级 
                        var effect = HuoBanModel.getInstance().ZhenFaEffectData;
                        //第一个阵法在配置表中读取的范围为1-6 (this.currentaddid - 1) * 5为选择的第几个阵法 +阵法等级为当前阵法第几级的阵法效果
                        //allexp 为当前点击的卷轴所增加的经验，zfinfo为当前阵法的等级和已拥有的经验
                        if (this.zfLevel2 == 4 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) {
                            this.zfLevel2 = 5;
                            this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp;
                            this._viewUI.zhenfaname_lab.text = zfinfo.level + 1 + "级" + this.currentzfname;
                        }
                        else if (this.zfLevel2 == 3 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp) {
                            this.zfLevel2 = 5;
                            this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp;
                            this._viewUI.zhenfaname_lab.text = zfinfo.level + 2 + "级" + this.currentzfname;
                        }
                        else if (this.zfLevel2 == 2 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp) {
                            this.zfLevel2 = 5;
                            this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp;
                            this._viewUI.zhenfaname_lab.text = zfinfo.level + 3 + "级" + this.currentzfname;
                        }
                        else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) {
                            this._viewUI.zhenfajingyan_lab.text = (allexp + zfinfo.exp) + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp;
                            this._viewUI.zhenfaname_lab.text = zfinfo.level + "级" + this.currentzfname;
                        }
                        else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp) {
                            this._viewUI.zhenfajingyan_lab.text = (zfinfo.exp + allexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp;
                            this._viewUI.zhenfaname_lab.text = (zfinfo.level + 1) + "级" + this.currentzfname;
                        }
                        else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp) {
                            this._viewUI.zhenfajingyan_lab.text = allexp + zfinfo.exp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp;
                            this._viewUI.zhenfaname_lab.text = (zfinfo.level + 2) + "级" + this.currentzfname;
                        }
                        else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 5].needexp) {
                            this._viewUI.zhenfajingyan_lab.text = allexp + zfinfo.exp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 5].needexp;
                            this._viewUI.zhenfaname_lab.text = (zfinfo.level + 3) + "级" + this.currentzfname;
                        }
                        else {
                            this.zfLevel2 = 5;
                            this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + 6].needexp + "/" + effect[(this.currentaddid - 1) * 5 + 6].needexp;
                        }
                    }
                    if (allexp == 0 || this.zfLevel == 5) { //经验为零
                        this._viewUI.tisheng_btn.skin = "common/ui/tongyong/dangehui.png";
                        this._viewUI.tisheng_btn.mouseEnabled = false;
                    }
                    else {
                        this._viewUI.tisheng_btn.skin = "common/ui/tongyong/duiwuanniu.png";
                        this._viewUI.tisheng_btn.mouseEnabled = true;
                    }
                };
                /**提升阵法经验*/
                ZhenFaTiShengMediator.prototype.tishengzhenfalv = function () {
                    var useformbook = new Array();
                    var num = 0;
                    for (var index = 0; index < this.usecount.length; index++) {
                        var formbook = new game.modules.huoban.models.UseFormBookVo();
                        if (this.usecount[index] != 0) { //该道具数量是否为0
                            formbook.bookid = this.ownjuanzhou[index].id;
                            formbook.num = this.usecount[index];
                            useformbook.push(formbook);
                        }
                    }
                    // models.HuoBanProxy.getInstance().once(models.OPENZHENFA_EVENT, this, this.init, [this.currentaddid, this.currentzfname]);
                    RequesterProtocols._instance.c2s_CUseFormBook(this.currentaddid, useformbook);
                };
                ZhenFaTiShengMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                ZhenFaTiShengMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                ZhenFaTiShengMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return ZhenFaTiShengMediator;
            }(game.modules.UiMediator));
            huoban.ZhenFaTiShengMediator = ZhenFaTiShengMediator;
        })(huoban = modules.huoban || (modules.huoban = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ZhenFaTiShengMediator.js.map