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
var game;
(function (game) {
    var shader;
    (function (shader) {
        var WebGLContext = laya.webgl.WebGLContext;
        var Value2D = laya.webgl.shader.d2.value.Value2D;
        var CONST3D2D = laya.webgl.utils.CONST3D2D;
        /**
         * 着色器的变量定义。
         */
        var WaterShaderValue = /** @class */ (function (_super) {
            __extends(WaterShaderValue, _super);
            function WaterShaderValue() {
                var _this = _super.call(this, 0, 0) || this;
                _this.water_movexy = [0, 0];
                var _vlen = 6 * CONST3D2D.BYTES_PE;
                //定点数据格式描述：[属性长度, 属性类型,false, 属性起始位置索引 * CONST3D2D.BYTES_PE];
                _this.position = [2, WebGLContext.FLOAT, false, _vlen, 0];
                _this.uv = [2, WebGLContext.FLOAT, false, _vlen, 2 * CONST3D2D.BYTES_PE];
                _this.water_uv = [2, WebGLContext.FLOAT, false, _vlen, 4 * CONST3D2D.BYTES_PE];
                return _this;
            }
            return WaterShaderValue;
        }(Value2D));
        shader.WaterShaderValue = WaterShaderValue;
    })(shader = game.shader || (game.shader = {}));
})(game || (game = {}));
//# sourceMappingURL=WaterShaderValue.js.map