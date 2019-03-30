var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var PrefabStaticMesh = pack.PrefabStaticMesh;
    var PackPrefabManager = /** @class */ (function () {
        function PackPrefabManager() {
            this.dic = {};
            this.loadDic = {};
        }
        PackPrefabManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new PackPrefabManager();
            }
            return this._instance;
        };
        PackPrefabManager.prototype.playBfun = function ($prefab, $url) {
            if (!this.dic[$url]) {
                this.dic[$url] = $prefab;
            }
            while (this.loadDic[$url].length) {
                this.loadDic[$url].pop()($prefab);
            }
        };
        PackPrefabManager.prototype.getPrefabByUrl = function ($url, bfun) {
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
                    if ($prefab.objsurl) {
                        pack.PackObjDataManager.getInstance().getObjDataByUrl($prefab.objsurl, function (value) {
                            $prefab.objData = value;
                            if ($prefab.textureurl) {
                                pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                                    $prefab.material = $materialTree;
                                    //    console.log("prefab加载完成", $prefab.url)
                                    _this.playBfun($prefab, $url);
                                });
                            }
                        });
                    }
                    else {
                        console.log("没有模型地址");
                        if ($prefab.textureurl) {
                            pack.PackMaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
                                $prefab.material = $materialTree;
                                _this.playBfun($prefab, $url);
                            });
                        }
                        else {
                            console.log("没有材质地址");
                        }
                    }
                });
            }
            else {
                this.loadDic[$url].push(bfun);
            }
        };
        return PackPrefabManager;
    }());
    pack.PackPrefabManager = PackPrefabManager;
})(pack || (pack = {}));
//# sourceMappingURL=PackPrefabManager.js.map