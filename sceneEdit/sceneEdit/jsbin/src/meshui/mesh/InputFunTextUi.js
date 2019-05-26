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
    var TextAlign = Pan3d.TextAlign;
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
                this.chatHtmlIArea.style.top = (this.textureContext.top + this.y - 5) + "px";
                this.chatHtmlIArea.style.width = this.width + "px";
            }
        };
        Object.defineProperty(InputFunTextUi.prototype, "text", {
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 26, TextAlign.LEFT, "#ffffff", "#27262e");
                this.makeHtmlArear();
                this.chatHtmlIArea.value = value;
            },
            enumerable: true,
            configurable: true
        });
        return InputFunTextUi;
    }(prop.BaseMeshUi));
    prop.InputFunTextUi = InputFunTextUi;
})(prop || (prop = {}));
//# sourceMappingURL=InputFunTextUi.js.map