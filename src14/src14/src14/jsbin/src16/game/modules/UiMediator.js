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
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var UiMediator = /** @class */ (function (_super) {
            __extends(UiMediator, _super);
            function UiMediator(uiLayer) {
                var _this = _super.call(this) || this;
                _this.isTweenShow = false;
                _this.hasSound = true;
                _this.isCenter = true;
                _this.uiLayer = uiLayer;
                Laya.stage.on(LEvent.RESIZE, _this, _this.onResize);
                return _this;
            }
            UiMediator.prototype.onResize = function () {
                this.layout();
            };
            UiMediator.prototype.isShow = function () {
                return this.getView() && this.getView().parent && this.getView().parent == this.uiLayer;
            };
            UiMediator.prototype.isShowInStage = function () {
                return this.getView() && this.getView().stage != null;
            };
            UiMediator.prototype.show = function () {
                this.uiLayer.addChild(this.getView());
                this.layout();
            };
            // 重新布局
            UiMediator.prototype.layout = function (layoutView) {
                if (layoutView === void 0) { layoutView = this.getView(); }
                if (this._app) {
                    this._clientWidth = this._app.clientWidth;
                    this._clientHeight = this._app.clientHeight;
                }
                if (layoutView && this.isCenter) {
                    //let scaleX = this._clientWidth / layoutView.width;
                    //let scaleY = this._clientHeight / this.getView().height;
                    var scale = 1; //Math.min(scaleX, scaleY);
                    layoutView.scale(scale, scale);
                    layoutView.x = (this._clientWidth - layoutView.width * scale) / 2;
                    layoutView.y = (this._clientHeight - layoutView.height * scale) / 2;
                    //console.log("UiMediator layout!", layoutView);
                }
            };
            UiMediator.prototype.hide = function () {
                //try {
                this.uiLayer.removeChild(this.getView());
                //} catch(e:Error) {
                //}
            };
            Object.defineProperty(UiMediator.prototype, "app", {
                set: function (value) {
                    this._app = value;
                },
                enumerable: true,
                configurable: true
            });
            UiMediator.prototype.swap = function () {
                if (this.isShow()) {
                    this.hide();
                }
                else {
                    this.show();
                }
            };
            UiMediator.prototype.flushData = function () {
            };
            UiMediator.prototype.getView = function () {
                return null;
            };
            return UiMediator;
        }(Laya.EventDispatcher));
        modules.UiMediator = UiMediator;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=UiMediator.js.map