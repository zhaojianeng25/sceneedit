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
var editscene;
(function (editscene) {
    var Panel = win.Panel;
    var EditLeftPanel = /** @class */ (function (_super) {
        __extends(EditLeftPanel, _super);
        function EditLeftPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EditLeftPanel.prototype.addUIContainer = function ($container) {
            _super.prototype.addUIContainer.call(this, $container);
        };
        EditLeftPanel.prototype.removeUIContainer = function ($container) {
            _super.prototype.removeUIContainer.call(this, $container);
        };
        return EditLeftPanel;
    }(Panel));
    editscene.EditLeftPanel = EditLeftPanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditLeftPanel.js.map