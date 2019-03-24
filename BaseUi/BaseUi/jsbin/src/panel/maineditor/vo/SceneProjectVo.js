var maineditor;
(function (maineditor) {
    var SceneProjectVo = /** @class */ (function () {
        function SceneProjectVo(value) {
            this.textureurl = "assets/base/base.material";
            this.meshObj(value);
        }
        SceneProjectVo.prototype.meshObj = function (value) {
            for (var key in value) {
                this[key] = value[key];
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