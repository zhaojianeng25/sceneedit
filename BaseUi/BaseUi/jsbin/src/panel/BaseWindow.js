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
var base;
(function (base) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Rectangle = Pan3d.Rectangle;
    var UIConatiner = Pan3d.UIConatiner;
    var UIMask = Pan3d.UIMask;
    var UIAtlas = Pan3d.UIAtlas;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var BaseWindow = /** @class */ (function (_super) {
        __extends(BaseWindow, _super);
        function BaseWindow() {
            var _this = _super.call(this) || this;
            _this.pageRect = new Rectangle(100, 100, 500, 500);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent;
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        BaseWindow.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        BaseWindow.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        BaseWindow.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        BaseWindow.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this._midRender.uiAtlas = this._bottomRender.uiAtlas;
            this.folderMask = new UIMask();
            this.folderMask.level = 5;
            this.addMask(this.folderMask);
            this.a_bg = this.addEvntBut("a_bg", this._bottomRender);
            this.a_tittle_bg = this.addChild(this._topRender.getComponent("a_tittle_bg"));
            this.a_tittle_bg.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_left_line = this.addChild(this._topRender.getComponent("a_left_line"));
            this.a_rigth_line = this.addChild(this._topRender.getComponent("a_rigth_line"));
            this.a_rigth_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_bottom_line = this.addChild(this._topRender.getComponent("a_bottom_line"));
            this.a_bottom_line.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_scroll_bar_bg = this.addChild(this._midRender.getComponent("a_scroll_bar_bg"));
            this.a_scroll_bar = this.addChild(this._topRender.getComponent("a_scroll_bar"));
            this.a_scroll_bar.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.a_scroll_bar.y = this.folderMask.y;
            this.setUiListVisibleByItem([this.a_scroll_bar], false);
            this.uiLoadComplete = true;
            this.refrishSize();
        };
        BaseWindow.prototype.removeMoveEvent = function () {
            if (this.uiLoadComplete) {
                this.a_tittle_bg.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_rigth_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
                this.a_bottom_line.removeEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            }
        };
        BaseWindow.prototype.setRect = function (value) {
            this.pageRect = value;
            this.refrishSize();
        };
        BaseWindow.prototype.refrishSize = function () {
            if (this.uiLoadComplete) {
                this.left = this.pageRect.x;
                this.top = this.pageRect.y;
                this.pageRect.width = Math.max(100, this.pageRect.width);
                this.pageRect.height = Math.max(100, this.pageRect.height);
                this.a_tittle_bg.x = 0;
                this.a_tittle_bg.y = 0;
                this.a_tittle_bg.width = this.pageRect.width;
                this.folderMask.y = this.a_tittle_bg.height;
                this.folderMask.x = 0;
                this.folderMask.width = this.pageRect.width - this.a_rigth_line.width;
                this.folderMask.height = this.pageRect.height - this.a_tittle_bg.height - this.a_bottom_line.height;
                this.a_bg.x = 0;
                this.a_bg.y = 0;
                this.a_bg.width = this.pageRect.width;
                this.a_bg.height = this.pageRect.height;
                this.a_rigth_line.x = this.pageRect.width - this.a_rigth_line.width;
                this.a_rigth_line.y = this.a_tittle_bg.height;
                this.a_rigth_line.height = this.pageRect.height - this.a_tittle_bg.height;
                this.a_left_line.x = 0;
                this.a_left_line.y = this.a_rigth_line.y;
                this.a_left_line.height = this.a_rigth_line.height;
                this.a_bottom_line.x = 0;
                this.a_bottom_line.y = this.pageRect.height - this.a_bottom_line.height;
                this.a_bottom_line.width = this.a_bg.width;
                this.a_scroll_bar.x = this.folderMask.x + this.folderMask.width - this.a_scroll_bar.width;
                this.a_scroll_bar_bg.x = this.pageRect.width - this.a_rigth_line.width - this.a_scroll_bar_bg.width;
                this.a_scroll_bar_bg.y = this.a_rigth_line.y;
                this.a_scroll_bar_bg.height = this.a_left_line.height;
                this.resize();
            }
        };
        BaseWindow.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.lastPagePos = new Vector2D(this.left, this.top);
                    break;
                case this.a_rigth_line:
                case this.a_bottom_line:
                    this.lastPagePos = new Vector2D(this.pageRect.width, this.pageRect.height);
                    break;
                case this.a_scroll_bar:
                    this.lastPagePos = new Vector2D(0, this.a_scroll_bar.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        BaseWindow.prototype.tittleMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        BaseWindow.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.a_tittle_bg:
                    this.left = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    this.top = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.pageRect.x = this.left;
                    this.pageRect.y = this.top;
                    break;
                case this.a_rigth_line:
                    this.pageRect.width = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    break;
                case this.a_bottom_line:
                    this.pageRect.height = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    break;
                case this.a_scroll_bar:
                    this.a_scroll_bar.y = this.lastPagePos.y + (evt.y - this.lastMousePos.y);
                    this.a_scroll_bar.y = Math.max(this.a_scroll_bar.y, this.folderMask.y);
                    this.a_scroll_bar.y = Math.min(this.a_scroll_bar.y, this.folderMask.y + this.folderMask.height - this.a_scroll_bar.height);
                    //  console.log(this.a_scroll_bar.y)
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            this.refrishSize();
        };
        return BaseWindow;
    }(UIConatiner));
    base.BaseWindow = BaseWindow;
})(base || (base = {}));
//# sourceMappingURL=BaseWindow.js.map