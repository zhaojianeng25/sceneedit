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
var LayaPan3D;
(function (LayaPan3D) {
    var Scene_data = Pan3d.me.Scene_data;
    var MaterialRoleSprite = left.MaterialRoleSprite;
    var ModelSprite = maineditor.ModelSprite;
    var SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    var LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    var EdItorSceneManager = maineditor.EdItorSceneManager;
    var Laya3dSprite = /** @class */ (function (_super) {
        __extends(Laya3dSprite, _super);
        function Laya3dSprite(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this) || this;
            _this.initScene();
            Laya.loader.load(value, Laya.Handler.create(_this, function (aa) {
                _this.texture = aa;
                _this.texture.bitmap.enableMerageInAtlas = false;
                _this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
                _this.width = _this.texture.width;
                _this.height = _this.texture.height;
                _this.resizeRect();
                bfun && bfun();
            }));
            _this.frameLoop(1, _this, _this.upData);
            return _this;
        }
        Laya3dSprite.prototype.scale = function (scaleX, scaleY, speedMode) {
            if (speedMode === void 0) { speedMode = null; }
            var sp = _super.prototype.scale.call(this, scaleX, scaleY, speedMode);
            this.resizeRect();
            return sp;
        };
        Laya3dSprite.prototype.resizeRect = function () {
            if (this.texture) {
                var tw = this.scaleX * this.width;
                var th = this.scaleY * this.height;
                this.sceneManager.cam3D.cavanRect.width = tw;
                this.sceneManager.cam3D.cavanRect.height = th;
            }
        };
        Laya3dSprite.prototype.initScene = function () {
            Pan3d.me.ProgrmaManager.getInstance().registe(Pan3d.me.LineDisplayShader.LineShader, new Pan3d.me.LineDisplayShader);
            this.sceneManager = new EdItorSceneManager();
            var temp = new Pan3d.me.GridLineSprite();
            this.sceneManager.addDisplay(temp);
            this.sceneManager.addDisplay(new Pan3d.me.BaseDiplay3dSprite());
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Pan3d.me.Camera3D();
            this.sceneManager.cam3D.cavanRect = new Pan3d.me.Rectangle(0, 0, 512, 512);
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
        };
        Laya3dSprite.prototype.addDisplay = function () {
            var prefabSprite = new ModelSprite();
            prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
            prefabSprite.scale = 2;
            prefabSprite.x = -100;
            this.sceneManager.addDisplay(prefabSprite);
        };
        Laya3dSprite.prototype.addRole = function () {
            var roleSprite = new MaterialRoleSprite();
            //   roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
            roleSprite.setRoleZwwUrl("pefab/上杉谦信/ssqx.zzw");
            // roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
            roleSprite.scale = 0.5;
            roleSprite.x = 50;
            this.sceneManager.addMovieDisplay(roleSprite);
        };
        //
        Laya3dSprite.prototype.addSkillRole = function () {
            var skillsprite = new SkillSpriteDisplay();
            skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill");
            skillsprite.x = -30;
            this.sceneManager.addDisplay(skillsprite);
        };
        Laya3dSprite.prototype.addLyfSprite = function () {
            var lyfSprite = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
            lyfSprite.y = 100;
            this.sceneManager.addDisplay(lyfSprite);
        };
        Laya3dSprite.prototype.saveBasePrarame = function () {
            var gl = Scene_data.context3D.renderContext;
            this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            this.program = gl.getParameter(gl.CURRENT_PROGRAM);
            this.sFactor = gl.getParameter(gl.BLEND_SRC_RGB);
            this.dFactor = gl.getParameter(gl.BLEND_DST_RGB);
            this.depthWriteMask = gl.getParameter(gl.DEPTH_WRITEMASK);
            this.cullFaceModel = gl.getParameter(gl.CULL_FACE_MODE);
        };
        Laya3dSprite.prototype.resetBasePrarame = function () {
            var gl = Scene_data.context3D.renderContext;
            gl.useProgram(this.program); //着色器
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer); //定点对象
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
            gl.blendFunc(this.sFactor, this.dFactor); //混合模式
            gl.depthMask(this.depthWriteMask); //写入深度
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.cullFaceModel); //正反面
            Scene_data.context3D.setBlendParticleFactors(-1);
            Scene_data.context3D.setDepthTest(false);
            Scene_data.context3D.cullFaceBack(true);
            Laya.BaseShader.activeShader = null;
            Laya.BaseShader.bindShader = null;
        };
        Laya3dSprite.prototype.upData = function () {
            if (this.sceneManager && this.parent) {
                this.saveBasePrarame();
                if (this.sceneManager.fbo && this.texture && this.texture.bitmap) {
                    this.texture.bitmap._source = this.sceneManager.fbo.texture;
                }
                this.renderToTexture();
                this.resetBasePrarame();
            }
        };
        Laya3dSprite.prototype.renderToTexture = function () {
            this.sceneManager.renderToTexture();
        };
        return Laya3dSprite;
    }(Laya.Image));
    LayaPan3D.Laya3dSprite = Laya3dSprite;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=Laya3dSprite.js.map