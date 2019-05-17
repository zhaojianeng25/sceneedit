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
* 使用道具
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var UseToRemindCardMediator = /** @class */ (function (_super) {
                __extends(UseToRemindCardMediator, _super);
                function UseToRemindCardMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    /** 物品数量 */
                    _this.itemNum = -1;
                    _this._viewUI = new ui.common.UseToRemindCardUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this._viewUI.close_btn.on(LEvent.CLICK, _this, _this.close);
                    _this._viewUI.useitem_btn.on(LEvent.MOUSE_DOWN, _this, _this.useitem);
                    return _this;
                }
                UseToRemindCardMediator.getInstance = function (app) {
                    if (!this._instance) {
                        this._instance = new UseToRemindCardMediator(app);
                    }
                    return this._instance;
                };
                UseToRemindCardMediator.prototype.init = function (itemid, name, num) {
                    this.show();
                    this.usetime = 0;
                    this.itemid = itemid;
                    if (num) { /** 使用指引 */
                        this.itemNum = num;
                        this._viewUI.itemNum_lab.visible = true;
                        this.updateNumLab(num);
                    }
                    else {
                        this._viewUI.itemNum_lab.visible = false;
                        if (game.modules.autohangup.models.AutoHangUpModel.getInstance().autotask == 1) {
                            Laya.timer.loop(1000, this, this.delayuseitem);
                        }
                    }
                    this.iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[itemid];
                    this._viewUI.itemicon_img.skin = "common/icon/item/" + this.iteminfo.icon + ".png";
                    this._viewUI.itemname_lab.text = this.iteminfo.name;
                    this._viewUI.useitem_btn.label = name;
                };
                UseToRemindCardMediator.prototype.useitem = function () {
                    if (this.itemNum >= 1) { /** 当前数量大于1 */
                        var outbattleuse = 0;
                        var roleid = LoginModel.getInstance().roleDetail.roleid;
                        var item = bagModel.getInstance().addItemUseGuide.get(this.itemid);
                        var key = item.key;
                        if (this._viewUI.useitem_btn.label == "使用")
                            RequesterProtocols._instance.c2s_CAppend_Item(key, outbattleuse, roleid);
                        else {
                            var equipType = StrengTheningModel.getInstance().equipEffectData[this.itemid].eequiptype;
                            /** 穿上装备请求 */
                            RequesterProtocols._instance.c2s_CPutOn_Equip(item.key, equipType);
                        }
                        this.updateNumLab(this.itemNum);
                    }
                    else if (this.itemNum == -1) {
                        this.hide();
                        game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.USEITEM);
                    }
                };
                /** 刷新物品数量 */
                UseToRemindCardMediator.prototype.updateNumLab = function (num) {
                    if (num == 0) {
                        this.hide();
                        return;
                    }
                    if (num == 1)
                        this._viewUI.itemNum_lab.text = "";
                    else
                        this._viewUI.itemNum_lab.text = num.toString();
                };
                /**延迟使用道具*/
                UseToRemindCardMediator.prototype.delayuseitem = function () {
                    this.usetime += 1;
                    if (this.usetime >= 3) {
                        Laya.timer.clear(this, this.delayuseitem);
                        this.useitem();
                    }
                };
                UseToRemindCardMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                UseToRemindCardMediator.prototype.hide = function () {
                    this.itemNum = -1;
                    _super.prototype.hide.call(this);
                };
                /** 关闭界面 */
                UseToRemindCardMediator.prototype.close = function () {
                    this.hide();
                    /** 不使用只是关闭 移除key */
                    var itemKey = bagModel.getInstance().addItemUseGuide.keys;
                    /** 如果指引字典里还有值就响应下个界面 */
                    if (itemKey.length != 0) {
                        for (var index = 0; index < itemKey.length; index++) { /** 移除的时候移除目前的界面的id */
                            if (itemKey[index] == this.itemid) {
                                bagModel.getInstance().addItemUseGuide.remove(itemKey[index]);
                            }
                        }
                        if (bagModel.getInstance().addItemUseGuide.keys.length != 0)
                            modules.bag.models.BagProxy.getInstance().event(modules.bag.models.ADDITEM_USE_GUIDE);
                    }
                };
                UseToRemindCardMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return UseToRemindCardMediator;
            }(game.modules.UiMediator));
            commonUI.UseToRemindCardMediator = UseToRemindCardMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=UseToRemindCardMediator.js.map