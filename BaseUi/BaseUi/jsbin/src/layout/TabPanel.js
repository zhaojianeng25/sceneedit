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
var layout;
(function (layout) {
    var Rectangle = Pan3d.Rectangle;
    var TabPanel = /** @class */ (function (_super) {
        __extends(TabPanel, _super);
        function TabPanel() {
            var _this = _super.call(this) || this;
            _this.winBg = new layout.LayBaseTab();
            _this.winBg.pageRect = new Rectangle(random(300), random(300), 200, 500);
            return _this;
        }
        TabPanel.prototype.update = function () {
            for (var i = 0; i < this.winBg.renderList.length; i++) {
                //  this.winBg.renderList[i].update();
            }
            _super.prototype.update.call(this);
        };
        TabPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this.winBg.resize();
        };
        return TabPanel;
    }(layout.LayUIManager));
    layout.TabPanel = TabPanel;
})(layout || (layout = {}));
//# sourceMappingURL=TabPanel.js.map