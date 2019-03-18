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
    var MathClass = Pan3d.MathClass;
    var FBO = Pan3d.FBO;
    var Engine = Pan3d.Engine;
    var EdItorSceneManager = /** @class */ (function (_super) {
        __extends(EdItorSceneManager, _super);
        function EdItorSceneManager() {
            return _super.call(this) || this;
        }
        //  private renderContext: WebGLRenderingContext;
        EdItorSceneManager.prototype.updateDepthTexture = function (fbo) {
            var gl = Scene_data.context3D.renderContext;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo.frameBuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbo.texture, 0);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, fbo.depthBuffer);
            gl.viewport(0, 0, fbo.width, fbo.height);
            gl.clearColor(20 / 255, 20 / 255, 20 / 255, 1.0);
            gl.clearDepth(1.0);
            gl.clearStencil(0.0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthMask(true);
            gl.enable(gl.BLEND);
            gl.frontFace(gl.CW);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        };
        EdItorSceneManager.prototype.renderToTexture = function () {
            if (!this.fbo) {
                this.fbo = new FBO;
            }
            else {
                this.fbo.resetSize(this.cam3D.cavanRect.width, this.cam3D.cavanRect.height);
            }
            this.viewMatrx3D.identity();
            this.viewMatrx3D.perspectiveFieldOfViewLH(0.8, 1, 1, 2000);
            this.viewMatrx3D.appendScale(1, this.cam3D.cavanRect.width / this.cam3D.cavanRect.height, 1);
            var sceneViewHW = 400 / this.cam3D.cavanRect.width;
            this.viewMatrx3D.appendScale(sceneViewHW, sceneViewHW, 1);
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
            MathClass.updateVp();
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