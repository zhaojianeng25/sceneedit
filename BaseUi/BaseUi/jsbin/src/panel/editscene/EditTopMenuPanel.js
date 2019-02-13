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
    var Rectangle = Pan3d.Rectangle;
    var Scene_data = Pan3d.Scene_data;
    var Sprite = layout.Sprite;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var TopMenuUiConatiner = /** @class */ (function (_super) {
        __extends(TopMenuUiConatiner, _super);
        function TopMenuUiConatiner() {
            var _this = _super.call(this) || this;
            _this.left = 0;
            _this._pageRect = new Rectangle(0, 0, 300, 300);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/basewin/basewin.txt", "ui/basewin/basewin.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopMenuUiConatiner.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        TopMenuUiConatiner.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        TopMenuUiConatiner.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        TopMenuUiConatiner.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.a_win_tittle = this.addEvntBut("a_win_tittle", this._topRender);
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        TopMenuUiConatiner.prototype.butClik = function (evt) {
            console.log(evt.target);
        };
        Object.defineProperty(TopMenuUiConatiner.prototype, "pageRect", {
            get: function () {
                return this._pageRect;
            },
            set: function (value) {
                this._pageRect = value;
                if (this.uiLoadComplete) {
                    this.refrishSize();
                }
            },
            enumerable: true,
            configurable: true
        });
        TopMenuUiConatiner.prototype.refrishSize = function () {
            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
            this._pageRect.width = Math.max(100, this._pageRect.width);
            this._pageRect.height = Math.max(100, this._pageRect.height);
            this.a_win_tittle.x = 0;
            this.a_win_tittle.y = 0;
            this.a_win_tittle.width = this._pageRect.width;
            this._topRender.applyObjData();
            this.resize();
        };
        return TopMenuUiConatiner;
    }(UIConatiner));
    editscene.TopMenuUiConatiner = TopMenuUiConatiner;
    var EditTopMenuPanel = /** @class */ (function (_super) {
        __extends(EditTopMenuPanel, _super);
        function EditTopMenuPanel(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            if (has) {
                _this.winBg = new TopMenuUiConatiner();
                _this.addUIContainer(_this.winBg);
                _this.changeSize();
            }
            return _this;
        }
        EditTopMenuPanel.prototype.changeSize = function () {
            if (this.winBg) {
                this.winBg.pageRect = this.rect;
            }
        };
        EditTopMenuPanel.prototype.getObjectsUnderPoint = function (evt) {
            for (var i = this.uiList.length - 1; i >= 0; i--) {
                if (this.uiList[i]) {
                    if (this.uiList[i] && this.uiList[i].insetUi(evt)) {
                        return this.uiList[i].insetUi(evt);
                    }
                }
            }
            return null;
        };
        return EditTopMenuPanel;
    }(Sprite));
    editscene.EditTopMenuPanel = EditTopMenuPanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditTopMenuPanel.js.map