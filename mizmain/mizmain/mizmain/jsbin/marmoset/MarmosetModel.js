var mars3D;
(function (mars3D) {
    var FileVo = /** @class */ (function () {
        function FileVo() {
        }
        return FileVo;
    }());
    mars3D.FileVo = FileVo;
    var MarmosetModel = /** @class */ (function () {
        function MarmosetModel() {
            this.textureItem = [];
        }
        MarmosetModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MarmosetModel();
            }
            return this._instance;
        };
        MarmosetModel.prototype.overrideFun = function () {
            var marmosetFun = function (fun) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var v = fun.apply(this, args);
                return v;
            };
            var Scene_load = marmoset.Scene.prototype.load;
            marmoset.Scene.prototype.load = function (a) {
                var fileItem = [];
                for (var fileKey in a.files) {
                    var fileVo = new FileVo();
                    fileVo.name = a.files[fileKey].name;
                    fileVo.type = a.files[fileKey].type;
                    fileVo.data = a.files[fileKey].data;
                    fileItem.push(fileVo);
                }
                var tempBg = marmosetFun.call(this, Scene_load, a);
                //var b = this.gl, c, d = value.extract("scene.json");
                return tempBg;
            };
            var TextureCache_parseFile = marmoset.TextureCache.parseFile;
            marmoset.TextureCache.parseFile = function (a, b, c) {
                var tempImg = new Image();
                var tempBlob = new Blob([a.data], {
                    type: a.type
                });
                var tempURL = URL.createObjectURL(tempBlob);
                tempImg.onload = function () {
                    URL.revokeObjectURL(tempURL);
                    var webGLTexture = Pan3d.TextureManager.getInstance().getImageDataTexture(tempImg);
                    MarmosetModel.getInstance().textureItem.push(webGLTexture);
                };
                tempImg.src = tempURL;
                TextureCache_parseFile(a, b, c);
            };
        };
        MarmosetModel.prototype.initData = function () {
            this.overrideFun();
            console.log(marmoset);
        };
        return MarmosetModel;
    }());
    mars3D.MarmosetModel = MarmosetModel;
})(mars3D || (mars3D = {}));
//# sourceMappingURL=MarmosetModel.js.map