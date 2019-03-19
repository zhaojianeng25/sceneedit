var pack;
(function (pack) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var PrefabStaticMesh = pack.PrefabStaticMesh;
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
                    pack.MaterialManager.getInstance().getMaterialByUrl($prefab.textureurl, function ($materialTree) {
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
    pack.PrefabManager = PrefabManager;
})(pack || (pack = {}));
//# sourceMappingURL=PrefabManager.js.map