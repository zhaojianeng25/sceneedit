var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var ConstItem = Pan3d.ConstItem;
    var TexItem = Pan3d.TexItem;
    var TextureManager = Pan3d.TextureManager;
    var TextureRes = Pan3d.TextureRes;
    var PackMaterialManager = /** @class */ (function () {
        function PackMaterialManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackMaterialManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackMaterialManager();
            }
            return this._instance;
        };
        PackMaterialManager.prototype.replaceMaterialByUrl = function ($url) {
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                if (_this.dic[$url]) { //有了就反回
                    var $materialTree = _this.dic[$url];
                    $materialTree.setData({ data: $temp.data }); //这里只更新材质数据结构，为了编辑时能用到最新数据
                }
            });
        };
        PackMaterialManager.prototype.makeRoleShader = function ($materialTree, $temp) {
            var $roleShader = new left.RoleMaterialShader();
            if ($temp.info.paramAry) {
                $roleShader.paramAry = [];
                for (var i = 0; i < $temp.info.paramAry.length; i++) {
                    $roleShader.paramAry.push($temp.info.paramAry[i]);
                }
            }
            else {
                $roleShader.paramAry = [false, false, false, false, false, false, false, false, false, false];
            }
            $roleShader.vertex = $roleShader.getVertexShaderString();
            $roleShader.fragment = $temp.info.shaderStr;
            $roleShader.encode();
            console.log($roleShader);
            $materialTree.shader = $roleShader;
            $materialTree.program = $roleShader.program;
            $materialTree.roleShader = $roleShader;
        };
        PackMaterialManager.prototype.getMaterialByUrl = function ($url, bfun) {
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
                    if ($temp.info.paramAry) {
                        $buildShader.paramAry = [];
                        for (var i = 0; i < $temp.info.paramAry.length; i++) {
                            $buildShader.paramAry.push($temp.info.paramAry[i]);
                        }
                    }
                    else {
                        $buildShader.paramAry = [false, false, false, false, false, false, false, false, false, false];
                    }
                    $buildShader.vertex = $buildShader.getVertexShaderString();
                    $buildShader.fragment = $temp.info.shaderStr;
                    $buildShader.encode();
                    var $materialTree = new materialui.MaterialTree();
                    _this.makeRoleShader($materialTree, $temp);
                    $materialTree.setData({ data: $temp.data });
                    $materialTree.useNormal = $temp.info.useNormal;
                    $materialTree.hasTime = $temp.info.hasTime;
                    if ($materialTree.hasTime) {
                        $materialTree.timeValue = new Vector2D($temp.info.timeValue.x, $temp.info.timeValue.y);
                    }
                    $materialTree.blendMode = $temp.info.blendMode;
                    $materialTree.writeZbuffer = $temp.info.writeZbuffer;
                    $materialTree.zbuff = $temp.info.zbuff;
                    $materialTree.useLightUv = $buildShader.paramAry[2];
                    $materialTree.texList = _this.makeTextList($temp.info.texList);
                    $materialTree.constList = _this.makeConstList($temp.info.constList);
                    $materialTree.fcData = _this.makeFc($materialTree.constList, ($temp.info.fcData).split(","));
                    $materialTree.fcNum = Math.round($materialTree.fcData.length / 4);
                    $materialTree.shader = $buildShader;
                    $materialTree.program = $buildShader.program;
                    $materialTree.modelShader = $buildShader;
                    /*
                    console.log("----------vertex------------");
                    console.log($buildShader.vertex);
                    console.log("----------fragment------------");
                    console.log($buildShader.fragment);
                    console.log("----------buildShader------------");
                    */
                    //    console.log("材质加载完成", $url)
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
        PackMaterialManager.prototype.makeConstList = function (item) {
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
        PackMaterialManager.prototype.makeFc = function (constVec, infofcData) {
            var fcData = new Float32Array(infofcData.length);
            for (var i = 0; i < infofcData.length; i++) {
                fcData[i] = Number(infofcData[i]);
            }
            for (var k = 0; k < constVec.length; k++) {
                constVec[k].creat(fcData);
            }
            return fcData;
        };
        PackMaterialManager.prototype.loadTextureRes = function (texItem) {
            if (texItem.type == TexItem.CUBEMAP) {
                LoadManager.getInstance().load(Scene_data.fileRoot + texItem.url, LoadManager.IMG_TYPE, function ($img, $info) {
                    texItem.textureRes = new TextureRes;
                    texItem.textureRes.texture = Pan3d.CubemapLoad.makeTempCubeTextture($img);
                });
            }
            else {
                TextureManager.getInstance().getTexture(Scene_data.fileRoot + texItem.url, function ($texture) {
                    texItem.textureRes = $texture;
                });
            }
        };
        PackMaterialManager.prototype.makeTextList = function (item) {
            var texList = new Array;
            for (var i = 0; i < item.length; i++) {
                var texItem = new TexItem;
                texItem.id = item[i]._id;
                texItem.url = item[i].url;
                texItem.name = item[i].name;
                texItem.isDynamic = item[i].isDynamic;
                texItem.paramName = item[i].paramName;
                texItem.isMain = item[i].isMain;
                texItem.type = item[i].type;
                this.loadTextureRes(texItem);
                texList.push(texItem);
            }
            return texList;
        };
        return PackMaterialManager;
    }());
    pack.PackMaterialManager = PackMaterialManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackMaterialManager.js.map