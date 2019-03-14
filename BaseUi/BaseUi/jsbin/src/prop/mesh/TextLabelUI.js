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
    var LabelTextFont = Pan3d.LabelTextFont;
    var EventDispatcher = Pan3d.EventDispatcher;
    var UIManager = Pan3d.UIManager;
    var TextAlign = Pan3d.TextAlign;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    var TextureManager = Pan3d.TextureManager;
    var TextureContext = /** @class */ (function (_super) {
        __extends(TextureContext, _super);
        function TextureContext(w, h) {
            var _this = _super.call(this) || this;
            _this.tempUiName = "tempui";
            _this._bRender = new UIRenderComponent();
            _this.addRender(_this._bRender);
            _this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas = _this._bRender.uiAtlas;
            $uiAtlas.configData = [];
            $uiAtlas.configData.push($uiAtlas.getObject(_this.tempUiName, 0, 0, w, h, w, h));
            _this.ui = _this._bRender.creatBaseComponent(_this.tempUiName);
            _this.ui.width = w;
            _this.ui.height = h;
            _this.addChild(_this.ui);
            _this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(w, h, false);
            _this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(_this._bRender.uiAtlas.ctx);
            return _this;
            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);
        }
        return TextureContext;
    }(UIConatiner));
    prop.TextureContext = TextureContext;
    var BaseMeshUi = /** @class */ (function (_super) {
        __extends(BaseMeshUi, _super);
        function BaseMeshUi(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            var _this = _super.call(this) || this;
            _this._x = 0;
            _this._y = 0;
            _this.textureContext = new TextureContext(w, h);
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
        function TextLabelUI(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            var _this = _super.call(this, w, h) || this;
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
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 14, TextAlign.LEFT, "#ffffff", "#27262e", 1);
            },
            enumerable: true,
            configurable: true
        });
        return TextLabelUI;
    }(BaseMeshUi));
    prop.TextLabelUI = TextLabelUI;
})(prop || (prop = {}));
//# sourceMappingURL=TextLabelUI.js.map