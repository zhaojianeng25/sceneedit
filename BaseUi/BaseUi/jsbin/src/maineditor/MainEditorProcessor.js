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
    var MaterialModelSprite = left.MaterialModelSprite;
    var EditSceneEvent = editscene.EditSceneEvent;
    var MainEditorEvent = /** @class */ (function (_super) {
        __extends(MainEditorEvent, _super);
        function MainEditorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainEditorEvent.INIT_MAIN_EDITOR_PANEL = "INIT_MAIN_EDITOR_PANEL"; //显示面板
        MainEditorEvent.SHOW_MAIN_EDITOR_PANEL = "SHOW_MAIN_EDITOR_PANEL"; //显示面板
        MainEditorEvent.HIDE_MAIN_EDITOR_PANEL = "HIDE_MAIN_EDITOR_PANEL"; //显示面板
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
                    ModuleEventManager.dispatchEvent(new MainEditorEvent(MainEditorEvent.SHOW_MAIN_EDITOR_PANEL));
                }
                if ($mainEditorEvent.type == MainEditorEvent.SHOW_MAIN_EDITOR_PANEL) {
                    if (!this._editScenePanel) {
                        this._editScenePanel = new maineditor.MainEditorPanel();
                    }
                    BaseUiStart.editType = 0;
                    BaseUiStart.centenPanel.addUIContainer(this._editScenePanel);
                    this.addEvents();
                }
                if ($mainEditorEvent.type == MainEditorEvent.HIDE_MAIN_EDITOR_PANEL) {
                    if (this._editScenePanel) {
                        BaseUiStart.centenPanel.removeUIContainer(this._editScenePanel);
                    }
                    this.removeEvents();
                }
                this.changePageRect();
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect();
                }
            }
        };
        MainEditorProcessor.prototype.addEvents = function () {
            var _this = this;
            document.addEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
        };
        MainEditorProcessor.prototype.removeEvents = function () {
            var _this = this;
            document.removeEventListener(MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
        };
        MainEditorProcessor.prototype.onMouseWheel = function ($evt) {
            if (BaseUiStart.editType == 0) {
                if ($evt.x > BaseUiStart.leftPanel.width && $evt.x < BaseUiStart.rightPanel.x) {
                    var $slectUi = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
                    if (!$slectUi) {
                        MainEditorProcessor.edItorSceneManager.cam3D.distance += $evt.wheelDelta / 10;
                        console.log(MainEditorProcessor.edItorSceneManager.cam3D.distance);
                    }
                }
            }
        };
        MainEditorProcessor.prototype.maseSceneManager = function () {
            MainEditorProcessor.edItorSceneManager = new maineditor.EdItorSceneManager();
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            MainEditorProcessor.edItorSceneManager.addDisplay(new Pan3d.GridLineSprite());
            MainEditorProcessor.edItorSceneManager.ready = true;
            this.modelSprite = new MaterialModelSprite();
            var a = new Pan3d.BaseDiplay3dSprite;
            MainEditorProcessor.edItorSceneManager.cam3D = new Pan3d.Camera3D();
            MainEditorProcessor.edItorSceneManager.cam3D.distance = 200;
            MainEditorProcessor.edItorSceneManager.addDisplay(a);
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
                new MainEditorEvent(MainEditorEvent.HIDE_MAIN_EDITOR_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),
            ];
        };
        return MainEditorProcessor;
    }(BaseProcessor));
    maineditor.MainEditorProcessor = MainEditorProcessor;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorProcessor.js.map