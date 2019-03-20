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
var popmodel;
(function (popmodel) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var MaterialLeftEvent = /** @class */ (function (_super) {
        __extends(MaterialLeftEvent, _super);
        function MaterialLeftEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL = "SHOW_MATERIAL_LEFT_PANEL";
        MaterialLeftEvent.HIDE_MATERIAL_LEFT_PANEL = "HIDE_MATERIAL_LEFT_PANEL";
        return MaterialLeftEvent;
    }(BaseEvent));
    popmodel.MaterialLeftEvent = MaterialLeftEvent;
    var MaterialLeftModule = /** @class */ (function (_super) {
        __extends(MaterialLeftModule, _super);
        function MaterialLeftModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialLeftModule.prototype.getModuleName = function () {
            return "MaterialLeftModule";
        };
        MaterialLeftModule.prototype.listProcessors = function () {
            return [new MaterialLeftProcessor()];
        };
        return MaterialLeftModule;
    }(Module));
    popmodel.MaterialLeftModule = MaterialLeftModule;
    var MaterialLeftProcessor = /** @class */ (function (_super) {
        __extends(MaterialLeftProcessor, _super);
        function MaterialLeftProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialLeftProcessor.prototype.getName = function () {
            return "MaterialLeftProcessor";
        };
        MaterialLeftProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof MaterialLeftEvent) {
                var $leftEvent = $event;
                if ($leftEvent.type == MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL) {
                    this.showLeftPanel();
                    this.readBaseModel();
                }
                if ($leftEvent.type == MaterialLeftEvent.HIDE_MATERIAL_LEFT_PANEL) {
                    this.hideLeftPanel();
                }
            }
        };
        MaterialLeftProcessor.prototype.readBaseModel = function () {
            LoadManager.getInstance().load(Scene_data.fileRoot + "objs/model_2_objs.txt", LoadManager.XML_TYPE, function ($modelxml) {
                left.ModelShowModel.getInstance().readTxtToModelBy($modelxml);
            });
        };
        MaterialLeftProcessor.prototype.hideLeftPanel = function () {
            editscene.EditLeftPanel.leftPanel.removeUIContainer(this.popModelShowPanel);
        };
        MaterialLeftProcessor.prototype.showLeftPanel = function () {
            if (!this.popModelShowPanel) {
                this.popModelShowPanel = new popmodel.MaterialLeftPanel;
            }
            if (!this.popModelShowPanel.hasStage) {
                editscene.EditLeftPanel.leftPanel.addUIContainer(this.popModelShowPanel);
            }
        };
        MaterialLeftProcessor.prototype.listenModuleEvents = function () {
            return [
                new MaterialLeftEvent(MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL),
                new MaterialLeftEvent(MaterialLeftEvent.HIDE_MATERIAL_LEFT_PANEL),
            ];
        };
        return MaterialLeftProcessor;
    }(BaseProcessor));
    popmodel.MaterialLeftProcessor = MaterialLeftProcessor;
})(popmodel || (popmodel = {}));
//# sourceMappingURL=MaterialLeftProcessor.js.map