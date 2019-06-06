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
var mars3D;
(function (mars3D) {
    var Shader3D = Pan3d.Shader3D;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    var Scene_data = Pan3d.Scene_data;
    var PicShowDiplay3dShader = /** @class */ (function (_super) {
        __extends(PicShowDiplay3dShader, _super);
        function PicShowDiplay3dShader() {
            return _super.call(this) || this;
        }
        PicShowDiplay3dShader.prototype.binLocation = function ($context) {
            $context.bindAttribLocation(this.program, 0, "v3Position");
            $context.bindAttribLocation(this.program, 1, "u2Texture");
            $context.bindAttribLocation(this.program, 2, "vTangent");
            $context.bindAttribLocation(this.program, 3, "vBitangent");
            $context.bindAttribLocation(this.program, 4, "vNormal");
            $context.bindAttribLocation(this.program, 5, "v3Nrm");
        };
        PicShowDiplay3dShader.prototype.getVertexShaderString = function () {
            var $str = "attribute vec3 v3Position;" +
                "attribute vec2 u2Texture;" +
                "attribute vec2 vTangent;" +
                "attribute vec2 vBitangent;" +
                "attribute vec2 vNormal;" +
                "attribute vec3 v3Nrm;" +
                "uniform mat4 viewMatrix3D;" +
                "uniform mat4 camMatrix3D;" +
                "uniform mat4 posMatrix3D;" +
                "varying vec2 v_texCoord;" +
                "varying mediump vec3 dA;" +
                "varying mediump vec3 dB;" +
                "varying mediump vec3 dC;" +
                "varying mediump vec3 dnrm;" +
                " vec3 iW(vec2 v) {;" +
                "  bool iX = (v.y > (32767.1 / 65535.0));" +
                "  v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;" +
                " vec3 r;" +
                "  r.xy = (2.0 * 65535.0 / 32767.0) * v - vec2(1.0);" +
                "  r.z = sqrt(clamp(1.0 - dot(r.xy, r.xy), 0.0, 1.0));" +
                "  r.z = iX ? -r.z : r.z;" +
                "  return r;" +
                " }" +
                "void main(void)" +
                "{" +
                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
                "   dC=iW(vNormal);" +
                "   dnrm=v3Nrm;" +
                "   vec4 vt0= vec4(v3Position, 1.0);" +
                "   vt0 = posMatrix3D * vt0;" +
                "   vt0 = camMatrix3D * vt0;" +
                "   vt0 = viewMatrix3D * vt0;" +
                "   gl_Position = vt0;" +
                "}";
            return $str;
        };
        PicShowDiplay3dShader.prototype.getFragmentShaderString = function () {
            var $str = "precision mediump float;\n" +
                "uniform sampler2D s_texture;\n" +
                "varying vec2 v_texCoord;\n" +
                "varying mediump vec3 dA;" +
                "varying mediump vec3 dB;" +
                "varying mediump vec3 dC;" +
                "varying mediump vec3 dnrm;" +
                "void main(void)\n" +
                "{\n" +
                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
                "gl_FragColor =vec4(dC,1.0);\n" +
                "}";
            return $str;
        };
        PicShowDiplay3dShader.PicShowDiplay3dShader = "PicShowDiplay3dShader";
        return PicShowDiplay3dShader;
    }(Shader3D));
    mars3D.PicShowDiplay3dShader = PicShowDiplay3dShader;
    var PicShowDiplay3dSprite = /** @class */ (function (_super) {
        __extends(PicShowDiplay3dSprite, _super);
        function PicShowDiplay3dSprite() {
            var _this = _super.call(this) || this;
            _this.initData();
            _this.updateMatrix;
            return _this;
        }
        PicShowDiplay3dSprite.prototype.initData = function () {
            ProgrmaManager.getInstance().registe(PicShowDiplay3dShader.PicShowDiplay3dShader, new PicShowDiplay3dShader);
            this.shader = ProgrmaManager.getInstance().getProgram(PicShowDiplay3dShader.PicShowDiplay3dShader);
            this.program = this.shader.program;
            this.objData = new ObjData;
            this.objData.vertices = new Array();
            this.objData.vertices.push(-100, 0, -100);
            this.objData.vertices.push(100, 0, -100);
            this.objData.vertices.push(100, 0, 100);
            this.objData.vertices.push(-100, 0, 100);
            this.objData.uvs = new Array();
            this.objData.uvs.push(0, 0);
            this.objData.uvs.push(1, 0);
            this.objData.uvs.push(1, 1);
            this.objData.uvs.push(0, 1);
            this.objData.indexs = new Array();
            this.objData.indexs.push(0, 1, 2);
            this.objData.indexs.push(0, 2, 3);
            this.loadTexture();
            this.upToGpu();
        };
        PicShowDiplay3dSprite.prototype.drawTempMesh = function (mesh) {
            var gl = Scene_data.context3D.renderContext;
            Scene_data.context3D.setProgram(this.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);
            Scene_data.context3D.cullFaceBack(false);
            Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this._uvTextureRes.texture, 0);
            // mesh.stride = 20
            Scene_data.context3D.pushVa(mesh.vertexBuffer);
            Scene_data.context3D.setVaOffset(0, 3, mesh.stride, 0);
            Scene_data.context3D.setVaOffset(1, 2, mesh.stride, 12);
            var f = 20;
            gl.enableVertexAttribArray(2);
            gl.vertexAttribPointer(2, 2, gl.UNSIGNED_SHORT, !0, mesh.stride, f);
            f += 4;
            gl.enableVertexAttribArray(3);
            gl.vertexAttribPointer(3, 2, gl.UNSIGNED_SHORT, !0, mesh.stride, f);
            f += 4;
            gl.enableVertexAttribArray(4);
            gl.vertexAttribPointer(4, 2, gl.UNSIGNED_SHORT, !0, mesh.stride, f);
            Scene_data.context3D.pushVa(mesh.nrmBuffer);
            gl.enableVertexAttribArray(4);
            gl.vertexAttribPointer(4, 2, gl.UNSIGNED_SHORT, true, 4, 0);
            Scene_data.context3D.drawCall(mesh.indexBuffer, mesh.indexCount);
        };
        PicShowDiplay3dSprite.prototype.update = function () {
            if (mars3D.MarmosetModel.meshItem && mars3D.MarmosetModel.meshItem.length) {
                for (var i = 0; i < mars3D.MarmosetModel.meshItem.length; i++) {
                    this.drawTempMesh(mars3D.MarmosetModel.meshItem[i]);
                }
            }
            else {
                _super.prototype.update.call(this);
            }
        };
        return PicShowDiplay3dSprite;
    }(BaseDiplay3dSprite));
    mars3D.PicShowDiplay3dSprite = PicShowDiplay3dSprite;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=PicShowDiplay3dSprite.js.map