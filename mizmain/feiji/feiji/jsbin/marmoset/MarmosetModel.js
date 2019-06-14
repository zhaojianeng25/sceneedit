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
    var TextureManager = Pan3d.TextureManager;
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
        Mars3Dmesh.prototype.setAlbedoUrl = function (value) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + value + ".jpg", function (a) {
                _this.tAlbedo = a;
            });
        };
        Mars3Dmesh.prototype.setNormalUrl = function (value) {
            var _this = this;
            TextureManager.getInstance().getTexture(Scene_data.fileuiRoot + "pan/marmoset/feiji/pic/" + value + ".jpg", function (a) {
                _this.tNormal = a;
            });
        };
        Mars3Dmesh.prototype.meshVect = function (value, stride) {
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var outArr = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            for (var i = 0; i < outArr.length / 8; i++) {
                var id = i * 8 + 0;
                outArr[id] = outArr[id] * 0.5;
            }
            return outArr;
        };
        //public vectBuffer: WebGLBuffer //顶点
        //public uvBuffer: WebGLBuffer //UV
        //public nrmBuffer: WebGLBuffer; //法线
        Mars3Dmesh.prototype.meshIndexFloat = function (value) {
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var chang32 = new Uint16Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.indexs = [];
            for (var i = 0; i < chang32.length; i++) {
                this.objData.indexs.push(chang32[i]);
            }
            this.objData.indexBuffer = Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
        };
        Mars3Dmesh.prototype.meshVecFloat = function (value, stride, gl) {
            var len8 = stride / 4;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var chang32 = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.vertices = [];
            for (var i = 0; i < chang32.length / len8; i++) {
                var id = i * len8;
                this.objData.vertices.push(chang32[id + 0]);
                this.objData.vertices.push(chang32[id + 1]);
                this.objData.vertices.push(chang32[id + 2]);
            }
            this.objData.vertexBuffer = Scene_data.context3D.uploadBuff3D(this.objData.vertices);
        };
        Mars3Dmesh.prototype.meshUvFloat = function (value, stride, gl) {
            var len8 = stride / 4;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            var change32 = new Float32Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            this.objData.uvs = [];
            for (var i = 0; i < change32.length / len8; i++) {
                var id = i * len8;
                this.objData.uvs.push(change32[id + 3]);
                this.objData.uvs.push(1 - (change32[id + 4]));
            }
            this.objData.uvBuffer = Scene_data.context3D.uploadBuff3D(this.objData.uvs);
        };
        Mars3Dmesh.prototype.meshNrmFloat = function (value, stride, gl) {
            var len16 = stride / 2;
            var buffer = new ArrayBuffer(value.length);
            var changeArr = new Uint8Array(buffer);
            for (var i = 0; i < value.length; i++) {
                changeArr[i] = value[i];
            }
            var tbnArr = new Uint16Array(buffer);
            this.objData.normals = [];
            var m = new Pan3d.Matrix3D;
            m.appendRotation(90, Pan3d.Vector3D.Z_AXIS);
            for (var i = 0; i < tbnArr.length / len16; i++) { //tbn
                var id = i * len16 + 10;
                if (this.secondaryTexCoord) {
                    //  id += 4; //有第二张贴图需要TBN要后移动 
                }
                var a = tbnArr[id + 4];
                var b = tbnArr[id + 5];
                var outVec3 = this.getNrmByXY(new Vector2D(a, b));
                this.objData.normals.push(outVec3.x, outVec3.y, outVec3.z);
            }
            this.objData.normalsBuffer = Scene_data.context3D.uploadBuff3D(this.objData.normals);
        };
        Mars3Dmesh.prototype.getNrmByXY = function (v) {
            v.x = v.x / 65535.0;
            v.y = v.y / 65535.0;
            var iX = (v.y > (32767.1 / 65535.0));
            v.y = iX ? (v.y - (32768.0 / 65535.0)) : v.y;
            var r = new Vector3D();
            r.x = (2.0 * 65535.0 / 32767.0) * v.x - 1.0;
            r.y = (2.0 * 65535.0 / 32767.0) * v.y - 1.0;
            r.z = Math.sqrt(Math.max(Math.min(1.0 - (r.x * r.x + r.y * r.y), 1.0), 0.0));
            r.z = iX ? -r.z : r.z;
            return r;
        };
        Mars3Dmesh.prototype.initdata = function (a, b, c) {
            this.objData = new Pan3d.ObjData;
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
            if (this.vertexColor = b.vertexColor) {
                this.stride += 4;
            }
            if (this.secondaryTexCoord = b.secondaryTexCoord) {
                this.stride += 8;
            }
            if (this.stride != 32) {
                alert("顶点数据不为32，可能需要处理BUG");
            }
            c = new ByteStream(c.data);
            this.indexCount = b.indexCount;
            this.indexTypeSize = b.indexTypeSize;
            this.indexType = 4 == this.indexTypeSize ? a.UNSIGNED_INT : a.UNSIGNED_SHORT;
            this.indexBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var e = c.readBytes(this.indexCount * this.indexTypeSize);
            this.meshIndexFloat(e);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            this.wireCount = b.wireCount;
            this.wireBuffer = a.createBuffer();
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            e = c.readBytes(this.wireCount * this.indexTypeSize);
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, e, a.STATIC_DRAW);
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
            this.vertexCount = b.vertexCount;
            c = c.readBytes(this.vertexCount * this.stride);
            this.meshVecFloat(c, this.stride, a);
            this.meshUvFloat(c, this.stride, a);
            this.meshNrmFloat(c, this.stride, a);
            this.objData.treNum = this.indexCount;
            if (this.secondaryTexCoord) {
                alert("有法线纹理要处理");
            }
            c = this.meshVect(c, this.stride);
            this.vertexBuffer = a.createBuffer();
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
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
                //console.log("---------------------------------")
                //console.log(a.length, b.length)
                if (b.length == 18238) { //读取顶点和纹理着色器
                    //   console.log(b)
                    a = MarmosetModel.changerVshader;
                    b = MarmosetModel.changerFshader;
                }
                else {
                    if (a.length == 212) { //更新输出着色器
                        b = MarmosetModel.changerOutshader;
                        //    console.log(b)
                    }
                }
                Shader_build.call(this, a, b);
            };
        };
        MarmosetModel.prototype.upFileToSvever = function () {
            var num = 0;
            for (var key in MarmosetModel.imgBolb) {
                num++;
            }
            this.needFoald = num > 1;
            for (var key in MarmosetModel.imgBolb) {
                this.dataURLtoBlob(MarmosetModel.imgBolb[key], key);
            }
        };
        MarmosetModel.prototype.saveObjData = function (objData, pathurl, $name) {
            var objStr = {};
            objStr.vertices = objData.vertices;
            objStr.normals = objData.normals;
            objStr.uvs = objData.uvs;
            objStr.lightuvs = objData.lightuvs ? objData.lightuvs : objData.uvs;
            objStr.indexs = objData.indexs;
            objStr.treNum = objData.indexs.length;
            var strXml = JSON.stringify(objStr);
            var $file = new File([strXml], $name);
            if (this.needFoald) {
                pathurl += "objs/";
            }
            var pathUrl = Pan3d.Scene_data.fileRoot + pathurl + $name;
            var ossPathUrl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, ossPathUrl, function (value) {
                console.log(value);
                pack.FileOssModel.getDisByOss(ossPathUrl, function (arrDic) {
                    // console.log(arrDic)
                });
            });
            return pathurl + $name;
        };
        MarmosetModel.prototype.savePrefab = function (objsUrl, fileSonPath, fileName) {
            var ossPath = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var materialUrl = fileSonPath + fileName + ".material";
            pack.FileOssModel.copyFile(ossPath + materialUrl, "baseedit/assets/base/base.material", function () { });
            var prefabStaticMesh = new pack.PrefabStaticMesh();
            prefabStaticMesh.url = fileSonPath + fileName + ".prefab";
            prefabStaticMesh.objsurl = objsUrl;
            prefabStaticMesh.textureurl = materialUrl;
            var $byte = new Pan3d.Pan3dByteArray();
            var $temp = prefabStaticMesh.getObject();
            $temp.version = pack.FileOssModel.version;
            $byte.writeUTF(JSON.stringify($temp));
            var prafabFile = new File([$byte.buffer], "temp.prefab");
            var pathurl = ossPath + prefabStaticMesh.url;
            pack.FileOssModel.upOssFile(prafabFile, pathurl, function (value) {
                console.log(value);
            });
            return prefabStaticMesh.url;
        };
        MarmosetModel.prototype.upObjDataToSever = function () {
            var fileSonPath = "pan/marmoset/" + this.viewFileName.replace(".mview", "/");
            var $hierarchyList = [];
            this.needFoald = MarmosetModel.meshItem.length > 1;
            for (var i = 0; i < MarmosetModel.meshItem.length; i++) {
                var $name = this.viewFileName.replace(".mview", "_" + i + "");
                var objUrl = this.saveObjData(MarmosetModel.meshItem[i].objData, fileSonPath, $name + ".objs");
                var prefabUrl = this.savePrefab(objUrl, fileSonPath, $name);
                $hierarchyList.push(this.makeTemapModeInfo(prefabUrl, $name));
            }
            this.saveMarmosetMap(fileSonPath + this.viewFileName.replace(".mview", ".map"), $hierarchyList);
        };
        MarmosetModel.prototype.makeTemapModeInfo = function (prefabUrl, $name) {
            var $obj = {};
            $obj.type = maineditor.HierarchyNodeType.Prefab;
            $obj.name = $name;
            $obj.url = prefabUrl;
            $obj.data = "name";
            $obj.x = 0;
            $obj.y = 0;
            $obj.z = 0;
            $obj.scaleX = 1;
            $obj.scaleY = 1;
            $obj.scaleZ = 1;
            $obj.rotationX = 0;
            $obj.rotationY = 0;
            $obj.rotationZ = 0;
            return $obj;
        };
        MarmosetModel.prototype.saveMarmosetMap = function (mapUrl, listArr) {
            var ossPath = Pan3d.Scene_data.fileRoot.replace(Pan3d.Scene_data.ossRoot, "");
            var tempSceneVo = new maineditor.SceneProjectVo({});
            tempSceneVo.gildline = true;
            tempSceneVo.textureurl = "base.material";
            var tempObj = tempSceneVo.getSaveObj();
            tempObj.list = listArr;
            tempObj.version = pack.FileOssModel.version;
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify(tempObj));
            var $file = new File([$byte.buffer], "scene.map");
            pack.FileOssModel.upOssFile($file, ossPath + mapUrl, function () {
                console.log("上传完成");
            });
        };
        MarmosetModel.prototype.dataURLtoBlob = function (value, name) {
            var _this = this;
            //"image/jpeg"
            var img = new Image();
            img.url = name;
            img.onload = function (evt) {
                var etimg = evt.target;
                URL.revokeObjectURL(etimg.src);
                var files = new File([value], name, { type: "image/jpeg" });
                var sonPath = "pan/marmoset/" + _this.viewFileName.replace(".mview", "/");
                if (_this.needFoald) {
                    sonPath += "pic/";
                }
                var pathUrl = Pan3d.Scene_data.fileRoot + sonPath + name;
                var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
                pack.FileOssModel.upOssFile(files, pathurl, function (value) {
                    console.log(pathurl);
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