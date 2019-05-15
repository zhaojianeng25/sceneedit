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
* 制作进度
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var commonUI;
        (function (commonUI) {
            var MakeProgressMediator = /** @class */ (function (_super) {
                __extends(MakeProgressMediator, _super);
                function MakeProgressMediator(app) {
                    var _this = _super.call(this, app.uiRoot.general) || this;
                    _this._viewUI = new ui.common.component.MakeProgressUI();
                    _this._viewUI.mouseThrough = true;
                    _this.isCenter = true;
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    return _this;
                }
                /**初始化*/
                MakeProgressMediator.prototype.init = function (itemid, text) {
                    this.show();
                    this._viewUI.makepro_progress.value = 0;
                    if (itemid) { //是否有该高举
                        var iteminfo = game.modules.bag.models.BagModel.getInstance().taskRelativeData[itemid];
                        this._viewUI.make_lab.text = iteminfo.readtext;
                    }
                    else {
                        this._viewUI.make_lab.text = text;
                    }
                    game.modules.task.models.TaskProxy.getInstance().once(game.modules.task.models.INTERRUPT, this, this.suspend);
                    this._app.sceneRoot.istask = 2;
                    Laya.timer.loop(100, this, this.changeValue);
                };
                /**制作进度*/
                MakeProgressMediator.prototype.changeValue = function () {
                    if (this._viewUI.makepro_progress.value >= 1) {
                        Laya.timer.clear(this, this.changeValue);
                        game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.MAKESUCCESS, [1]);
                        this.hide();
                    }
                    this._viewUI.makepro_progress.value += 0.05;
                };
                /**打断制作*/
                MakeProgressMediator.prototype.suspend = function () {
                    Laya.timer.clear(this, this.changeValue);
                    this._viewUI.make_lab.text = "打断";
                    Laya.timer.loop(100, this, this.transparent);
                };
                /**打断后透明*/
                MakeProgressMediator.prototype.transparent = function () {
                    if (this._viewUI.alpha <= 0) { //透明度
                        Laya.timer.clear(this, this.transparent);
                        game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.MAKESUCCESS, [0]);
                        this.hide();
                    }
                    this._viewUI.alpha -= 0.1;
                };
                MakeProgressMediator.prototype.show = function () {
                    _super.prototype.show.call(this);
                };
                MakeProgressMediator.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                MakeProgressMediator.prototype.getView = function () {
                    return this._viewUI;
                };
                return MakeProgressMediator;
            }(game.modules.UiMediator));
            commonUI.MakeProgressMediator = MakeProgressMediator;
        })(commonUI = modules.commonUI || (modules.commonUI = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MakeProgressMediator.js.map