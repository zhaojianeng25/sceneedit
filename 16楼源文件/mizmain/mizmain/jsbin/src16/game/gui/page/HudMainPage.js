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
    var gui;
    (function (gui) {
        var page;
        (function (page) {
            /**
             * hud主界面
             * name 王谦
             */
            var HudMainPage = /** @class */ (function (_super) {
                __extends(HudMainPage, _super);
                //private _viewUI:ui.common.MainHudUI;	//UI
                function HudMainPage(app, onOpenFunc, onCloseFunc) {
                    var _this = _super.call(this, app, onOpenFunc, onCloseFunc) || this;
                    _this._asset = [
                        game.Path.atlas_ui + "mainhud.atlas"
                    ];
                    return _this;
                }
                // 页面初始化函数
                HudMainPage.prototype.init = function () {
                    // this._view = this._viewUI = new ui.common.MainHudUI();
                    // this.addChild(this._viewUI);
                };
                // 页面打开时执行函数
                HudMainPage.prototype.onOpen = function () {
                    _super.prototype.onOpen.call(this);
                    //如果是战斗地图，隐藏挑战,任务
                    var mapInfo = this._app.sceneObjectMgr.mapInfo;
                    if (mapInfo && mapInfo.inBattle) {
                        // this._viewUI.visible = false;
                    }
                    else {
                        // Laya.timer.once(2000,this,()=>{this._app.battleMgr.start()});
                    }
                    this.updateView();
                };
                //页面关闭函数
                HudMainPage.prototype.close = function () {
                    _super.prototype.close.call(this);
                };
                Object.defineProperty(HudMainPage.prototype, "addListener", {
                    //添加事件侦听
                    set: function (isAdd) {
                        // DisplayU.setMouseListener(this._viewUI.btnFight, isAdd, this, this.onClickHandler);
                        // DisplayU.setMouseListener(this._viewUI.btnBattlePos, isAdd, this, this.onClickHandler);
                    },
                    enumerable: true,
                    configurable: true
                });
                //更新界面
                HudMainPage.prototype.updateView = function () {
                };
                //鼠标点击事件
                HudMainPage.prototype.onClickHandler = function (e) {
                    TweenBtnEff.BtnTween(e.currentTarget);
                    switch (e.currentTarget) {
                        // case this._viewUI.btnFight://挑战
                        //     this._app.battleMgr.start();
                        //     break;
                        // case this._viewUI.btnBattlePos://位置
                        //     this._app.uiRoot.general.open(PageDef.SCENE_BATTLE_PAGE);
                        //     break;
                    }
                };
                return HudMainPage;
            }(game.gui.base.Page));
            page.HudMainPage = HudMainPage;
        })(page = gui.page || (gui.page = {}));
    })(gui = game.gui || (game.gui = {}));
})(game || (game = {}));
//# sourceMappingURL=HudMainPage.js.map