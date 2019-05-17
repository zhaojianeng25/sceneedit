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
        var Shader = laya.webgl.shader.Shader;
        /**
         * 自定义着色器
         *
         */
        var WaterShader = /** @class */ (function (_super) {
            __extends(WaterShader, _super);
            function WaterShader() {
                var _this = this;
                var vs = "attribute vec2 position;" +
                    "attribute vec2 uv;" +
                    "attribute vec2 water_uv;" +
                    "uniform vec2 size;" +
                    "uniform mat4 mmat;" +
                    "varying vec2 v_uv;" +
                    "varying vec2 v_water_uv;" +
                    "void main(){" +
                    "    vec4 pos =mmat*vec4(position.x,position.y,0,1);" +
                    "    gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);" +
                    "    v_uv = uv;" +
                    "	 v_water_uv = water_uv;" +
                    "}";
                var ps = "precision mediump float;" +
                    "varying vec2 v_uv;" +
                    "varying vec2 v_water_uv;" +
                    "uniform sampler2D texture;" +
                    "uniform sampler2D water_sample;" +
                    "uniform mat4 water_mat4;" +
                    "uniform vec2 water_movexy;" +
                    "void main(){" +
                    "	vec2 scroll_uv = v_water_uv - water_movexy;" +
                    "	scroll_uv.y = mod(scroll_uv.y,1.0);" +
                    "	vec4 map_color = texture2D(water_sample, scroll_uv);" +
                    // "	gl_FragColor = map_color.rgba;"+
                    "	map_color.xy = map_color.xy - vec2(0.5,0.5);" +
                    "	map_color.xy = map_color.xy * map_color.ww;" +
                    "	vec4 offset = map_color * water_mat4;" +
                    "   vec4 t_color = texture2D(texture, vec2(v_uv + offset.xy));" +
                    "   gl_FragColor = t_color.rgba;" +
                    "}";
                _this = _super.call(this, vs, ps, "WaterShader") || this;
                return _this;
            }
            /**
             * 当前着色器的一个实例对象。
             */
            WaterShader.shader = new WaterShader();
            return WaterShader;
        }(Shader));
        shader.WaterShader = WaterShader;
    })(shader = game.shader || (game.shader = {}));
})(game || (game = {}));
//# sourceMappingURL=WaterShader.js.map