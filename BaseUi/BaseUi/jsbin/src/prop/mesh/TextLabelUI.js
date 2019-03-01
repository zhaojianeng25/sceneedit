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
var prop;
(function (prop) {
    var TextLabelUIMeshVo = /** @class */ (function (_super) {
        __extends(TextLabelUIMeshVo, _super);
        function TextLabelUIMeshVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(TextLabelUIMeshVo.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (value) {
                this._name = value;
                this.needDraw = true;
                this.labelWidth = 128;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextLabelUIMeshVo.prototype, "labelWidth", {
            get: function () {
                return this._labelWidth;
            },
            set: function (value) {
                this._labelWidth = value;
                this.needDraw = true;
            },
            enumerable: true,
            configurable: true
        });
        TextLabelUIMeshVo.prototype.destory = function () {
            this.pos = null;
            this._name = null;
            this.needDraw = null;
            this.clear = true;
        };
        return TextLabelUIMeshVo;
    }(Pan3d.baseMeshVo));
    var Disp2DBaseText = Pan3d.Disp2DBaseText;
    var LabelTextFont = Pan3d.LabelTextFont;
    var Matrix3D = Pan3d.Matrix3D;
    var EventDispatcher = Pan3d.EventDispatcher;
    var Rectangle = Pan3d.Rectangle;
    var TextAlign = Pan3d.TextAlign;
    var TextLabelUIDisp2D = /** @class */ (function (_super) {
        __extends(TextLabelUIDisp2D, _super);
        function TextLabelUIDisp2D() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.tempMatrix = new Matrix3D;
            return _this;
        }
        TextLabelUIDisp2D.prototype.makeData = function () {
            if (this._data) {
                this.labelNameMeshVo = this.data;
                if (this.lastKey != this.labelNameMeshVo.name) {
                    var bw = 256 * 0.5;
                    var bh = 30 * 0.5;
                    this.ui.width = bw;
                    this.ui.height = bh;
                    if (!TextLabelUIDisp2D.baseUitr) {
                        TextLabelUIDisp2D.baseUitr = new Rectangle(0, 0, this.ui.tr.width, this.ui.tr.height);
                    }
                    var xScale = this.labelNameMeshVo.labelWidth / bw;
                    this.ui.width = bw * xScale;
                    this.ui.tr.width = TextLabelUIDisp2D.baseUitr.width * xScale;
                    this.lastKey = this.labelNameMeshVo.name;
                    LabelTextFont.writeSingleLabel(this.parent.uiAtlas, this.textureStr, this.labelNameMeshVo.name, 30, TextAlign.LEFT, "#ffffff", "#27262e");
                }
                this.labelNameMeshVo.needDraw = false;
            }
        };
        TextLabelUIDisp2D.prototype.update = function () {
            if (this.labelNameMeshVo) {
                if (this.labelNameMeshVo.needDraw) {
                    this.makeData();
                }
                if (this.labelNameMeshVo.pos) {
                    if (this.labelNameMeshVo.visible) {
                        if (this.needUpData(this.labelNameMeshVo.pos) || this.labelNameMeshVo.visibleChange) {
                            this.ui.x = this.labelNameMeshVo.pos.x;
                            this.ui.y = this.labelNameMeshVo.pos.y;
                            this.oldPos.x = this.labelNameMeshVo.pos.x;
                            this.oldPos.y = this.labelNameMeshVo.pos.y;
                            this.labelNameMeshVo.visibleChange = false;
                        }
                    }
                    else {
                        this.ui.x = 10000;
                    }
                }
                if (this.labelNameMeshVo.clear) {
                    this.ui.parent.removeChild(this.ui);
                    this._data = null;
                }
            }
        };
        return TextLabelUIDisp2D;
    }(Disp2DBaseText));
    prop.TextLabelUIDisp2D = TextLabelUIDisp2D;
    var BaseMeshUi = /** @class */ (function (_super) {
        __extends(BaseMeshUi, _super);
        function BaseMeshUi() {
            var _this = _super.call(this) || this;
            _this._x = 0;
            _this._y = 0;
            _this.textureContext = new prop.TextureContext;
            prop.PropModel.getInstance().propPanle.addUIContainer(_this.textureContext);
            _this.ui = _this.textureContext.ui;
            return _this;
        }
        BaseMeshUi.prototype.destory = function () {
            prop.PropModel.getInstance().propPanle.removeUIContainer(this.textureContext);
        };
        BaseMeshUi.prototype.addEvets = function () {
            var $ui = this.ui;
            $ui.addEventListener(InteractiveEvent.Down, this.butClik, this);
        };
        BaseMeshUi.prototype.butClik = function (evt) {
        };
        BaseMeshUi.prototype.resize = function () {
            this.ui.x = this._x;
            this.ui.y = this._y;
        };
        Object.defineProperty(BaseMeshUi.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseMeshUi.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
                this.resize();
            },
            enumerable: true,
            configurable: true
        });
        return BaseMeshUi;
    }(EventDispatcher));
    prop.BaseMeshUi = BaseMeshUi;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var TextLabelUI = /** @class */ (function (_super) {
        __extends(TextLabelUI, _super);
        function TextLabelUI() {
            var _this = _super.call(this) || this;
            _this.initView();
            _this.resize();
            return _this;
        }
        TextLabelUI.prototype.initView = function () {
        };
        Object.defineProperty(TextLabelUI.prototype, "label", {
            get: function () {
                return "";
            },
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 30, TextAlign.LEFT, "#ffffff", "#27262e");
            },
            enumerable: true,
            configurable: true
        });
        return TextLabelUI;
    }(BaseMeshUi));
    prop.TextLabelUI = TextLabelUI;
})(prop || (prop = {}));
//# sourceMappingURL=TextLabelUI.js.map