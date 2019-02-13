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
var rightmenu;
(function (rightmenu) {
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var Vector2D = Pan3d.Vector2D;
    var UIManager = Pan3d.UIManager;
    var UIData = Pan3d.UIData;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIAtlas = Pan3d.UIAtlas;
    var Panel = layout.Panel;
    var RightMenuEvent = /** @class */ (function (_super) {
        __extends(RightMenuEvent, _super);
        function RightMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightMenuEvent.INIT_RIGHT_MENU = "INIT_RIGHT_MENU";
        RightMenuEvent.SHOW_RIGHT_MENU = "SHOW_RIGHT_MENU";
        RightMenuEvent.HIDE_RIGHT_MENU = "HIDE_RIGHT_MENU";
        RightMenuEvent.SHOW_COMBOX_MENU = "SHOW_COMBOX_MENU";
        return RightMenuEvent;
    }(BaseEvent));
    rightmenu.RightMenuEvent = RightMenuEvent;
    var RightMenuModule = /** @class */ (function (_super) {
        __extends(RightMenuModule, _super);
        function RightMenuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightMenuModule.prototype.getModuleName = function () {
            return "RightMenuModule";
        };
        RightMenuModule.prototype.listProcessors = function () {
            return [new RightMenuProcessor()];
        };
        return RightMenuModule;
    }(Module));
    rightmenu.RightMenuModule = RightMenuModule;
    var RightMenuProcessor = /** @class */ (function (_super) {
        __extends(RightMenuProcessor, _super);
        function RightMenuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RightMenuProcessor.prototype.getName = function () {
            return "RightMenuProcessor";
        };
        RightMenuProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof RightMenuEvent) {
                var $materialEvent = $event;
                if ($materialEvent.type == RightMenuEvent.INIT_RIGHT_MENU) {
                    this.addEvents();
                }
                if ($materialEvent.type == RightMenuEvent.SHOW_RIGHT_MENU) {
                    this.showMenuPanel($materialEvent.posv2d);
                }
                if ($materialEvent.type == RightMenuEvent.HIDE_RIGHT_MENU) {
                    if (this._rightMenuPanel) {
                        Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
                        this.removeUIContainer(this._rightMenuPanel);
                    }
                }
                if ($materialEvent.type == RightMenuEvent.SHOW_COMBOX_MENU) {
                    this.showComboBoxMenuPanel($materialEvent);
                }
            }
        };
        RightMenuProcessor.prototype.addEvents = function () {
            document.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                var $rightMenuEvet = new RightMenuEvent(RightMenuEvent.SHOW_RIGHT_MENU);
                $rightMenuEvet.posv2d = new Vector2D(event.clientX, event.clientY);
                ModuleEventManager.dispatchEvent($rightMenuEvet);
            });
            rightmenu.ComboBoxMenuPanel.baseUIAtlas = new UIAtlas();
            rightmenu.ComboBoxMenuPanel.baseUIAtlas.setInfo("ui/rightmenu/rightmenu.txt", "ui/rightmenu/rightmenu.png", function () {
            });
        };
        RightMenuProcessor.prototype.showComboBoxMenuPanel = function (evt) {
            if (!this._comboBoxMenuPanel) {
                this._comboBoxMenuPanel = new rightmenu.ComboBoxMenuPanel();
            }
            var posv2d = evt.posv2d;
            this._comboBoxMenuPanel.left = posv2d.x / UIData.Scale;
            this._comboBoxMenuPanel.top = posv2d.y / UIData.Scale;
            this._comboBoxMenuPanel.showComboBoxList(evt.comboxData, evt.comboxFun);
            UIManager.getInstance().addUIContainer(this._comboBoxMenuPanel);
        };
        RightMenuProcessor.prototype.showMenuPanel = function (posv2d) {
            if (!this._rightMenuPanel) {
                this._rightMenuPanel = new rightmenu.RightMenuPanel();
            }
            this._rightMenuPanel.left = posv2d.x / UIData.Scale;
            this._rightMenuPanel.top = posv2d.y / UIData.Scale;
            this.addUIContainer(this._rightMenuPanel);
            this._rightMenuPanel.refrish();
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
        };
        RightMenuProcessor.prototype.addUIContainer = function (value) {
            //  UIManager.getInstance().addUIContainer(value);
            if (!this.topMenuPanel) {
                this.topMenuPanel = new Panel(false);
                this.topMenuPanel.x = 0;
                this.topMenuPanel.y = 0;
                this.topMenuPanel.width = 450;
                this.topMenuPanel.height = 250;
                layout.LayerManager.getInstance().addPanel(this.topMenuPanel);
            }
            this.topMenuPanel.addUIContainer(value);
        };
        RightMenuProcessor.prototype.removeUIContainer = function (value) {
            if (this.topMenuPanel) {
                this.topMenuPanel.removeUIContainer(value);
            }
        };
        RightMenuProcessor.prototype.onMouseDown = function ($evt) {
            Pan3d.TimeUtil.addTimeOut(10, function () {
                ModuleEventManager.dispatchEvent(new RightMenuEvent(RightMenuEvent.HIDE_RIGHT_MENU));
            });
        };
        RightMenuProcessor.prototype.listenModuleEvents = function () {
            return [
                new RightMenuEvent(RightMenuEvent.INIT_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.SHOW_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.HIDE_RIGHT_MENU),
                new RightMenuEvent(RightMenuEvent.SHOW_COMBOX_MENU),
            ];
        };
        return RightMenuProcessor;
    }(BaseProcessor));
    rightmenu.RightMenuProcessor = RightMenuProcessor;
})(rightmenu || (rightmenu = {}));
//# sourceMappingURL=RightMenuProcessor.js.map