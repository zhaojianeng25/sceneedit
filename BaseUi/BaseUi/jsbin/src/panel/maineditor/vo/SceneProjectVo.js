var maineditor;
(function (maineditor) {
    var SceneProjectVo = /** @class */ (function () {
        function SceneProjectVo(value) {
            this.meshObj(value);
        }
        SceneProjectVo.prototype.meshObj = function (value) {
            var _this = this;
            for (var key in value) {
                this[key] = value[key];
            }
            if (this.textureurl) {
                pack.PackMaterialManager.getInstance().getMaterialByUrl(this.textureurl, function ($materialTree) {
                    _this.material = $materialTree;
                });
            }
        };
        SceneProjectVo.prototype.getSaveObj = function () {
            var obj = {};
            if (this.material) {
                this.textureurl = this.material.url;
            }
            obj.textureurl = this.textureurl;
            obj.gildline = this.gildline;
            return obj;
        };
        return SceneProjectVo;
    }());
    maineditor.SceneProjectVo = SceneProjectVo;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=SceneProjectVo.js.map