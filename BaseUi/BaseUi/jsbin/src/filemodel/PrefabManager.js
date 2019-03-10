var filemodel;
(function (filemodel) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var PrefabStaticMesh = pack.PrefabStaticMesh;
    var ConstItem = Pan3d.ConstItem;
    var TexItem = Pan3d.TexItem;
    var TextureManager = Pan3d.TextureManager;
    var MaterialManager = /** @class */ (function () {
        function MaterialManager() {
        }
        MaterialManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialManager();
            }
            return this._instance;
        };
        MaterialManager.prototype.getMaterialByUrl = function ($url, bfun) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                var $buildShader = new left.BuildMaterialShader();
                $buildShader.paramAry = [false, false, false, false, false, false, false, false, false, false];
                $buildShader.vertex = $buildShader.getVertexShaderString();
                $buildShader.fragment = $temp.info.shaderStr;
                $buildShader.encode();
                var $materialTree = new materialui.MaterialTree();
                $materialTree.setData({ data: $temp.data });
                $materialTree.texList = _this.makeTextList($temp.info.texList);
                $materialTree.constList = _this.makeConstList($temp.info.constList);
                $materialTree.fcData = _this.makeFc($materialTree.constList, ($temp.info.fcData).split(","));
                $materialTree.fcNum = Math.round($materialTree.fcData.length / 4);
                $materialTree.shader = $buildShader;
                $materialTree.program = $buildShader.program;
                /*
                console.log("----------vertex------------");
                console.log($buildShader.vertex);
                console.log("----------fragment------------");
                console.log($buildShader.fragment);
                console.log("----------buildShader------------");
                */
                $materialTree.url = $url;
                bfun($materialTree);
            });
        };
        MaterialManager.prototype.makeConstList = function (item) {
            var constList = [];
            for (var i = 0; i < item.length; i++) {
                var temp = new ConstItem();
                temp.name = "fc" + i;
                temp.offset = i;
                temp.value = item[i].value;
                temp.vecNum = item[i].vecNum;
                temp.id = i;
                constList.push(temp);
            }
            return constList;
        };
        MaterialManager.prototype.makeFc = function (constVec, infofcData) {
            var fcData = new Float32Array(infofcData.length);
            for (var i = 0; i < infofcData.length; i++) {
                fcData[i] = Number(infofcData[i]);
            }
            for (var k = 0; k < constVec.length; k++) {
                constVec[k].creat(fcData);
            }
            return fcData;
        };
        MaterialManager.prototype.makeTextList = function (item) {
            var texList = new Array;
            for (var i = 0; i < item.length; i++) {
                var texItem = new TexItem;
                texItem.id = item[i].id;
                texItem.url = item[i].url;
                texItem.name = item[i].name;
                texItem.isDynamic = item[i].isDynamic;
                texItem.paramName = item[i].paramName;
                texItem.isMain = item[i].isMain;
                texItem.type = item[i].type;
                if (texItem.type == undefined) {
                    TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, function ($texture) {
                        texItem.textureRes = $texture;
                    });
                }
                texList.push(texItem);
            }
            return texList;
        };
        return MaterialManager;
    }());
    filemodel.MaterialManager = MaterialManager;
    var PrefabManager = /** @class */ (function () {
        function PrefabManager() {
        }
        PrefabManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PrefabManager();
            }
            return this._instance;
        };
        PrefabManager.prototype.getPrefabByUrl = function ($url, bfun) {
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($byte) {
                var $obj = JSON.parse(new Pan3dByteArray($byte).readUTF());
                var $prefab = new PrefabStaticMesh();
                for (var key in $obj) {
                    $prefab[key] = $obj[key];
                }
                $prefab.url = $url;
                filemodel.MaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                    $prefab.material = $materialTree;
                    bfun($prefab);
                });
            });
        };
        PrefabManager.prototype.loadTextTureByUrl = function (value, bfun) {
            LoadManager.getInstance().load(Scene_data.fileRoot + value, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                var $temp = JSON.parse($byte.readUTF());
                var $tempMaterial = new materialui.MaterialTree;
                $tempMaterial.url = value;
                $tempMaterial.setData({ data: $temp.data });
                bfun($tempMaterial);
            });
        };
        return PrefabManager;
    }());
    filemodel.PrefabManager = PrefabManager;
})(filemodel || (filemodel = {}));
//# sourceMappingURL=PrefabManager.js.map