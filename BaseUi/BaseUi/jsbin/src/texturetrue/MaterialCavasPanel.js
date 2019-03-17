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
var materialui;
(function (materialui) {
    var Rectangle = Pan3d.Rectangle;
    var Scene_data = Pan3d.Scene_data;
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var UIConatiner = Pan3d.UIConatiner;
    var UIAtlas = Pan3d.UIAtlas;
    //ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
    var Vector3D = Pan3d.Vector3D;
    var TextureManager = Pan3d.TextureManager;
    var TextureContext = /** @class */ (function (_super) {
        __extends(TextureContext, _super);
        function TextureContext(w, h) {
            var _this = _super.call(this) || this;
            _this.tempUiName = "tempui";
            _this.uiViewScale = 0.5;
            w /= _this.uiViewScale;
            h /= _this.uiViewScale;
            _this._bRender = new UIRenderComponent();
            _this.addRender(_this._bRender);
            _this._bRender.uiAtlas = new UIAtlas();
            var $uiAtlas = _this._bRender.uiAtlas;
            $uiAtlas.configData = [];
            var kkwA = Math.pow(2, Math.ceil(Math.log(w) / Math.log(2)));
            var kkhB = Math.pow(2, Math.ceil(Math.log(h) / Math.log(2)));
            _this._bRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(kkwA, kkhB, false);
            _this._bRender.uiAtlas.textureRes = TextureManager.getInstance().getCanvasTexture(_this._bRender.uiAtlas.ctx);
            $uiAtlas.configData.push($uiAtlas.getObject(_this.tempUiName, 0, 0, w, h, kkwA, kkhB));
            _this.ui = _this._bRender.creatBaseComponent(_this.tempUiName);
            _this.ui.width = w * _this.uiViewScale;
            _this.ui.height = h * _this.uiViewScale;
            _this.addChild(_this.ui);
            return _this;
            //  this.ui.uiRender.uiAtlas.upDataPicToTexture("b.jpg", this.ui.skinName);
        }
        return TextureContext;
    }(UIConatiner));
    materialui.TextureContext = TextureContext;
    var MaterialCavasPanel = /** @class */ (function (_super) {
        __extends(MaterialCavasPanel, _super);
        function MaterialCavasPanel() {
            var _this = _super.call(this) || this;
            _this.lineItemA = [];
            _this.lineItemB = [];
            _this.setRect(new Rectangle(0, 0, Scene_data.stageWidth, Scene_data.stageHeight));
            _this.blakCavansRender = new UIRenderComponent();
            _this.addRender(_this.blakCavansRender);
            _this.blakCavansRender.uiAtlas = _this.makeBaseUiatlas(64, 64);
            _this.lineCavansRender = new UIRenderComponent();
            _this.addRender(_this.lineCavansRender);
            _this.lineCavansRender.uiAtlas = _this.makeBaseUiatlas(64, 64);
            var tempLine = _this.lineCavansRender.creatBaseComponent("temp_ui");
            _this.drawOutColor(tempLine, new Vector3D(53, 53, 53));
            for (var i = 0; i < 100; i++) {
                _this.lineItemA.push(_this.getTempLineUi());
                _this.lineItemB.push(_this.getTempLineUi());
            }
            return _this;
        }
        MaterialCavasPanel.prototype.getTempLineUi = function () {
            if (this.lineCavansRender.uiListLen >= 50) {
                var temp = new UIRenderComponent();
                this.addRender(temp);
                temp.uiAtlas = this.lineCavansRender.uiAtlas;
                this.lineCavansRender = temp;
            }
            var ui = this.addChild(this.lineCavansRender.creatBaseComponent("temp_ui"));
            return ui;
        };
        MaterialCavasPanel.prototype.drawOutColor = function (ui, $vcolor) {
            // var $vcolor: Vector3D = new Vector3D(1 * 255, 0,0);
            var $UIAtlas = ui.uiRender.uiAtlas;
            var $textureStr = ui.skinName;
            var rec = $UIAtlas.getRec($textureStr);
            var ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            var $imgData = ctx.getImageData(0, 0, rec.pixelWitdh, rec.pixelHeight);
            for (var i = 0; i < $imgData.data.length / 4; i++) {
                $imgData.data[i * 4 + 0] = $vcolor.x;
                $imgData.data[i * 4 + 1] = $vcolor.y;
                $imgData.data[i * 4 + 2] = $vcolor.z;
                $imgData.data[i * 4 + 3] = 255;
            }
            ctx.putImageData($imgData, 0, 0);
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, ctx);
        };
        MaterialCavasPanel.prototype.loadConfigCom = function () {
            _super.prototype.loadConfigCom.call(this);
            this.tempListBg = this.blakCavansRender.creatBaseComponent("temp_ui");
            this.addChild(this.tempListBg);
            this.tempListBg.x = 0;
            this.tempListBg.y = 0;
            this.tempListBg.width = Scene_data.stageWidth;
            this.tempListBg.height = Scene_data.stageHeight;
            this.drawOutColor(this.tempListBg, new Vector3D(42, 42, 42));
            this.resize();
        };
        MaterialCavasPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.tempListBg) {
                this.moveLineA();
                this.moveLineB();
            }
        };
        MaterialCavasPanel.prototype.moveLineA = function () {
            var speedNum = materialui.MtlUiData.Scale * 30;
            for (var i = 0; i < this.lineItemA.length; i++) {
                var $tempA = this.lineItemA[i];
                $tempA.x = 0;
                $tempA.y = i * speedNum + (BaseUiStart.stagePos.y * materialui.MtlUiData.Scale) % (speedNum);
                $tempA.width = Scene_data.stageWidth;
                $tempA.height = 2;
            }
        };
        MaterialCavasPanel.prototype.moveLineB = function () {
            var speedNum = materialui.MtlUiData.Scale * 30;
            for (var i = 0; i < this.lineItemB.length; i++) {
                var $tempB = this.lineItemB[i];
                $tempB.x = i * speedNum + (BaseUiStart.stagePos.x * materialui.MtlUiData.Scale) % (speedNum);
                $tempB.y = 0;
                $tempB.width = 2;
                $tempB.height = Scene_data.stageHeight;
            }
        };
        return MaterialCavasPanel;
    }(base.BaseWindow));
    materialui.MaterialCavasPanel = MaterialCavasPanel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialCavasPanel.js.map