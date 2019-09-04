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
var depth;
(function (depth) {
    var Scene_data = Pan3d.Scene_data;
    var GlReset = Pan3d.GlReset;
    var RectSprite = RectSp.RectSprite;
    var MarFBO = /** @class */ (function (_super) {
        __extends(MarFBO, _super);
        function MarFBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return MarFBO;
    }(Pan3d.FBO));
    depth.MarFBO = MarFBO;
    var DepthToFbo = /** @class */ (function () {
        function DepthToFbo() {
            this.depthFBO = new MarFBO(256, 256);
            this.depthFBO.color = new Vector3D(1.0, 0.0, 1.0, 1.0);
            var gl = Scene_data.context3D.renderContext;
            this.depthFBO.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this.depthFBO.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.depthFBO.width, this.depthFBO.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            this.makeDepthTexture();
            this.depthFBO.frameBuffer = gl.createFramebuffer();
            this.depthFBO.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthFBO.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.depthFBO.width, this.depthFBO.height);
        }
        DepthToFbo.prototype.makeDepthTexture = function () {
            //深度贴图
            var gl = Scene_data.context3D.renderContext;
            var depthTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, this.depthFBO.width, this.depthFBO.height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.depthFBO.depthTexture = depthTexture;
        };
        DepthToFbo.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
                alert("错误配置");
            }
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(fbo.color.x, fbo.color.y, fbo.color.z, fbo.color.w);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.depthMask(true);
            gl.enable(gl.DEPTH_TEST);
            gl.disable(gl.BLEND); //不用混合模式
            gl.disable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.frontFace(gl.CCW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        };
        DepthToFbo.prototype.drawTempMode = function () {
            if (this.depthRectSprite) {
                this.depthRectSprite.update();
            }
            else {
                this.depthRectSprite = new depth.DepthRectSprite();
            }
        };
        DepthToFbo.prototype.update = function (value) {
            this.depthFBO.color = new Vector3D(Math.random(), Math.random(), Math.random(), 1.0);
            var gl = Scene_data.context3D.renderContext;
            GlReset.saveBasePrarame(gl);
            this.updateDepthTexture(this.depthFBO);
            this.drawTempMode();
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            GlReset.resetBasePrarame(gl);
            for (var i = 0; i < value.sceneManager.displayList.length; i++) {
                var dis = value.sceneManager.displayList[i];
                if (dis instanceof RectSprite) {
                    var rectDis = dis;
                    rectDis._uvTextureRes.texture = this.depthFBO.texture;
                }
            }
        };
        return DepthToFbo;
    }());
    depth.DepthToFbo = DepthToFbo;
})(depth || (depth = {}));
//# sourceMappingURL=DepthToFbo.js.map