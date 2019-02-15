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
    var EditEditorPanel = /** @class */ (function (_super) {
        __extends(EditEditorPanel, _super);
        function EditEditorPanel() {
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
        EditEditorPanel.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._bottomRender);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        EditEditorPanel.prototype.butClik = function (evt) {
            if (this.perent) {
            }
        };
        EditEditorPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        EditEditorPanel.prototype.panelEventChanger = function (value) {
            if (this.pageRect) {
                this.pageRect.height = value.height;
                this.pageRect.width = value.width;
                this.left = value.x;
                this.top = value.y;
                this.refrishSize();
            }
        };
        EditEditorPanel.prototype.refrishSize = function () {
            if (this.uiLoadComplete) {
                this.a_win_tittle.width = this.pageRect.width;
                //this.a_win_tittle.height = this.pageRect.height;
            }
            this.resize();
        };
        return EditEditorPanel;
    }(UIConatiner));
    maineditor.EditEditorPanel = EditEditorPanel;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=EditEditorPanel.js.map