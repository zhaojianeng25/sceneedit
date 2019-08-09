var core;
(function (core) {
    var TextureRes = Pan3d.TextureRes;
    var UIManager = Pan3d.UIManager;
    var Scene_data = Pan3d.Scene_data;
    var TextureManager = Pan3d.TextureManager;
    var TextureUint = /** @class */ (function () {
        function TextureUint() {
        }
        TextureUint.getInstance = function () {
            if (!this._instance) {
                this._instance = new TextureUint();
            }
            return this._instance;
        };
        TextureUint.prototype.makeColorTexture = function () {
            var tempRect = new TextureRes();
            tempRect.width = 1024;
            tempRect.height = 1024;
            tempRect.texture = Scene_data.context3D.creatTexture(tempRect.width, tempRect.height);
            var ctx = UIManager.getInstance().getContext2D(tempRect.width, tempRect.height, false);
            ctx.fillStyle = "#ff0000"; // text color
            ctx.fillRect(0, 0, tempRect.width, tempRect.height);
            TextureManager.getInstance().updateTexture(tempRect.texture, 0, 0, ctx);
            return tempRect;
        };
        return TextureUint;
    }());
    core.TextureUint = TextureUint;
})(core || (core = {}));
//# sourceMappingURL=TextureUint.js.map