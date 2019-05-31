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
    var ByteStream = marmoset.ByteStream;
    var Scene = marmoset.Scene;
    var Matrix = marmoset.Matrix;
    var Vect = marmoset.Vect;
    var FileVo = /** @class */ (function () {
        function FileVo() {
        }
        return FileVo;
    }());
    mars3D.FileVo = FileVo;
    var Mars3Dmesh = /** @class */ (function (_super) {
        __extends(Mars3Dmesh, _super);
        function Mars3Dmesh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Mars3Dmesh.prototype.initdata = function (a, b, c) {
            this.gl = a;
            var elementArrayBuffer = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
            var arrayBuffer = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
            this.gl = a;
            this.desc = b;
            var d = b.isDynamicMesh;
            this.numSubMeshes = this.dynamicVertexData = 0;
            this.displayMatrix = Matrix.identity();
            this.name = b.name;
            this.modelMatrix = Matrix.identity();
            this.origin = b.transform ? Vect.create(b.transform[12], b.transform[13], b.transform[14], 1) : Vect.create(0, 5, 0, 1);
            this.stride = 32;
            if (this.vertexColor = b.vertexColor)
                this.stride += 4;
            if (this.secondaryTexCoord = b.secondaryTexCoord)
                this.stride += 8;
            c = new ByteStream(c.data);
            this.indexCount = b.indexCount;
            this.indexTypeSize = b.indexTypeSize;
            this.indexType = 4 == this.indexTypeSize ? a.UNSIGNED_INT : a.UNSIGNED_SHORT;
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var e = c.readBytes(this.indexCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            this.wireCount = b.wireCount;
            this.wireBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            e = c.readBytes(this.wireCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            this.vertexCount = b.vertexCount;
            this.vertexBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            c = c.readBytes(this.vertexCount * this.stride);
            d ? (this.dynamicVertexData = new Uint8Array(c),
                a.bufferData(a.ARRAY_BUFFER, c, a.DYNAMIC_DRAW)) : a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
            a.bindBuffer(a.ARRAY_BUFFER, null);
            this.bounds = void 0 === b.minBound || void 0 === b.maxBound ? {
                min: Vect.create(-10, -10, -10, 1),
                max: Vect.create(10, 10, -0, 1)
            } : {
                min: Vect.create(b.minBound[0], b.minBound[1], b.minBound[2], 1),
                max: Vect.create(b.maxBound[0], b.maxBound[1], b.maxBound[2], 1)
            };
            this.bounds.maxExtent = Math.max(Math.max(b.maxBound[0] - b.minBound[0], b.maxBound[1] - b.minBound[1]), b.maxBound[2] - b.minBound[2]);
            this.bounds.averageExtent = (b.maxBound[0] - b.minBound[0] + (b.maxBound[1] - b.minBound[1]) + (b.maxBound[2] - b.minBound[2])) / 3;
            if (elementArrayBuffer) {
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
            }
            if (arrayBuffer) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, arrayBuffer);
            }
        };
        return Mars3Dmesh;
    }(marmoset.Mesh));
    mars3D.Mars3Dmesh = Mars3Dmesh;
    var MarmosetModel = /** @class */ (function () {
        function MarmosetModel() {
            this.textureItem = [];
        }
        MarmosetModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        };
        MarmosetModel.preaMeshFile = function (modeInfo, fileDic) {
            Pan3d.TimeUtil.addTimeOut(10, function () {
                var mesh = new Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, fileDic[modeInfo.file]);
                // console.log(mesh)
            });
        };
        MarmosetModel.prototype.overrideFun = function () {
            var marmosetFun = function (fun) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = fun.apply(this, args);
                return v;
            };
            var Scene_load = Scene.prototype.load;
            Scene.prototype.load = function (a) {
                var fileDic = {};
                var sceneInfo;
                for (var fileKey in a.files) {
                    var fileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileDic[fileVo.name] = fileVo;
                    if (fileVo.name.indexOf("scene.json") != -1) {
                        sceneInfo = JSON.parse((new ByteStream(fileVo.data)).asString());
                    }
                }
                var tempBg = marmosetFun.call(this, Scene_load, a);
                for (var g = 0; g < sceneInfo.meshes.length; ++g) {
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], fileDic);
                }
                console.log(sceneInfo);
                return tempBg;
            };
            var TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a, b, c) {
                var tempImg = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                };
                tempImg.src = tempURL;
                TextureCache_parseFile(a, b, c);
            };
        };
        MarmosetModel.prototype.initData = function () {
            this.overrideFun();
            console.log(marmoset);
        };
        return MarmosetModel;
    }());
    mars3D.MarmosetModel = MarmosetModel;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetModel.js.map