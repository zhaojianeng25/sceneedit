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
var Pan3d;
(function (Pan3d) {
    var me;
    (function (me) {
        var ParticleModelData = /** @class */ (function (_super) {
            __extends(ParticleModelData, _super);
            function ParticleModelData() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ParticleModelData.prototype.getParticle = function () {
                return new me.Display3DModelPartilce();
            };
            ParticleModelData.prototype.setAllByteInfo = function ($byte) {
                this.objData = new me.ObjData;
                this._maxAnimTime = $byte.readFloat();
                // var vLen: number = $byte.readInt();
                // for (var i: number = 0; i < vLen; i++) {
                //     this.objData.vertices.push($byte.readFloat())
                // }
                // var uLen: number = $byte.readInt();
                // for (var j: number = 0; j < uLen; j++) {
                //     this.objData.uvs.push($byte.readFloat())
                // }
                var vLen = $byte.getInt();
                var dataWidth = 5;
                var len = vLen * dataWidth * 4;
                var arybuff = new ArrayBuffer(len);
                var data = new DataView(arybuff);
                me.BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4); //vertices
                me.BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4); //uv
                var iLen = $byte.readInt();
                for (var k = 0; k < iLen; k++) {
                    this.objData.indexs.push($byte.readInt());
                }
                this.objData.stride = dataWidth * 4;
                if (this.version >= 36) {
                    this._depthMode = $byte.readInt(); //新加模型特效深度信息
                }
                _super.prototype.setAllByteInfo.call(this, $byte);
                //this.uploadGpu();
                this.initVcData();
                this.objData.vertexBuffer = me.Scene_data.context3D.uploadBuff3DArrayBuffer(arybuff);
                this.objData.indexBuffer = me.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
                this.objData.treNum = this.objData.indexs.length;
            };
            ParticleModelData.prototype.initVcData = function () {
                this.vcmatData = new Float32Array(me.Display3DFacetShader.getVcSize() * 16);
            };
            ParticleModelData.prototype.uploadGpu = function () {
                this.objData.vertexBuffer = me.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = me.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = me.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
                this.objData.treNum = this.objData.indexs.length;
            };
            ParticleModelData.prototype.regShader = function () {
                //var shader: Display3DFacetShader = new Display3DFacetShader()
                this.materialParam.shader = me.ProgrmaManager.getInstance().getMaterialProgram(me.Display3DFacetShader.Display3D_Facet_Shader, me.Display3DFacetShader, this.materialParam.material);
                this.materialParam.program = this.materialParam.shader.program;
            };
            ParticleModelData.prototype.setFloat32Vec = function (key, ary) {
                var idxary = me.Display3DFacetShader.shader_vec4[key];
                var idx = idxary[0] * 16 + idxary[1] * 4;
                this.vcmatData.set(ary, idx);
            };
            ParticleModelData.prototype.setFloat32Mat = function (key, ary) {
                var idx = me.Display3DFacetShader.shader_mat4[key] * 16;
                this.vcmatData.set(ary, idx);
            };
            return ParticleModelData;
        }(me.ParticleData));
        me.ParticleModelData = ParticleModelData;
    })(me = Pan3d.me || (Pan3d.me = {}));
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ParticleModelData.js.map