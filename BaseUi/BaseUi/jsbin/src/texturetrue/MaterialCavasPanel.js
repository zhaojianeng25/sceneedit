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
var materialui;
(function (materialui) {
    //ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
    var MaterialCavasPanel = /** @class */ (function (_super) {
        __extends(MaterialCavasPanel, _super);
        function MaterialCavasPanel() {
            return _super.call(this) || this;
        }
        MaterialCavasPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.setUiListVisibleByItem([this.a_bg], false);
            this.setUiListVisibleByItem([this.a_left_line], false);
            this.setUiListVisibleByItem([this.a_rigth_line], false);
            this.setUiListVisibleByItem([this.a_bottom_line], false);
            this.setUiListVisibleByItem([this.a_scroll_bar], false);
            this.setUiListVisibleByItem([this.a_scroll_bar_bg], false);
            this.setUiListVisibleByItem([this.a_tittle_bg], false);
        };
        return MaterialCavasPanel;
    }(base.BaseWindow));
    materialui.MaterialCavasPanel = MaterialCavasPanel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialCavasPanel.js.map