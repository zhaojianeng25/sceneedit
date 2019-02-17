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
var maineditor;
(function (maineditor) {
    var SceneManager = Pan3d.SceneManager;
    var Scene_data = Pan3d.Scene_data;
    var TimeUtil = Pan3d.TimeUtil;
    var FBO = Pan3d.FBO;
    var Engine = Pan3d.Engine;
    var EdItorSceneManager = /** @class */ (function (_super) {
        __extends(EdItorSceneManager, _super);
        function EdItorSceneManager() {
            var _this = _super.call(this) || this;
            _this.fw = 1024;
            _this.fh = 1024;
            return _this;
        }
        EdItorSceneManager.prototype.getFBO = function () {
            this.renderContext = Scene_data.context3D.renderContext;
            var gl = Scene_data.context3D.renderContext;
            var fbo = new FBO();
            fbo.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, fbo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.fw, this.fh, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            fbo.frameBuffer = gl.createFramebuffer();
            fbo.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, fbo.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.fw, this.fh);
            return fbo;
        };
        EdItorSceneManager.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            this.renderContext.viewport(0, 0, this.fw, this.fh);
            this.renderContext.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            this.renderContext.clearDepth(1.0);
            this.renderContext.clearStencil(0.0);
            this.renderContext.enable(this.renderContext.DEPTH_TEST);
            this.renderContext.depthMask(true);
            this.renderContext.enable(this.renderContext.BLEND);
            this.renderContext.frontFace(this.renderContext.CW);
            this.renderContext.clear(this.renderContext.COLOR_BUFFER_BIT | this.renderContext.DEPTH_BUFFER_BIT | this.renderContext.STENCIL_BUFFER_BIT);
        };
        EdItorSceneManager.prototype.renderToTexture = function () {
            if (!this.fbo) {
                this.fbo = this.getFBO();
            }
            this.viewMatrx3D.identity();
            this.viewMatrx3D.perspectiveFieldOfViewLH(Engine.sceneCamScale, 1, 1, 2000);
            this.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
            this.updateDepthTexture(this.fbo);
            this.update();
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.bindTexture(gl.TEXTURE_2D, null);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            Engine.resetSize();
            if (this.fbo && this.textureRes) {
                this.textureRes.texture = this.fbo.texture;
            }
        };
        EdItorSceneManager.prototype.update = function () {
            var lastCam3D = Scene_data.cam3D;
            var lastfocus3D = Scene_data.focus3D;
            var lastViewMatrx3D = Scene_data.viewMatrx3D.clone();
            Scene_data.cam3D = this.cam3D;
            Scene_data.focus3D = this.focus3D;
            Scene_data.viewMatrx3D = this.viewMatrx3D;
            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = TimeUtil.getTimer();
            }
            if (this._ready) {
                Scene_data.context3D.cullFaceBack(true);
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.setDepthTest(true);
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                this.updateMovieDisplay();
                Scene_data.context3D.setWriteDepth(false);
            }
            Scene_data.cam3D = lastCam3D;
            Scene_data.focus3D = lastfocus3D;
            Scene_data.viewMatrx3D = lastViewMatrx3D;
        };
        return EdItorSceneManager;
    }(SceneManager));
    maineditor.EdItorSceneManager = EdItorSceneManager;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=EdItorSceneManager.js.map