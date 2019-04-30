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
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Matrix3D = Pan3d.Matrix3D;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var LayaScene2dPicShader = /** @class */ (function (_super) {
        __extends(LayaScene2dPicShader, _super);
        function LayaScene2dPicShader() {
            return _super.call(this) || this;
        }
        LayaScene2dPicShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
        };
        LayaScene2dPicShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "uniform vec4 rectinfo;" +
                "varying vec2 v_texCoord;" +
                "void main(void)" +
                "{" +
                "v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "vec4 vt0= vec4(v3Position, 1.0);" +
                "vt0.x = vt0.x *rectinfo.z+rectinfo.x;" +
                "vt0.y = vt0.y *rectinfo.w-rectinfo.y;" +
                "gl_Position = vt0;" +
                "}";
            return $str;
        };
        LayaScene2dPicShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =infoUv;\n" +
                "}";
            return $str;
        };
        LayaScene2dPicShader.LayaScene2dPicShader = "LayaScene2dPicShader";
        return LayaScene2dPicShader;
    }(Shader3D));
    LayaPan3D.LayaScene2dPicShader = LayaScene2dPicShader;
    var LayaScene2dPicSprit = /** @class */ (function (_super) {
        __extends(LayaScene2dPicSprit, _super);
        function LayaScene2dPicSprit() {
            var _this = _super.call(this) || this;
            _this.imgRectInfo = [0, 0, 1, 1];
            _this.initData();
            return _this;
        }
        LayaScene2dPicSprit.prototype.initData = function () {
            if (!LayaScene2dPicSprit.objdata2D) {
                ProgrmaManager.getInstance().registe(LayaScene2dPicShader.LayaScene2dPicShader, new LayaScene2dPicShader);
                this.shader = ProgrmaManager.getInstance().getProgram(LayaScene2dPicShader.LayaScene2dPicShader);
                this.program = this.shader.program;
                this.objData = new ObjData;
                this.objData.vertices = new Array();
                this.objData.vertices.push(0, 0, 0.9);
                this.objData.vertices.push(1, 0, 0.9);
                this.objData.vertices.push(1, -1, 0.9);
                this.objData.vertices.push(0, -1, 0.9);
                this.objData.uvs = new Array();
                this.objData.uvs.push(0, 0);
                this.objData.uvs.push(1, 0);
                this.objData.uvs.push(1, 1);
                this.objData.uvs.push(0, 1);
                this.objData.indexs = new Array();
                this.objData.indexs.push(0, 2, 1);
                this.objData.indexs.push(0, 3, 2);
                this.loadTexture();
                this.upToGpu();
                LayaScene2dPicSprit.objdata2D = this.objData;
            }
            this.objData = LayaScene2dPicSprit.objdata2D;
        };
        LayaScene2dPicSprit.prototype.updateMatrix = function () {
            if (this.width && this.height && this._scene) {
                this.imgRectInfo[0] = -1 + this.x / this._scene.cam3D.cavanRect.width * 2;
                this.imgRectInfo[1] = -1 + this.y / this._scene.cam3D.cavanRect.height * 2;
                this.imgRectInfo[2] = this.width / this._scene.cam3D.cavanRect.width * this._scene.cam3D.scene2dScale;
                this.imgRectInfo[3] = this.height / this._scene.cam3D.cavanRect.height * this._scene.cam3D.scene2dScale;
            }
        };
        LayaScene2dPicSprit.prototype.set2dPos = function ($x, $y) {
            this.x = $x;
            this.y = $y;
        };
        LayaScene2dPicSprit.prototype.loadTexture = function () {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileRoot + "role/game2dbg.jpg", function ($texture) {
                _this._uvTextureRes = $texture;
            });
            this.width = 100;
            this.height = 100;
        };
        LayaScene2dPicSprit.prototype.upToGpu = function () {
            if (this.objData.indexs.length) {
                this.objData.treNum = this.objData.indexs.length;
                this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
        };
        LayaScene2dPicSprit.prototype.update = function () {
            if (this.objData && this.objData.indexBuffer && this._uvTextureRes) {
                this.updateMatrix();
                Scene_data.context3D.setProgram(this.program);
                Scene_data.context3D.setVc4fv(this.shader, "rectinfo", this.imgRectInfo);
                Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
                Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);
                Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
                Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            }
        };
        return LayaScene2dPicSprit;
    }(Pan3d.Display3D));
    LayaPan3D.LayaScene2dPicSprit = LayaScene2dPicSprit;
    var LayaScene2dSceneChar = /** @class */ (function (_super) {
        __extends(LayaScene2dSceneChar, _super);
        function LayaScene2dSceneChar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LayaScene2dSceneChar.prototype.set2dPos = function ($x, $y) {
            var $nScale = 1;
            var $num45 = 45;
            if (this._scene) {
                $nScale = 2 / this._scene.cam3D.scene2dScale;
                $num45 = Math.abs(this._scene.focus3D.rotationX);
            }
            var $tx = $x * $nScale;
            var $tz = $y * $nScale / (Math.sin($num45 * Math.PI / 180)) * -1;
            this._px = $tx;
            this._pz = $tz;
            this.x = $tx;
            this.z = $tz;
        };
        return LayaScene2dSceneChar;
    }(layapan.LayaSceneChar));
    LayaPan3D.LayaScene2dSceneChar = LayaScene2dSceneChar;
    var LayaScene2D = /** @class */ (function (_super) {
        __extends(LayaScene2D, _super);
        function LayaScene2D(value, bfun) {
            if (bfun === void 0) { bfun = null; }
            var _this = _super.call(this, value, bfun) || this;
            _this.addEvents();
            return _this;
        }
        LayaScene2D.prototype.addSceneModel = function () {
            this.sceneManager.cam3D.scene2dScale = 4;
            var $baseChar = new LayaScene2dSceneChar();
            $baseChar.setRoleUrl(getRoleUrl("5103"));
            this.sceneManager.addMovieDisplay($baseChar);
            $baseChar.set2dPos(100, 100);
            this.mainChar = $baseChar;
            var tempPic = new LayaScene2dPicSprit();
            tempPic.x = 0;
            tempPic.z = -100;
            this.sceneManager.addDisplay(tempPic);
            this.bgPicSprite = tempPic;
        };
        LayaScene2D.prototype.addEvents = function () {
            this.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
            this.on(Pan3d.MouseType.MouseWheel, this, this.onMouseWheel);
        };
        LayaScene2D.prototype.onMouseWheel = function (e) {
            this.sceneManager.cam3D.scene2dScale += e.delta / 100;
        };
        LayaScene2D.prototype.onStartDrag = function (e) {
            if (this.mouseY < this.height * 0.2) {
                this.startDrag(this.dragRegion, true, this.height * 0.2);
            }
            else {
                this.mainChar.set2dPos(this.mouseX * this.scaleX, this.mouseY * this.scaleY);
                this.bgPicSprite.set2dPos(this.mouseX * this.scaleX, this.mouseY * this.scaleY);
            }
        };
        Object.defineProperty(LayaScene2D.prototype, "scene2dScale", {
            get: function () {
                return this.sceneManager.cam3D.scene2dScale;
            },
            enumerable: true,
            configurable: true
        });
        LayaScene2D.prototype.upData = function () {
            if (this.sceneManager) {
                this.sceneManager.focus3D.rotationX = -30;
                this.sceneManager.focus3D.rotationY = 0;
                var tw = this.sceneManager.cam3D.cavanRect.width;
                var th = this.sceneManager.cam3D.cavanRect.height;
                this.sceneManager.focus3D.x = tw / this.scene2dScale;
                var $num45 = Math.abs(this.sceneManager.focus3D.rotationX); //45度角
                this.sceneManager.focus3D.z = (th / this.scene2dScale) / (Math.sin($num45 * Math.PI / 180)) * -1;
                Pan3d.MathClass.getCamView(this.sceneManager.cam3D, this.sceneManager.focus3D); //一定要角色帧渲染后再重置镜头矩阵
                _super.prototype.upData.call(this);
            }
        };
        LayaScene2D.prototype.renderToTexture = function () {
            var m = new Matrix3D;
            var tw = this.sceneManager.cam3D.cavanRect.width;
            var th = this.sceneManager.cam3D.cavanRect.height;
            m.appendScale(1 / tw, 1 / th, 1 / 2000);
            m.appendScale(this.scene2dScale, this.scene2dScale, 1);
            this.sceneManager.renderToTexture(m);
        };
        return LayaScene2D;
    }(LayaPan3D.Laya3dSprite));
    LayaPan3D.LayaScene2D = LayaScene2D;
})(LayaPan3D || (LayaPan3D = {}));
//# sourceMappingURL=LayaScene2D.js.map