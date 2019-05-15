/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var Ghost = /** @class */ (function () {
            function Ghost(camera) {
                /**
                 * 调色板
                 */
                // protected static CTF:ColorTransform = new ColorTransform();	
                this.cacheBitmap = [];
                this.cacheMix = [];
                this.cacheX = [];
                this.cacheY = [];
                this.cacheAlpha = [];
                this._camera = camera;
            }
            /**
             * 默认设置残影
             * @param copyRate 采集频率
             * @param copyCount 残影数量
             * @param alphaMAX 最高透明度
             * @param alphaMIN 最低透明度
             *
             */
            Ghost.prototype.setting = function (copyRate, copyCount, alphaMAX, alphaMIN) {
                if (copyRate === void 0) { copyRate = 50; }
                if (copyCount === void 0) { copyCount = 10; }
                if (alphaMAX === void 0) { alphaMAX = 0.6; }
                if (alphaMIN === void 0) { alphaMIN = 0.2; }
                this._copyRate = copyRate;
                this._copyCount = copyCount;
                this._alphaMAX = alphaMAX;
                this._alphaMIN = alphaMIN;
                this._alphaStep = (this._alphaMAX - this._alphaMIN) / this._copyCount;
            };
            // 输入 
            Ghost.prototype.input = function (dx, dy, inBitmapData, matrix, drawAlpha) {
                var cur_time = Laya.timer.currTimer;
                if ((cur_time - this._lastCpyTime) < this._copyRate)
                    return;
                // if(dx == this.cacheX[this.cacheX.length - 1] && dy == this.cacheY[this.cacheY.length - 1]){
                // 	return;
                // }
                //记录一下最有一次复制时间
                this._lastCpyTime = cur_time;
                this.cacheBitmap.push(inBitmapData);
                this.cacheMix.push(matrix);
                this.cacheX.push(dx);
                this.cacheY.push(dy);
                this.cacheAlpha.push(drawAlpha);
                //如果大于残影数量，则移除末尾
                if (this.cacheBitmap.length > this._copyCount) {
                    //释放
                    this.cacheBitmap.shift();
                    this.cacheMix.shift();
                    this.cacheX.shift();
                    this.cacheY.shift();
                }
            };
            // 输出 
            Ghost.prototype.output = function (g) {
                var len = this.cacheBitmap.length;
                for (var i = 0; i < len; i++) {
                    var dx = this._camera.getScenePxByCellX(this.cacheX[i]);
                    var dy = this._camera.getScenePxByCellY(this.cacheY[i]);
                    var tt = this.cacheBitmap[i];
                    var mix = void 0;
                    if (this.cacheMix[i]) {
                        mix = this.cacheMix[i].clone();
                        mix.tx += dx * 2;
                    }
                    var alpla = (this._alphaMIN + this._alphaStep * (this._copyCount - i)) * this.cacheAlpha[i];
                    g.drawTexture(tt, dx, dy, tt.width, tt.height, mix, alpla);
                }
            };
            // 释放
            Ghost.prototype.free = function () {
                this.cacheBitmap.length = 0;
                this._lastCpyTime = 0;
                this.cacheBitmap.length = 0;
                this.cacheMix.length = 0;
                this.cacheX.length = 0;
                this.cacheY.length = 0;
                this._camera = null;
            };
            return Ghost;
        }());
        scene.Ghost = Ghost;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=Ghost.js.map