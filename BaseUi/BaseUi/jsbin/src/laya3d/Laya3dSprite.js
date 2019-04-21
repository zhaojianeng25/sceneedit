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
var MeshData = Pan3d.MeshData;
var Laya3dRole = /** @class */ (function (_super) {
    __extends(Laya3dRole, _super);
    function Laya3dRole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Laya3dRole.prototype.setVaCompress = function ($mesh) {
        var tf = Scene_data.context3D.pushVa($mesh.vertexBuffer);
        if (tf) {
            ////console.log('cccccc')
            return;
        }
        console.log($mesh.uvsOffsets, $mesh.boneIDOffsets, $mesh.boneWeightOffsets);
        Scene_data.context3D.setVaOffset(0, 3, $mesh.stride, 0);
        Scene_data.context3D.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
        Scene_data.context3D.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
        Scene_data.context3D.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
        if ($mesh.material.useNormal) {
            // Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "rotationMatrix3D", this._rotationMatrix.m);
            Scene_data.context3D.setVaOffset(4, 3, $mesh.stride, $mesh.tangentsOffsets);
            Scene_data.context3D.setVaOffset(5, 3, $mesh.stride, $mesh.bitangentsOffsets);
            Scene_data.context3D.setVaOffset(6, 3, $mesh.stride, $mesh.normalsOffsets);
        }
    };
    Laya3dRole.prototype.updateMaterialMesh = function ($mesh) {
        if (!$mesh.material) {
            return;
        }
        Scene_data.context3D.setProgram($mesh.material.shader.program);
        Scene_data.context3D.cullFaceBack(false);
        Scene_data.context3D.setBlendParticleFactors($mesh.material.blendMode);
        this.setVcMatrix($mesh);
        this.setMaterialVc($mesh.material, $mesh.materialParam);
        this.setMaterialTexture($mesh.material, $mesh.materialParam);
        this.setVa($mesh);
        this.setDirectLight($mesh.material);
        this.setMeshVc($mesh);
        //$mesh.treNum=1600*2
        if ($mesh.treNum <= 312) {
        }
        else {
            Scene_data.context3D.drawCall($mesh.indexBuffer, $mesh.treNum);
        }
    };
    return Laya3dRole;
}(left.MaterialRoleSprite));
var Laya3dSprite = /** @class */ (function (_super) {
    __extends(Laya3dSprite, _super);
    function Laya3dSprite(value) {
        var _this = _super.call(this) || this;
        Laya.loader.load(value, Laya.Handler.create(_this, function (aa) {
            _this.texture = aa;
            aa.bitmap.enableMerageInAtlas = false;
            _this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
            _this.initScene();
        }));
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
        this.addDisplay();
        this.addRole();
        //   this.addSkillRole()
        //  this.addLyfSprite()
    };
    Laya3dSprite.prototype.addDisplay = function () {
        var prefabSprite = new maineditor.ModelSprite();
        prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
        prefabSprite.scale = 2;
        this.sceneMaager.addDisplay(prefabSprite);
    };
    Laya3dSprite.prototype.addRole = function () {
        var roleSprite = new Laya3dRole();
        roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw");
        //  roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
        roleSprite.scale = 0.5;
        roleSprite.x = 60;
        this.sceneMaager.addMovieDisplay(roleSprite);
    };
    //
    Laya3dSprite.prototype.addSkillRole = function () {
        var skillsprite = new maineditor.SkillSpriteDisplay();
        skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill");
        this.sceneMaager.addDisplay(skillsprite);
    };
    Laya3dSprite.prototype.addLyfSprite = function () {
        var lyfSprite = new maineditor.LyfSpriteDisplay();
        lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
        lyfSprite.y = 60;
        this.sceneMaager.addDisplay(lyfSprite);
    };
    Laya3dSprite.prototype.saveBasePrarame = function () {
        var gl = Scene_data.context3D.renderContext;
        this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
        this.program = gl.getParameter(gl.CURRENT_PROGRAM);
    };
    Laya3dSprite.prototype.resetBasePrarame = function () {
        var gl = Scene_data.context3D.renderContext;
        if (this.arrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
        }
        if (this.elementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
        }
        if (this.program) {
            gl.useProgram(this.program);
        }
        Scene_data.context3D.setCullFaceModel(2);
    };
    Laya3dSprite.prototype.sceneMaagerUpData = function () {
        this.sceneMaager.focus3D.rotationY++;
        Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        this.saveBasePrarame();
        var gl = Scene_data.context3D.renderContext;
        if (this.sceneMaager.fbo) {
            this.sceneMaager.fbo.texture = this.texture.source;
        }
        this.sceneMaager.renderToTexture();
        this.resetBasePrarame();
        Laya.BaseShader.activeShader = null;
        Laya.BaseShader.bindShader = null;
    };
    return Laya3dSprite;
}(Laya.Image));
//# sourceMappingURL=Laya3dSprite.js.map