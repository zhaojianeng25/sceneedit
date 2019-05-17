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
        var TreeShader = /** @class */ (function (_super) {
            __extends(TreeShader, _super);
            function TreeShader() {
                var _this = this;
                var vs = "attribute vec2 position;" +
                    "attribute vec2 uv;" +
                    "uniform vec2 size;" +
                    "uniform mat4 mmat;" +
                    "varying vec2 v_uv;" +
                    "void main(){" +
                    "    vec4 pos =mmat*vec4(position.x,position.y,0,1);" +
                    "    gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);" +
                    "    v_uv = uv;" +
                    "}";
                var ps = "precision mediump float;" +
                    "varying vec2 v_uv;" +
                    "uniform sampler2D texture;" +
                    "uniform vec2 tree_root;" +
                    "uniform vec2 tree_movexy;" +
                    "void main(){" +
                    // "	if(v_uv.x > tree_root.x && v_uv.y > tree_root.y){"+
                    // "		t_color.rgba = vec4(0,0,0,1.0);"+
                    // "	}"+
                    "	vec2 dist = tree_root - v_uv;" +
                    "	dist = vec2((dist.x*dist.x + dist.y*dist.y) * tree_movexy.x, 0);" +
                    "   vec4 t_color = texture2D(texture, vec2(v_uv + dist.xy));" +
                    "	" +
                    "   gl_FragColor = t_color.rgba;" +
                    "}";
                _this = _super.call(this, vs, ps, "TreeShader") || this;
                return _this;
            }
            /**
             * 当前着色器的一个实例对象。
             */
            TreeShader.shader = new TreeShader();
            return TreeShader;
        }(Shader));
        shader.TreeShader = TreeShader;
    })(shader = game.shader || (game.shader = {}));
})(game || (game = {}));
//# sourceMappingURL=TreeShader.js.map