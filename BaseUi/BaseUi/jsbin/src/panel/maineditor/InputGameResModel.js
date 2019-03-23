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
var inputres;
(function (inputres) {
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var ByteArray = Pan3d.Pan3dByteArray;
    var LoadManager = Pan3d.LoadManager;
    var ObjDataManager = Pan3d.ObjDataManager;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var SceneRes = /** @class */ (function (_super) {
        __extends(SceneRes, _super);
        function SceneRes() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fileRoot = "ccav/";
            return _this;
        }
        SceneRes.prototype.readScene = function () {
            _super.prototype.readScene.call(this);
            this.bfun();
        };
        SceneRes.prototype.saveImgToSever = function (imgAryBuffer, httpUrl) {
            var $img = new Image();
            $img.url = httpUrl.replace(Scene_data.fileRoot, "");
            $img.src = 'data:image/png;base64,' + Pan3d.Base64.encode(imgAryBuffer);
            var $upfile = this.dataURLtoFile($img.src, $img.url);
            this.upOssFile($upfile, httpUrl);
        };
        SceneRes.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        SceneRes.prototype.readChangeBuff = function (data, $dataWidth, $offset, $stride) {
            var $arr = new Array;
            var len = data.byteLength / (4 * $stride);
            for (var i = 0; i < len; i++) {
                var pos = $stride * i + $offset;
                for (var j = 0; j < $dataWidth; j++) {
                    var id = (pos + j) * 4;
                    var num = data.getFloat32(id, true);
                    data.setFloat32(id, num, true);
                    $arr.push(num);
                }
            }
            return $arr;
        };
        SceneRes.prototype.saveObjDataToSever = function (objdata, httpUrl) {
            httpUrl = httpUrl.replace(".xml", ".objs");
            var tw = objdata.stride / 4;
            var obj = {};
            obj.version = Scene_data.version;
            obj.vertices = this.readChangeBuff(objdata.dataView, 3, 0, tw);
            obj.uvs = this.readChangeBuff(objdata.dataView, 2, 3, tw);
            obj.lightuvs = this.readChangeBuff(objdata.dataView, 2, 5, tw);
            obj.normals = obj.vertices;
            obj.indexs = objdata.indexs;
            for (var i = 0; i < obj.vertices.length; i++) {
                obj.vertices[i] *= 0.1; //输小;
            }
            var $file = new File([JSON.stringify(obj)], "temp.objs");
            this.upOssFile($file, httpUrl);
        };
        SceneRes.prototype.refrishDicGroup = function (pathurl) {
            pack.FileOssModel.getDisByOss(pathurl, function () {
                console.log("刷新了文件夹目录", pathurl);
            });
        };
        SceneRes.prototype.upOssFile = function (file, httpurl) {
            var _this = this;
            var url = httpurl.replace(Scene_data.fileRoot, ""); //得到相对位置；
            url = Scene_data.fileRoot + this.fileRoot + url; //得到http文件位置
            var ossUrl = url.replace(Scene_data.ossRoot, "");
            console.log(ossUrl);
            pack.FileOssModel.upOssFile(file, ossUrl, function () {
                _this.refrishDicGroup(ossUrl);
            });
        };
        SceneRes.prototype.readObj = function ($srcByte) {
            var objNum = $srcByte.readInt();
            for (var i = 0; i < objNum; i++) {
                var url = Scene_data.fileRoot + $srcByte.readUTF();
                var size = $srcByte.readInt();
                var newByte = new Pan3dByteArray();
                newByte.length = size;
                $srcByte.readBytes(newByte, 0, size);
                var objData = ObjDataManager.getInstance().loadObjCom(newByte.buffer, url);
                this.saveObjDataToSever(objData, url);
            }
            if (this._imgFun) {
                this._imgFun();
            }
        };
        SceneRes.prototype.readImg = function () {
            this.imgNum = this._byte.readInt();
            this.imgLoadNum = 0;
            for (var i = 0; i < this.imgNum; i++) {
                var url = Scene_data.fileRoot + this._byte.readUTF();
                var imgSize = this._byte.readInt();
                if (url.search(".jpng") != -1) {
                    this.readJpngImg(url);
                    continue;
                }
                var imgAryBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
                this._byte.position += imgSize;
                this.saveImgToSever(imgAryBuffer, url);
                this.countImg();
            }
        };
        return SceneRes;
    }(Pan3d.SceneRes));
    inputres.SceneRes = SceneRes;
    var ImputGameResModel = /** @class */ (function () {
        function ImputGameResModel() {
        }
        ImputGameResModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ImputGameResModel();
            }
            return this._instance;
        };
        ImputGameResModel.prototype.inputSceneFile = function (value) {
            var _this = this;
            var $reader = new FileReader();
            $reader.readAsArrayBuffer(value);
            $reader.onload = function ($temp) {
                if (_this.isMapH5File($reader.result)) {
                    var arrayBuff = $reader.result;
                    _this.setMapByteMesh(arrayBuff);
                }
                else {
                    alert("不确定类型");
                }
            };
        };
        ImputGameResModel.prototype.setMapByteMesh = function ($byte) {
            var _this = this;
            this.sceneRes = new SceneRes();
            //  this.sceneRes.fileRoot="ccav/"  //指定到对应文件夹；
            this.sceneRes.bfun = function () {
                //   console.log("sceneres", sceneRes.sceneData)
                var buildItem = _this.sceneRes.sceneData.buildItem;
                for (var i = 0; i < buildItem.length; i++) {
                    if (buildItem[i].type == 1) {
                        var pramaitam = [];
                        var objsurl = buildItem[i].objsurl;
                        var lighturl = buildItem[i].lighturl;
                        var mainpic = _this.getMainPic(buildItem[i].materialInfoArr);
                        var name = buildItem[i].name;
                        pramaitam.push({ name: "param0", url: mainpic });
                        pramaitam.push({ name: "param1", url: lighturl });
                        if (objsurl && lighturl && mainpic) {
                            console.log(name);
                            console.log(objsurl);
                            console.log(lighturl);
                            console.log(mainpic);
                            console.log("------------------");
                            _this.makePerfabToSever(name, objsurl, pramaitam, buildItem[i]);
                        }
                    }
                }
            };
            this.sceneRes.loadComplete($byte);
        };
        ImputGameResModel.prototype.isMapH5File = function (arrayBuffer) {
            var $byte = new ByteArray(arrayBuffer);
            $byte.position = 0;
            var $version = $byte.readInt();
            var $url = $byte.readUTF();
            if ($url.indexOf("role/") != -1) {
                return true;
            }
            else {
                return true;
            }
        };
        ImputGameResModel.prototype.loadSceneByUrl = function () {
            var _this = this;
            this.sceneRes = new SceneRes();
            //  this.sceneRes.fileRoot="ccav/"  //指定到对应文件夹；
            this.sceneRes.bfun = function () {
                //   console.log("sceneres", sceneRes.sceneData)
                var buildItem = _this.sceneRes.sceneData.buildItem;
                for (var i = 0; i < buildItem.length; i++) {
                    if (buildItem[i].type == 1) {
                        var pramaitam = [];
                        var objsurl = buildItem[i].objsurl;
                        var lighturl = buildItem[i].lighturl;
                        var mainpic = _this.getMainPic(buildItem[i].materialInfoArr);
                        var name = buildItem[i].name;
                        pramaitam.push({ name: "param0", url: mainpic });
                        pramaitam.push({ name: "param1", url: lighturl });
                        if (objsurl && lighturl && mainpic) {
                            console.log(name);
                            console.log(objsurl);
                            console.log(lighturl);
                            console.log(mainpic);
                            console.log("------------------");
                            _this.makePerfabToSever(name, objsurl, pramaitam, buildItem[i]);
                        }
                    }
                }
            };
            LoadManager.getInstance().load(Scene_data.fileRoot + "pan/ccav.txt", LoadManager.BYTE_TYPE, function ($byte) {
                _this.sceneRes.loadComplete($byte);
            });
        };
        //从材质中获取一张图;
        ImputGameResModel.prototype.getMainPic = function (infoArr) {
            for (var i = 0; infoArr && i < infoArr.length; i++) {
                if (infoArr[i].type == 0) {
                    return infoArr[i].url;
                }
            }
            return null;
        };
        ImputGameResModel.prototype.makePerfabToSever = function (name, objsurl, imgItem, buildinfo) {
            var $byte = new Pan3d.Pan3dByteArray();
            var prefabStaticMesh = new pack.PrefabStaticMesh();
            prefabStaticMesh.url = this.sceneRes.fileRoot + name + ".prefab";
            prefabStaticMesh.objsurl = this.sceneRes.fileRoot + objsurl.replace(".xml", ".objs");
            prefabStaticMesh.textureurl = "texture/color.material";
            prefabStaticMesh.paramInfo = [];
            for (var i = 0; i < imgItem.length; i++) {
                var paramVo = {};
                paramVo.id = i;
                paramVo.type = "tex";
                paramVo.paramName = imgItem[i].name;
                paramVo.data = this.sceneRes.fileRoot + imgItem[i].url;
                prefabStaticMesh.paramInfo.push(paramVo);
            }
            var $fileUrl = Pan3d.Scene_data.fileRoot + prefabStaticMesh.url;
            $byte.writeUTF(JSON.stringify(prefabStaticMesh.getObject()));
            var $file = new File([$byte.buffer], "temp.prefab");
            var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, pathurl, function () {
                var obj = {};
                obj.url = prefabStaticMesh.url;
                obj.pos = new Vector3D();
                ModuleEventManager.dispatchEvent(new maineditor.MainEditorEvent(maineditor.MainEditorEvent.INPUT_PREFAB_TO_SCENE), obj);
            });
        };
        return ImputGameResModel;
    }());
    inputres.ImputGameResModel = ImputGameResModel;
})(inputres || (inputres = {}));
//# sourceMappingURL=InputGameResModel.js.map