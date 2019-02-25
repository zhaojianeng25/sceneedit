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
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Rectangle = Pan3d.Rectangle;
    var MouseType = Pan3d.MouseType;
    var MathClass = Pan3d.MathClass;
    var EditSceneEvent = editscene.EditSceneEvent;
    var MainEditorEvent = /** @class */ (function (_super) {
        __extends(MainEditorEvent, _super);
        function MainEditorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainEditorEvent.INIT_MAIN_EDITOR_PANEL = "INIT_MAIN_EDITOR_PANEL"; //显示面板
        MainEditorEvent.SHOW_MAIN_EDITOR_PANEL = "SHOW_MAIN_EDITOR_PANEL"; //显示面板
        return MainEditorEvent;
    }(BaseEvent));
    maineditor.MainEditorEvent = MainEditorEvent;
    var MainEditorModule = /** @class */ (function (_super) {
        __extends(MainEditorModule, _super);
        function MainEditorModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainEditorModule.prototype.getModuleName = function () {
            return "MainEditorModule";
        };
        MainEditorModule.prototype.listProcessors = function () {
            return [new MainEditorProcessor()];
        };
        return MainEditorModule;
    }(Module));
    maineditor.MainEditorModule = MainEditorModule;
    var MainEditorProcessor = /** @class */ (function (_super) {
        __extends(MainEditorProcessor, _super);
        function MainEditorProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainEditorProcessor.prototype.getName = function () {
            return "MainEditorProcessor";
        };
        MainEditorProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MainEditorEvent) {
                var $mainEditorEvent = $event;
                if ($mainEditorEvent.type == MainEditorEvent.INIT_MAIN_EDITOR_PANEL) {
                    this.maseSceneManager();
                    if (!this._hierarchyListPanel) {
                        this._hierarchyListPanel = new maineditor.HierarchyListPanel();
                    }
                    BaseUiStart.leftPanel.addUIContainer(this._hierarchyListPanel);
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
                    if (!this._editScenePanel) {
                        this._editScenePanel = new maineditor.MainEditorPanel();
                    }
                    BaseUiStart.centenPanel.addUIContainer(this._editScenePanel);
                    Pan3d.ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_UICONTAINER_TO_XYZ), this._editScenePanel);
                    this.addTestWindPanel();
                }
                this.changePageRect();
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect();
                }
            }
        };
        MainEditorProcessor.prototype.addTestWindPanel = function () {
            var temp = new layout.Panel(false);
            layout.LayerManager.getInstance().addPanel(temp, 500);
            var winPanel = new base.BaseWindow();
            temp.addUIContainer(winPanel);
        };
        MainEditorProcessor.prototype.addEvents = function () {
            var _this = this;
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
                this.onMouseDownFun = function ($evt) { _this.onMouseDown($evt); };
                this.onMouseMoveFun = function ($evt) { _this.onMouseMove($evt); };
                this.onMouseUpFun = function ($evt) { _this.onMouseUp($evt); };
                this.onKeyDownFun = function ($evt) { _this.onKeyDown($evt); };
                this.onKeyUpFun = function ($evt) { _this.onKeyUp($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun);
            document.addEventListener("contextmenu", function (event) {
                event.preventDefault();
            });
        };
        MainEditorProcessor.prototype.removeEvents = function () {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun);
        };
        MainEditorProcessor.prototype.onMouseMove = function ($e) {
        };
        MainEditorProcessor.prototype.onMouseDown = function ($e) {
        };
        MainEditorProcessor.prototype.onMouseUp = function ($e) {
        };
        MainEditorProcessor.prototype.onKeyDown = function ($e) {
        };
        MainEditorProcessor.prototype.onKeyUp = function ($e) {
        };
        Object.defineProperty(MainEditorProcessor.prototype, "isCanToDo", {
            get: function () {
                if (this._editScenePanel.hasStage) {
                    return true;
                }
                else {
                    return false;
                }
            },
            enumerable: true,
            configurable: true
        });
        MainEditorProcessor.prototype.onMouseWheel = function ($evt) {
            if (!this.isCanToDo) {
                return;
            }
        };
        MainEditorProcessor.prototype.maseSceneManager = function () {
            MainEditorProcessor.edItorSceneManager = new maineditor.EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            MainEditorProcessor.edItorSceneManager.addDisplay(new Pan3d.GridLineSprite());
            MainEditorProcessor.edItorSceneManager.ready = true;
            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D();
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 100;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationY = 0;
            MainEditorProcessor.edItorSceneManager.focus3D.rotationX = -45;
            MathClass.getCamView(MainEditorProcessor.edItorSceneManager.cam3D, MainEditorProcessor.edItorSceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION), MainEditorProcessor.edItorSceneManager);
        };
        MainEditorProcessor.prototype.changePageRect = function () {
            if (this._hierarchyListPanel && BaseUiStart.leftPanel) {
                var rect = new Rectangle(BaseUiStart.leftPanel.rect.x, BaseUiStart.leftPanel.rect.y, BaseUiStart.leftPanel.rect.width + 10, BaseUiStart.leftPanel.rect.height);
                this._hierarchyListPanel.panelEventChanger(rect);
            }
            if (this._editScenePanel && BaseUiStart.centenPanel) {
                var rect = new Rectangle(BaseUiStart.centenPanel.rect.x, BaseUiStart.centenPanel.rect.y, BaseUiStart.centenPanel.rect.width - 10, BaseUiStart.centenPanel.rect.height - 5);
                this._editScenePanel.panelEventChanger(rect);
            }
        };
        MainEditorProcessor.prototype.listenModuleEvents = function () {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),
            ];
        };
        return MainEditorProcessor;
    }(BaseProcessor));
    maineditor.MainEditorProcessor = MainEditorProcessor;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorProcessor.js.map