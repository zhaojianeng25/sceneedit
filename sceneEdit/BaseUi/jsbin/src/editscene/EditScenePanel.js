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
    var Panel = win.Panel;
    var LayoutbaseBg = win.LayoutbaseBg;
    var CentenPanel = /** @class */ (function (_super) {
        __extends(CentenPanel, _super);
        function CentenPanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CentenPanel.prototype.addUIContainer = function ($container) {
            //特殊处理，删除非底层背景
            for (var i = this._containerList.length - 1; i > 0; i--) {
                if (!(this._containerList[i] instanceof LayoutbaseBg)) {
                    this.removeUIContainer(this._containerList[i]);
                }
            }
            if ($container) {
                _super.prototype.addUIContainer.call(this, $container);
            }
        };
        CentenPanel.prototype.removeUIContainer = function ($container) {
            _super.prototype.removeUIContainer.call(this, $container);
        };
        return CentenPanel;
    }(Panel));
    editscene.CentenPanel = CentenPanel;
    var MainRightPanel = /** @class */ (function (_super) {
        __extends(MainRightPanel, _super);
        function MainRightPanel() {
            return _super.call(this) || this;
        }
        return MainRightPanel;
    }(win.BaseWindow));
    editscene.MainRightPanel = MainRightPanel;
    var EditScenePanel = /** @class */ (function (_super) {
        __extends(EditScenePanel, _super);
        function EditScenePanel() {
            var _this = _super.call(this, false) || this;
            _this.addCenten();
            _this.addRight();
            _this.addLeft();
            _this.addSceneLaoutLinePane();
            _this.addTop();
            _this.resize();
            return _this;
        }
        EditScenePanel.prototype.showofHide = function (panel) {
        };
        EditScenePanel.prototype.addSceneLaoutLinePane = function () {
            this._sceneLaoutLinePane = new editscene.EditSceneLine;
            this._sceneLaoutLinePane.x = 0;
            this._sceneLaoutLinePane.y = 0;
            this.addChild(this._sceneLaoutLinePane);
        };
        EditScenePanel.prototype.addCenten = function () {
            var temp = new CentenPanel(true);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 10;
            this.addChild(temp);
            AppData.centenPanel = temp;
        };
        EditScenePanel.prototype.addRight = function () {
            var temp = new Panel(true);
            temp.x = 600;
            temp.y = 0;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            //   var eee: MainRightPanel = new MainRightPanel();
            //   temp.addChild(eee)
            AppData.rightPanel = temp;
        };
        EditScenePanel.prototype.addTop = function () {
            var tempPanel = new Panel(false);
            tempPanel.x = 0;
            tempPanel.y = 0;
            tempPanel.width = 450;
            tempPanel.height = 30;
            this.addChild(tempPanel);
            AppData.topPanel = tempPanel;
        };
        EditScenePanel.prototype.addLeft = function () {
            var temp = new editscene.EditLeftPanel(true);
            temp.x = 0;
            temp.y = 50;
            temp.width = 450;
            temp.height = 500;
            this.addChild(temp);
            editscene.EditLeftPanel.leftPanel = temp;
        };
        return EditScenePanel;
    }(Panel));
    editscene.EditScenePanel = EditScenePanel;
})(editscene || (editscene = {}));
//# sourceMappingURL=EditScenePanel.js.map