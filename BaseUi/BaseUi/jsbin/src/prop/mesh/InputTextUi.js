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
    var Vector2D = Pan3d.Vector2D;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var Scene_data = Pan3d.Scene_data;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var InputTextUi = /** @class */ (function (_super) {
        __extends(InputTextUi, _super);
        function InputTextUi(w, h) {
            if (w === void 0) { w = 64; }
            if (h === void 0) { h = 64; }
            return _super.call(this, w, h) || this;
        }
        InputTextUi.prototype.initView = function () {
            this.addEvets();
        };
        Object.defineProperty(InputTextUi.prototype, "text", {
            set: function (value) {
                LabelTextFont.writeSingleLabel(this.ui.uiRender.uiAtlas, this.ui.skinName, value, 14, TextAlign.LEFT, "#ffffff", "#27262e");
            },
            enumerable: true,
            configurable: true
        });
        InputTextUi.prototype.butClik = function (evt) {
            console.log("clik");
            this.addStageMoveEvets(evt);
        };
        InputTextUi.prototype.addStageMoveEvets = function ($e) {
            this.mouseXY = new Vector2D($e.x, $e.y);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        InputTextUi.prototype.onMove = function ($e) {
            var $reflectionEvet = new prop.ReflectionEvet(prop.ReflectionEvet.CHANGE_DATA);
            $reflectionEvet.data = $e.x - this.mouseXY.x;
            this.dispatchEvent($reflectionEvet);
            this.mouseXY = new Vector2D($e.x, $e.y);
        };
        InputTextUi.prototype.onUp = function ($e) {
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.onMove, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onUp, this);
        };
        return InputTextUi;
    }(prop.TextLabelUI));
    prop.InputTextUi = InputTextUi;
})(prop || (prop = {}));
//# sourceMappingURL=InputTextUi.js.map