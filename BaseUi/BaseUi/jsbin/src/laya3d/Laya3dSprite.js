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
        this.sceneMaager.cam3D.distance = 1000;
        this.sceneMaager.focus3D.rotationY = random(360);
        this.sceneMaager.focus3D.rotationX = -45;
        Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        this.frameLoop(1, this, function () {
            _this.sceneMaagerUpData();
        });
        var prefabSprite = new maineditor.ModelSprite();
        prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
        //  this.sceneMaager.addDisplay(prefabSprite);
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
    };
    Laya3dSprite.prototype.sceneMaagerUpData = function () {
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