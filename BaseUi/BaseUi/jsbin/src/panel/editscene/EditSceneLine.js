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
    var Sprite = layout.Sprite;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var Vector2D = Pan3d.Vector2D;
    var Scene_data = Pan3d.Scene_data;
    var TempLineSprite = /** @class */ (function (_super) {
        __extends(TempLineSprite, _super);
        function TempLineSprite() {
            var _this = _super.call(this) || this;
            _this.left = 0;
            _this._pageRect = new Rectangle(0, 0, 30, 300);
            _this._bottomRender = new UIRenderComponent;
            _this.addRender(_this._bottomRender);
            _this._topRender = new UIRenderComponent;
            _this.addRender(_this._topRender);
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TempLineSprite.prototype.mouseDown = function (evt) {
            this.mouseIsDown = true;
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        TempLineSprite.prototype.stageMouseMove = function (evt) {
            this.mouseIsDown = false;
        };
        TempLineSprite.prototype.mouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.stageMouseMove, this);
        };
        TempLineSprite.prototype.loadConfigCom = function () {
            this._topRender.uiAtlas = this._bottomRender.uiAtlas;
            this.tureUpLine = this.addChild(this._topRender.getComponent("a_round_line"));
            this.tureUpLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.loadFinish = true;
            this.refrishSize();
        };
        TempLineSprite.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.tureUpLine:
                    this.lastPagePos = new Vector2D(this._pageRect.x, this._pageRect.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        TempLineSprite.prototype.tittleMouseUp = function (evt) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        TempLineSprite.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.tureUpLine:
                    this._pageRect.x = this.lastPagePos.x + (evt.x - this.lastMousePos.x);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            var roundPos = this.perent.roundPos;
            this._pageRect.x = Math.max(this._pageRect.x, Scene_data.stageWidth * roundPos.x);
            this._pageRect.x = Math.min(this._pageRect.x, Scene_data.stageWidth * roundPos.y);
            this.refrishSize();
            this.perent.perent.resize();
        };
        TempLineSprite.prototype.butClik = function (evt) {
            console.log(evt.target);
        };
        Object.defineProperty(TempLineSprite.prototype, "pageRect", {
            get: function () {
                return this._pageRect;
            },
            set: function (value) {
                this._pageRect = value;
                if (this.loadFinish) {
                    this.refrishSize();
                }
            },
            enumerable: true,
            configurable: true
        });
        TempLineSprite.prototype.refrishSize = function () {
            this.left = this._pageRect.x;
            this.top = this._pageRect.y;
            this.tureUpLine.x = 0;
            this.tureUpLine.y = 0;
            this.tureUpLine.height = this._pageRect.height;
            this.tureUpLine.width = 10;
            this.resize();
        };
        return TempLineSprite;
    }(UIConatiner));
    editscene.TempLineSprite = TempLineSprite;
    var EditSceneLine = /** @class */ (function (_super) {
        __extends(EditSceneLine, _super);
        function EditSceneLine(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            if (has) {
                _this.winBg = new TempLineSprite();
                _this.addUIContainer(_this.winBg);
                _this.changeSize();
            }
            return _this;
        }
        EditSceneLine.prototype.changeSize = function () {
            if (this.winBg) {
                this.winBg.pageRect = this.rect;
            }
        };
        return EditSceneLine;
    }(Sprite));
    editscene.EditSceneLine = EditSceneLine;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditSceneLine.js.map