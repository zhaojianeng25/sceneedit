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
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var TextureManager = Pan3d.TextureManager;
    var UIManager = Pan3d.UIManager;
    var Rectangle = Pan3d.Rectangle;
    var InputFunTextUi = /** @class */ (function (_super) {
        __extends(InputFunTextUi, _super);
        function InputFunTextUi(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            var _this = _super.call(this, w, h) || this;
            _this.width = 100;
            _this.height = 100;
            return _this;
        }
        InputFunTextUi.prototype.initView = function () {
            this.makeHtmlArear();
            this.addEvets();
        };
        InputFunTextUi.prototype.destory = function () {
            document.body.removeChild(this.chatHtmlIArea);
            this.chatHtmlIArea = null;
            _super.prototype.destory.call(this);
        };
        InputFunTextUi.prototype.makeHtmlArear = function () {
            var _this = this;
            if (!this.chatHtmlIArea) {
                this.chatHtmlIArea = document.createElement("textarea");
                this.chatHtmlIArea.style.position = "absolute";
                this.chatHtmlIArea.style["z-index"] = 100;
                // this.chatHtmlIArea.style.background = "transparent"
                this.chatHtmlIArea.style.backgroundColor = "#bbbbbb";
                this.chatHtmlIArea.style.color = "#000000";
                document.body.appendChild(this.chatHtmlIArea);
                this.chatHtmlIArea.addEventListener("change", function (cevt) { _this.changeInputTxt(cevt); });
                this.chatHtmlIArea.style.left = 0 + "px";
                this.chatHtmlIArea.style.top = 0 + "px";
                var tw = 40;
                var th = 20;
                this.chatHtmlIArea.style.fontSize = String(12) + "px";
                this.chatHtmlIArea.style.width = String(tw) + "px";
                this.chatHtmlIArea.style.height = 'auto';
                this.chatHtmlIArea.style.height = 300 + "px";
                this.resize();
            }
        };
        InputFunTextUi.prototype.changeInputTxt = function (evt) {
            var $agalStr = this.chatHtmlIArea.value;
            console.log(this.chatHtmlIArea.scrollHeight);
            var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
            $reflectionEvet.data = $agalStr;
            //  this.dispatchEvent($reflectionEvet);
        };
        InputFunTextUi.prototype.resize = function () {
            _super.prototype.resize.call(this);
            if (this.chatHtmlIArea) {
                this.chatHtmlIArea.style.left = (this.textureContext.left + this.x - 10) + "px";
                this.chatHtmlIArea.style.top = (this.textureContext.top + this.y + 100) + "px";
                this.chatHtmlIArea.style.width = this.width + "px";
            }
        };
        Object.defineProperty(InputFunTextUi.prototype, "text", {
            set: function (value) {
                this.agalStr = value;
                this.makeHtmlArear();
                this.chatHtmlIArea.value = this.agalStr;
                this.drawUrlImgToUi(this.ui, "ui/materialmenu/meshfunui.png");
            },
            enumerable: true,
            configurable: true
        });
        InputFunTextUi.prototype.drawUrlImgToUi = function (ui, url) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileuiRoot + url, LoadManager.IMG_TYPE, function ($img) {
                _this.drawImgToUi(ui, $img);
            });
        };
        InputFunTextUi.prototype.drawTittleBg = function ($ctx, $img) {
            var s15 = 1.5;
            var A = new Rectangle(2, 2, 164, 24);
            // $ctx.drawImage($img, A.x, A.y, A.width, A.height, A.x * s15, A.y * s15, A.width * s15, A.height * s15);
            $ctx.drawImage($img, 2, 2, 24, 24, A.x * s15, A.y * s15, 24 * s15, A.height * s15);
            $ctx.drawImage($img, 2 + 24, 2, 164 - (2 * 24), 24, 24, A.y * s15, 200 * s15, A.height * s15);
            $ctx.drawImage($img, 164 - 24, 2, 24, 24, 200 * s15, A.y * s15, 24 * s15, A.height * s15);
            $ctx.font = "24px Georgia";
            $ctx.fillStyle = "#ffffff";
            $ctx.lineWidth = 0;
            $ctx.fillText("函数(" + materialui.NodeTreeFun.getMathFunName(this.agalStr) + ")", 20, 8);
        };
        InputFunTextUi.prototype.drawImgToUi = function (ui, $img) {
            var $UIAtlas = ui.uiRender.uiAtlas;
            var $textureStr = ui.skinName;
            var rec = $UIAtlas.getRec($textureStr);
            var $ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.drawTittleBg($ctx, $img);
            var s15 = 1.5;
            var arr = materialui.NodeTreeFun.getDataMathFunArr(this.agalStr);
            var outType = materialui.NodeTreeFun.getMathFunReturnType(this.agalStr);
            var B = new Rectangle(8, 30, 50, 50);
            $ctx.drawImage($img, B.x, B.y, B.width, B.height, 4, 35, (200 + (20)) * s15, arr.length * 30 + 30);
            $ctx.font = "24px Georgia";
            $ctx.fillStyle = "#ffffff";
            $ctx.lineWidth = 0;
            $ctx.font = "22px Georgia";
            var C = new Rectangle(177, 10, 16, 16);
            $ctx.drawImage($img, C.x, C.y, C.width, C.height, (200) * s15, 50, 16 * s15, 16 * s15);
            $ctx.fillText("out", (170) * s15, 50);
            for (var i = 0; i < arr.length; i++) {
                $ctx.drawImage($img, C.x, C.y, C.width, C.height, 15, i * 30 + 50, 16 * s15, 16 * s15);
                $ctx.fillText(arr[i].name, 50, i * 30 + 50);
            }
            TextureManager.getInstance().updateTexture($UIAtlas.texture, rec.pixelX, rec.pixelY, $ctx);
        };
        return InputFunTextUi;
    }(prop.BaseMeshUi));
    prop.InputFunTextUi = InputFunTextUi;
})(prop || (prop = {}));
//# sourceMappingURL=InputFunTextUi.js.map