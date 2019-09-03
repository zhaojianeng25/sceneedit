var mars3D;
(function (mars3D) {
    var ContentInit = /** @class */ (function () {
        function ContentInit() {
            var a = 800;
            var b = 512;
            this.domRoot = document.createElement("div");
            this.domRoot.style.width = a + "px";
            this.domRoot.style.height = b + "px";
            this.initCanvas(a, b);
        }
        ContentInit.prototype.initCanvas = function (a, b) {
            this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            this.canvas = document.createElement("canvas");
            this.pixelRatio = window.devicePixelRatio || 1;
            if (this.mobile) {
                var c = this.mobileFast ? 1.5 : 1;
                this.pixelRatio = this.pixelRatio > c ? c : this.pixelRatio;
            }
            else
                this.desktopSlow && (this.pixelRatio = 1);
            this.canvas.width = a * this.pixelRatio;
            this.canvas.height = b * this.pixelRatio;
            this.canvas.style.width = a + "px";
            this.canvas.style.height = b + "px";
            this.canvas.style.position = "absolute";
            this.domRoot.appendChild(this.canvas);
            this.initGL();
        };
        ContentInit.prototype.initGL = function () {
            var a = {
                alpha: true,
                depth: !1,
                stencil: !1,
                antialias: !1,
                premultipliedAlpha: true,
                preserveDrawingBuffer: !1
            }, a = this.gl = this.canvas.getContext("webgl", a) || this.canvas.getContext("experimental-webgl", a);
            this.canvas.addEventListener("webglcontextlost", function (a) {
                a.preventDefault();
            }
                .bind(this), !1);
            this.canvas.addEventListener("webglcontextrestored", function (a) {
                this.loadScene(this.sceneURL);
            }
                .bind(this), !1);
            a.ext = {
                textureAniso: a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic"),
                textureFloat: a.getExtension("OES_texture_float"),
                textureFloatLinear: a.getExtension("OES_texture_float_linear"),
                textureHalf: a.getExtension("OES_texture_half_float"),
                textureHalfLinear: a.getExtension("OES_texture_half_float_linear"),
                textureDepth: a.getExtension("WEBGL_depth_texture"),
                colorBufferFloat: a.getExtension("WEBGL_color_buffer_float"),
                colorBufferHalf: a.getExtension("EXT_color_buffer_half_float"),
                index32bit: a.getExtension("OES_element_index_uint"),
                loseContext: a.getExtension("WEBGL_lose_context"),
                derivatives: a.getExtension("OES_standard_derivatives"),
                renderInfo: a.getExtension("WEBGL_debug_renderer_info")
            };
            a.enable(a.DEPTH_TEST);
            this.makeDepthTexture();
        };
        ContentInit.prototype.makeDepthTexture = function () {
            //深度贴图
            var gl = this.gl;
            var depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            //  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.depthFBO.width, this.depthFBO.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            //   gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, 2048, 2048, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return depthTexture;
        };
        return ContentInit;
    }());
    mars3D.ContentInit = ContentInit;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=ContentInit.js.map