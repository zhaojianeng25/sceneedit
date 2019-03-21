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
    var LoadManager = Pan3d.LoadManager;
    var ObjDataManager = Pan3d.ObjDataManager;
    var TextureManager = Pan3d.TextureManager;
    var SceneRes = /** @class */ (function (_super) {
        __extends(SceneRes, _super);
        function SceneRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneRes.prototype.readScene = function () {
            _super.prototype.readScene.call(this);
            this.bfun();
        };
        SceneRes.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
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
        ImputGameResModel.prototype.loadSceneByUrl = function () {
            var sceneRes = new SceneRes();
            sceneRes.bfun = function () {
                console.log("sceneres", sceneRes);
                ObjDataManager.getInstance().getObjData(Scene_data.fileRoot + "working/scene007/dae/scene007_01_0.xml", function ($obj) {
                    // this.meshObjdataToSever($obj)
                });
                var imgUrl = "working/scene007/scene007_hide/lightuv/build2.jpg";
                var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + imgUrl);
                if ($img) { //新加的图
                    // var $upfile: File = this.dataURLtoFile($img.src, imgUrl);
                    console.log($img);
                    // var $newUrl: string = "uppic/" + this.fileid + "/" + $upfile.name
                }
            };
            LoadManager.getInstance().load(Scene_data.fileRoot + "pan/expmapinfo.txt", LoadManager.BYTE_TYPE, function ($byte) {
                sceneRes.loadComplete($byte);
            });
        };
        ImputGameResModel.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        ImputGameResModel.prototype.meshObjdataToSever = function (objdata) {
            var obj = {};
            var tw = objdata.stride / 4;
            obj.vertices = this.readChangeBuff(objdata.dataView, 3, 0, tw);
            obj.uvs = this.readChangeBuff(objdata.dataView, 2, 3, tw);
            obj.lightUvs = this.readChangeBuff(objdata.dataView, 2, 5, tw);
            obj.normals = obj.vertices;
            obj.indexs = objdata.indexs;
            for (var i = 0; i < obj.vertices.length; i++) {
                obj.vertices[i] *= 0.1; //输小;
            }
            var $fileUrl = Pan3d.Scene_data.fileRoot + "pan/expmapinfo.objs";
            var $file = new File([JSON.stringify(obj)], "expmapinfo.objs");
            var pathurl = $fileUrl.replace(Pan3d.Scene_data.ossRoot, "");
            pack.FileOssModel.upOssFile($file, pathurl, function () {
                console.log("上传完成");
            });
        };
        ImputGameResModel.prototype.readChangeBuff = function (data, $dataWidth, $offset, $stride) {
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
        return ImputGameResModel;
    }());
    inputres.ImputGameResModel = ImputGameResModel;
})(inputres || (inputres = {}));
//# sourceMappingURL=InputGameResModel.js.map