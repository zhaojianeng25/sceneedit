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
            this.lineBgPixe = this.addChild(this._bottomRender.getComponent("b_line_pixe_point"));
            this.lineMoveEmpty = this.addChild(this._topRender.getComponent("a_empty"));
            this.lineMoveEmpty.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.loadFinish = true;
            this.refrishSize();
        };
        TempLineSprite.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.lineMoveEmpty:
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
                case this.lineMoveEmpty:
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
            this.lineMoveEmpty.x = 0;
            this.lineMoveEmpty.y = 0;
            this.lineMoveEmpty.height = this._pageRect.height;
            this.lineMoveEmpty.width = 5;
            this.lineBgPixe.x = 2;
            this.lineBgPixe.y = 0;
            this.lineBgPixe.height = this._pageRect.height;
            this.lineBgPixe.width = 1;
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
    var TempTopLaout = /** @class */ (function (_super) {
        __extends(TempTopLaout, _super);
        function TempTopLaout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.leftWidth = 300; //左边宽度；
            _this.rightWidth = 300; //右边宽度；
            _this.bottomHeight = 300; //底下宽度；
            _this.menuHeight = 22;
            return _this;
        }
        TempTopLaout.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.leftLine = this._baseTopRender.getComponent("b_line_pixe_point");
            this.rightLine = this._baseTopRender.getComponent("b_line_pixe_point");
            this.bottomLine = this._baseTopRender.getComponent("b_line_pixe_point");
            this.setUiListVisibleByItem([this.leftLine], true);
            this.setUiListVisibleByItem([this.rightLine], true);
            this.setUiListVisibleByItem([this.bottomLine], true);
            this.leftLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.rightLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.bottomLine.addEventListener(InteractiveEvent.Down, this.tittleMouseDown, this);
            this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight));
            this.resize();
        };
        TempTopLaout.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.bottomLine) {
                this.leftLine.x = this.leftWidth;
                this.leftLine.y = 0;
                this.leftLine.width = 10;
                this.leftLine.height = Scene_data.stageHeight;
                this.rightLine.x = Scene_data.stageWidth - this.rightWidth;
                this.rightLine.y = 0;
                this.rightLine.width = 10;
                this.rightLine.height = Scene_data.stageHeight;
                this.bottomLine.x = 0;
                this.bottomLine.y = Scene_data.stageHeight - this.bottomHeight;
                this.bottomLine.width = Scene_data.stageWidth;
                this.bottomLine.height = 10;
                BaseUiStart.leftPanel.y = this.menuHeight;
                BaseUiStart.centenPanel.y = this.menuHeight;
                BaseUiStart.rightPanel.y = this.menuHeight;
                BaseUiStart.leftPanel.x = 0;
                BaseUiStart.leftPanel.height = Scene_data.stageHeight - this.bottomHeight - this.menuHeight;
                BaseUiStart.leftPanel.width = this.leftWidth;
                BaseUiStart.rightPanel.x = Scene_data.stageWidth - this.rightWidth;
                BaseUiStart.rightPanel.height = Scene_data.stageHeight - this.menuHeight;
                BaseUiStart.rightPanel.width = this.rightWidth;
                BaseUiStart.centenPanel.x = this.leftWidth;
                BaseUiStart.centenPanel.height = Scene_data.stageHeight - this.bottomHeight - this.menuHeight;
                BaseUiStart.centenPanel.width = Scene_data.stageWidth - this.leftWidth - this.rightWidth;
                var rect = new Rectangle(0, Scene_data.stageHeight - this.bottomHeight + 10, Scene_data.stageWidth - this.rightWidth, this.bottomHeight);
                Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.EDITSCENE_RESET_SIZE), rect);
                Pan3d.ModuleEventManager.dispatchEvent(new editscene.EditSceneEvent(editscene.EditSceneEvent.EDITE_SCENE_RESIZE), rect);
            }
        };
        TempTopLaout.prototype.tittleMouseDown = function (evt) {
            this.mouseMoveTaget = evt.target;
            this.lastMousePos = new Vector2D(evt.x, evt.y);
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                case this.rightLine:
                case this.bottomLine:
                    this.lastPagePos = new Vector2D(evt.target.x, evt.target.y);
                    this.lastLaoutVec = new Vector3D(this.leftWidth, this.rightWidth, this.bottomHeight);
                    break;
                default:
                    break;
            }
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.mouseOnTittleMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.tittleMouseUp, this);
        };
        TempTopLaout.prototype.mouseOnTittleMove = function (evt) {
            switch (this.mouseMoveTaget) {
                case this.leftLine:
                    this.leftWidth = this.lastLaoutVec.x + (evt.x - this.lastMousePos.x);
                    break;
                case this.rightLine:
                    this.rightWidth = this.lastLaoutVec.y - (evt.x - this.lastMousePos.x);
                    break;
                case this.bottomLine:
                    this.bottomHeight = this.lastLaoutVec.z - (evt.y - this.lastMousePos.y);
                    break;
                default:
                    console.log("nonono");
                    break;
            }
            this.resize();
        };
        return TempTopLaout;
    }(base.BaseWindow));
    editscene.TempTopLaout = TempTopLaout;
    var SceneLaoutLinePane = /** @class */ (function (_super) {
        __extends(SceneLaoutLinePane, _super);
        function SceneLaoutLinePane(has) {
            if (has === void 0) { has = true; }
            var _this = _super.call(this) || this;
            _this.winBg = new TempTopLaout();
            _this.addUIContainer(_this.winBg);
            _this.changeSize();
            return _this;
        }
        return SceneLaoutLinePane;
    }(Sprite));
    editscene.SceneLaoutLinePane = SceneLaoutLinePane;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditSceneLine.js.map