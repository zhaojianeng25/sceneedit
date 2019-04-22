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
    var Scene_data = Pan3d.Scene_data;
    var MaterialRoleSprite = left.MaterialRoleSprite;
    var ModelSprite = maineditor.ModelSprite;
    var SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    var LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    var EdItorSceneManager = maineditor.EdItorSceneManager;
    var Laya3dSprite = /** @class */ (function (_super) {
        __extends(Laya3dSprite, _super);
        function Laya3dSprite(value) {
            var _this = _super.call(this) || this;
            Laya.loader.load(value, Laya.Handler.create(_this, function (aa) {
                _this.texture = aa;
                _this.texture.bitmap.enableMerageInAtlas = false;
                _this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
            }));
            _this.initScene();
            //  this.scale(1,-1)
            _this.scale(0.5, 0.5);
            return _this;
        }
        Laya3dSprite.prototype.initScene = function () {
            var _this = this;
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            this.sceneMaager = new EdItorSceneManager();
            var temp = new Pan3d.GridLineSprite();
            this.sceneMaager.addDisplay(temp);
            this.sceneMaager.addDisplay(new Pan3d.BaseDiplay3dSprite());
            this.sceneMaager.ready = true;
            this.sceneMaager.cam3D = new Pan3d.Camera3D();
            this.sceneMaager.cam3D.cavanRect = new Pan3d.Rectangle(0, 0, 512, 512);
            this.sceneMaager.cam3D.distance = 200;
            this.sceneMaager.focus3D.rotationY = random(360);
            this.sceneMaager.focus3D.rotationX = -45;
            this.frameLoop(1, this, function () {
                _this.sceneMaagerUpData();
            });
            this.addSceneModel();
        };
        Laya3dSprite.prototype.addSceneModel = function () {
            this.addDisplay();
            this.addRole();
            this.addSkillRole();
            //    this.addLyfSprite();
        };
        Laya3dSprite.prototype.addDisplay = function () {
            var prefabSprite = new ModelSprite();
            prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
            prefabSprite.scale = 2;
            prefabSprite.x = -100;
            this.sceneMaager.addDisplay(prefabSprite);
        };
        Laya3dSprite.prototype.addRole = function () {
            var roleSprite = new MaterialRoleSprite();
            // roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
            roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw");
            roleSprite.scale = 0.5;
            roleSprite.x = 50;
            this.sceneMaager.addMovieDisplay(roleSprite);
        };
        //
        Laya3dSprite.prototype.addSkillRole = function () {
            var skillsprite = new SkillSpriteDisplay();
            skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill");
            skillsprite.x = -30;
            this.sceneMaager.addDisplay(skillsprite);
        };
        Laya3dSprite.prototype.addLyfSprite = function () {
            var lyfSprite = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
            lyfSprite.y = 100;
            this.sceneMaager.addDisplay(lyfSprite);
        };
        Laya3dSprite.prototype.saveBasePrarame = function () {
            var gl = Scene_data.context3D.renderContext;
            this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            this.program = gl.getParameter(gl.CURRENT_PROGRAM);
            this.sFactor = gl.getParameter(gl.BLEND_SRC_RGB);
            this.dFactor = gl.getParameter(gl.BLEND_DST_RGB);
        };
        Laya3dSprite.prototype.resetBasePrarame = function () {
            var gl = Scene_data.context3D.renderContext;
            gl.useProgram(this.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
            gl.blendFunc(this.sFactor, this.dFactor);
            Scene_data.context3D.setBlendParticleFactors(-1);
            Scene_data.context3D.cullFaceBack(true);
            Laya.BaseShader.activeShader = null;
            Laya.BaseShader.bindShader = null;
        };
        Laya3dSprite.prototype.sceneMaagerUpData = function () {
            this.saveBasePrarame();
            this.sceneMaager.focus3D.rotationY++;
            Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            if (this.sceneMaager.fbo && this.texture && this.texture.bitmap) {
                this.texture.bitmap._source = this.sceneMaager.fbo.texture;
            }
            this.sceneMaager.renderToTexture();
            this.resetBasePrarame();
        };
        return Laya3dSprite;
    }(Laya.Image));
    LayaPan3D.Laya3dSprite = Laya3dSprite;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=Laya3dSprite.js.map