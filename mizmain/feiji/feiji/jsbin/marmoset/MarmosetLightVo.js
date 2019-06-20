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
    var Scene_data = Pan3d.Scene_data;
    var FBO = /** @class */ (function (_super) {
        __extends(FBO, _super);
        function FBO(w, h) {
            if (w === void 0) { w = 128; }
            if (h === void 0) { h = 128; }
            return _super.call(this, w, h) || this;
        }
        return FBO;
    }(Pan3d.FBO));
    mars3D.FBO = FBO;
    var MarmosetLightVo = /** @class */ (function () {
        function MarmosetLightVo() {
            this.tDepth0 = new FBO(512, 512);
            this.tDepth1 = new FBO(512, 512);
            this.tDepth2 = new FBO(512, 512);
        }
        MarmosetLightVo.prototype.update = function (value) {
            for (var i = 0; i < value.length; i++) {
                this.drawTempMesh(value[i]);
            }
        };
        MarmosetLightVo.prototype.drawTempMesh = function (mesh) {
            if (mesh.tAlbedo && mesh.tNormal && mesh.tReflectivity) {
                var gl = Scene_data.context3D.renderContext;
                gl.disable(gl.CULL_FACE);
                gl.cullFace(gl.FRONT);
                //     Scene_data.context3D.setVa(0, 3, mesh.objData.vertexBuffer);
                //    Scene_data.context3D.setVa(1, 2, mesh.objData.uvBuffer);
                //    Scene_data.context3D.drawCall(mesh.objData.indexBuffer, mesh.objData.treNum);
            }
        };
        return MarmosetLightVo;
    }());
    mars3D.MarmosetLightVo = MarmosetLightVo;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetLightVo.js.map