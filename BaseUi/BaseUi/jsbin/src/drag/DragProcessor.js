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
var drag;
(function (drag) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var Vector2D = Pan3d.Vector2D;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var Panel = layout.Panel;
    var DragEvent = /** @class */ (function (_super) {
        __extends(DragEvent, _super);
        function DragEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragEvent.DRAG_SHOW = "DRAG_SHOW";
        DragEvent.DRAG_ENTER = "DRAG_ENTER";
        DragEvent.DRAG_DROP = "DRAG_DROP";
        return DragEvent;
    }(BaseEvent));
    drag.DragEvent = DragEvent;
    var DragModule = /** @class */ (function (_super) {
        __extends(DragModule, _super);
        function DragModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragModule.prototype.getModuleName = function () {
            return "DragModule";
        };
        DragModule.prototype.listProcessors = function () {
            return [new DragProcessor()];
        };
        return DragModule;
    }(Module));
    drag.DragModule = DragModule;
    var DragProcessor = /** @class */ (function (_super) {
        __extends(DragProcessor, _super);
        function DragProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DragProcessor.prototype.getName = function () {
            return "DragProcessor";
        };
        DragProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof DragEvent) {
                if ($event.type == DragEvent.DRAG_SHOW) {
                    if (!this._dragPanel) {
                        this._dragPanel = new drag.DragPanel();
                    }
                    this.addUIContainer(this._dragPanel);
                }
            }
        };
        DragProcessor.prototype.addUIContainer = function (value) {
            if (!this.topDrag) {
                this.topDrag = new Panel(false);
                layout.LayerManager.getInstance().addPanel(this.topDrag, 200);
            }
            this.topDrag.addUIContainer(value);
            this.addStageMoveEvets();
        };
        DragProcessor.prototype.addStageMoveEvets = function () {
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        DragProcessor.prototype.onMove = function ($e) {
            var $ui = this.getObjectsUnderPoint(new Vector2D($e.x, $e.y));
            if ($ui) {
                $ui.dispatchEvent(new DragEvent(DragEvent.DRAG_DROP));
            }
            this._dragPanel.left = $e.x - 32;
            this._dragPanel.top = $e.y - 32;
        };
        DragProcessor.prototype.getObjectsUnderPoint = function (evt) {
            var children = layout.LayerManager.getInstance().children;
            for (var i = children.length - 1; i >= 0; i--) {
                if (children[i] != this.topDrag) {
                    var temp = children[i].getObjectsUnderPoint(evt);
                    if (temp) {
                        return temp;
                    }
                }
            }
            return null;
        };
        DragProcessor.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
            var $ui = this.getObjectsUnderPoint(new Vector2D($e.x, $e.y));
            if ($ui) {
                $ui.dispatchEvent(new DragEvent(DragEvent.DRAG_ENTER));
            }
            this._dragPanel.left = 10000;
            this._dragPanel.top = 10000;
        };
        DragProcessor.prototype.listenModuleEvents = function () {
            return [
                new DragEvent(DragEvent.DRAG_SHOW),
                new DragEvent(DragEvent.DRAG_DROP),
                new DragEvent(DragEvent.DRAG_ENTER),
            ];
        };
        return DragProcessor;
    }(BaseProcessor));
    drag.DragProcessor = DragProcessor;
})(drag || (drag = {}));
//# sourceMappingURL=DragProcessor.js.map