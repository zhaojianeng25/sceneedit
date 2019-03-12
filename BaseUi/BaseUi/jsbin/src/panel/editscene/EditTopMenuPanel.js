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
var topMenu;
(function (topMenu) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextAlign = Pan3d.TextAlign;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var TextureManager = Pan3d.TextureManager;
    var Rectangle = Pan3d.Rectangle;
    var UIAtlas = Pan3d.UIAtlas;
    var Scene_data = Pan3d.Scene_data;
    var Dis2DUIContianerPanel = Pan3d.Dis2DUIContianerPanel;
    var MenuListData = /** @class */ (function () {
        function MenuListData($label, $key) {
            if ($key === void 0) { $key = null; }
            this.select = false;
            this.label = $label;
            this.key = $key;
        }
        return MenuListData;
    }());
    topMenu.MenuListData = MenuListData;
    var LabelTxtVo = /** @class */ (function (_super) {
        __extends(LabelTxtVo, _super);
        function LabelTxtVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LabelTxtVo.prototype.makeData = function () {
            if (this.data) {
                var $menuListData = this.data;
                var $uiRec = this.parent.uiAtlas.getRec(this.textureStr);
                this.parent.uiAtlas.ctx = UIManager.getInstance().getContext2D($uiRec.pixelWitdh, $uiRec.pixelHeight, false);
                this.parent.uiAtlas.ctx.clearRect(0, 1, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                var colorBg = $menuListData.select ? "#6c6c6c" : "#555555";
                var colorFont = $menuListData.select ? "[ffffff]" : "[9c9c9c]";
                this.parent.uiAtlas.ctx.fillStyle = colorBg; // text color
                this.parent.uiAtlas.ctx.fillRect(0, 0, $uiRec.pixelWitdh, $uiRec.pixelHeight);
                LabelTextFont.writeSingleLabelToCtx(this.parent.uiAtlas.ctx, colorFont + $menuListData.label, 12, 5, 5, TextAlign.LEFT);
                TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, $uiRec.pixelX, $uiRec.pixelY, this.parent.uiAtlas.ctx);
            }
        };
        return LabelTxtVo;
    }(Disp2DBaseText));
    topMenu.LabelTxtVo = LabelTxtVo;
    var EditTopMenuPanel = /** @class */ (function (_super) {
        __extends(EditTopMenuPanel, _super);
        function EditTopMenuPanel() {
            var _this = _super.call(this, LabelTxtVo, new Rectangle(0, 0, 70, 20), 50) || this;
            _this._bottomRender = new UIRenderComponent();
            _this._bottomRender.uiAtlas = new UIAtlas();
            _this._bottomRender.uiAtlas.setInfo("ui/window/window.txt", "ui/window/window.png", function () { _this.loadConfigCom(); });
            _this.addRenderAt(_this._bottomRender, 0);
            return _this;
        }
        EditTopMenuPanel.prototype.loadConfigCom = function () {
            this.winBg = this.addChild(this._bottomRender.getComponent("b_tittle_bg"));
            this.uiLoadComplete = true;
            this.resize();
        };
        EditTopMenuPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.uiLoadComplete) {
                this.winBg.x = 0;
                this.winBg.y = 0;
                this.winBg.width = Scene_data.stageWidth;
                this.winBg.height = 20;
            }
        };
        EditTopMenuPanel.prototype.initMenuData = function (value) {
            this.clearAll();
            this.menuXmlItem = value.menuXmlItem;
            meshFunSon(this.menuXmlItem, 0);
            function meshFunSon(subMenu, level) {
                for (var i = 0; subMenu && i < subMenu.length; i++) {
                    subMenu[i].level = level;
                    meshFunSon(subMenu[i].subMenu, level + 1);
                }
            }
        };
        EditTopMenuPanel.prototype.cctv = function () {
            var _this = this;
            var temp = {};
            var menuA = new Array();
            menuA.push(this.getMenu0());
            menuA.push(this.getMenu1());
            menuA.push(new MenuListData("配置", "2"));
            menuA.push(new MenuListData("系统", "3"));
            temp.menuXmlItem = menuA;
            this.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            this.initMenuData(temp);
            this.showMainUi();
        };
        EditTopMenuPanel.prototype.menuBfun = function (value, evt) {
            console.log(value.key);
            switch (value.key) {
                case "11":
                    ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.SAVE_SCENE_MAP_TO_SEVER));
                    break;
                case "4":
                    break;
                case "21":
                    break;
                default:
                    break;
            }
        };
        EditTopMenuPanel.prototype.getMenu0 = function () {
            var $vo = new MenuListData("菜单", "1");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("保存场景", "11"));
            $vo.subMenu.push(new MenuListData("SUB", "12"));
            return $vo;
        };
        EditTopMenuPanel.prototype.getMenu1 = function () {
            var $vo = new MenuListData("编辑", "2");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("eeee", "21"));
            return $vo;
        };
        EditTopMenuPanel.prototype.showMainUi = function () {
            this.clearAll();
            Pan3d.Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Up, this.onStageMouseUp, this);
            this.showSon(this.menuXmlItem, 20, 0);
        };
        EditTopMenuPanel.prototype.onStageMouseUp = function (evt) {
            //this.clearAll();
        };
        EditTopMenuPanel.prototype.showTempMenu = function ($data, i, tx, ty) {
            var temp = _super.prototype.showTemp.call(this, $data);
            console.log($data.level);
            if ($data.level == 0) {
                temp.ui.x = i * 70;
                temp.ui.y = 0;
            }
            else {
                temp.ui.x = tx;
                temp.ui.y = i * 20 + ty;
            }
            temp.ui.addEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.addEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            return temp;
        };
        //清理单元内的内容并需要将对象移出显示队例
        EditTopMenuPanel.prototype.clearTemp = function ($data) {
            var temp = this.getVoByData($data);
            temp.ui.removeEventListener(InteractiveEvent.Move, this.butMove, this);
            temp.ui.removeEventListener(InteractiveEvent.Down, this.onMouseUp, this);
            _super.prototype.clearTemp.call(this, $data);
        };
        EditTopMenuPanel.prototype.setColorByLevel = function (value) {
            for (var i = 0; i < this._uiItem.length; i++) {
                var menuListData = this._uiItem[i].data;
                if (menuListData && menuListData.level == value) {
                    menuListData.select = false;
                    this._uiItem[i].makeData();
                }
            }
        };
        EditTopMenuPanel.prototype.removeOtherSonMenu = function (level) {
            for (var i = this._uiItem.length - 1; i >= 0; i--) {
                var $menuListData = this._uiItem[i].data;
                if ($menuListData && $menuListData.level > level) {
                    this.clearTemp($menuListData);
                }
            }
        };
        EditTopMenuPanel.prototype.butMove = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.data) {
                var menuListData = temp.data;
                this.setColorByLevel(menuListData.level);
                this.removeOtherSonMenu(menuListData.level);
                menuListData.select = true;
                temp.makeData();
                this.showSon(menuListData.subMenu, temp.ui.x, temp.ui.y + temp.ui.height);
            }
        };
        EditTopMenuPanel.prototype.onMouseUp = function (evt) {
            var temp = this.getVoByUi(evt.target);
            if (temp && temp.data) {
                this.bfun(temp.data, evt);
                this.removeOtherSonMenu(0);
            }
        };
        EditTopMenuPanel.prototype.showSon = function (subMenu, tx, ty) {
            for (var i = 0; subMenu && i < subMenu.length; i++) {
                var labelTxtVo = this.getVoByData(subMenu[i]);
                if (!labelTxtVo) {
                    this.showTempMenu(subMenu[i], i, tx, ty);
                }
            }
        };
        return EditTopMenuPanel;
    }(Dis2DUIContianerPanel));
    topMenu.EditTopMenuPanel = EditTopMenuPanel;
})(topMenu || (topMenu = {}));
//# sourceMappingURL=EditTopMenuPanel.js.map