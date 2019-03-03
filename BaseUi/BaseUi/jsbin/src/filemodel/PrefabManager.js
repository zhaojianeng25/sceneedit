var filemodel;
(function (filemodel) {
    var LoadManager = Pan3d.LoadManager;
    var Scene_data = Pan3d.Scene_data;
    var Pan3dByteArray = Pan3d.Pan3dByteArray;
    var PrefabStaticMesh = pack.PrefabStaticMesh;
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
            var _this = this;
            LoadManager.getInstance().load(Scene_data.fileRoot + $url, LoadManager.BYTE_TYPE, function ($byte) {
                var $obj = JSON.parse(new Pan3dByteArray($byte).readUTF());
                var $prefab = new PrefabStaticMesh();
                for (var key in $obj) {
                    $prefab[key] = $obj[key];
                }
                _this.loadTextTureByUrl($prefab.textureurl, function (materialTree) {
                    $prefab.material = materialTree;
                    console.log("对象", $prefab);
                    bfun($prefab);
                });
            });
        };
        PrefabManager.prototype.loadTextTureByUrl = function (value, bfun) {
            LoadManager.getInstance().load(Scene_data.fileRoot + value, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                var $tempMaterial = new materialui.MaterialTree;
                $tempMaterial = new materialui.MaterialTree;
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