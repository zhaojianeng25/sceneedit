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
            this.dic = {};
            this.loadDic = {};
        }
        MaterialManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialManager();
            }
            return this._instance;
        };
        MaterialManager.prototype.getMaterialByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
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
                    console.log("材质加载完成", $url);
                    $materialTree.url = $url;
                    if (!_this.dic[$url]) {
                        _this.dic[$url] = $materialTree;
                    }
                    while (_this.loadDic[$url].length) {
                        _this.loadDic[$url].pop()($materialTree);
                    }
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        MaterialManager.prototype.makeConstList = function (item) {
            var constList = [];
            for (var i = 0; i < item.length; i++) {
                var temp = new ConstItem();
                for (var key in item[i]) {
                    temp[key] = item[i][key];
                }
                temp.name = "fc" + i;
                temp.offset = i;
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
            this.dic = {};
            this.loadDic = {};
        }
        PrefabManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PrefabManager();
            }
            return this._instance;
        };
        PrefabManager.prototype.getPrefabByUrl = function ($url, bfun) {
            var _this = this;
            if (this.dic[$url]) { //有了就反回
                bfun(this.dic[$url]);
            }
            if (!this.loadDic[$url]) { //创建加载队列
                this.loadDic[$url] = [bfun];
                LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($byte) {
                    var $obj = JSON.parse(new Pan3dByteArray($byte).readUTF());
                    var $prefab = new PrefabStaticMesh();
                    for (var key in $obj) {
                        $prefab[key] = $obj[key];
                    }
                    $prefab.url = $url;
                    console.log("prefab加载完成", $prefab.url);
                    filemodel.MaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                        $prefab.material = $materialTree;
                        if (!_this.dic[$url]) {
                            _this.dic[$url] = $prefab;
                        }
                        while (_this.loadDic[$url].length) {
                            _this.loadDic[$url].pop()($prefab);
                        }
                    });
                });
            }
            this.loadDic[$url].push(bfun);
        };
        return PrefabManager;
    }());
    filemodel.PrefabManager = PrefabManager;
})(filemodel || (filemodel = {}));
//# sourceMappingURL=PrefabManager.js.map