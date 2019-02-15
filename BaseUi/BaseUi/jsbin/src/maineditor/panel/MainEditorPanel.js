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
var maineditor;
(function (maineditor) {
    var Rectangle = Pan3d.Rectangle;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var MainEditorPanel = /** @class */ (function (_super) {
        __extends(MainEditorPanel, _super);
        function MainEditorPanel() {
            var _this = _super.call(this) || this;
            _this.pageRect = new Rectangle(0, 0, 500, 500);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/editscene/editscene.txt", "ui/editscene/editscene.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        MainEditorPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_bg = this.addEvntBut("a_win_bg", this._bottomRender);
            this.a_win_bg.x = 0;
            this.a_win_bg.y = 25;
            this.setUiListVisibleByItem([this.a_win_tittle], false);
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        MainEditorPanel.prototype.butClik = function (evt) {
            if (this.perent) {
            }
        };
        MainEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        MainEditorPanel.prototype.panelEventChanger = function (value) {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }
        };
        MainEditorPanel.prototype.refrishSize = function () {
            if (this.uiLoadComplete) {
                this.a_win_bg.width = this.pageRect.width;
                this.a_win_bg.height = this.pageRect.height - 25;
                this.a_win_tittle.width = this.pageRect.width;
                this._bottomRender.applyObjData();
                this._topRender.applyObjData();
            }
            this.resize();
        };
        return MainEditorPanel;
    }(UIConatiner));
    maineditor.MainEditorPanel = MainEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorPanel.js.map