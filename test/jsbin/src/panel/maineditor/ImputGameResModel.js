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
    var SceneRes = /** @class */ (function (_super) {
        __extends(SceneRes, _super);
        function SceneRes() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneRes.prototype.readScene = function () {
            _super.prototype.readScene.call(this);
            this.bfun();
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
            };
            LoadManager.getInstance().load(Scene_data.fileRoot + "pan/expmapinfo.txt", LoadManager.BYTE_TYPE, function ($byte) {
                sceneRes.loadComplete($byte);
            });
        };
        return ImputGameResModel;
    }());
    inputres.ImputGameResModel = ImputGameResModel;
})(inputres || (inputres = {}));
//# sourceMappingURL=ImputGameResModel.js.map