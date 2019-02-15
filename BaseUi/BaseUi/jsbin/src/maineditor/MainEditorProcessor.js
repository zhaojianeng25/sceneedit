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
    var Rectangle = Pan3d.Rectangle;
    var EditSceneEvent = editscene.EditSceneEvent;
    var MainEditorEvent = /** @class */ (function (_super) {
        __extends(MainEditorEvent, _super);
        function MainEditorEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainEditorEvent.INIT_MAIN_EDITOR_PANEL = "INIT_MAIN_EDITOR_PANEL"; //显示面板
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
                var $leftEvent = $event;
                if ($leftEvent.type == MainEditorEvent.INIT_MAIN_EDITOR_PANEL) {
                    if (!this._hierarchyListPanel) {
                        this._hierarchyListPanel = new maineditor.HierarchyListPanel();
                    }
                    BaseUiStart.leftPanel.addUIContainer(this._hierarchyListPanel);
                    this.changePageRect();
                }
            }
            if ($event instanceof EditSceneEvent) {
                if ($event.type = EditSceneEvent.EDITE_SCENE_RESIZE) {
                    this.changePageRect();
                }
            }
        };
        MainEditorProcessor.prototype.changePageRect = function () {
            if (this._hierarchyListPanel && BaseUiStart.leftPanel) {
                var rect = new Rectangle(BaseUiStart.leftPanel.rect.x, BaseUiStart.leftPanel.rect.y, BaseUiStart.leftPanel.rect.width + 10, BaseUiStart.leftPanel.rect.height);
                this._hierarchyListPanel.panelEventChanger(rect);
            }
        };
        MainEditorProcessor.prototype.listenModuleEvents = function () {
            return [
                new MainEditorEvent(MainEditorEvent.INIT_MAIN_EDITOR_PANEL),
                new EditSceneEvent(EditSceneEvent.EDITE_SCENE_RESIZE),
            ];
        };
        return MainEditorProcessor;
    }(BaseProcessor));
    maineditor.MainEditorProcessor = MainEditorProcessor;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=MainEditorProcessor.js.map