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
var maineditor;
(function (maineditor) {
    var LyfSpriteDisplay = /** @class */ (function (_super) {
        __extends(LyfSpriteDisplay, _super);
        function LyfSpriteDisplay() {
            var _this = _super.call(this) || this;
            _this.waitLoadUrl = [];
            return _this;
        }
        LyfSpriteDisplay.prototype.addLyfByUrl = function ($url) {
            if (this._scene) {
                this.loadTempByUrl($url);
            }
            else {
                this.waitLoadUrl.push($url);
            }
        };
        LyfSpriteDisplay.prototype.addStage = function () {
            _super.prototype.addStage.call(this);
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }
        };
        LyfSpriteDisplay.prototype.loadTempByUrl = function (value) {
            var scene = this._scene;
            scene.groupDataManager.scene = scene;
            scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + value, function (groupRes) {
                for (var i = 0; i < groupRes.dataAry.length; i++) {
                    var item = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle = scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        scene.particleManager.addParticle($particle);
                    }
                    else {
                        console.log("播放的不是单纯特效");
                    }
                }
            });
        };
        return LyfSpriteDisplay;
    }(Pan3d.Display3D));
    maineditor.LyfSpriteDisplay = LyfSpriteDisplay;
})(maineditor || (maineditor = {}));
//# sourceMappingURL=LyfSpriteDisplay.js.map