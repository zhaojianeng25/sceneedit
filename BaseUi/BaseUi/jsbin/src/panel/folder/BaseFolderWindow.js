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
var basefolderwin;
(function (basefolderwin) {
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Rectangle = Pan3d.Rectangle;
    var BaseFolderWindow = /** @class */ (function (_super) {
        __extends(BaseFolderWindow, _super);
        function BaseFolderWindow() {
            return _super.call(this) || this;
        }
        BaseFolderWindow.prototype.setRect = function (value) {
            this.pageRect = value;
            this.resize();
            this.left = value.x;
            this.top = value.y;
            this.refrishSize();
        };
        BaseFolderWindow.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            var item = [
                this.b_bottom_left,
                this.b_bottom_mid,
                this.b_bottom_right,
                this.b_bottom_line_left,
                this.b_bottom_line_right,
                this.a_bottom_line,
                this.a_tittle_bg,
                this.a_bg,
                this.a_scroll_bar_bg,
            ];
            this.setUiListVisibleByItem(item, false);
            this.a_bg = this.addEvntBut("a_bg", this._bRender); //重加一个没有边线的背景
            this.a_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
        };
        BaseFolderWindow.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        BaseFolderWindow.prototype.refrishSize = function () {
            var pageSizeEvet = new folder.FolderEvent(folder.FolderEvent.FILE_LIST_PANEL_CHANG);
            pageSizeEvet.data = new Rectangle(this.pageRect.x, this.pageRect.y, this.pageRect.width, this.pageRect.height - 0);
            Pan3d.ModuleEventManager.dispatchEvent(pageSizeEvet);
        };
        return BaseFolderWindow;
    }(base.BaseWindow));
    basefolderwin.BaseFolderWindow = BaseFolderWindow;
})(basefolderwin || (basefolderwin = {}));
//# sourceMappingURL=BaseFolderWindow.js.map