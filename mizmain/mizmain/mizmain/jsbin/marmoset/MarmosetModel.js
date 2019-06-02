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
            MarmosetModel.imgBolb = {};
        }
        MarmosetModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        };
        MarmosetModel.preaMeshFile = function (modeInfo, fileDic) {
            if (!this.meshItem) {
                this.meshItem = [];
            }
            this.meshItem.push(new Mars3Dmesh(Scene_data.context3D.renderContext, modeInfo, fileDic[modeInfo.file]));
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
                var tempBack = marmosetFun.call(this, Scene_load, a);
                for (var g = 0; g < sceneInfo.meshes.length; ++g) {
                    MarmosetModel.preaMeshFile(sceneInfo.meshes[g], fileDic);
                }
                return tempBack;
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
                TextureCache_parseFile.call(this, a, b, c);
                MarmosetModel.imgBolb[a.name] = new Blob([a.data], { type: "application/octet-binary" });
            };
            var Shader_build = marmoset.Shader.prototype.build;
            marmoset.Shader.prototype.build = function (a, b) {
                console.log("---------------------------------");
                console.log(a.length, b.length);
                if (b.length == 18238) {
                    //a = MarmosetModel.changerVshader;
                    //b = MarmosetModel.changerFshader;
                }
                else {
                    //553 202
                    //132 150
                    //148 114  //
                    //1318 18238
                    //1336 18256
                    //260 227
                    //154 114
                    //212 2049
                    //154 1991
                    //179 339
                    //154 248
                    //468 490 
                    if (a.length == 212) { //114
                        console.log("--------", a.length);
                        b = MarmosetModel.changerOutshader;
                        //  b = tempstr.substr(0, tempstr.lastIndexOf("}")) + "\ngl_FragColor.x=1.0;\n}"
                        console.log(b);
                    }
                }
                Shader_build.call(this, a, b);
            };
        };
        MarmosetModel.prototype.getTextShaderStr = function () {
            var str;
            str = "";
            return str;
        };
        MarmosetModel.prototype.upFileToSvever = function () {
            for (var key in MarmosetModel.imgBolb) {
                this.dataURLtoBlob(MarmosetModel.imgBolb[key], key);
            }
        };
        MarmosetModel.prototype.dataURLtoBlob = function (value, name) {
            //"image/jpeg"
            var img = new Image();
            img.url = name;
            img.onload = function (evt) {
                var etimg = evt.target;
                URL.revokeObjectURL(etimg.src);
                var files = new File([value], name, { type: "image/jpeg" });
                var pathUrl = Pan3d.Scene_data.fileRoot + "pan/marmoset/" + name;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile(files, pathurl, function (value) {
                    console.log(value);
                });
            };
            img.src = URL.createObjectURL(value);
        };
        MarmosetModel.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        MarmosetModel.prototype.initData = function () {
            this.overrideFun();
        };
        return MarmosetModel;
    }());
    mars3D.MarmosetModel = MarmosetModel;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetModel.js.map