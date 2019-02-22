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
var menutwo;
(function (menutwo) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIPanel = win.UIPanel;
    var MenuTwoPanel = /** @class */ (function (_super) {
        __extends(MenuTwoPanel, _super);
        function MenuTwoPanel() {
            var _this = _super.call(this) || this;
            _this.width = 200;
            _this.height = 200;
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this.loadConfigCom();
            return _this;
        }
        MenuTwoPanel.prototype.butClik = function (evt) {
        };
        MenuTwoPanel.prototype.loadConfigCom = function () {
        };
        MenuTwoPanel.prototype.refrish = function () {
        };
        return MenuTwoPanel;
    }(UIPanel));
    menutwo.MenuTwoPanel = MenuTwoPanel;
})(menutwo || (menutwo = {}));
//# sourceMappingURL=MenuTwoPanel.js.map